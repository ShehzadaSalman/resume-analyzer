import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  relevance: number;
}

interface SkillsAnalysisProps {
  skills: Skill[];
}

const levelColors = {
  expert: 'bg-green-100 text-green-700 border-green-200',
  advanced: 'bg-blue-100 text-blue-700 border-blue-200',
  intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  beginner: 'bg-gray-100 text-gray-700 border-gray-200',
};

export function SkillsAnalysis({ skills }: SkillsAnalysisProps) {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{skill.name}</h4>
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${
                  levelColors[skill.level]
                }`}
              >
                {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {skill.relevance >= 7 ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm text-gray-500">
              {skill.relevance}/10 relevance
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}