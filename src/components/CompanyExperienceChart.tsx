import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CompanyExperienceProps {
  data: Array<{
    company: string;
    years: number;
  }>;
}

export function CompanyExperienceChart({ data }: CompanyExperienceProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" unit="y" />
          <YAxis 
            type="category" 
            dataKey="company" 
            width={90}
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value} years`, 'Experience']}
            cursor={{ fill: '#f3f4f6' }}
          />
          <Bar 
            dataKey="years" 
            fill="#3B82F6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}