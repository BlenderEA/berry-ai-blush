
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Whitepaper = () => {
  // This URL should be updated with the actual whitepaper URL
  const whitepaperUrl = "https://bustyberry.io/whitepaper.pdf";
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Whitepaper</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Learn everything about Busty Berry's vision, technology, and tokenomics in our comprehensive whitepaper.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button className="berry-button" onClick={() => window.open(whitepaperUrl, '_blank')}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Whitepaper
                </Button>
                <Button variant="outline" onClick={() => {
                  const link = document.createElement('a');
                  link.href = whitepaperUrl;
                  link.download = 'BustyBerry_Whitepaper.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>

            <div className="glass-card p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Whitepaper Overview</h2>
              <p className="mb-4">
                The Busty Berry whitepaper outlines our revolutionary approach to combining AI technology with 
                decentralized finance on the Solana blockchain. Our comprehensive document covers:
              </p>
              <ul className="list-disc pl-5 space-y-3 text-gray-300">
                <li>Project vision and mission statement</li>
                <li>Technical architecture of the Busty Berry platform</li>
                <li>Token utility and economics</li>
                <li>Governance structure and community participation</li>
                <li>Roadmap and future development plans</li>
                <li>Team background and expertise</li>
              </ul>
            </div>

            <div className="glass-card p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Tokenomics Highlights</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Token Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Public Sale</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full bg-dark-lighter h-2 rounded-full">
                        <div className="bg-berry h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Liquidity</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-dark-lighter h-2 rounded-full">
                        <div className="bg-berry-purple h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Team</span>
                        <span>10%</span>
                      </div>
                      <div className="w-full bg-dark-lighter h-2 rounded-full">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Marketing</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-dark-lighter h-2 rounded-full">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Development</span>
                        <span>5%</span>
                      </div>
                      <div className="w-full bg-dark-lighter h-2 rounded-full">
                        <div className="bg-violet-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Token Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-dark-border pb-2">
                      <span className="text-gray-300">Token Name</span>
                      <span className="font-medium">Busty Berry Token</span>
                    </div>
                    <div className="flex justify-between border-b border-dark-border pb-2">
                      <span className="text-gray-300">Symbol</span>
                      <span className="font-medium">$BUSTY</span>
                    </div>
                    <div className="flex justify-between border-b border-dark-border pb-2">
                      <span className="text-gray-300">Total Supply</span>
                      <span className="font-medium">1,000,000,000</span>
                    </div>
                    <div className="flex justify-between border-b border-dark-border pb-2">
                      <span className="text-gray-300">Blockchain</span>
                      <span className="font-medium">Solana</span>
                    </div>
                    <div className="flex justify-between border-b border-dark-border pb-2">
                      <span className="text-gray-300">Token Standard</span>
                      <span className="font-medium">SPL Token</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-300">Contract Address</span>
                      <span className="font-medium font-mono text-sm">6wA6u3Y9mNpZy7z3oWDaLWUMmp5ourhM6oRFUrsSpump</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-300 mb-6">
                For more detailed information about our token economics, technology, and roadmap, 
                please download the complete whitepaper.
              </p>
              <Button className="berry-button" onClick={() => window.open(whitepaperUrl, '_blank')}>
                <FileText className="mr-2 h-4 w-4" />
                Read Full Whitepaper
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Whitepaper;
