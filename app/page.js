// app/page.tsx (Next.js 13+ with App Router)
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex flex-col items-center">
      <nav className="w-full flex justify-between items-center px-10 py-4 shadow-sm">
        <Link href='/' className="text-2xl font-bold text-purple-600">SchoolBoard</Link>
      </nav>

      <section className="text-center mt-16 px-6">
        <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
          Easy School Management
        </span>
        <h1 className="text-5xl font-bold mt-6">
          Welcome to <span className="text-purple-600">SchoolBoard</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          SchoolBoard is a simple platform where anyone can list their school by filling out a form 
          and explore school details on the listings page. Manage and discover schools with ease.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl px-6">
        {/* Card 1: List School */}
        <Card className="rounded-2xl shadow-lg hover:shadow-xl shadow-purple-200 transition">
          <CardContent className="p-8 text-center">
            <div className="text-4xl text-purple-600">🏫</div>
            <h3 className="text-xl font-semibold mt-4">List Your School</h3>
            <p className="text-gray-600 mt-2">
              Fill in the school details using our easy-to-use form and add your institution 
              to the SchoolBoard directory.
            </p>
            <Link href='/school-listing' className="mt-4">Add School →</Link>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg hover:shadow-xl transition shadow-purple-200">
          <CardContent className="p-8 text-center">
            <div className="text-4xl text-purple-600">📋</div>
            <h3 className="text-xl font-semibold mt-4">View School Details</h3>
            <p className="text-gray-600 mt-2">
              Browse the listed schools and view their details to find the right institution 
              for your needs.
            </p>
            <Link href='/school-card' className="mt-4">View Schools →</Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
