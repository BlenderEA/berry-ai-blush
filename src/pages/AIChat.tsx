
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import ChatInterface from '@/components/chat/ChatInterface';
import { useSearchParams } from 'react-router-dom';
import ApiKeyWarning from '@/components/chat/ApiKeyWarning';

const AIChat = () => {
  const [keyError, setKeyError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const personalityParam = searchParams.get('personality') || 'grok-assistant';
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Chat with <span className="gradient-text">Grok AI</span></h1>
              <p className="text-lg text-gray-300 mb-6">
                Experience our interactive AI chatbot with dynamic Three.js animations that respond to your typing.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              {keyError && (
                <ApiKeyWarning 
                  message={keyError} 
                  details="Please add your Grok API key in the Supabase secrets." 
                />
              )}
              
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-0">
                  <ChatInterface 
                    personalityId={personalityParam} 
                    setKeyError={setKeyError} 
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIChat;
