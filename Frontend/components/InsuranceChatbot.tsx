import BaseChatbot from "./BaseChatbot";

const insuranceFlow = [
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
      en: "Are you the owner of the land you are farming on?",
      hi: "क्या आप खेती करने वाली जमीन के मालिक हैं?",
      mr: "तुम शेती करीत असलेल्या जमिनीचे मालक आहात का?",
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
      en: "How much land do you own?",
      hi: "आपके पास कितनी जमीन है?",
      mr: "तुमच्याकडे किती जमीन आहे?",
    },
  },
  {
    key: "AnnualIncome",
    question: {
      en: "What is your annual income?",
      hi: "आपकी वार्षिक आय क्या है?",
      mr: "तुमचे वार्षिक उत्पन्न किती आहे?",
    },
  },
  {
    key: "cropType",
    question: {
      en: "Which crop do you grow?",
      hi: "आप कौन सा फसल उगाते हैं?",
      mr: "तुम कोणती पिकं पिकवता?",
    },
  },
];

export default function InsuranceChatbot() {
  return (
    <BaseChatbot
      title="Insurance Assistant"
      flow={insuranceFlow}
      apiEndpoint="http://localhost:3001/userInsuranceData"
      redirectUrl="/insurance"
    />
  );
}
