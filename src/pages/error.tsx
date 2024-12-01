import React from "react";
import { FileX } from "lucide-react";
import Header from "org/components/Header";
import Footer from "org/components/Footer";
import Link from "next/link";

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <FileX className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unable to Create Report
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Please upload a valid PDF Resume that does not exceed 4 pages.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ErrorPage;
