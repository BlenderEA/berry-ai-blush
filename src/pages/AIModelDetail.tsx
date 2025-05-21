import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIModelChat from '@/components/aimodels/AIModelChat';
import { getAIModel, AIModel } from '@/utils/aiUtils';
import { MessageSquare, Image, Volume, Lock, ArrowLeft } from 'lucide-react';

const AIModelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<AIModel | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, this would fetch from an API
      const modelData = getAIModel(id);
      setModel(modelData || null);
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-berry"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-dark text-white">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">AI Model Not Found</h2>
              <Button onClick={() => navigate('/ai-models')}>
                Back to AI Models
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 text-gray-300 hover:text-white"
            onClick={() => navigate('/ai-models')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to AI Models
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Model Info */}
            <div>
              <Card className={`overflow-hidden border-dark-border bg-dark-lighter`}>
                <div className={`h-80 relative bg-gradient-to-br ${model.bgColor}`}>
                  <img 
                    src={model.imageSrc} 
                    alt={model.name}
                    className="object-cover w-full h-full mix-blend-overlay opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                </div>
                
                <div className="p-5">
                  <h1 className="text-3xl font-bold mb-2 text-white">{model.name}</h1>
                  <p className="text-gray-300 mb-5">{model.bio}</p>
                  
                  <div className="mb-6 pt-4 border-t border-dark-border">
                    <h3 className="text-xl font-semibold mb-3 text-white">Premium Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-300">
                        <Lock className="mr-2 h-4 w-4 text-berry" />
                        <span>Exclusive photoshoots</span>
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Lock className="mr-2 h-4 w-4 text-berry" />
                        <span>Voice messages</span>
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Lock className="mr-2 h-4 w-4 text-berry" />
                        <span>Custom image requests</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-berry hover:bg-berry-dark">
                    Unlock with $BUSTY Tokens
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column - Interaction Area */}
            <div className="lg:col-span-2">
              <Card className="border-dark-border bg-dark-lighter overflow-hidden">
                <Tabs defaultValue="chat" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full bg-dark border-b border-dark-border rounded-none">
                    <TabsTrigger value="chat" className="flex-1 data-[state=active]:bg-dark-lighter">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="images" className="flex-1 data-[state=active]:bg-dark-lighter">
                      <Image className="mr-2 h-4 w-4" />
                      Images
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="flex-1 data-[state=active]:bg-dark-lighter">
                      <Volume className="mr-2 h-4 w-4" />
                      Voice
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="chat" className="m-0 h-[600px]">
                    <AIModelChat
                      modelId={model.id}
                      modelName={model.name}
                      modelImage={model.imageSrc}
                    />
                  </TabsContent>
                  <TabsContent value="images" className="p-6">
                    <div className="text-center py-10">
                      <Image className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <h3 className="text-xl font-medium mb-2">Request Custom Images</h3>
                      <p className="text-gray-400 mb-6">
                        Use $BUSTY tokens to request custom AI-generated images of {model.name}.
                        All images are stored on IPFS for true ownership.
                      </p>
                      <Button className="bg-berry hover:bg-berry-dark">
                        Unlock with $BUSTY Tokens
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="voice" className="p-6">
                    <div className="text-center py-10">
                      <Volume className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <h3 className="text-xl font-medium mb-2">Voice Messages</h3>
                      <p className="text-gray-400 mb-6">
                        Receive voice messages from {model.name} in her unique voice.
                        Premium feature available with $BUSTY tokens.
                      </p>
                      <Button className="bg-berry hover:bg-berry-dark">
                        Unlock with $BUSTY Tokens
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIModelDetail;
