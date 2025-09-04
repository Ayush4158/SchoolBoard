"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function SchoolListings() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/list-school"); 
        const data = await res.json();
        setSchools(data);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex flex-col items-center pb-16">

      <nav className="w-full flex justify-between items-center px-10 py-4 shadow-sm bg-white sticky top-0 z-10">
        <Link href='/' className="text-2xl font-bold text-purple-600">SchoolBoard</Link>
      </nav>

      <section className="text-center mt-10 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-600 leading-tight">
          Explore Registered Schools
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Browse and discover schools listed on SchoolBoard. Get detailed information including location, contact, and more, to choose the perfect institution for your needs.
        </p>
      </section>

      <section className="flex flex-col items-center mt-12 gap-10 w-full px-6">
        {schools.length === 0 ? (
          <p className="text-gray-500 text-lg">Loading schools...</p>
        ) : (
          schools.map((school) => (
            <Card
              key={school._id}
              className="flex flex-col md:flex-row rounded-3xl shadow-lg shadow-purple-200 w-full md:w-3/4 transition overflow-hidden bg-white"
            >
              <div className="md:w-1/3 h-56 md:h-auto">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-full object-cover rounded-l-3xl"
                />
              </div>

              <CardContent className="md:w-2/3 p-8 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-purple-600">{school.name}</h3>
                <p className="text-gray-800 mt-3 text-lg md:text-xl font-semibold">
                  {school.address}, {school.city}, {school.state}
                </p>
                <p className="text-gray-600 mt-2 text-base md:text-lg">
                  <strong>Email:</strong> {school.email}
                </p>
                <p className="text-gray-600 mt-1 text-base md:text-lg">
                  <strong>Contact:</strong> {school.contact}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}
