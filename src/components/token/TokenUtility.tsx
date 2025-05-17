
import React from 'react';

const TokenUtility: React.FC = () => {
  const utilities = [
    "Access to premium AI chat personalities",
    "Early access to new AI features and content",
    "Governance voting on future development",
    "Potential staking rewards (coming soon)",
    "Exclusive access to model content (planned)"
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-3">Token Utility</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {utilities.map((utility, index) => (
          <li key={index} className="flex gap-3 items-start p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
            <div className="w-8 h-8 rounded-full bg-berry/10 flex items-center justify-center text-berry">
              {index + 1}
            </div>
            <div>{utility}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenUtility;
