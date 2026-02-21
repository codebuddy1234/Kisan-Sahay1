"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { financialSupportCategories } from "@/lib/financeCategories";

export default function FinancialCategoriesPage() {

  const router = useRouter();

  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-14">


        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">

          Find Financial Support Based on Categories

        </h1>



        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


          {financialSupportCategories.map((cat) => (

            <Card

              key={cat.id}

              onClick={() => router.push(`/schemes/${cat.id}`)}

              className="group cursor-pointer overflow-hidden rounded-2xl
              bg-white
              transition duration-300
              shadow-md hover:shadow-2xl hover:-translate-y-2"

            >


              {/* Image */}
              <div className="overflow-hidden">

                <img

                  src={cat.image}

                  alt={cat.title}

                  className="w-full h-44 object-cover
                  group-hover:scale-110 transition duration-500"

                />

              </div>



              {/* Content */}
              <div className="p-5 text-left">


                <h2 className="text-lg font-semibold mb-2 text-gray-800">

                  {cat.title}

                </h2>



                <span className="text-blue-600 font-medium text-sm">

                  View Schemes →

                </span>


              </div>


            </Card>

          ))}


        </div>


      </section>


    </main>

  );

}
