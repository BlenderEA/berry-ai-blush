
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TokenDetails from './TokenDetails';
import TokenDistribution from './TokenDistribution';
import TokenUtility from './TokenUtility';

const TokenomicsTab: React.FC = () => {
  const tokenDetails = [
    { title: "Token Name", value: "Busty Berry" },
    { title: "Symbol", value: "$BUSTYBERRY" },
    { title: "Total Supply", value: "1,000,000,000" },
    { title: "Blockchain", value: "Solana" }
  ];

  return (
    <Card className="glass-card border-dark-border bg-gradient-to-br from-dark to-dark-lighter">
      <CardHeader>
        <CardTitle>$BUSTYBERRY Tokenomics</CardTitle>
        <CardDescription>
          Understanding the distribution and utility of $BUSTYBERRY tokens
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TokenDetails details={tokenDetails} />
          <TokenDistribution />
          <TokenUtility />
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenomicsTab;
