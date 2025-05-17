
import React from 'react';

interface TokenDetailsProps {
  details: { title: string; value: string }[];
}

const TokenDetails: React.FC<TokenDetailsProps> = ({ details }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Token Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <div key={index} className="p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors">
            <div className="text-sm text-gray-300 mb-1">{detail.title}</div>
            <div className="font-medium">{detail.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenDetails;
