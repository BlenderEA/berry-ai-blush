
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image, Video, MessageSquare, Heart } from 'lucide-react';

const CreatorPreview = () => {
  const creators = [
    {
      id: 1,
      username: "BerryDancer",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      coverUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
      description: "Dancer & fitness enthusiast sharing exclusive performances and workouts.",
      verified: true,
      stats: {
        posts: 142,
        subscribers: 2350,
        likes: 18500
      },
      subscriptionFee: 9.99,
      tags: ["dance", "fitness", "performance"]
    },
    {
      id: 2,
      username: "CosplayBerry",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      coverUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2070&auto=format&fit=crop",
      description: "Bringing your favorite characters to life with detailed cosplays and behind-the-scenes content.",
      verified: true,
      stats: {
        posts: 97,
        subscribers: 1840,
        likes: 12300
      },
      subscriptionFee: 12.99,
      tags: ["cosplay", "costume", "anime"]
    },
    {
      id: 3,
      username: "BerryArtist",
      avatarUrl: "https://i.pravatar.cc/150?img=9",
      coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop",
      description: "Digital artist sharing exclusive artwork, tutorials and personalized commissions.",
      verified: false,
      stats: {
        posts: 78,
        subscribers: 1250,
        likes: 8900
      },
      subscriptionFee: 7.99,
      tags: ["art", "digital", "drawing"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {creators.map((creator) => (
        <Card key={creator.id} className="glass-card overflow-hidden hover:border-berry/30 transition-all hover:-translate-y-1 duration-300">
          {/* Cover Image */}
          <div className="h-32 w-full relative bg-gradient-to-r from-berry/20 to-berry-purple/20" style={{ backgroundImage: `url(${creator.coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
          </div>
          
          {/* Avatar and Username */}
          <div className="px-6 relative">
            <div className="flex justify-between items-end -mt-8">
              <div className="h-16 w-16 rounded-full border-4 border-dark overflow-hidden bg-dark-lighter">
                <img src={creator.avatarUrl} alt={creator.username} className="h-full w-full object-cover" />
              </div>
              <div className="mb-2">
                {creator.verified && (
                  <Badge className="bg-berry text-white hover:bg-berry-dark">Verified</Badge>
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold mt-2 flex items-center">
              @{creator.username}
            </h3>
          </div>
          
          <CardContent>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{creator.description}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="bg-dark-lighter rounded-lg p-2">
                <div className="flex items-center justify-center mb-1">
                  <Image className="h-4 w-4 mr-1 text-berry" />
                  <span className="text-xs text-gray-400">Posts</span>
                </div>
                <p className="font-bold">{creator.stats.posts}</p>
              </div>
              <div className="bg-dark-lighter rounded-lg p-2">
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-4 w-4 mr-1 text-berry" />
                  <span className="text-xs text-gray-400">Subs</span>
                </div>
                <p className="font-bold">{creator.stats.subscribers}</p>
              </div>
              <div className="bg-dark-lighter rounded-lg p-2">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="h-4 w-4 mr-1 text-berry" />
                  <span className="text-xs text-gray-400">Likes</span>
                </div>
                <p className="font-bold">{creator.stats.likes}</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {creator.tags.map((tag) => (
                <span key={tag} className="text-xs bg-dark-lighter px-2 py-1 rounded-full text-gray-300">
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Subscription */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-400">Subscribe for</span>
                <p className="font-bold text-berry">${creator.subscriptionFee}/mo</p>
              </div>
              <Button size="sm" className="berry-button">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CreatorPreview;
