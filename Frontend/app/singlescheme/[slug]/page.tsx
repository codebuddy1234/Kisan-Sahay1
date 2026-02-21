"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import SchemeChat from "@/components/HelperChat";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Scheme {
  scheme_name: string;
  details: string;
  benefits: string;
  eligibility: string;
  application: string;
  documents: string[];
  level: string;
  slug: string;
}

const SingleSchemePage = () => {
  const { slug } = useParams();

  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const [loading, setLoading] = useState(true);

  const [listening, setListening] = useState(false);
  const [stopClicked, setStopClicked] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchScheme = async () => {
      try {
        const res = await fetch(`http://localhost:3001/single-scheme/${slug}`);
        const data = await res.json();

        if (data.success) setScheme(data.data);
        else setScheme(null);
      } catch {
        setScheme(null);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [slug]);

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

  const speakScheme = async () => {
    if (!scheme) return;

    setListening(true);

    const sections = [
      { tab: "details", title: "Details", text: scheme.details },
      { tab: "benefits", title: "Benefits", text: scheme.benefits },
      { tab: "eligibility", title: "Eligibility", text: scheme.eligibility },
      { tab: "application", title: "Application Process", text: scheme.application },
      { tab: "documents", title: "Documents Required", text: scheme.documents.join(". ") },
      { tab: "level", title: "Level", text: scheme.level },
    ];

    for (const section of sections) {
      setActiveTab(section.tab);

      await new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(
          `${section.title}. ${section.text}`
        );

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

  if (loading)
    return (
      <main>
        <Navbar />
        <div className="p-10">Loading scheme...</div>
      </main>
    );

  if (!scheme)
    return (
      <main>
        <Navbar />
        <div className="p-10">Scheme not found.</div>
      </main>
    );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* TITLE */}

        <h1 className="text-3xl font-bold mb-4">
          {scheme.scheme_name}
        </h1>


        {/* APPLY BUTTON */}

        <div className="mb-6">

          <a
            href="https://pmkisan.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl shadow-md transition font-semibold"
          >
            Apply for this Scheme
          </a>

          <p className="text-sm text-gray-500 mt-2">
            Demo link for prototype
          </p>

        </div>



        {/* LISTEN BUTTONS */}

        <div className="mb-6">

          <button
            onClick={speakScheme}
            className={`px-5 py-2 rounded-lg border ${
              listening
                ? "bg-green-500 border-green-500 text-white"
                : "bg-white border-green-500 text-green-500"
            }`}
          >
            {listening ? "Listening..." : "Listen Scheme"}
          </button>

          <button
            onClick={stopListening}
            className={`ml-3 px-5 py-2 rounded-lg border font-semibold ${
              stopClicked
                ? "bg-red-500 text-white border-white"
                : "bg-white text-red-500 border-red-500"
            }`}
          >
            Stop
          </button>

        </div>



        {/* TABS */}

        <Tabs value={activeTab} onValueChange={setActiveTab}>

          <TabsList className="border-b w-full justify-start gap-8 rounded-none bg-transparent p-0">

            <TabsTrigger value="details">Details</TabsTrigger>

            <TabsTrigger value="benefits">Benefits</TabsTrigger>

            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>

            <TabsTrigger value="application">Application Process</TabsTrigger>

            <TabsTrigger value="documents">Documents</TabsTrigger>

            <TabsTrigger value="level">Level</TabsTrigger>

          </TabsList>



          <TabsContent value="details" className="mt-6">
            <ul className="list-disc pl-6 space-y-2">
              {formatTextToList(scheme.details).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </TabsContent>


          <TabsContent value="benefits" className="mt-6">
            <ul className="list-disc pl-6 space-y-2">
              {formatTextToList(scheme.benefits).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </TabsContent>


          <TabsContent value="eligibility" className="mt-6">
            <ul className="list-disc pl-6 space-y-2">
              {formatTextToList(scheme.eligibility).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </TabsContent>


          <TabsContent value="application" className="mt-6">
            <ul className="list-disc pl-6 space-y-2">
              {formatTextToList(scheme.application).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </TabsContent>


          <TabsContent value="documents" className="mt-6">
            <ul className="list-disc pl-6 space-y-2">
              {formatTextToList(scheme.documents).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </TabsContent>


          <TabsContent value="level" className="mt-6">
            <ul className="list-disc pl-6 space-y-2">
              {formatTextToList(scheme.level).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </TabsContent>

        </Tabs>

      </div>

      <SchemeChat slug={scheme.slug} />

    </main>
  );
};

export default SingleSchemePage;