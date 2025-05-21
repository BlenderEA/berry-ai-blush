
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ChatWindow from '@/components/chat/ChatWindow';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import ApiKeyWarning from '@/components/chat/ApiKeyWarning';

const AIChat = () => {
  // Single AI personality
  const personality = {
    id: 'blueberry-babe',
    name: 'Blueberry Babe',
    description: 'Sweet and playful with a mischievous side. She loves talking about her day while surrounded by blueberries.',
    avatarSrc: '/lovable-uploads/0a8988bd-61e8-4bc1-a2b0-f4bb4b83e799.png',
    avatarColor: 'bg-blue-300',
    avatarText: '💙',
    personality: "Hey there! I'm Blueberry Babe, your sweet and playful companion. I love spending my days surrounded by blueberries - they match my vibe perfectly! I'm always up for fun conversations and might surprise you with my mischievous side once we get to know each other better.",
  };
  
  // API Key test mode state
  const [testApiKey, setTestApiKey] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [testApiKeyError, setTestApiKeyError] = useState<string | null>(null);
  
  const handleToggleTestMode = () => {
    setIsTestMode(!isTestMode);
    setTestApiKeyError(null);
  };
  
  const handleClearTestKey = () => {
    setTestApiKey('');
    setTestApiKeyError(null);
  };
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Chat with <span className="gradient-text">Blueberry Babe</span></h1>
              <p className="text-lg text-gray-300 mb-6">
                Have a conversation with our sweet and playful AI companion!
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="glass-card mb-6">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">API Key Settings</CardTitle>
                  <p className="text-gray-300 text-sm">
                    By default, the AI chat uses the server's OpenAI API key. Enable test mode to use your own API key.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testApiKeyError && (
                      <ApiKeyWarning 
                        message={testApiKeyError} 
                        details="Please check that your API key is valid and has access to the OpenAI API."
                      />
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="test-mode" 
                          checked={isTestMode} 
                          onCheckedChange={handleToggleTestMode}
                        />
                        <Label htmlFor="test-mode">Use my own OpenAI API key</Label>
                      </div>
                      {isTestMode && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleClearTestKey}
                          disabled={!testApiKey}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    
                    {isTestMode && (
                      <div className="relative">
                        <div className="flex">
                          <div className="relative flex-1">
                            <KeyRound className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                              type={showApiKey ? "text" : "password"}
                              placeholder="sk-..." 
                              className="pl-9 pr-12 bg-dark border-dark-border"
                              value={testApiKey}
                              onChange={(e) => setTestApiKey(e.target.value)}
                            />
                            <button 
                              type="button"
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-200"
                            >
                              {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-400">
                          Your API key is never stored on our servers. It's only used for your current session.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            
              <Card className="glass-card">
                <CardHeader className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-berry/30">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={personality.avatarSrc} alt={personality.name} className="object-cover" />
                      <AvatarFallback className={personality.avatarColor}>
                        {personality.avatarText}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{personality.name}</CardTitle>
                    <p className="text-gray-300">
                      {personality.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">About Me</h3>
                    <p className="text-gray-300">
                      {personality.personality}
                    </p>
                  </div>
                  
                  <div className="mb-6 p-6 bg-dark-lighter rounded-lg border border-dark-border">
                    <h3 className="text-lg font-semibold mb-3">Chat</h3>
                    
                    <ChatWindow
                      personalityId={personality.id}
                      personalityName={personality.name}
                      avatarSrc={personality.avatarSrc}
                      avatarFallback={personality.avatarText}
                      avatarColor={personality.avatarColor}
                      personality={personality.personality}
                      testApiKey={isTestMode ? testApiKey : undefined}
                      onApiKeyError={setTestApiKeyError}
                    />
                  </div>
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
