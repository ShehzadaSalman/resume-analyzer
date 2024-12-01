import { Brain } from "lucide-react";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            <Link href="/">Resume Analyzer AI</Link>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
