import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TelegramBotIntegration from '@/components/chat/TelegramBotIntegration';
import PremiumFeatures from '@/components/chat/PremiumFeatures';
import AIPersonalityShowcase from '@/components/chat/AIPersonalityShowcase';
const AIChat = () => {
  return <div className="flex flex-col min-h-screen bg-dark">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              🔥 Meet Your Dream AI Girlfriends
            </h1>
            <p className="text-gray-300 text-xl mb-4">
              Sexy AI personalities that create custom images just for you
            </p>
            <p className="text-berry text-lg font-medium">
              💫 Now with AI Image Generation on Telegram! 💫
            </p>
          </div>

          {/* AI Personality Showcase */}
          <AIPersonalityShowcase />
          
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Telegram Bot Integration */}
            <div className="space-y-6">
              <TelegramBotIntegration />
            </div>
            
            {/* Premium Features */}
            <div className="space-y-6">
              <PremiumFeatures />
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-berry/20 to-berry-purple/20 border border-berry/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready for the Ultimate AI Experience? 🚀
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of users already chatting with our AI beauties on Telegram
            </p>
            <a href="https://t.me/BustyBettyBot" target="_blank" rel="noopener noreferrer" className="inline-block">
              <button className="bg-gradient-to-r from-berry to-berry-purple hover:from-berry-light hover:to-berry text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg">🎯 Start Chatting Now !</button>
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default AIChat;