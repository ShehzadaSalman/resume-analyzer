import pdf from "pdf-parse";
import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

if (!process.env.OPEN_AI_APIKEY) {
  throw new Error("OPEN_AI_APIKEY environment variable is not set");
}

const resumeAnalysis = {
  summary: "",
  industry: "",
  education_level: "",
  ats_score: 0,
  experience_level: "",
  total_years_of_experience: 0,
  key_strengths: [],
  area_of_improvements: [],
  best_for_roles: [],
  skills_distribution: [
    {
      name: "",
      value: 0,
    },
  ],
  company_experience: [
    {
      company: "",
      years: 0,
    },
  ],
  red_flags: [
    {
      issue: "",
      severity: "",
      description: "",
      recommendation: "",
    },
  ],
  top_skills_analysis: [
    {
      name: "",
      level: "",
      relevance: 0,
    },
  ],
  certifcate_acheivements: null,
  contact_info: null,
  potential_growth_strategies: null,
  potential_job_fit: null,
  industry_suitability: null,
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      if (!process.env.OPEN_AI_APIKEY) {
        return res
          .status(500)
          .json({ error: "OpenAI API key is not configured" });
      }

      const client = new OpenAI({
        apiKey: process.env.OPEN_AI_APIKEY,
      });

      const file = req.body.file; // Assuming the PDF is sent as base64

      // Parse the PDF file
      const dataBuffer = Buffer.from(file, "base64");
      const pdfData = await pdf(dataBuffer);

      const RESUME_CONTENT = pdfData.text; // Assuming pdfData.text contains the extracted text

      const chatCompletion = await client.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `You are an expert resume analyzer with deep expertise in talent acquisition, human resources, and career development. Your task is to conduct a thorough and professional analysis of the following resume content, providing a comprehensive breakdown that goes beyond surface-level observations.

          Resume Content:
          ${RESUME_CONTENT}
          
          Perform a detailed analysis and populate the following comprehensive resume analysis object with insights, ensuring each section is meticulously evaluated:
          
          1. Summary: Craft a concise, strategic overview of the candidate's professional profile, highlighting their unique value proposition.
          
          2. Industry: Precisely identify the primary industry or industries represented in the resume.
          
          3. Education Level: Determine the highest level of educational attainment and its significance, give me in short terms like BS or MS etc.
          
          4. ATS Score: Evaluate the resume's Applicant Tracking System (ATS) compatibility, scoring it from 0-100 based on:
             - Keyword optimization
             - Formatting clarity
             - Standard section structure
             - Quantifiable achievements
             - Relevance to target roles
          
          5. Experience Level: Categorize the candidate's professional maturity (Entry, Junior, Mid-level, Senior, Executive).
          
          6. Total Years of Experience: Calculate the cumulative professional experience across all roles.
          
          7. Key Strengths: Identify 3-5 standout professional capabilities that distinguish the candidate.
          
          8. Areas of Improvement: Highlight 2-3 potential skill or professional development opportunities.
          
          9. Best Suited Roles: Recommend 3-5 job roles or positions that align with the candidate's current skill set and experience.
          
          10. Skills Distribution: Break down skills into percentage-based categories (Technical, Soft Skills, Industry-Specific).
          
          11. Company Experience: List companies worked for with corresponding years of employment.
          
          12. Red Flags: Identify potential concerns in the resume, including:
              - Employment gaps
              - Frequent job changes
              - Lack of career progression
              - Vague job descriptions
              - Potential skill misalignments
          
          13. Top Skills Analysis: Deep dive into the candidate's most prominent skills, assessing:
              - Skill name
              - Proficiency level
              - Relevance to current job market
          
          14. Certificates & Achievements: Catalog notable professional certifications and significant achievements.
          
          15. Contact Information: Capture and verify contact details (if available and appropriate).
          
          16. Potential Growth Strategies: Recommend personalized professional development paths.
          
          17. Potential Job Fit: Assess overall compatibility with potential job markets and roles.
          
          18. Industry Suitability: Evaluate the candidate's transferability across different industry segments.
          
          Provide nuanced, actionable insights that go beyond simple resume parsing. Your analysis should read like a strategic career consultation, offering depth, empathy, and forward-looking perspectives.
          
          Respond strictly in the format of the ${JSON.stringify(
            resumeAnalysis
          )} object, ensuring all fields are populated with meaningful, data-driven insights.`,
          },
        ],
        model: "gpt-4o-mini",
        max_tokens: 1000,
      });

      const reportRep = chatCompletion.choices[0].message.content;
      let report;
      try {
        console.log("report Rep", reportRep);
        report = JSON.parse(reportRep || "");
      } catch {
        report = { error: "Failed to parse resume" };
      }

      res.status(200).json({ report });
    } catch (error) {
      res.status(500).json({
        error: error || "An error occurred while processing the resume",
      });
    }
  } else {
    res.status(405).send("This is not working");
  }
}
