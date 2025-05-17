
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MessageSquare, Twitter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CommunityPage = () => {
  const socialLinks = [
    {
      id: 'telegram',
      name: "Telegram",
      icon: MessageSquare,
      link: "https://t.me/BustyBerry1",
      color: "bg-[#0088cc]",
      members: "15K+",
      description: "Join our Telegram community for real-time updates, direct communication with the team, and a vibrant community of $BUSTYBERRY enthusiasts.",
      groups: [
        { name: "Main Channel", link: "https://t.me/BustyBerry1" }
      ]
    },
    {
      id: 'twitter',
      name: "X (Twitter)",
      icon: Twitter,
      link: "https://x.com/BustyBerryAI",
      color: "bg-[#1DA1F2]", 
      members: "22K+",
      description: "Follow us on X (formerly Twitter) for the latest announcements, memes, and to participate in our campaigns and giveaways.",
      latestTweets: [
        "Exciting news coming soon! The juiciest memecoin is about to get even juicier! #BUSTYBERRY",
        "Thank you for 20K followers! The $BUSTYBERRY community is growing faster than we expected!",
        "New AI personality coming next week! Which Berry are you most excited to meet?"
      ]
    },
    {
      id: 'xcommunity',
      name: "X Community",
      icon: ExternalLink,
      link: "https://x.com/i/communities/1922803262262215153",
      color: "bg-[#1DA1F2]",
      members: "8K+",
      description: "Our X Community is the place for deeper discussions on development, feature requests, and connecting with fellow community members.",
      channels: [
        "🍓 general-chat",
        "🧠 development",
        "🎯 marketing",
        "🚀 token-discussion",
        "🤖 ai-chat-feedback"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Join Our <span className="gradient-text">Community</span>
              </h1>
              <p className="text-lg text-gray-300">
                Connect with fellow Busty Berry enthusiasts, get real-time updates,
                and be part of the juiciest community in crypto.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {socialLinks.map((social) => (
                <Card key={social.name} className="glass-card border-dark-border overflow-hidden hover:border-berry/30 transition-all hover:-translate-y-1 duration-300">
                  <div className={`h-2 ${social.color}`}></div>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full ${social.color} flex items-center justify-center text-white mb-4`}>
                      <social.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{social.name}</h3>
                    <p className="text-gray-300 mb-2 text-center">{social.members} members</p>
                    <a 
                      href={social.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-4 w-full"
                    >
                      <Button className="w-full bg-berry hover:bg-berry-light">
                        Join {social.name}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="telegram">
                <TabsList className="w-full grid grid-cols-3">
                  {socialLinks.map((social) => (
                    <TabsTrigger key={social.id} value={social.id}>
                      {social.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {socialLinks.map((social) => (
                  <TabsContent key={social.id} value={social.id}>
                    <Card className="glass-card">
                      <CardContent className="p-6">
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-3">About Our {social.name} Community</h3>
                          <p className="text-gray-300 mb-4">
                            {social.description}
                          </p>
                        </div>
                        
                        {social.id === 'telegram' && (
                          <div>
                            <h4 className="text-lg font-medium mb-3">Our Telegram Groups</h4>
                            <div className="space-y-3">
                              {social.groups?.map((group, index) => (
                                <a 
                                  key={index}
                                  href={group.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block p-3 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-colors"
                                >
                                  <div className="flex justify-between items-center">
                                    <span>{group.name}</span>
                                    <ExternalLink className="h-4 w-4 text-gray-400" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {social.id === 'twitter' && (
                          <div>
                            <h4 className="text-lg font-medium mb-3">Latest Posts</h4>
                            <div className="space-y-3">
                              {social.latestTweets?.map((tweet, index) => (
                                <div 
                                  key={index}
                                  className="p-4 bg-dark-lighter rounded-lg border border-dark-border"
                                >
                                  <p className="text-gray-300">{tweet}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {social.id === 'xcommunity' && (
                          <div>
                            <h4 className="text-lg font-medium mb-3">Community Channels</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {social.channels?.map((channel, index) => (
                                <div 
                                  key={index}
                                  className="p-3 bg-dark-lighter rounded-lg border border-dark-border"
                                >
                                  {channel}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-300 mb-4">
                  The Busty Berry community is built on respect, fun, and shared enthusiasm. 
                  While we welcome adult-themed discussions in appropriate channels, we have zero 
                  tolerance for harassment, hate speech, or any form of illegal content.
                </p>
                <p className="text-gray-300">
                  Remember that investment decisions are your own responsibility. 
                  The team and community members may share their thoughts but are 
                  never providing financial advice.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;
