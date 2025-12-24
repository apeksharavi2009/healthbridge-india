import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SplashScreen from "./pages/SplashScreen";
import LanguageSelection from "./pages/LanguageSelection";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import VideoLibrary from "./pages/VideoLibrary";
import ConnectDoctor from "./pages/ConnectDoctor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/select-language" element={<LanguageSelection />} />
            <Route path="/home" element={<Home />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/videos" element={<VideoLibrary />} />
            <Route path="/connect-doctor" element={<ConnectDoctor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
