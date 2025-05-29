
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MessageSquare, Twitter, Users, Heart, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CommunityPage = () => {
  const socialLinks = [
    {
      id: 'telegram',
      name: "Telegram",
      icon: MessageSquare,
      link: "https://t.me/BustyBerry1",
      color: "bg-[#0088cc]",
      members: "250+",
      description: "Join our Telegram community for real-time updates, direct communication with the team, and a vibrant community of $BUSTYBERRY enthusiasts.",
      groups: [
        { name: "Main Channel", link: "https://t.me/BustyBerry1", description: "Official announcements and updates" }
      ]
    },
    {
      id: 'twitter',
      name: "X (Twitter)",
      icon: Twitter,
      link: "https://x.com/BustyBerryAI",
      color: "bg-[#1DA1F2]", 
      members: "100+",
      description: "Follow us on X (formerly Twitter) for the latest announcements, memes, and to participate in our campaigns and giveaways.",
      latestTweets: [
        "🔥 Exciting news coming soon! The juiciest memecoin is about to get even juicier! #BUSTYBERRY",
        "💕 Thank you for 20K followers! The $BUSTYBERRY community is growing faster than we expected!",
        "🤖 New AI personality coming next week! Which Berry are you most excited to meet?"
      ]
    },
    {
      id: 'xcommunity',
      name: "X Community",
      icon: ExternalLink,
      link: "https://x.com/i/communities/1922803262262215153",
      color: "bg-[#1DA1F2]",
      members: "50+",
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

  const communityStats = [
    { icon: Users, label: "Total Members", value: "400+", color: "text-berry" },
    { icon: Heart, label: "Daily Active", value: "150+", color: "text-berry-purple" },
    { icon: TrendingUp, label: "Growth Rate", value: "+25%", color: "text-green-400" },
    { icon: Calendar, label: "Community Age", value: "2 months", color: "text-blue-400" }
  ];

  const upcomingEvents = [
    { date: "Dec 15", title: "Community AMA", description: "Ask anything about BustyBerry's future" },
    { date: "Dec 20", title: "Meme Contest", description: "Win $BUSTYBERRY tokens for best memes" },
    { date: "Dec 25", title: "Holiday Giveaway", description: "Special Christmas surprise for holders" }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-berry/10 blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-berry-purple/10 blur-[120px]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Join Our <span className="gradient-text">Juicy Community</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Connect with fellow Busty Berry enthusiasts, get real-time updates,
                and be part of the most exciting community in crypto.
              </p>
              
              {/* Community Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
                {communityStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Social Links Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {socialLinks.map((social) => (
                <Card key={social.name} className="glass-card border-dark-border overflow-hidden hover:border-berry/30 transition-all hover:-translate-y-2 duration-300 group">
                  <div className={`h-3 ${social.color} group-hover:h-4 transition-all duration-300`}></div>
                  <CardContent className="p-8 flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full ${social.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <social.icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{social.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-4 w-4 text-berry" />
                      <span className="text-gray-300">{social.members} members</span>
                    </div>
                    <p className="text-gray-400 text-center mb-6 text-sm leading-relaxed">
                      {social.description}
                    </p>
                    <a 
                      href={social.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full"
                    >
                      <Button className="w-full bg-berry hover:bg-berry-light group-hover:scale-105 transition-transform duration-300">
                        Join {social.name}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Community Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="telegram" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-8">
                  {socialLinks.map((social) => (
                    <TabsTrigger key={social.id} value={social.id} className="text-lg">
                      <social.icon className="h-5 w-5 mr-2" />
                      {social.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {socialLinks.map((social) => (
                  <TabsContent key={social.id} value={social.id}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <Card className="glass-card">
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                              <social.icon className={`h-6 w-6 text-berry`} />
                              About Our {social.name} Community
                            </h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                              {social.description}
                            </p>
                            
                            {social.id === 'telegram' && (
                              <div>
                                <h4 className="text-lg font-semibold mb-4">Our Telegram Groups</h4>
                                <div className="space-y-3">
                                  {social.groups?.map((group, index) => (
                                    <a 
                                      key={index}
                                      href={group.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block p-4 bg-dark-lighter rounded-lg border border-dark-border hover:border-berry/30 transition-all duration-300 hover:-translate-y-1"
                                    >
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <span className="font-semibold">{group.name}</span>
                                          <p className="text-sm text-gray-400 mt-1">{group.description}</p>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-gray-400" />
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {social.id === 'twitter' && (
                              <div>
                                <h4 className="text-lg font-semibold mb-4">Latest Posts</h4>
                                <div className="space-y-4">
                                  {social.latestTweets?.map((tweet, index) => (
                                    <div 
                                      key={index}
                                      className="p-4 bg-dark-lighter rounded-lg border border-dark-border"
                                    >
                                      <p className="text-gray-300">{tweet}</p>
                                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                        <span>2 hours ago</span>
                                        <span>•</span>
                                        <span>25 likes</span>
                                        <span>•</span>
                                        <span>8 retweets</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {social.id === 'xcommunity' && (
                              <div>
                                <h4 className="text-lg font-semibold mb-4">Community Channels</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {social.channels?.map((channel, index) => (
                                    <div 
                                      key={index}
                                      className="p-3 bg-dark-lighter rounded-lg border border-dark-border flex items-center gap-2"
                                    >
                                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                      {channel}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <Card className="glass-card mb-6">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-berry" />
                              Upcoming Events
                            </h4>
                            <div className="space-y-4">
                              {upcomingEvents.map((event, index) => (
                                <div key={index} className="border-l-2 border-berry pl-4">
                                  <div className="text-sm text-berry font-semibold">{event.date}</div>
                                  <div className="font-semibold">{event.title}</div>
                                  <div className="text-sm text-gray-400">{event.description}</div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="glass-card">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-berry" />
                              Quick Join
                            </h4>
                            <p className="text-gray-400 text-sm mb-4">
                              Jump straight into our most active community
                            </p>
                            <a 
                              href="https://t.me/BustyBerry1" 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Button className="w-full bg-gradient-to-r from-berry to-berry-purple hover:from-berry-light hover:to-berry">
                                Join Telegram Now
                                <MessageSquare className="ml-2 h-4 w-4" />
                              </Button>
                            </a>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-16 bg-dark-lighter/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Community Guidelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-berry">Respect & Fun</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      The Busty Berry community is built on respect, fun, and shared enthusiasm. 
                      While we welcome adult-themed discussions in appropriate channels, we have zero 
                      tolerance for harassment, hate speech, or any form of illegal content.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-berry-purple">Investment Responsibility</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Remember that investment decisions are your own responsibility. 
                      The team and community members may share their thoughts but are 
                      never providing financial advice. Always DYOR!
                    </p>
                  </CardContent>
                </Card>
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
