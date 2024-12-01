import React from "react";

interface AISummaryProps {
  summary: string;
  strengths: string[];
  improvements: string[];
}

export function AISummary({
  summary,
  strengths,
  improvements,
}: AISummaryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Key Strengths
          </h4>
          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Areas for Improvement
          </h4>
          <ul className="space-y-2">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-sm text-gray-600">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
