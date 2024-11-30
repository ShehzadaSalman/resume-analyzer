import React from 'react';
import { BarChart2, Award, BookOpen, Briefcase } from 'lucide-react';

interface AnalysisCardProps {
  title: string;
  value: string | number;
  type: 'skills' | 'experience' | 'education' | 'overall';
}

const iconMap = {
  skills: BarChart2,
  experience: Briefcase,
  education: BookOpen,
  overall: Award,
};

export function AnalysisCard({ title, value, type }: AnalysisCardProps) {
  const Icon = iconMap[type];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-50">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}