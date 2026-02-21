"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { schemeCategories } from "@/lib/schemeCategories";

export default function SchemeCategoriesPage() {

  const router = useRouter();

  return (

    <main className="min-h-screen bg-gray-100">

      <Navbar />

      {/* Section */}
      <section className="max-w-7xl mx-auto px-6 py-14">

        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Find Schemes Based on Categories
        </h1>


        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">


          {schemeCategories.map((cat) => (

           <Card
  key={cat.id}
  onClick={() => router.push(`/schemes/${cat.id}`)}
  className="
    cursor-pointer
    overflow-hidden
    rounded-2xl
    bg-white
    text-gray-800
    transition duration-300
    shadow-md hover:shadow-2xl
    hover:-translate-y-1
  "
>

  {/* Image */}
  <div className="relative overflow-hidden">

    <img
      src={cat.image}
      alt={cat.title}
      className="
        w-full
        h-48
        object-cover
        transition duration-500 hover:scale-105
      "
    />

  </div>


  {/* Content */}
  <div className="p-5">


    {/* Tag */}
    <span className="
      inline-block
      bg-blue-100
      text-blue-600
      text-xs
      px-3 py-1
      rounded-full
      mb-3
    ">
      {cat.tag}
    </span>


    {/* Title */}
    <h2 className="text-lg font-semibold mb-2">

      {cat.title}

    </h2>


    {/* Description */}
    <p className="text-gray-600 text-sm">

      {cat.description}

    </p>


  </div>

</Card>

          ))}



        </div>

      </section>


    </main>

  );

}
