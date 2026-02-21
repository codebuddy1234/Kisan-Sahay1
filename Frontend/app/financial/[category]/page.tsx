"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CriteriaItem = {
  field: string;
  user?: string;
  required?: string;
};

type FinancialSupportType = {
  _id?: string;
  title?: string;
  slug?: string;
  details?: string;
  level?: string;
  eligibilityPercentage?: number;
  missingCriteria?: CriteriaItem[];
};

export default function CategoryFinancialSupportPage() {

  const { category } = useParams();

  const router = useRouter();

  const [supports, setSupports] =
    useState<FinancialSupportType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState<"eligible" | "partial" | "explore">(
      "eligible"
    );

  const [supportLevel, setSupportLevel] =
    useState<"Central" | "State">(
      "Central"
    );


  useEffect(() => {

    if (!category) return;

    const stored =
      localStorage.getItem("userFinancialData");

    if (!stored) {

      setLoading(false);
      return;

    }

    const userData =
      JSON.parse(stored);


    const fetchSupports =
      async () => {

        try {

          const res =
            await fetch(
              "http://localhost:3001/eligible-financial-support",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  ...userData,
                  category,
                }),
              }
            );

          const data =
            await res.json();

          if (data.success)
            setSupports(data.data);

        } catch {

          setSupports([]);

        } finally {

          setLoading(false);

        }

      };

    fetchSupports();

  }, [category]);



  if (loading)

    return (

      <main>

        <Navbar />

        <div className="p-10 text-center font-semibold">

          Loading financial support...

        </div>

      </main>

    );



  // =================
  // FILTER LEVEL
  // =================

  const levelSupports =
    supports.filter(
      (s) => s.level === supportLevel
    );



  // =================
  // FILTER ELIGIBILITY
  // =================

  const fullyEligible =
    levelSupports.filter(
      (s) =>
        s.eligibilityPercentage === 100 &&
        (!s.missingCriteria ||
          s.missingCriteria.length === 0)
    );



  const partiallyEligible =
    levelSupports.filter(
      (s) =>
        s.eligibilityPercentage! > 0 &&
        s.eligibilityPercentage! < 100
    );



  const exploreMore =
    levelSupports.filter(
      (s) =>
        s.eligibilityPercentage === 0 ||
        (s.missingCriteria &&
          s.missingCriteria.length > 0)
    );



  let visibleSupports:
    FinancialSupportType[] = [];



  if (activeTab === "eligible")
    visibleSupports = fullyEligible;

  if (activeTab === "partial")
    visibleSupports = partiallyEligible;

  if (activeTab === "explore")
    visibleSupports = exploreMore;



  return (

    <main>

      <Navbar />


      <div className="max-w-7xl mx-auto px-4 py-8">


        <h1 className="text-3xl font-bold mb-6 capitalize">

          Financial Support under {category}

        </h1>



        <div className="flex gap-8">


          {/* LEFT SIDEBAR */}

          <div className="w-64 flex flex-col gap-3 border-r pr-6 sticky top-24 h-fit">


            {/* LEVEL */}

            <p className="font-semibold text-gray-500">

              Support Type

            </p>



            <Button
              onClick={() =>
                setSupportLevel("Central")
              }
              className={`justify-start border ${
                supportLevel === "Central"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-600 border-green-600 hover:bg-green-50"
              }`}
            >

              Central Support

            </Button>



            <Button
              onClick={() =>
                setSupportLevel("State")
              }
              className={`justify-start border ${
                supportLevel === "State"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-600 border-green-600 hover:bg-green-50"
              }`}
            >

              State Support

            </Button>



            <hr className="my-3"/>



            {/* ELIGIBILITY */}

            <p className="font-semibold text-gray-500">

              Eligibility

            </p>



            <Button
              onClick={() =>
                setActiveTab("eligible")
              }
              className={`justify-start border ${
                activeTab === "eligible"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-600 border-green-600 hover:bg-green-50"
              }`}
            >

              Fully Eligible (
              {fullyEligible.length}
              )

            </Button>



            <Button
              onClick={() =>
                setActiveTab("partial")
              }
              className={`justify-start border ${
                activeTab === "partial"
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white text-yellow-600 border-yellow-500 hover:bg-yellow-50"
              }`}
            >

              Likely Eligible (
              {partiallyEligible.length}
              )

            </Button>



            <Button
              onClick={() =>
                setActiveTab("explore")
              }
              className={`justify-start border ${
                activeTab === "explore"
                  ? "bg-gray-600 text-white border-gray-600"
                  : "bg-white text-gray-600 border-gray-600 hover:bg-gray-50"
              }`}
            >

              Explore More (
              {exploreMore.length}
              )

            </Button>

          </div>



          {/* RIGHT */}

          <div className="flex-1">


            {visibleSupports.length === 0 && (

              <p className="text-red-500 font-semibold">

                No financial support found

              </p>

            )}



            {visibleSupports.map(
              (support, index) => (

                <Card
                  key={
                    support._id || index
                  }
                  className="p-6 mb-6 border shadow-sm hover:shadow-md"
                >

                  <h2 className="text-xl font-semibold mb-2">

                    {support.title}

                  </h2>



                  <p className="mb-4 text-muted-foreground">

                    {support.details?.substring(
                      0,
                      140
                    )}

                  </p>



                  {activeTab ===
                    "eligible" && (

                    <p className="text-green-600 font-semibold mb-3">

                      Fully Eligible

                    </p>

                  )}



                  {activeTab ===
                    "partial" && (

                    <p className="text-yellow-600 font-semibold mb-3">

                      Likely Eligible

                    </p>

                  )}



                  {activeTab ===
                    "explore" && (

                    <p className="text-gray-500 italic mb-3">

                      Check eligibility criteria

                    </p>

                  )}



                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() =>
                      router.push(
                        `/single-financial-support/${support.slug}`
                      )
                    }
                  >

                    View Details

                  </Button>


                </Card>

              )
            )}

          </div>


        </div>


      </div>


    </main>

  );

}
