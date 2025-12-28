import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Share, MoreVertical, Home } from "lucide-react";
import jyothiLogo from "@/assets/jyothi-logo.png";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallApp = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const translations = {
    title: {
      en: "Install Jyothi App",
      hi: "ज्योति ऐप इंस्टॉल करें",
      kn: "ಜ್ಯೋತಿ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ"
    },
    subtitle: {
      en: "Get quick access to healthcare support",
      hi: "स्वास्थ्य सहायता तक त्वरित पहुंच प्राप्त करें",
      kn: "ಆರೋಗ್ಯ ಬೆಂಬಲಕ್ಕೆ ತ್ವರಿತ ಪ್ರವೇಶ ಪಡೆಯಿರಿ"
    },
    installButton: {
      en: "Install App",
      hi: "ऐप इंस्टॉल करें",
      kn: "ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ"
    },
    installed: {
      en: "App is installed!",
      hi: "ऐप इंस्टॉल हो गया!",
      kn: "ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಆಗಿದೆ!"
    },
    iosInstructions: {
      en: "To install on iPhone/iPad:",
      hi: "iPhone/iPad पर इंस्टॉल करने के लिए:",
      kn: "iPhone/iPad ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು:"
    },
    step1: {
      en: "Tap the Share button",
      hi: "शेयर बटन टैप करें",
      kn: "ಶೇರ್ ಬಟನ್ ಟ್ಯಾಪ್ ಮಾಡಿ"
    },
    step2: {
      en: "Scroll down and tap 'Add to Home Screen'",
      hi: "नीचे स्क्रॉल करें और 'होम स्क्रीन में जोड़ें' टैप करें",
      kn: "ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ ಮತ್ತು 'ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ಗೆ ಸೇರಿಸಿ' ಟ್ಯಾಪ್ ಮಾಡಿ"
    },
    androidInstructions: {
      en: "To install on Android:",
      hi: "Android पर इंस्टॉल करने के लिए:",
      kn: "Android ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು:"
    },
    androidStep1: {
      en: "Tap the menu button (⋮)",
      hi: "मेनू बटन (⋮) टैप करें",
      kn: "ಮೆನು ಬಟನ್ (⋮) ಟ್ಯಾಪ್ ಮಾಡಿ"
    },
    androidStep2: {
      en: "Tap 'Install app' or 'Add to Home Screen'",
      hi: "'ऐप इंस्टॉल करें' या 'होम स्क्रीन में जोड़ें' टैप करें",
      kn: "'ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ' ಅಥವಾ 'ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ಗೆ ಸೇರಿಸಿ' ಟ್ಯಾಪ್ ಮಾಡಿ"
    },
    goHome: {
      en: "Go to Home",
      hi: "होम पर जाएं",
      kn: "ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ"
    }
  };

  const { language } = useLanguage();
  const lang = language as "en" | "hi" | "kn";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 text-center">
        <img src={jyothiLogo} alt="Jyothi" className="w-24 h-24 mx-auto mb-4 rounded-2xl" />
        <h1 className="text-2xl font-bold">{translations.title[lang]}</h1>
        <p className="text-lg opacity-90 mt-2">{translations.subtitle[lang]}</p>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {isInstalled ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-xl font-semibold text-green-600">{translations.installed[lang]}</p>
          </div>
        ) : deferredPrompt ? (
          <div className="text-center py-8">
            <Button
              onClick={handleInstall}
              size="lg"
              className="text-xl py-8 px-12 gap-4"
            >
              <Download className="w-8 h-8" />
              {translations.installButton[lang]}
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {isIOS ? (
              <div className="bg-muted rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <Smartphone className="w-6 h-6" />
                  {translations.iosInstructions[lang]}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-background p-4 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Share className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-lg font-medium">1. {translations.step1[lang]}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-background p-4 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Home className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-lg font-medium">2. {translations.step2[lang]}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <Smartphone className="w-6 h-6" />
                  {translations.androidInstructions[lang]}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-background p-4 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MoreVertical className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-lg font-medium">1. {translations.androidStep1[lang]}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-background p-4 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Download className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-lg font-medium">2. {translations.androidStep2[lang]}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={() => navigate("/home")}
          variant="outline"
          size="lg"
          className="w-full text-xl py-6 gap-3"
        >
          <Home className="w-6 h-6" />
          {translations.goHome[lang]}
        </Button>
      </div>
    </div>
  );
};

export default InstallApp;
