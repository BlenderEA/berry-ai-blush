
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const RiskDisclaimer = () => {
  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/" className="text-gray-400 hover:text-berry flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-berry" />
            <h1 className="text-3xl md:text-4xl font-bold">Risk Disclaimer</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cryptocurrency Risk Disclaimer</h2>
              <p className="text-gray-300 mb-4">
                This disclaimer outlines the risks associated with cryptocurrency investments and the $BUSTYBERRY token. By using our platform or purchasing $BUSTYBERRY tokens, you acknowledge that you have read, understood, and accepted these risks.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">High Risk Investment</h2>
              <p className="text-gray-300 mb-4">
                Cryptocurrency investments, including $BUSTYBERRY, involve a high degree of risk. The cryptocurrency market is highly volatile and unpredictable. The value of cryptocurrencies can fluctuate significantly in a short period, potentially resulting in substantial losses.
              </p>
              <p className="text-gray-300 mb-4">
                $BUSTYBERRY is a memecoin with no intrinsic value beyond its utility within our platform. Its value is primarily based on community sentiment, market speculation, and adoption. There is no guarantee that $BUSTYBERRY will maintain its value or increase in value over time.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">No Investment Advice</h2>
              <p className="text-gray-300 mb-4">
                Information provided on this website, in our communications, or by team members is for informational purposes only and does not constitute investment advice. We do not provide financial, tax, or legal advice. You should consult with a qualified professional before making any investment decisions.
              </p>
              <p className="text-gray-300 mb-4">
                Any projections, forecasts, or expressions of opinion regarding future market performance or trends are statements of opinion and not guarantees of future performance.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Regulatory Uncertainty</h2>
              <p className="text-gray-300 mb-4">
                The regulatory environment for cryptocurrencies is evolving rapidly. Changes in regulations could adversely affect the value, functionality, or legality of $BUSTYBERRY or other cryptocurrencies. These regulatory changes could happen with little to no notice.
              </p>
              <p className="text-gray-300 mb-4">
                $BUSTYBERRY may not be available in all jurisdictions. It is your responsibility to ensure compliance with local laws and regulations before purchasing or using $BUSTYBERRY.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Technical Risks</h2>
              <p className="text-gray-300 mb-4">
                Blockchain and cryptocurrency technologies are subject to various technical risks, including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Smart contract vulnerabilities and bugs</li>
                <li>Blockchain network failures or congestion</li>
                <li>Wallet security breaches</li>
                <li>Private key loss</li>
                <li>Software or hardware failures</li>
              </ul>
              <p className="text-gray-300 mt-4">
                We make no guarantees regarding the security of the Solana blockchain, the $BUSTYBERRY smart contract, or any other technical components of our platform.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">No Guarantee of Returns</h2>
              <p className="text-gray-300 mb-4">
                Past performance is not indicative of future results. There is no guarantee that $BUSTYBERRY will generate any returns or profits. You could lose some or all of your investment.
              </p>
              <p className="text-gray-300 mb-4">
                The project's success depends on various factors, including market conditions, community adoption, platform development progress, and competition from other projects. These factors are uncertain and could negatively impact the value of $BUSTYBERRY.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Only Invest What You Can Afford to Lose</h2>
              <p className="text-gray-300 mb-4">
                Given the high-risk nature of cryptocurrency investments, you should only invest what you can afford to lose entirely. Do not invest funds needed for essential expenses, emergency savings, retirement, or other important financial needs.
              </p>
              <p className="text-gray-300 mb-4">
                We strongly recommend diversifying your investments across different asset classes and not concentrating a significant portion of your portfolio in $BUSTYBERRY or any single cryptocurrency.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Do Your Own Research</h2>
              <p className="text-gray-300 mb-4">
                Before purchasing $BUSTYBERRY, we encourage you to conduct your own research (DYOR) and carefully evaluate the risks involved. This includes reviewing our whitepaper, website, social media channels, and other information sources.
              </p>
              <p className="text-gray-300 mb-4">
                Be wary of unofficial information, scams, and fraudulent actors claiming to represent the project. Always verify information from official sources.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400">Last updated: May 17, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RiskDisclaimer;
