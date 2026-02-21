"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import SchemeChat from "@/components/HelperChat";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Finance {

  scheme_name: string;
  details: string;
  benefits: string;
  eligibility: string;
  application: string;
  documents: string[];
  level: string;
  slug: string;

}

const SingleFinancePage = () => {

  const { slug } = useParams();

  const [finance, setFinance] = useState<Finance | null>(null);

  const [activeTab, setActiveTab] = useState("details");

  const [loading, setLoading] = useState(true);

  const [listening, setListening] = useState(false);

  const [stopClicked, setStopClicked] = useState(false);


  // FETCH FINANCE

  useEffect(() => {

    if (!slug) return;

    const fetchFinance = async () => {

      try {

        const res = await fetch(

          `http://localhost:3001/single-finance/${slug}`

        );

        const data = await res.json();

        if (data.success)
          setFinance(data.data);

        else
          setFinance(null);

      }

      catch {

        setFinance(null);

      }

      finally {

        setLoading(false);

      }

    };

    fetchFinance();

  }, [slug]);


  // FORMAT TEXT

  const formatTextToList = (text: any) => {

    if (!text)
      return ["No information available"];

    if (Array.isArray(text))
      return text;

    const str = text.toString();

    const points = str

      .split(/\n|•|\d+\.\s|-\s|\.\s/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return points.length ? points : [str];

  };


  // LISTEN FUNCTION

  const speakFinance = async () => {

    if (!finance) return;

    setListening(true);

    const sections = [

      {
        tab: "details",
        title: "Details",
        text: finance.details,
      },

      {
        tab: "benefits",
        title: "Benefits",
        text: finance.benefits,
      },

      {
        tab: "eligibility",
        title: "Eligibility",
        text: finance.eligibility,
      },

      {
        tab: "application",
        title: "Application Process",
        text: finance.application,
      },

      {
        tab: "documents",
        title: "Documents Required",
        text: Array.isArray(finance.documents)
          ? finance.documents.join(". ")
          : finance.documents,
      },

      {
        tab: "level",
        title: "Level",
        text: finance.level,
      },

    ];


    for (const section of sections) {

      setActiveTab(section.tab);

      await new Promise<void>((resolve) => {

        const utterance =
          new SpeechSynthesisUtterance(
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


  // STOP

  const stopListening = () => {

    window.speechSynthesis.cancel();

    setListening(false);

    setStopClicked(true);

  };


  // LOADING

  if (loading)

    return (

      <main>

        <Navbar />

        <div className="p-10">

          Loading finance scheme...

        </div>

      </main>

    );


  // NOT FOUND

  if (!finance)

    return (

      <main>

        <Navbar />

        <div className="p-10">

          Finance scheme not found.

        </div>

      </main>

    );


  // MAIN UI

  return (

    <main className="min-h-screen bg-background">

      <Navbar />


      <div className="max-w-5xl mx-auto px-4 py-8">


        {/* TITLE */}


        <h1 className="text-3xl font-bold mb-6">

          {finance.scheme_name}

        </h1>



        {/* BUTTONS */}


        <div className="mb-6">

          <button

            onClick={speakFinance}

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


        <Tabs

          value={activeTab}

          onValueChange={setActiveTab}

        >



          <TabsList className="border-b w-full justify-start gap-8 rounded-none bg-transparent p-0">


            <TabsTrigger value="details"
              className="pb-3 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600">

              Details

            </TabsTrigger>


            <TabsTrigger value="benefits"
              className="pb-3 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600">

              Benefits

            </TabsTrigger>


            <TabsTrigger value="eligibility"
              className="pb-3 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600">

              Eligibility

            </TabsTrigger>


            <TabsTrigger value="application"
              className="pb-3 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600">

              Application Process

            </TabsTrigger>


            <TabsTrigger value="documents"
              className="pb-3 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600">

              Documents Required

            </TabsTrigger>


            <TabsTrigger value="level"
              className="pb-3 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:text-green-600">

              Level

            </TabsTrigger>


          </TabsList>



          {/* CONTENT */}



          {[
            "details",
            "benefits",
            "eligibility",
            "application",
            "documents",
            "level",
          ].map((tab) => (


            <TabsContent

              key={tab}

              value={tab}

              className="mt-6"

            >

              <ul className="list-disc pl-6 space-y-2">

                {formatTextToList(
                  finance[tab as keyof Finance]
                ).map((point, index) => (

                  <li key={index}>

                    {point}

                  </li>

                ))}

              </ul>

            </TabsContent>


          ))}


        </Tabs>


      </div>



      {/* CHATBOT */}


      <SchemeChat slug={finance.slug} />


    </main>

  );

};


export default SingleFinancePage;
