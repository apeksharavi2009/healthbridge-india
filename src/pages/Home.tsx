import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, PlayCircle, Phone, Globe, User } from 'lucide-react';
import jyothiLogo from '@/assets/jyothi-logo.png';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const features = [
    {
      icon: MessageCircle,
      title: t.symptomChecker,
      description: t.symptomCheckerDesc,
      path: '/symptom-checker',
      color: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: PlayCircle,
      title: t.videoLibrary,
      description: t.videoLibraryDesc,
      path: '/videos',
      color: 'bg-accent/10',
      iconColor: 'text-accent',
    },
    {
      icon: Phone,
      title: t.connectDoctor,
      description: t.connectDoctorDesc,
      path: '/connect-doctor',
      color: 'bg-maroon-light/10',
      iconColor: 'text-maroon-light',
    },
  ];

  const languageLabels = {
    en: 'EN',
    hi: 'हि',
    kn: 'ಕ',
  };

  const cycleLanguage = () => {
    const langs: ('en' | 'hi' | 'kn')[] = ['en', 'hi', 'kn'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-soft">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-cream overflow-hidden">
              <img src={jyothiLogo} alt="Jyothi" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-bold">{t.appName}</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/profile')}
              className="p-2 bg-primary-foreground/10 rounded-xl hover:bg-primary-foreground/20 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={cycleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-xl 
                       hover:bg-primary-foreground/20 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="text-lg font-medium">{languageLabels[language]}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6 max-w-lg mx-auto">
        {/* Welcome section */}
        <section className="mb-6 animate-fade-in">
          <h1 className="text-primary mb-2">{t.welcome}</h1>
          <p className="text-muted-foreground">{t.howCanWeHelp}</p>
        </section>

        {/* Tutorial Video Placeholder */}
        <section className="mb-6 animate-fade-in">
          <div className="aspect-video bg-secondary rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center">
            <PlayCircle className="w-16 h-16 text-primary/40 mb-2" />
            <p className="text-muted-foreground text-lg text-center px-4">
              {language === 'en' ? 'App Tutorial Video Coming Soon' : language === 'hi' ? 'ऐप ट्यूटोरियल वीडियो जल्द आ रहा है' : 'ಆಪ್ ಟ್ಯುಟೋರಿಯಲ್ ವೀಡಿಯೊ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ'}
            </p>
          </div>
        </section>

        {/* Feature cards */}
        <section className="space-y-5">
          {features.map((feature, index) => (
            <button
              key={feature.path}
              onClick={() => navigate(feature.path)}
              className="feature-card w-full text-left animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className={`icon-circle ${feature.color}`}>
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-base">
                    {feature.description}
                  </p>
                </div>
                <div className="text-muted-foreground self-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </section>

        {/* Change language link */}
        <section className="mt-10 text-center animate-fade-in animation-delay-400">
          <button 
            onClick={() => navigate('/select-language')}
            className="text-muted-foreground hover:text-primary transition-colors 
                     flex items-center justify-center gap-2 mx-auto"
          >
            <Globe className="w-5 h-5" />
            <span>{t.selectLanguage}</span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
