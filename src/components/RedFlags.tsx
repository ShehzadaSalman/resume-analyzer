import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RedFlag {
  issue: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
}

interface RedFlagsProps {
  flags: RedFlag[];
}

const severityColors = {
  high: 'bg-red-50 border-red-100',
  medium: 'bg-yellow-50 border-yellow-100',
  low: 'bg-blue-50 border-blue-100',
};

const severityTextColors = {
  high: 'text-red-700',
  medium: 'text-yellow-700',
  low: 'text-blue-700',
};

export function RedFlags({ flags }: RedFlagsProps) {
  return (
    <div className="space-y-4">
      {flags.map((flag, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border ${severityColors[flag.severity]}`}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className={`w-5 h-5 mt-0.5 ${severityTextColors[flag.severity]}`} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className={`font-medium ${severityTextColors[flag.severity]}`}>
                  {flag.issue}
                </h4>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    severityTextColors[flag.severity]
                  } bg-white`}
                >
                  {flag.severity.toUpperCase()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{flag.description}</p>
              <p className="mt-2 text-sm font-medium text-gray-900">
                Recommendation: {flag.recommendation}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}