import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserProvider } from "@/contexts/UserContext";
import SplashScreen from "./pages/SplashScreen";
import LanguageSelection from "./pages/LanguageSelection";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import VideoLibrary from "./pages/VideoLibrary";
import ConnectDoctor from "./pages/ConnectDoctor";
import UserProfile from "./pages/UserProfile";
import DoctorChat from "./pages/DoctorChat";
import InstallApp from "./pages/InstallApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <UserProvider>
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
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/doctor-chat" element={<DoctorChat />} />
              <Route path="/install" element={<InstallApp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
