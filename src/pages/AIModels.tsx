
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIModelCard from '@/components/aimodels/AIModelCard';
import { Card, CardContent } from '@/components/ui/card';

const AIModels = () => {
  const navigate = useNavigate();

  // Sample AI models data - this would come from your database in a real implementation
  const aiModels = [
    {
      id: '1',
      name: 'Luna',
      bio: 'Glamorous fashionista with a passion for luxury brands and high-end photoshoots.',
      imageSrc: '/lovable-uploads/bff1c9ab-ee76-4e59-9da2-6108d4000c9d.png',
      bgColor: 'from-purple-500 to-pink-500'
    },
    {
      id: '2',
      name: 'Aria',
      bio: 'Beach-loving influencer who enjoys yoga at sunrise and tropical photoshoots.',
      imageSrc: '/lovable-uploads/87c037c1-9bd0-4e88-bc99-48e731a52160.png',
      bgColor: 'from-berry-purple to-berry'
    },
    {
      id: '3',
      name: 'Sofia',
      bio: 'Sophisticated model with elegant taste, specializing in evening wear and gala events.',
      imageSrc: '/lovable-uploads/dd62bd68-7508-43dd-86fc-6dde896d8568.png',
      bgColor: 'from-indigo-600 to-berry-purple'
    },
    {
      id: '4',
      name: 'Zoe',
      bio: 'Edgy photographer who loves motorcycles and creates stunning artistic selfies.',
      imageSrc: '/lovable-uploads/2fa7f246-e7e0-42f6-a543-313c3247fa40.png',
      bgColor: 'from-berry-red to-berry'
    },
    {
      id: '5',
      name: 'Mia',
      bio: 'Fitness enthusiast and wellness coach sharing workout routines and health tips.',
      imageSrc: '/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png',
      bgColor: 'from-blue-600 to-berry-purple'
    },
    {
      id: '6',
      name: 'Jade',
      bio: 'Adventurous traveler documenting her journeys through exotic photoshoots.',
      imageSrc: '/lovable-uploads/303b3657-5efd-47fc-bdfe-818534132a87.png',
      bgColor: 'from-green-500 to-teal-400'
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">AI Companion Models</h1>
            <p className="text-lg text-gray-300 mb-8">
              Interact with our AI-generated models for flirty conversations and exclusive content.
              Each model has a unique personality and style to match your preferences.
            </p>
            <Card className="bg-dark-lighter border-dark-border p-4 md:p-6 mb-8">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-left">
                  <div>
                    <h3 className="text-xl font-semibold text-berry mb-2">Premium Features with $BUSTY</h3>
                    <p className="text-gray-300">
                      Unlock exclusive images, private chats, and personalized content
                      by using your $BUSTY tokens. All content is stored on IPFS for true ownership.
                    </p>
                  </div>
                  <button 
                    className="px-6 py-3 bg-gradient-to-r from-berry to-berry-purple text-white rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                    onClick={() => navigate('/token')}
                  >
                    Get $BUSTY Tokens
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {aiModels.map((model) => (
              <AIModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIModels;
