import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Buffer } from "buffer";
import multer from "multer";
import mammoth from "mammoth";
import Groq from "groq-sdk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

dotenv.config();

const app = express();
const upload = multer({dest : "uploads/"});
const groq = new Groq({apiKey : process.env.GROQ_API_KEY});


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

function buildPrompt(text) {
  return `
Extract the government scheme into structured JSON.

Return ONLY valid JSON.

Schema:
{
  "scheme_name": "",
  "insurance_category": "",
  "eligibility_text": "",
  "criteria": {
    "AnnualIncome": "",
    "LandSize": "",
    "CropType": "",
    "State": ""
  }
}

Text:
${text}
`;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));

// ==============================
// DATABASE CONFIG
// ==============================
const DATABASE = "KisanSahay";
const UserSchemesDetails = "UserSchemesDetails";
const UserInsuranceDetails = "UserInsuranceDetails";
const UserFinancialDetails = "UserFinancialDetails";
const Insurance = "Insurance";
const Finance = "Finance";
const Schemes = "Schemes";

const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(DATABASE);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
  }
}
connectDB();

// ==============================
// OPENAI CONFIG
// ==============================

async function extractText(file) {
  if (!file) return "";

  const ext = file.mimetype;

  if (ext === "application/pdf") {
    const data = await pdfParse(fs.readFileSync(file.path));
    return data.text;
  }

  if (
    ext ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const data = await mammoth.extractRawText({ path: file.path });
    return data.value;
  }

  if (ext === "text/plain") {
    return fs.readFileSync(file.path, "utf-8");
  }

  return "";
}


app.post("/add-scheme", upload.single("file"), async (req, res) => {
  try {
    let text = req.body.text || "";

    if (req.file) {
      const fileText = await extractText(req.file);
      text += "\n" + fileText;
    }

    if (!text.trim()) {
      return res.status(400).json({ success: false, message: "No input" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: buildPrompt(text),
        },
      ],
      temperature: 0,
    });

    console.log("Raw model output:", completion.choices[0].message.content);
    
    let json;
    try {
      json = JSON.parse(completion.choices[0].message.content);
    } catch {
      return res.json({
        success: false,
        raw: completion.choices[0].message.content,
        message: "Invalid JSON from model",
      });
    }

    // OPTIONAL: store in MongoDB
    await db.collection("Schemes").insertOne(json);

    res.json({ success: true, data: json });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "AI failed" });
  }
});
// ==============================
// NORMALIZATION FUNCTIONS
// ==============================
const landOwnershipMap = {
  मालिक: "Owner",
  किराएदार: "Tenant",
  "साझा-फसलकर्ता": "Sharecropper",
  भाडेकरू: "Tenant",
  "साझा पिकवणारा": "Sharecropper",
  Owner: "Owner",
  Tenant: "Tenant",
  Sharecropper: "Sharecropper",
};

const cropTypeMap = {
  गेहूं: "Wheat",
  धान: "Rice",
  मका: "Maize",
  Wheat: "Wheat",
  Rice: "Rice",
  Maize: "Maize",
};

const stateMap = {
  महाराष्ट्र: "Maharashtra",
  "उत्तर प्रदेश": "Uttar Pradesh",
  "मध्य प्रदेश": "Madhya Pradesh",
  Maharashtra: "Maharashtra",
  "Uttar Pradesh": "Uttar Pradesh",
  "Madhya Pradesh": "Madhya Pradesh",
};

function normalizeUserInput(input, type) {
  if (!input) return input;
  switch (type) {
    case "landOwnership":
      return landOwnershipMap[input] || input;
    case "cropType":
      return cropTypeMap[input] || input;
    case "state":
      return stateMap[input] || input;
    default:
      return input;
  }
}

// ==============================
// USER DATA ENDPOINTS
// ==============================

// USER SCHEMES DATA
app.post("/userSchemesData", async (req, res) => {
  try {
    let { state, landOwnership, AnnualIncome, age } = req.body;

    state = normalizeUserInput(state, "state");
    landOwnership = normalizeUserInput(landOwnership, "landOwnership");

    const result = await db.collection(UserSchemesDetails).insertOne({
      state,
      landOwnership,
      AnnualIncome,
      age,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: "Successfully Stored Data",
      success: true,
      userId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to store Data", success: false });
  }
});

// USER INSURANCE DATA
app.post("/userInsuranceData", async (req, res) => {
  try {
    let { state, landOwnership, landSize, AnnualIncome, cropType } = req.body;

    state = normalizeUserInput(state, "state");
    landOwnership = normalizeUserInput(landOwnership, "landOwnership");
    cropType = normalizeUserInput(cropType, "cropType");

    await db.collection(UserInsuranceDetails).insertOne({
      state,
      landOwnership,
      landSize,
      AnnualIncome,
      cropType,
      createdAt: new Date(),
    });

    res.status(200).json({ success: true, message: "Successfully Saved Data" });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ success: false, message: "Error saving Insurance Data" });
  }
});

