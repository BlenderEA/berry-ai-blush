
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Token from "./pages/Token";
import AIChat from "./pages/AIChat";
import CreatorApplication from "./pages/CreatorApplication";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import ContentGuidelines from "./pages/ContentGuidelines";
import Whitepaper from "./pages/Whitepaper";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RiskDisclaimer from "./pages/RiskDisclaimer";
import NFTMint from "./pages/NFTMint";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/token" element={<Token />} />
          <Route path="/creator-application" element={<CreatorApplication />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/content-guidelines" element={<ContentGuidelines />} />
          <Route path="/disclaimer" element={<RiskDisclaimer />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/nft" element={<NFTMint />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
