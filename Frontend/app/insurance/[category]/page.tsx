"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CriteriaItem = {
  field: string;
  user?: string;
  required?: string;
};

type InsuranceType = {
  _id?: string;
  id?: string; // <-- use this
  name?: string;
  scheme_name?: string;
  eligibility_text?: string;
  eligibilityPercentage?: number;
  matchedCriteria?: CriteriaItem[];
  notMatchedCriteria?: CriteriaItem[];
  missingCriteria?: CriteriaItem[];
};


export default function InsurancePage() {
  const router = useRouter();

  const params = useParams();

  const category = typeof params?.category === "string" ? params.category : "";

  const [insurances, setInsurances] = useState<InsuranceType[]>([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "eligible" | "partial" | "explore"
  >("eligible");

  useEffect(() => {
    const stored = localStorage.getItem("userInsuranceData");

    if (!stored) {
      setLoading(false);

      return;
    }

    const userData = JSON.parse(stored);

    const fetchInsurance = async () => {
      try {
        const res = await fetch("http://localhost:3001/eligible-insurance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
            category,
          }),
        });

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setInsurances(data.data);
        } else {
          setInsurances([]);
        }
      } catch {
        setInsurances([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInsurance();
  }, [category]);

  if (loading)
    return (
      <main>
        <Navbar />

        <div className="p-10 text-center font-semibold">
          Loading insurance...
        </div>
      </main>
    );

  // ======================

  // FILTER ELIGIBILITY ONLY

  // ======================

  const fullyEligible = insurances.filter(
    (i) =>
      i.eligibilityPercentage === 100 &&
      (!i.missingCriteria || i.missingCriteria.length === 0),
  );

  const partiallyEligible = insurances.filter(
    (i) => i.eligibilityPercentage! > 0 && i.eligibilityPercentage! < 100,
  );

  const exploreMore = insurances.filter(
    (i) =>
      i.eligibilityPercentage === 0 ||
      (i.missingCriteria && i.missingCriteria.length > 0),
  );

  let visibleInsurance: InsuranceType[] = [];

  if (activeTab === "eligible") visibleInsurance = fullyEligible;

  if (activeTab === "partial") visibleInsurance = partiallyEligible;

  if (activeTab === "explore") visibleInsurance = exploreMore;

  return (
    <main>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {category} Insurance Plans
        </h1>

        <div className="flex gap-8">
          {/* LEFT SIDEBAR */}

          <div className="w-64 flex flex-col gap-3 border-r pr-6 sticky top-24 h-fit">
            <p className="font-semibold text-gray-500">Eligibility</p>

            <Button
              onClick={() => setActiveTab("eligible")}
              className={`justify-start border ${
                activeTab === "eligible"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-600 border-green-600 hover:bg-green-50"
              }`}
            >
              Fully Eligible ({fullyEligible.length})
            </Button>

            <Button
              onClick={() => setActiveTab("partial")}
              className={`justify-start border ${
                activeTab === "partial"
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white text-yellow-600 border-yellow-500 hover:bg-yellow-50"
              }`}
            >
              Likely Eligible ({partiallyEligible.length})
            </Button>

            <Button
              onClick={() => setActiveTab("explore")}
              className={`justify-start border ${
                activeTab === "explore"
                  ? "bg-gray-600 text-white border-gray-600"
                  : "bg-white text-gray-600 border-gray-600 hover:bg-gray-50"
              }`}
            >
              Explore More ({exploreMore.length})
            </Button>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex-1">
            {visibleInsurance.length === 0 && (
              <p className="text-red-500 font-semibold">No insurance found</p>
            )}

            {visibleInsurance.map((insurance, index) => (
              <Card
                key={insurance._id || index}
                className="p-6 mb-6 border shadow-sm hover:shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {insurance.name || insurance.scheme_name}
                </h2>

                <p className="mb-4 text-muted-foreground">
                  {insurance.eligibility_text?.substring(0, 140)}
                </p>

                {/* STATUS */}

                {activeTab === "eligible" && (
                  <p className="text-green-600 font-semibold mb-3">
                    Fully Eligible
                  </p>
                )}

                {activeTab === "partial" && (
                  <p className="text-yellow-600 font-semibold mb-3">
                    Likely Eligible
                  </p>
                )}

                {activeTab === "explore" && (
                  <p className="text-gray-500 italic mb-3">
                    Check eligibility criteria
                  </p>
                )}

                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    insurance.id &&
                    router.push(`/singleinsurance/${insurance.id}`)
                  }
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