// USER FINANCIAL DATA
app.post("/userFinancialData", async (req, res) => {
  try {
    let { state, landOwnership, landSize, annualIncome, age } = req.body;

    state = normalizeUserInput(state, "state");
    landOwnership = normalizeUserInput(landOwnership, "landOwnership");

    await db.collection(UserFinancialDetails).insertOne({
      state,
      landOwnership,
      landSize,
      annualIncome,
      age,
      createdAt: new Date(),
    });

    res.status(200).json({ message: "Profile Created", success: true });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error in saving details!", success: false });
  }
});

// ==============================
// ELIGIBILITY ENDPOINTS
// ==============================

// ELIGIBLE SCHEMES
app.post("/eligible-Schemes", async (req, res) => {
  try {
    let { state, annualIncome, landOwnership, landSize, age, category } =
      req.body;

    annualIncome = Number(annualIncome) || 0;
    landSize = Number(landSize) || 0;
    age = Number(age) || 0;

    const schemes = await db
      .collection(Schemes)
      .find({ schemeCategory: { $regex: category, $options: "i" } })
      .toArray();

    const evaluatedSchemes = schemes.map((scheme) => {
      const criteria = scheme.criteria || {};
      let matched = 0,
        total = 0,
        matchedCriteria = [],
        notMatchedCriteria = [],
        missingCriteria = [];

      // STATE
      if (criteria.state) {
        total++;
        if (criteria.state.includes("All") || criteria.state.includes(state)) {
          matched++;
          matchedCriteria.push({ field: "State", user: state });
        } else {
          notMatchedCriteria.push({ field: "State", required: criteria.state });
        }
      }

      // LAND OWNERSHIP
      if (criteria.land_owner_type) {
        total++;
        if (
          criteria.land_owner_type.toLowerCase() ===
          landOwnership?.toLowerCase()
        ) {
          matched++;
          matchedCriteria.push({
            field: "Land Ownership",
            user: landOwnership,
          });
        } else {
          notMatchedCriteria.push({
            field: "Land Ownership",
            required: criteria.land_owner_type,
          });
        }
      }

      // INCOME
      if (
        criteria.annual_income_limit_min != null ||
        criteria.annual_income_limit_max != null
      ) {
        total++;
        const min = criteria.annual_income_limit_min ?? 0;
        const max = criteria.annual_income_limit_max ?? Infinity;
        if (annualIncome >= min && annualIncome <= max) {
          matched++;
          matchedCriteria.push({ field: "Income", user: annualIncome });
        } else {
          notMatchedCriteria.push({
            field: "Income",
            required: `${min} - ${max}`,
          });
        }
      }

      // LAND SIZE
      if (
        criteria.land_size_limit_min != null ||
        criteria.land_size_limit_max != null
      ) {
        total++;
        const min = criteria.land_size_limit_min ?? 0;
        const max = criteria.land_size_limit_max ?? Infinity;
        if (landSize >= min && landSize <= max) {
          matched++;
          matchedCriteria.push({ field: "Land Size", user: landSize });
        } else {
          notMatchedCriteria.push({
            field: "Land Size",
            required: `${min} - ${max}`,
          });
        }
      }

      // AGE
      if (criteria.age_limit_min != null || criteria.age_limit_max != null) {
        total++;
        const min = criteria.age_limit_min ?? 0;
        const max = criteria.age_limit_max ?? Infinity;
        if (age >= min && age <= max) {
          matched++;
          matchedCriteria.push({ field: "Age", user: age });
        } else {
          notMatchedCriteria.push({
            field: "Age",
            required: `${min} - ${max}`,
          });
        }
      }

      const eligibilityPercentage =
        total > 0 ? Math.round((matched / total) * 100) : 0;

      return {
        ...scheme,
        eligibilityPercentage,
        matchedCriteria,
        notMatchedCriteria,
        missingCriteria,
      };
    });

    evaluatedSchemes.sort(
      (a, b) => b.eligibilityPercentage - a.eligibilityPercentage,
    );

    res.json({ success: true, data: evaluatedSchemes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

// SINGLE SCHEME
app.get("/single-scheme/:slug", async (req, res) => {
  try {
    const scheme = await db
      .collection(Schemes)
      .findOne({ slug: req.params.slug });
    res.json({ success: true, data: scheme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching Scheme" });
  }
});

// SCHEMES BY CATEGORY
app.get("/schemes/:category", async (req, res) => {
  try {
    const schemes = await db
      .collection(Schemes)
      .find({ schemeCategory: req.params.category })
      .toArray();
    res.json({ success: true, data: schemes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching schemes" });
  }
});

// ELIGIBLE INSURANCE
app.post("/eligible-insurance", async (req, res) => {
  try {
    let { state, landSize, AnnualIncome, cropType, category } = req.body;

    if (!state && !landSize && !AnnualIncome && !cropType) {
      return res.json({ success: true, data: [] });
    }

    AnnualIncome = Number(AnnualIncome);
    let userLand = 0;
    if (typeof landSize === "string") {
      const match = landSize.match(/(\d+)/);
      if (match) userLand = Number(match[1]);
    }

    const insurances = await db
      .collection(Insurance)
      .find({ insurance_category: { $regex: category, $options: "i" } })
      .toArray();

    const evaluated = insurances.map((insurance) => {
      const criteria = insurance.criteria || {};
      let total = 0,
        matched = 0,
        matchedCriteria = [],
        notMatchedCriteria = [],
        missingCriteria = [];

      // STATE
      if (criteria.State) {
        total++;
        if (!state) {
          missingCriteria.push({ field: "State", required: criteria.State });
        } else if (
          criteria.State.toLowerCase().includes("all") ||
          criteria.State.toLowerCase().includes(state.toLowerCase())
        ) {
          matched++;
          matchedCriteria.push({
            field: "State",
            user: state,
            required: criteria.State,
          });
        } else {
          notMatchedCriteria.push({
            field: "State",
            user: state,
            required: criteria.State,
          });
        }
      }

      // INCOME
      if (criteria.AnnualIncome) {
        total++;
        if (!AnnualIncome) {
          missingCriteria.push({
            field: "Income",
            required: criteria.AnnualIncome,
          });
        } else {
          const numbers = criteria.AnnualIncome.match(/\d+/g);
          if (numbers) {
            const min = Number(numbers[0]) * 100000;
            const max = Number(numbers[1]) * 100000;
            if (AnnualIncome >= min && AnnualIncome <= max) {
              matched++;
              matchedCriteria.push({
                field: "Income",
                user: AnnualIncome,
                required: criteria.AnnualIncome,
              });
            } else {
              notMatchedCriteria.push({
                field: "Income",
                user: AnnualIncome,
                required: criteria.AnnualIncome,
              });
            }
          }
        }
      }

      // LAND
      if (criteria.LandSize) {
        total++;
        if (!userLand) {
          missingCriteria.push({
            field: "Land Size",
            required: criteria.LandSize,
          });
        } else {
          const numbers = criteria.LandSize.match(/\d+/g);
          if (numbers) {
            const min = Number(numbers[0]);
            const max = Number(numbers[1]);
            if (userLand >= min && userLand <= max) {
              matched++;
              matchedCriteria.push({
                field: "Land Size",
                user: userLand,
                required: criteria.LandSize,
              });
            } else {
              notMatchedCriteria.push({
                field: "Land Size",
                user: userLand,
                required: criteria.LandSize,
              });
            }
          }
        }
      }

      // CROP
      if (criteria.CropType) {
        total++;
        if (!cropType) {
          missingCriteria.push({ field: "Crop", required: criteria.CropType });
        } else if (
          criteria.CropType.toLowerCase().includes("all") ||
          criteria.CropType.toLowerCase().includes(cropType.toLowerCase())
        ) {
          matched++;
          matchedCriteria.push({
            field: "Crop",
            user: cropType,
            required: criteria.CropType,
          });
        } else {
          notMatchedCriteria.push({
            field: "Crop",
            user: cropType,
            required: criteria.CropType,
          });
        }
      }

      const eligibilityPercentage =
        total > 0 ? Math.round((matched / total) * 100) : 0;

      return {
        ...insurance,
        eligibilityPercentage,
        matchedCriteria,
        notMatchedCriteria,
        missingCriteria,
      };
    });

    evaluated.sort((a, b) => b.eligibilityPercentage - a.eligibilityPercentage);

    res.json({ success: true, data: evaluated });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error calculating eligibility" });
  }
});

// SINGLE INSURANCE
app.get("/single-insurance/:id", async (req, res) => {
  try {
    const insurance = await db
      .collection(Insurance)
      .findOne({ id: req.params.id });
    res.json({ success: true, data: insurance });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching insurance" });
  }
});

// ==============================
// AUDIO GENERATION
// ==============================
app.post("/generate-audio", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ success: false, message: "Text required" });

    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await speech.arrayBuffer());
    const filePath = path.join("public", "speech.mp3");
    fs.writeFileSync(filePath, buffer);

    res.json({
      success: true,
      audioUrl: "http://localhost:3001/public/speech.mp3",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Audio generation failed" });
  }
});

// ==============================
// SCHEME CHAT
// ==============================
app.post("/scheme-chat", async (req, res) => {
  try {
    const { message, slug } = req.body;
    if (!message || !slug)
      return res
        .status(400)
        .json({ success: false, message: "Message and slug required" });

    const scheme = await db.collection(Schemes).findOne({ slug });
    if (!scheme)
      return res
        .status(404)
        .json({ success: false, message: "Scheme not found" });

    const context = `
Scheme Name: ${scheme.scheme_name}
Details: ${scheme.details}
Benefits: ${scheme.benefits}
Eligibility: ${scheme.eligibility}
Application: ${scheme.application}
Documents: ${scheme.documents}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful agriculture assistant. Answer ONLY based on the scheme information provided.",
        },
        {
          role: "user",
          content: `Scheme Information:\n${context}\nUser Question:\n${message}`,
        },
      ],
    });

    res.json({ success: true, reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "AI failed" });
  }
});

// ==============================
// ELIGIBLE FINANCIAL SUPPORT
// ==============================
app.post("/eligible-financial-support", async (req, res) => {
  try {
    let { state, annualIncome, landOwnership, landSize, age, category } =
      req.body;

    annualIncome = Number(annualIncome) || 0;
    landSize = Number(landSize) || 0;
    age = Number(age) || 0;

    const supports = await db
      .collection(Finance)
      .find({ finance_category: { $regex: category, $options: "i" } })
      .toArray();

    const evaluatedSupports = supports.map((support) => {
      const criteria = support.criteria || {};
      let matched = 0,
        total = 0,
        matchedCriteria = [],
        notMatchedCriteria = [],
        missingCriteria = [];

      // STATE
      if (criteria.state && criteria.state.length > 0) {
        total++;
        if (criteria.state.includes("All") || criteria.state.includes(state)) {
          matched++;
          matchedCriteria.push({ field: "State", user: state });
        } else {
          notMatchedCriteria.push({ field: "State", required: criteria.state });
        }
      }

      // LAND OWNERSHIP
      if (criteria.land_owner_type) {
        total++;
        if (
          criteria.land_owner_type
            .toLowerCase()
            .includes(landOwnership?.toLowerCase())
        ) {
          matched++;
          matchedCriteria.push({
            field: "Land Ownership",
            user: landOwnership,
          });
        } else {
          notMatchedCriteria.push({
            field: "Land Ownership",
            required: criteria.land_owner_type,
          });
        }
      }

      // INCOME
      if (
        criteria.annual_income_limit_min != null ||
        criteria.annual_income_limit_max != null
      ) {
        total++;
        const min = criteria.annual_income_limit_min ?? 0;
        const max = criteria.annual_income_limit_max ?? Infinity;
        if (annualIncome >= min && annualIncome <= max) {
          matched++;
          matchedCriteria.push({ field: "Income", user: annualIncome });
        } else {
          notMatchedCriteria.push({
            field: "Income",
            required: `${min} - ${max}`,
          });
        }
      }

      // LAND SIZE
      if (
        criteria.land_size_limit_min != null ||
        criteria.land_size_limit_max != null
      ) {
        total++;
        const min = criteria.land_size_limit_min ?? 0;
        const max = criteria.land_size_limit_max ?? Infinity;
        if (landSize >= min && landSize <= max) {
          matched++;
          matchedCriteria.push({ field: "Land Size", user: landSize });
        } else {
          notMatchedCriteria.push({
            field: "Land Size",
            required: `${min} - ${max}`,
          });
        }
      }

      // AGE
      if (criteria.age_limit_min != null || criteria.age_limit_max != null) {
        total++;
        const min = criteria.age_limit_min ?? 0;
        const max = criteria.age_limit_max ?? Infinity;
        if (age >= min && age <= max) {
          matched++;
          matchedCriteria.push({ field: "Age", user: age });
        } else {
          notMatchedCriteria.push({
            field: "Age",
            required: `${min} - ${max}`,
          });
        }
      }

      const eligibilityPercentage =
        total > 0 ? Math.round((matched / total) * 100) : 0;

      return {
        ...support,
        eligibilityPercentage,
        matchedCriteria,
        notMatchedCriteria,
        missingCriteria,
      };
    });

    evaluatedSupports.sort(
      (a, b) => b.eligibilityPercentage - a.eligibilityPercentage,
    );

    res.json({ success: true, data: evaluatedSupports });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error calculating financial support eligibility",
      });
  }
});

// SINGLE FINANCE SUPPORT
app.get("/single-finance/:slug", async (req, res) => {
  try {
    const finance = await db
      .collection(Finance)
      .findOne({ slug: req.params.slug });
    res.json({ success: true, data: finance });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching finance support" });
  }
});

// ==============================
// SERVER LISTEN
// ==============================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
