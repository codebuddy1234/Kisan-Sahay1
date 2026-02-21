"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Insurance = {
  name: string;
  details: string;
  benefits: string;
  eligibility: string;
  application: string;
  documents?: string[];
  level: string;
};

const formatTextToList = (text: any) => {
  if (!text) return ["No information available"];
  if (Array.isArray(text)) return text;
  const str = text.toString();
  const points = str
    .split(/\n|•|\d+\.\s|-\s|\.\s/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  return points.length ? points : [str];
};

const SingleInsurancePage = () => {
  const { id } = useParams();
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [listening, setListening] = useState(false);
  const [stopClicked, setStopClicked] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchInsurance = async () => {
      try {
        const res = await fetch(`http://localhost:3001/single-insurance/${id}`);
        const data = await res.json();
        if (data.success) setInsurance(data.data);
        else setInsurance(null);
      } catch {
        setInsurance(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInsurance();
  }, [id]);

  const speakInsurance = async () => {
    if (!insurance) return;
    setListening(true);
    const sections = [
      { tab: "details", title: "Details", text: insurance.details },
      { tab: "benefits", title: "Benefits", text: insurance.benefits },
      { tab: "eligibility", title: "Eligibility", text: insurance.eligibility },
      { tab: "application", title: "Application", text: insurance.application },
      { tab: "documents", title: "Documents Required", text: insurance.documents?.join?.(". ") || "No documents required" },
      { tab: "level", title: "Level", text: insurance.level },
    ];

    for (const section of sections) {
      setActiveTab(section.tab);
      await new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(`${section.title}. ${section.text}`);
        utterance.lang = "en-IN";
        utterance.rate = 0.9;
        utterance.onend = resolve;
        window.speechSynthesis.speak(utterance);
      });
    }

    setListening(false);
  };

  const stopListening = () => {
    window.speechSynthesis.cancel();
    setListening(false);
    setStopClicked(true);
  };

  if (loading) return <main><Navbar /><div className="p-10">Loading insurance...</div></main>;
  if (!insurance) return <main><Navbar /><div className="p-10">Insurance not found.</div></main>;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6">{insurance.name}</h1>

        {/* LISTEN BUTTONS */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={speakInsurance}
            className={`px-5 py-2 rounded-lg border ${listening ? "bg-green-500 border-green-500 text-white" : "bg-white border-green-500 text-green-500"}`}
          >
            {listening ? "Listening..." : "Listen Insurance"}
          </button>

          <button
            onClick={stopListening}
            className={`px-5 py-2 rounded-lg border font-semibold ${stopClicked ? "bg-red-500 text-white border-white" : "bg-white text-red-500 border-red-500"}`}
          >
            Stop
          </button>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="border-b w-full justify-start gap-8 rounded-none bg-transparent p-0">
            {["details","benefits","eligibility","application","documents","level"].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="pb-3 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {["details","benefits","eligibility","application","documents","level"].map(tab => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <ul className="list-disc pl-6 space-y-2">
                {formatTextToList(insurance[tab as keyof Insurance]).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
};

export default SingleInsurancePage;
