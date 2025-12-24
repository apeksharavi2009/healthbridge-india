import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import jyothiLogo from '@/assets/jyothi-logo.png';

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8 animate-scale-in">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary flex items-center justify-center shadow-soft">
          <img 
            src={jyothiLogo} 
            alt="Jyothi" 
            className="w-28 h-28 md:w-36 md:h-36 object-contain rounded-full"
          />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-primary text-center mb-2 animate-slide-up">
        {t.selectLanguage}
      </h1>
      <p className="text-muted-foreground text-center mb-10 animate-slide-up animation-delay-100">
        भाषा चुनें • ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ
      </p>

      {/* Language options */}
      <div className="w-full max-w-md space-y-4">
        {languages.map((lang, index) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`lang-btn animate-slide-up ${
              language === lang.code ? 'lang-btn-active' : ''
            }`}
            style={{ animationDelay: `${(index + 2) * 100}ms` }}
          >
            <span className="text-2xl">{lang.nativeName}</span>
            {lang.code !== 'en' && (
              <span className="text-muted-foreground text-lg">({lang.name})</span>
            )}
          </button>
        ))}
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        className="mt-10 btn-large btn-primary w-full max-w-md flex items-center justify-center gap-3 animate-slide-up animation-delay-400"
      >
        <span>{t.continue}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};

export default LanguageSelection;
