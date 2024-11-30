import React, { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import { AnalysisCard } from "../components/AnalysisCard";
import { SkillsChart } from "../components/SkillsChart";
import { CompanyExperienceChart } from "../components/CompanyExperienceChart";
import { SkillsAnalysis } from "../components/SkillsAnalysis";
import { RedFlags } from "../components/RedFlags";
import { AISummary } from "../components/AISummary";
import { Brain, Loader2, Download, Mail, Phone } from "lucide-react";
const mockSkillsData = [
  { name: "Technical Skills", value: 40 },
  { name: "Soft Skills", value: 30 },
  { name: "Leadership", value: 15 },
  { name: "Domain Knowledge", value: 15 },
];

const mockCompanyData = [
  { company: "Tech Corp", years: 3.5 },
  { company: "Digital Solutions", years: 2.8 },
  { company: "Innovation Labs", years: 1.5 },
  { company: "Startup Inc", years: 1.2 },
];

const mockDetailedSkills = [
  { name: "React.js", level: "expert", relevance: 9 },
  { name: "TypeScript", level: "advanced", relevance: 8 },
  { name: "Node.js", level: "intermediate", relevance: 6 },
  { name: "AWS", level: "beginner", relevance: 5 },
] as const;

const mockRedFlags = [
  {
    issue: "Employment Gap",
    severity: "medium",
    description: "8-month gap between last two positions",
    recommendation: "Add context or explanation for the employment gap",
  },
  {
    issue: "Skill Mismatch",
    severity: "high",
    description: "Current skills don't align with target role",
    recommendation:
      "Focus on acquiring relevant skills through certifications or projects",
  },
] as const;

const mockAISummary = {
  summary:
    "Strong technical background with expertise in modern web technologies. Shows consistent career progression but could benefit from more leadership experience. Well-suited for senior developer roles with potential for technical leadership positions.",
  strengths: [
    "Extensive experience with React and TypeScript",
    "Strong problem-solving abilities",
    "Proven track record of successful project delivery",
    "Good communication skills evident in resume",
  ],
  improvements: [
    "Consider adding more quantifiable achievements",
    "Expand leadership experience",
    "Add relevant certifications",
    "Include more industry-specific keywords",
  ],
};

function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [summary, setSummary] = useState("");

  const handleFileUpload = async (uploadedFile: File) => {
    try {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (uploadedFile.size > 5 * 1024 * 1024) {
        throw new Error("File size exceeds 5MB limit");
      }

      setIsAnalyzing(true);
      const fileReader = new FileReader();

      const readFilePromise = new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsDataURL(uploadedFile);
      });

      const base64String = (await readFilePromise) as string;
      const cleanBase64 = base64String.split(",")[1];

      // Check number of pages
      const pdfData = atob(cleanBase64);
      const pageMatch = pdfData.match(/\/Type\s*\/Page\b/g);
      const pageCount = pageMatch ? pageMatch.length : 1;
      
      if (pageCount > 4) {
        throw new Error("Resume should not exceed 4 pages");
      }

      const response = await fetch("/api/handle-resume-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: cleanBase64,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setSummary(data.summary);
      setShowResults(true);
    } catch (error) {
      console.error("Error processing resume:", error);
      // Handle error appropriately - maybe show error message to user
    } finally {
      setIsAnalyzing(false);
    }

  };  const handleDownload = () => {
    // Implementation for downloading report
    console.log("Downloading report...");
  };

  const handleEmail = () => {
    // Implementation for emailing report
    console.log("Emailing report...");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              Resume Analyzer AI
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Analyze Your Resume with AI
              </h2>
              <p className="text-lg text-gray-600">
                Upload your resume and get instant insights powered by advanced
                AI
              </p>
            </div>
            <FileUpload onFileUpload={handleFileUpload} />
            {isAnalyzing && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-gray-600">Analyzing your resume...</p>
              </div>
            )}
          </div>
        )}

        {showResults && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnalysisCard title="Overall Score" value="85%" type="overall" />
              <AnalysisCard title="Skills Match" value="92%" type="skills" />
              <AnalysisCard
                title="Experience Level"
                value="Senior"
                type="experience"
              />
              <AnalysisCard
                title="Education Match"
                value="95%"
                type="education"
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI Summary
              </h3>
              <AISummary
                summary={summary}
                strengths={mockAISummary.strengths}
                improvements={mockAISummary.improvements}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Skills Distribution
                </h3>
                <SkillsChart data={mockSkillsData} />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Company Experience
                </h3>
                <CompanyExperienceChart data={mockCompanyData} />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Skills Analysis
                </h3>
                <SkillsAnalysis skills={[...mockDetailedSkills]} />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Red Flags
                </h3>
                <RedFlags flags={[...mockRedFlags]} />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button
                onClick={handleEmail}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Report
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center text-gray-600 space-y-2">
            <div className="flex items-center">
              Made by{" "}
              <a
                href="https://www.linkedin.com/in/shehzadasalman/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-medium ml-1 transition-colors"
              >
                shehzada salman
              </a>
            </div>
            <div className="flex flex-col items-center text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>shehzada.salman072@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+92 (321) 883-5830</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

}
export default Home;
