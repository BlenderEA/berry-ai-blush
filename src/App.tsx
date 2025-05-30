
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Mutants from "./pages/Mutants";
import Lab from "./pages/Lab";
import Prophecies from "./pages/Prophecies";
import Pack from "./pages/Pack";
import Lore from "./pages/Lore";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/mutants" element={<Mutants />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/prophecies" element={<Prophecies />} />
          <Route path="/pack" element={<Pack />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
