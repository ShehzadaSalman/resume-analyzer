import React, { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import { AnalysisCard } from "../components/AnalysisCard";
import { SkillsChart } from "../components/SkillsChart";
import { CompanyExperienceChart } from "../components/CompanyExperienceChart";
import { SkillsAnalysis } from "../components/SkillsAnalysis";
import { RedFlags } from "../components/RedFlags";
import { Loader2, Download, Mail, Sparkles } from "lucide-react";
import Header from "org/components/Header";
import Footer from "org/components/Footer";
import { useRouter } from "next/router";
import { AISummary } from "org/components/AISummary";

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

type ResumeAnalysis = {
  summary: string;
  industry: string;
  education_level: string;
  ats_score: number;
  experience_level: string;
  total_years_of_experience: number;
  key_strengths: string[];
  area_of_improvements: string[];
  best_for_roles: string[];
  skills_distribution: {
    name: string;
    value: number;
  }[];
  company_experience: {
    company: string;
    years: number;
  }[];
  red_flags: {
    issue: string;
    severity: string;
    description: string;
    recommendation: string;
  }[];
  top_skills_analysis: {
    name: string;
    level: string;
    relevance: number;
  }[];
  certifcate_acheivements: null;
  contact_info: null;
  potential_growth_strategies: null;
  potential_job_fit: null;
  industry_suitability: null;
};

function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resumeReport, setResumeReport] = useState<ResumeAnalysis | null>(null);
  const router = useRouter();

  const handleFileUpload = async (uploadedFile: File) => {
    try {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (uploadedFile.size > 5 * 1024 * 1024) {
        router.push("/error");
        return;
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
        router.push("/error");
        return;
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

      console.log("Response from api: ", response);
      if (!response.ok) {
        router.push("/error");
        return;
      }

      const data = await response.json();
      if (data?.report === "false") {
        router.push("/error");
        return;
      }

      // Parse the string response into an object
      const parsedReport =
        typeof data.report === "string" ? JSON.parse(data.report) : data.report;
      setResumeReport(parsedReport);
      setShowResults(true);
    } catch (error) {
      console.error("Error processing resume:", error);
      router.push("/error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = () => {
    // Implementation for downloading report
    console.log("Downloading report...");
  };

  const handleEmail = () => {
    // Implementation for emailing report
    console.log("Emailing report...");
  };

  console.log("Resume report: ", resumeReport);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
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
              <AnalysisCard
                title="ATS Score"
                value={resumeReport?.ats_score || "N/A"}
                type="overall"
              />
              <AnalysisCard
                value={
                  resumeReport?.total_years_of_experience + " years" || "N/A"
                }
                title="Total Experience"
                type="skills"
              />
              <AnalysisCard
                title="Experience Level"
                value={resumeReport?.experience_level || "N/A"}
                type="experience"
              />
              <AnalysisCard
                title="Education Level"
                value={resumeReport?.education_level || "N/A"}
                type="education"
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex gap-x-2">
                AI Summary <Sparkles className="w-5 h-5 text-purple-500 mt-1" />
              </h3>
              <AISummary
                summary={resumeReport?.summary || ""}
                strengths={resumeReport?.key_strengths || []}
                improvements={resumeReport?.area_of_improvements || []}
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
      <Footer />
    </div>
  );
}
export default Home;
