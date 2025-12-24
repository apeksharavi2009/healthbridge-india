import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'kn';

interface Translations {
  // App-wide
  appName: string;
  selectLanguage: string;
  continue: string;
  back: string;
  home: string;
  
  // Language names
  english: string;
  hindi: string;
  kannada: string;
  
  // Home screen
  welcome: string;
  howCanWeHelp: string;
  
  // Features
  symptomChecker: string;
  symptomCheckerDesc: string;
  videoLibrary: string;
  videoLibraryDesc: string;
  connectDoctor: string;
  connectDoctorDesc: string;
  
  // Symptom Checker
  chatGreeting: string;
  chatPlaceholder: string;
  send: string;
  commonSymptoms: string;
  
  // Symptoms list
  periodPain: string;
  irregularPeriods: string;
  heavyBleeding: string;
  noPeriodsLong: string;
  pregnancyInfo: string;
  breastHealth: string;
  
  // Video Library
  allVideos: string;
  menstrualHealth: string;
  pregnancy: string;
  contraception: string;
  generalHealth: string;
  searchVideos: string;
  watchVideo: string;
  relatedVideos: string;
  
  // Connect Doctor
  callDoctor: string;
  videoCall: string;
  chatDoctor: string;
  availableDoctors: string;
  connectNow: string;
  schedule: string;
  available: string;
  busy: string;
  specialist: string;
  experience: string;
  years: string;
  
  // Common
  loading: string;
  error: string;
  tryAgain: string;
  noResults: string;
}

