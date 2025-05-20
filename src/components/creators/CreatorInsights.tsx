
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Video, MessageSquare, Image, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CreatorInsights = () => {
  // Sample revenue data for the chart
  const revenueData = [
    { day: 'Mon', amount: 420 },
    { day: 'Tue', amount: 580 },
    { day: 'Wed', amount: 450 },
    { day: 'Thu', amount: 700 },
    { day: 'Fri', amount: 500 },
    { day: 'Sat', amount: 890 },
    { day: 'Sun', amount: 750 },
  ];

  const upcomingFeatures = [
    {
      icon: <Image className="h-12 w-12 text-berry" />,
      title: "AI Content Generation",
      description: "Creators will be able to use AI tools to generate content, thumbnails, and ideas based on their style and fan preferences.",
      eta: "Q3 2025"
    },
    {
      icon: <Video className="h-12 w-12 text-berry" />,
      title: "Live Streaming",
      description: "Decentralized live streaming with token-gated access, instant tipping, and interactive features for real-time engagement.",
      eta: "Q4 2025"
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-berry" />,
      title: "Creator Collaborations",
      description: "Smart-contract based collaboration tools allowing creators to work together and automatically split revenues.",
      eta: "Q2 2025"
    },
    {
      icon: <Eye className="h-12 w-12 text-berry" />,
      title: "Creator Dashboard",
      description: "Advanced analytics dashboard with AI-powered insights, audience demographics, and content performance metrics.",
      eta: "Q3 2025"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Platform visualization */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-berry/10 blur-[100px]"></div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6">Creator Dashboard Preview</h3>
          
          <div className="bg-dark rounded-lg border border-dark-border p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div>
                <h4 className="text-lg font-medium mb-1">Welcome back, BerryCreator!</h4>
                <p className="text-gray-400 text-sm">Here's your dashboard for May 17, 2025</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="secondary-button">Create Post</Button>
                <Button size="sm" className="berry-button">Go Live</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-dark-lighter rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">New Subscribers</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">+128</p>
                  <p className="text-green-500 text-sm">↑ 12%</p>
                </div>
              </div>
              <div className="bg-dark-lighter rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Revenue (24h)</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">$892</p>
                  <p className="text-green-500 text-sm">↑ 8%</p>
                </div>
              </div>
              <div className="bg-dark-lighter rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Content Views</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">15.2K</p>
                  <p className="text-green-500 text-sm">↑ 18%</p>
                </div>
              </div>
              <div className="bg-dark-lighter rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Messages</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-berry text-sm font-bold">9 New</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-dark-lighter rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-medium">Revenue Chart</h5>
                  <select className="bg-dark border border-dark-border rounded px-2 py-1 text-sm">
                    <option>Last 7 days</option>
                  </select>
                </div>
                <div className="h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D946EF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#D946EF" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#888' }} 
                        axisLine={{ stroke: '#444' }}
                        tickLine={{ stroke: '#444' }}
                      />
                      <YAxis 
                        hide={true}
                        domain={['dataMin - 100', 'dataMax + 100']} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#262B38',
                          borderColor: '#2D334A',
                          borderRadius: '0.375rem',
                          color: '#fff'
                        }}
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#D946EF" 
                        strokeWidth={2}
                        fill="url(#colorRevenue)" 
                        activeDot={{ r: 6, stroke: '#D946EF', strokeWidth: 2, fill: '#fff' }} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-dark-lighter rounded-lg p-4">
                <h5 className="font-medium mb-3">Top Content</h5>
                <div className="space-y-3">
                  <div className="flex gap-2 border-b border-dark-border pb-2">
                    <div className="w-12 h-12 bg-dark rounded overflow-hidden flex items-center justify-center">
                      <Image className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Beach Photoshoot</p>
                      <p className="text-xs text-gray-400">4.8K views • $210</p>
                    </div>
                  </div>
                  <div className="flex gap-2 border-b border-dark-border pb-2">
                    <div className="w-12 h-12 bg-dark rounded overflow-hidden flex items-center justify-center">
                      <Video className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dancing Routine</p>
                      <p className="text-xs text-gray-400">3.2K views • $180</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-dark rounded overflow-hidden flex items-center justify-center">
                      <Image className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cosplay Collection</p>
                      <p className="text-xs text-gray-400">2.9K views • $150</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming features */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-center">Upcoming Creator Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <Card key={index} className="glass-card hover:border-berry/30 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-gray-300 mb-3">{feature.description}</p>
                  <Badge className="bg-dark-card border border-berry/30 text-gray-300">
                    Coming {feature.eta}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <Button variant="outline" className="secondary-button group">
          View Full Roadmap
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

// Badge component for use in this file
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${className}`}>
      {children}
    </span>
  );
};

export default CreatorInsights;
