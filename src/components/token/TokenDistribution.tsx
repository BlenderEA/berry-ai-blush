
import React from 'react';

interface DistributionItem {
  category: string;
  percentage: number;
  color: string;
}

const TokenDistribution: React.FC = () => {
  const tokenDistribution: DistributionItem[] = [
    { category: "Public Sale", percentage: 75, color: "bg-gradient-to-r from-berry to-berry-light" },
    { category: "Team", percentage: 10, color: "bg-gradient-to-r from-berry-purple to-indigo-400" },
    { category: "Marketing", percentage: 10, color: "bg-gradient-to-r from-pink-500 to-pink-300" },
    { category: "Development", percentage: 5, color: "bg-gradient-to-r from-violet-500 to-violet-300" }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-5">Token Distribution</h3>
      <div className="space-y-6">
        {tokenDistribution.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-300">{item.category}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="w-full bg-dark-lighter h-3 rounded-full overflow-hidden">
              <div className={`${item.color} h-3 rounded-full transition-all hover:opacity-90`} style={{ width: `${item.percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenDistribution;
