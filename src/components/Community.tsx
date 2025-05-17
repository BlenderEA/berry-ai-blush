
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Twitter, ExternalLink } from 'lucide-react';

const Community = () => {
  const socialLinks = [
    {
      name: "Telegram",
      icon: MessageSquare,
      link: "https://t.me/BustyBerry1",
      color: "bg-[#0088cc]",
      members: "15K+"
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      link: "https://x.com/BustyBerryAI",
      color: "bg-[#1DA1F2]", 
      members: "22K+"
    },
    {
      name: "X Community",
      icon: ExternalLink,
      link: "https://x.com/i/communities/1922803262262215153",
      color: "bg-[#1DA1F2]",
      members: "8K+"
    }
  ];

  return (
    <section className="section-padding bg-dark-lighter relative" id="community">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-berry/10 blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-berry-purple/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our <span className="gradient-text">Community</span></h2>
          <p className="text-lg text-gray-300">
            Be part of the juiciest community in crypto. Connect with fellow berry enthusiasts,
            get the latest updates, and participate in exclusive events.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {socialLinks.map((social) => (
            <Card key={social.name} className="glass-card border-dark-border overflow-hidden hover:border-berry/30 transition-all hover:-translate-y-1 duration-300">
              <div className={`h-2 ${social.color}`}></div>
              <CardContent className="p-6 flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full ${social.color} flex items-center justify-center text-white mb-4`}>
                  <social.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{social.name}</h3>
                <p className="text-gray-300 mb-2">{social.members} members</p>
                <a href={social.link} target="_blank" rel="noopener noreferrer" className="mt-4 w-full">
                  <Button className="w-full" variant="outline">
                    Join {social.name}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
