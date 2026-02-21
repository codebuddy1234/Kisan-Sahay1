"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Helping 2M+ farmers discover schemes":
        "Helping 2M+ farmers discover schemes",

      "Farmer Miss Benefits": "Farmers Miss Benefits",

      "Worth 50000 Every Year": "Worth ₹50,000 Every Year",

      "Find all government": "Find all government",

      "schemes in one place": "schemes in one place",

      "Continue with Mobile": "Continue with Mobile",

      "Choose What You Need Help With": "Choose What You Need Help With",

      "Instantly discover your eligible benefits in 30 seconds":
        "Instantly discover your eligible benefits in 30 seconds",

      "Government Schemes": "Government Schemes",

      "Get ₹6,000 – ₹50,000 yearly support from government schemes":
        "Get ₹6,000 – ₹50,000 yearly support from government schemes",

      "PM Kisan": "PM Kisan",

      "Subsidy Programs": "Subsidy Programs",

      "Equipment Support": "Equipment Support",

      Select: "Select",

      "Insurance Coverage": "Insurance Coverage",

      "Protect crops & get ₹10,000 – ₹2,00,000 claim support":
        "Protect crops & get ₹10,000 – ₹2,00,000 claim support",

      "Crop Insurance": "Crop Insurance",

      "Health Coverage": "Health Coverage",

      "Accident Protection": "Accident Protection",

      "Financial Support": "Financial Support",

      "Get loans up to ₹3,00,000 at lowest interest":
        "Get loans up to ₹3,00,000 at lowest interest",

      "Kisan Credit Card": "Kisan Credit Card",

      "Farm Loans": "Farm Loans",

      "Interest Subsidy": "Interest Subsidy",

      "How It Works": "How It Works",

      "Three simple steps to discover your schemes":
        "Three simple steps to discover your schemes",

      "Create Profile": "Create Profile",

      "Auto Matching": "Auto Matching",

      "Apply Instantly": "Apply Instantly",

      "Share basic information about your farm and eligibility criteria.":
        "Share basic information about your farm and eligibility criteria.",

      "Our system instantly matches you with all eligible government schemes.":
        "Our system instantly matches you with all eligible government schemes.",

      "Get complete guidance and apply directly through our platform.":
        "Get complete guidance and apply directly through our platform.",

      "Trusted by Millions of Farmers": "Trusted by Millions of Farmers",

      "Real adoption numbers from government schemes":
        "Real adoption numbers from government schemes",

      "Ready to Discover Your Schemes?": "Ready to Discover Your Schemes?",

      "Join thousands of farmers who are now getting the government support they deserve.":
        "Join thousands of farmers who are now getting the government support they deserve.",

      "Get Started Now": "Get Started Now",

      "Empowering farmers with government support discovery.":
        "Empowering farmers with government support discovery.",

      Product: "Product",

      Features: "Features",

      Pricing: "Pricing",

      Blog: "Blog",

      Company: "Company",

      About: "About",

      Contact: "Contact",

      Careers: "Careers",

      Legal: "Legal",

      Privacy: "Privacy",

      Terms: "Terms",

      Security: "Security",
    },
  },

  hi: {
    translation: {
      "Helping 2M+ farmers discover schemes":
        "20 लाख से अधिक किसानों की योजनाएं खोजने में मदद",

      "Farmer Miss Benefits": "किसान लाभ खो देते हैं",

      "Worth 50000 Every Year": "हर साल ₹50,000 तक",

      "Find all government": "सभी सरकारी",

      "schemes in one place": "योजनाएं एक ही जगह",

      "Continue with Mobile": "मोबाइल से जारी रखें",

      "Choose What You Need Help With": "आपको किस सहायता की आवश्यकता है चुनें",

      "Instantly discover your eligible benefits in 30 seconds":
        "30 सेकंड में अपनी पात्र योजनाएं खोजें",

      "Government Schemes": "सरकारी योजनाएं",

      "Get ₹6,000 – ₹50,000 yearly support from government schemes":
        "सरकारी योजनाओं से ₹6,000 – ₹50,000 वार्षिक सहायता",

      "PM Kisan": "पीएम किसान",

      "Subsidy Programs": "सब्सिडी योजनाएं",

      "Equipment Support": "उपकरण सहायता",

      Select: "चुनें",

      "Insurance Coverage": "बीमा सुरक्षा",

      "Protect crops & get ₹10,000 – ₹2,00,000 claim support":
        "फसल सुरक्षा और ₹10,000 – ₹2,00,000 दावा सहायता",

      "Crop Insurance": "फसल बीमा",

      "Health Coverage": "स्वास्थ्य बीमा",

      "Accident Protection": "दुर्घटना सुरक्षा",

      "Financial Support": "वित्तीय सहायता",

      "Get loans up to ₹3,00,000 at lowest interest":
        "₹3,00,000 तक कम ब्याज पर ऋण",

      "Kisan Credit Card": "किसान क्रेडिट कार्ड",

      "Farm Loans": "कृषि ऋण",

      "Interest Subsidy": "ब्याज सब्सिडी",

      "How It Works": "यह कैसे काम करता है",

      "Three simple steps to discover your schemes": "3 आसान चरण",

      "Create Profile": "प्रोफाइल बनाएं",

      "Auto Matching": "स्वचालित मिलान",

      "Apply Instantly": "तुरंत आवेदन करें",

      "Trusted by Millions of Farmers": "लाखों किसानों का भरोसा",

      "Ready to Discover Your Schemes?": "अपनी योजनाएं खोजने के लिए तैयार?",

      "Get Started Now": "अभी शुरू करें",

      Product: "उत्पाद",

      Company: "कंपनी",

      Legal: "कानूनी",

      "Find Schemes Based on Categories" : 
      "श्रेणियों के आधार पर योजनाएं खोजें"
    },
  },

  mr: {
    translation: {
      "Helping 2M+ farmers discover schemes":
        "20 लाखांहून अधिक शेतकऱ्यांना मदत",

      "Farmer Miss Benefits": "शेतकरी लाभ गमावतात",

      "Worth 50000 Every Year": "दरवर्षी ₹50,000 पर्यंत",

      "Continue with Mobile": "मोबाईलसह सुरू ठेवा",

      "Choose What You Need Help With": "आपल्याला कोणती मदत हवी आहे निवडा",

      "Government Schemes": "सरकारी योजना",

      "Insurance Coverage": "विमा संरक्षण",

      "Financial Support": "आर्थिक मदत",

      Select: "निवडा",

      "How It Works": "हे कसे कार्य करते",

      "Create Profile": "प्रोफाइल तयार करा",

      "Apply Instantly": "तत्काळ अर्ज करा",

      "Get Started Now": "आता सुरू करा",

      "Trusted by Millions of Farmers": "लाखो शेतकऱ्यांचा विश्वास",
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
