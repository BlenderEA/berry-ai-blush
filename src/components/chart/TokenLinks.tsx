
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface TokenLinksProps {
  contractAddress: string;
}

const TokenLinks: React.FC<TokenLinksProps> = ({ contractAddress }) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-center p-6 pt-0">
      <a
        href={`https://solscan.io/token/${contractAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-dark-lighter rounded-lg hover:bg-dark-border transition-colors border border-transparent hover:border-berry/30 group"
      >
        <p className="text-sm text-gray-300 mb-1">View on Solscan</p>
        <p className="font-bold flex items-center justify-center gap-1 group-hover:text-berry transition-colors">
          Token Info
          <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </p>
      </a>
      <a
        href={`https://birdeye.so/token/${contractAddress}?chain=solana`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-dark-lighter rounded-lg hover:bg-dark-border transition-colors border border-transparent hover:border-berry/30 group"
      >
        <p className="text-sm text-gray-300 mb-1">View on Birdeye</p>
        <p className="font-bold flex items-center justify-center gap-1 group-hover:text-berry transition-colors">
          Market Data
          <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </p>
      </a>
    </div>
  );
};

export default TokenLinks;
