"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";


/* ---------------- TRANSLATIONS ---------------- */

const translations = {
  selectLanguage: {
    en: "Please select your language",
    hi: "कृपया अपनी भाषा चुनें",
    mr: "कृपया तुमची भाषा निवडा",
  },

  processing: {
    en: "Thank you. Processing your data…",
    hi: "धन्यवाद। आपका डेटा प्रोसेस किया जा रहा है…",
    mr: "धन्यवाद. तुमचा डेटा प्रक्रिया केला जात आहे…",
  },

  placeholder: {
    en: "Type or speak...",
    hi: "टाइप करें या बोलें...",
    mr: "टाइप करा किंवा बोला...",
  },
};



/* ---------------- TYPES ---------------- */

type FlowItem = {
  key: string;
  question: { en: string; hi: string; mr: string };
  options?: { en: string[]; hi: string[]; mr: string[] };
};

type Message = {
  sender: "bot" | "user";
  text: string;
};

type Props = {
  title: string;
  flow: FlowItem[];
  apiEndpoint: string;
  redirectUrl: string;
};



/* ---------------- MAIN COMPONENT ---------------- */

export default function BaseChatbot({
  title,
  flow,
  apiEndpoint,
  redirectUrl,
}: Props) {


  const { i18n } = useTranslation();

  const [language, setLanguage] = useState("en");

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const [formData, setFormData] = useState<Record<string, string>>({});

  const [listening, setListening] = useState(false);

  const [step, setStep] = useState(0);

  const recognitionRef = useRef<any>(null);



  /* ---------------- SET LANGUAGE ---------------- */

  useEffect(() => {

    const lang =
      i18n.language ||
      localStorage.getItem("language") ||
      "en";

    setLanguage(lang);

  }, [i18n.language]);



  /* ---------------- SPEAK FUNCTION ---------------- */

  const speak = (text: string) => {

    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang =
      language === "hi"
        ? "hi-IN"
        : language === "mr"
        ? "mr-IN"
        : "en-IN";

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(utterance);

  };



  /* ---------------- SPEECH RECOGNITION ---------------- */

  useEffect(() => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();

    recog.lang =
      language === "hi"
        ? "hi-IN"
        : language === "mr"
        ? "mr-IN"
        : "en-IN";

    recog.continuous = false;

    recog.interimResults = true;


    recog.onstart = () => setListening(true);

    recog.onend = () => setListening(false);

    recog.onerror = () => setListening(false);


    recog.onresult = (e: any) => {

      let finalText = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {

        if (e.results[i].isFinal) {

          finalText += e.results[i][0].transcript;

        }

      }

      if (finalText) {

        setInput(finalText);

        recog.stop();

        handleAnswer(finalText);

      }

    };

    recognitionRef.current = recog;

  }, [language, step]);



  /* ---------------- SHOW QUESTIONS ---------------- */

  useEffect(() => {

    if (step < flow.length) {

      const question =
        flow[step].question[language] ||
        flow[step].question.en;

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: question,
        },
      ]);

      speak(question);

    }

  }, [step, language]);



  /* ---------------- HANDLE ANSWER ---------------- */

  const handleAnswer = async (answer: string) => {

    if (!answer.trim()) return;

    const key = flow[step].key;

    const updated = {
      ...formData,
      [key]: answer,
    };

    setFormData(updated);


    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: answer,
      },
    ]);


    const next = step + 1;


    if (next < flow.length) {

      setStep(next);

    } else {

      /* -------- SEND DATA -------- */

      await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });


      /* -------- STORE -------- */

      if (apiEndpoint.includes("Insurance"))

        localStorage.setItem(
          "userInsuranceData",
          JSON.stringify(updated)
        );

      else if (apiEndpoint.includes("Schemes"))

        localStorage.setItem(
          "userSchemeData",
          JSON.stringify(updated)
        );

      else if (apiEndpoint.includes("Financial"))

        localStorage.setItem(
          "userFinancialData",
          JSON.stringify(updated)
        );


      /* -------- PROCESSING MESSAGE -------- */

      const processingMsg =
        translations.processing[language];


      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: processingMsg,
        },
      ]);


      speak(processingMsg);


      setTimeout(() => {

        window.location.href = redirectUrl;

      }, 2500);

    }

    setInput("");

  };



  /* ---------------- UI ---------------- */

  return (

    <div className="rounded-xl border bg-card p-6 space-y-4 max-w-md mx-auto">


      <h1 className="font-semibold text-lg">

        {title}

      </h1>



      {/* CHAT */}


      <div className="space-y-2 max-h-72 overflow-y-auto">


        {messages.map((m, i) => (

          <div
            key={i}
            className={`p-3 rounded-lg text-sm max-w-[80%]
            ${
              m.sender === "bot"
                ? "bg-secondary"
                : "bg-primary text-primary-foreground ml-auto"
            }`}
          >

            {m.text}

          </div>

        ))}


      </div>



      {/* OPTIONS */}


      {step < flow.length &&
        flow[step].options && (

          <div className="flex flex-wrap gap-2">


            {flow[step].options![language].map((opt) => (

              <Button
                key={opt}
                onClick={() => handleAnswer(opt)}
              >

                {opt}

              </Button>

            ))}


          </div>

        )}



      {/* INPUT */}


      <div className="flex gap-2 border-t pt-3">


        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder={
            translations.placeholder[language]
          }
          className="flex-1 border rounded-lg p-2 bg-white text-black"
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleAnswer(input)
          }
        />



        {/* MIC */}


        <Button
          size="icon"
          onClick={() => {

            if (!recognitionRef.current)
              return;

            if (listening)

              recognitionRef.current.stop();

            else {

              setInput("");

              recognitionRef.current.start();

            }

          }}
        >

          <Mic
            className={
              listening
                ? "text-red-500 animate-pulse"
                : ""
            }
          />

        </Button>



        {/* SEND */}


        <Button
          size="icon"
          onClick={() =>
            handleAnswer(input)
          }
        >

          <Send />

        </Button>


      </div>


    </div>

  );

}