const translations: Record<Language, Translations> = {
  en: {
    appName: 'Jyothi',
    selectLanguage: 'Select Your Language',
    continue: 'Continue',
    back: 'Back',
    home: 'Home',
    
    english: 'English',
    hindi: 'हिंदी (Hindi)',
    kannada: 'ಕನ್ನಡ (Kannada)',
    
    welcome: 'Welcome to Jyothi',
    howCanWeHelp: 'How can we help you today?',
    
    symptomChecker: 'Symptom Checker',
    symptomCheckerDesc: 'Tell us how you feel and get helpful information',
    videoLibrary: 'Video Library',
    videoLibraryDesc: 'Learn about health through easy videos',
    connectDoctor: 'Talk to Doctor',
    connectDoctorDesc: 'Connect with healthcare professionals',
    
    chatGreeting: 'Hello! I am here to help you. Please tell me how you are feeling or select a symptom below.',
    chatPlaceholder: 'Type your message here...',
    send: 'Send',
    commonSymptoms: 'Common Symptoms',
    
    periodPain: 'Period Pain',
    irregularPeriods: 'Irregular Periods',
    heavyBleeding: 'Heavy Bleeding',
    noPeriodsLong: 'Missed Periods',
    pregnancyInfo: 'Pregnancy Information',
    breastHealth: 'Breast Health',
    
    allVideos: 'All Videos',
    menstrualHealth: 'Menstrual Health',
    pregnancy: 'Pregnancy',
    contraception: 'Family Planning',
    generalHealth: 'General Health',
    searchVideos: 'Search videos...',
    watchVideo: 'Watch Video',
    relatedVideos: 'Related Videos',
    
    callDoctor: 'Phone Call',
    videoCall: 'Video Call',
    chatDoctor: 'Text Chat',
    availableDoctors: 'Available Doctors',
    connectNow: 'Connect Now',
    schedule: 'Schedule',
    available: 'Available',
    busy: 'Busy',
    specialist: 'Specialist',
    experience: 'Experience',
    years: 'years',
    
    loading: 'Loading...',
    error: 'Something went wrong',
    tryAgain: 'Try Again',
    noResults: 'No results found',
  },
  hi: {
    appName: 'ज्योति',
    selectLanguage: 'अपनी भाषा चुनें',
    continue: 'आगे बढ़ें',
    back: 'वापस',
    home: 'होम',
    
    english: 'English (अंग्रेज़ी)',
    hindi: 'हिंदी',
    kannada: 'ಕನ್ನಡ (कन्नड़)',
    
    welcome: 'ज्योति में आपका स्वागत है',
    howCanWeHelp: 'आज हम आपकी कैसे मदद कर सकते हैं?',
    
    symptomChecker: 'लक्षण जांच',
    symptomCheckerDesc: 'हमें बताएं कि आप कैसा महसूस कर रही हैं',
    videoLibrary: 'वीडियो लाइब्रेरी',
    videoLibraryDesc: 'आसान वीडियो से स्वास्थ्य के बारे में जानें',
    connectDoctor: 'डॉक्टर से बात करें',
    connectDoctorDesc: 'स्वास्थ्य विशेषज्ञों से जुड़ें',
    
    chatGreeting: 'नमस्ते! मैं आपकी मदद के लिए यहां हूं। कृपया बताएं कि आप कैसा महसूस कर रही हैं या नीचे दिए गए लक्षण चुनें।',
    chatPlaceholder: 'यहां अपना संदेश लिखें...',
    send: 'भेजें',
    commonSymptoms: 'सामान्य लक्षण',
    
    periodPain: 'माहवारी में दर्द',
    irregularPeriods: 'अनियमित माहवारी',
    heavyBleeding: 'ज्यादा रक्तस्राव',
    noPeriodsLong: 'माहवारी न आना',
    pregnancyInfo: 'गर्भावस्था जानकारी',
    breastHealth: 'स्तन स्वास्थ्य',
    
    allVideos: 'सभी वीडियो',
    menstrualHealth: 'माहवारी स्वास्थ्य',
    pregnancy: 'गर्भावस्था',
    contraception: 'परिवार नियोजन',
    generalHealth: 'सामान्य स्वास्थ्य',
    searchVideos: 'वीडियो खोजें...',
    watchVideo: 'वीडियो देखें',
    relatedVideos: 'संबंधित वीडियो',
    
    callDoctor: 'फोन कॉल',
    videoCall: 'वीडियो कॉल',
    chatDoctor: 'मैसेज करें',
    availableDoctors: 'उपलब्ध डॉक्टर',
    connectNow: 'अभी जुड़ें',
    schedule: 'समय तय करें',
    available: 'उपलब्ध',
    busy: 'व्यस्त',
    specialist: 'विशेषज्ञ',
    experience: 'अनुभव',
    years: 'साल',
    
    loading: 'लोड हो रहा है...',
    error: 'कुछ गलत हो गया',
    tryAgain: 'फिर से कोशिश करें',
    noResults: 'कोई परिणाम नहीं मिला',
  },
  kn: {
    appName: 'ಜ್ಯೋತಿ',
    selectLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    continue: 'ಮುಂದುವರಿಸಿ',
    back: 'ಹಿಂದೆ',
    home: 'ಮುಖಪುಟ',
    
    english: 'English (ಇಂಗ್ಲಿಷ್)',
    hindi: 'हिंदी (ಹಿಂದಿ)',
    kannada: 'ಕನ್ನಡ',
    
    welcome: 'ಜ್ಯೋತಿಗೆ ಸ್ವಾಗತ',
    howCanWeHelp: 'ಇಂದು ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    
    symptomChecker: 'ಲಕ್ಷಣ ಪರೀಕ್ಷಕ',
    symptomCheckerDesc: 'ನಿಮಗೆ ಹೇಗೆ ಅನಿಸುತ್ತಿದೆ ಎಂದು ಹೇಳಿ',
    videoLibrary: 'ವೀಡಿಯೊ ಗ್ರಂಥಾಲಯ',
    videoLibraryDesc: 'ಸುಲಭ ವೀಡಿಯೊಗಳ ಮೂಲಕ ಆರೋಗ್ಯದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ',
    connectDoctor: 'ವೈದ್ಯರೊಂದಿಗೆ ಮಾತನಾಡಿ',
    connectDoctorDesc: 'ಆರೋಗ್ಯ ತಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
    
    chatGreeting: 'ನಮಸ್ಕಾರ! ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ನಿಮಗೆ ಹೇಗೆ ಅನಿಸುತ್ತಿದೆ ಎಂದು ಹೇಳಿ ಅಥವಾ ಕೆಳಗಿನ ಲಕ್ಷಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    chatPlaceholder: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
    send: 'ಕಳುಹಿಸಿ',
    commonSymptoms: 'ಸಾಮಾನ್ಯ ಲಕ್ಷಣಗಳು',
    
    periodPain: 'ಮುಟ್ಟಿನ ನೋವು',
    irregularPeriods: 'ಅನಿಯಮಿತ ಮುಟ್ಟು',
    heavyBleeding: 'ಹೆಚ್ಚಿನ ರಕ್ತಸ್ರಾವ',
    noPeriodsLong: 'ಮುಟ್ಟು ಬಾರದಿರುವುದು',
    pregnancyInfo: 'ಗರ್ಭಧಾರಣೆ ಮಾಹಿತಿ',
    breastHealth: 'ಸ್ತನ ಆರೋಗ್ಯ',
    
    allVideos: 'ಎಲ್ಲಾ ವೀಡಿಯೊಗಳು',
    menstrualHealth: 'ಮುಟ್ಟಿನ ಆರೋಗ್ಯ',
    pregnancy: 'ಗರ್ಭಧಾರಣೆ',
    contraception: 'ಕುಟುಂಬ ಯೋಜನೆ',
    generalHealth: 'ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ',
    searchVideos: 'ವೀಡಿಯೊಗಳನ್ನು ಹುಡುಕಿ...',
    watchVideo: 'ವೀಡಿಯೊ ನೋಡಿ',
    relatedVideos: 'ಸಂಬಂಧಿತ ವೀಡಿಯೊಗಳು',
    
    callDoctor: 'ಫೋನ್ ಕರೆ',
    videoCall: 'ವೀಡಿಯೊ ಕರೆ',
    chatDoctor: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    availableDoctors: 'ಲಭ್ಯವಿರುವ ವೈದ್ಯರು',
    connectNow: 'ಈಗ ಸಂಪರ್ಕಿಸಿ',
    schedule: 'ಸಮಯ ನಿಗದಿಪಡಿಸಿ',
    available: 'ಲಭ್ಯ',
    busy: 'ಕಾರ್ಯನಿರತ',
    specialist: 'ತಜ್ಞ',
    experience: 'ಅನುಭವ',
    years: 'ವರ್ಷಗಳು',
    
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    error: 'ಏನೋ ತಪ್ಪಾಗಿದೆ',
    tryAgain: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    noResults: 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
