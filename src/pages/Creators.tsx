
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Shield, DollarSign, Users, Image, Video, Eye, MessageSquare } from 'lucide-react';
import CreatorPreview from '@/components/creators/CreatorPreview';
import CreatorInsights from '@/components/creators/CreatorInsights';

const Creators = () => {
  const benefits = [
    {
      icon: <Shield className="h-10 w-10 text-berry" />,
      title: "Creator Ownership",
      description: "Maintain full control over your content, revenue streams, and fan relationships with no intermediaries."
    },
    {
      icon: <DollarSign className="h-10 w-10 text-berry" />,
      title: "Lower Fees",
      description: "Only 2-5% platform fee compared to 20-30% on traditional platforms, enabled by Solana's efficiency."
    },
    {
      icon: <Star className="h-10 w-10 text-berry" />,
      title: "Decentralized Hosting",
      description: "Content stored on decentralized networks like Arweave or IPFS ensuring censorship resistance."
    },
    {
      icon: <Heart className="h-10 w-10 text-berry" />,
      title: "Community Governance",
      description: "Participate in platform decisions through our DAO-based governance system as a token holder."
    }
  ];

  const features = [
    {
      title: "Subscriptions & Tipping",
      description: "Accept payments in $BUSTY tokens or stablecoins with instant low-cost transactions."
    },
    {
      title: "Non-Custodial Wallets",
      description: "Integrate with Phantom and Solflare wallets to maintain full control over your funds."
    },
    {
      title: "Enhanced Privacy",
      description: "Pseudonymous accounts and end-to-end encryption protect your identity and content."
    },
    {
      title: "Real-time Analytics",
      description: "Track your performance, engagement, and earnings with comprehensive analytics."
    },
    {
      title: "Smart Content Access",
      description: "Manage content access through automated smart contracts with flexible monetization options."
    },
    {
      title: "Global Reach",
      description: "Reach fans worldwide without payment restrictions using cryptocurrency transactions."
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-berry/20 blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-berry-purple/20 blur-[100px] animate-pulse-slow"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                <span className="gradient-text">Decentralizing </span> 
                <span className="text-white">the Creator Economy</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                BustyBerry empowers adult content creators with blockchain technology, 
                enabling you to own your content, maximize earnings with lower fees, 
                and build direct relationships with your fans.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/apply-as-creator">
                  <Button className="berry-button group min-w-[180px]">
                    Apply as Creator
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/token">
                  <Button variant="outline" className="secondary-button min-w-[180px]">
                    Learn About $BUSTY
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Creator Preview Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Featured Creators</span>
              </h2>
              <p className="text-lg text-gray-300">
                Preview what creator profiles will look like on our platform
              </p>
            </div>
            
            <CreatorPreview />
          </div>
        </section>
        
        {/* Future Features & Insights */}
        <section className="py-16 bg-dark-lighter">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Platform Evolution</span>
              </h2>
              <p className="text-lg text-gray-300">
                A glimpse into the future of BustyBerry's creator ecosystem
              </p>
            </div>
            
            <CreatorInsights />
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-dark-lighter">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Creator Benefits</span>
              </h2>
              <p className="text-lg text-gray-300">
                Join the next generation platform that puts creators first
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                        <p className="text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">How It Works</span>
              </h2>
              <p className="text-lg text-gray-300">
                BustyBerry leverages blockchain technology to create a secure, transparent platform
              </p>
            </div>
            
            <Tabs defaultValue="creators" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="creators">For Creators</TabsTrigger>
                <TabsTrigger value="fans">For Fans</TabsTrigger>
              </TabsList>
              
              <TabsContent value="creators" className="mt-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Creator Journey</CardTitle>
                    <CardDescription>How to start monetizing your content on BustyBerry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                            1
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Create Your Account</h3>
                          <p className="text-gray-300">
                            Set up a Solana wallet like Phantom or Solflare and connect it to BustyBerry.
                            Complete the optional verification process for creator status.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                            2
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Upload Your Content</h3>
                          <p className="text-gray-300">
                            Upload your content to decentralized storage. Set subscription tiers, content access controls,
                            and pricing that suits your strategy.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                            3
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Engage With Fans</h3>
                          <p className="text-gray-300">
                            Build your community through direct messaging, exclusive content, and personalized experiences.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                            4
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Get Paid Instantly</h3>
                          <p className="text-gray-300">
                            Receive payments directly to your wallet with minimal fees. No payment delays or holds.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="fans" className="mt-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Fan Experience</CardTitle>
                    <CardDescription>How to support and engage with your favorite creators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                            1
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Set Up Your Wallet</h3>
                          <p className="text-gray-300">
                            Create a Solana wallet and purchase $BUSTY tokens or use SOL for transactions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                            2
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Browse Creators</h3>
                          <p className="text-gray-300">
                            Discover and follow your favorite creators with complete privacy and anonymity.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                            3
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Subscribe or Tip</h3>
                          <p className="text-gray-300">
                            Subscribe to creator content or send tips with low transaction fees and instant settlement.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center font-bold">
                            4
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Interact Securely</h3>
                          <p className="text-gray-300">
                            Message creators and access exclusive content with end-to-end encryption and privacy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-dark-lighter">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Platform Features</span>
              </h2>
              <p className="text-lg text-gray-300">
                Built on Solana for speed, security, and low transaction costs
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="glass-card hover:border-berry/30 transition-colors">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-dark-card rounded-3xl border border-dark-border p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-berry/10 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-berry-purple/10 blur-[100px]"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to <span className="gradient-text">Revolutionize</span> Your Creator Journey?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join BustyBerry and be part of the decentralized creator economy. 
                  Own your content, connect directly with fans, and maximize your earnings.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/apply-as-creator">
                    <Button className="berry-button group min-w-[200px]">
                      Apply as Creator
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/community">
                    <Button variant="outline" className="secondary-button min-w-[200px]">
                      Join Our Community
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Creators;
