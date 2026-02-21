import BaseChatbot from "./BaseChatbot";

const schemeFlow = [
  {
    key: "state",
    question: {
      en: "Which state do you farm in?",
      hi: "आप किस राज्य में खेती करते हैं?",
      mr: "तुम्ही कोणत्या राज्यात शेती करता?",
    },
  },
  {
    key: "landOwnership",
    question: {
      en: "Are you the owner of the land?",
      hi: "क्या आप जमीन के मालिक हैं?",
      mr: "तुम जमीन मालक आहात का?",
    },
    options: {
      en: ["Owner", "Tenant", "Sharecropper"],
      hi: ["मालिक", "किराएदार", "साझा-फसलकर्ता"],
      mr: ["मालक", "भाडेकरू", "साझा पिकवणारा"],
    },
  },
  {
    key: "landSize",
    question: {
      en: "How much land do you own? (in acres)",
      hi: "आपके पास कितनी जमीन है? (एकड़ में)",
      mr: "तुमच्याकडे किती जमीन आहे? (एकरमध्ये)",
    },
  },
  {
    key: "AnnualIncome",
    question: {
      en: "What is your annual income? (number only)",
      hi: "आपकी वार्षिक आय क्या है? (सिर्फ संख्या)",
      mr: "तुमचे वार्षिक उत्पन्न किती आहे? (फक्त संख्या)",
    },
  },
  {
    key: "age",
    question: {
      en: "What is your age?",
      hi: "आपकी उम्र क्या है?",
      mr: "तुमचे वय किती आहे?",
    },
  },
];

export default function SchemeChatbot() {
  return (
    <BaseChatbot
      title="Government Schemes Assistant"
      flow={schemeFlow}
      apiEndpoint="http://localhost:3001/userSchemesData"
      redirectUrl="/schemes"
    />
  );
}
