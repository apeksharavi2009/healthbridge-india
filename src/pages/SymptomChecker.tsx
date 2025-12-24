import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Send, PlayCircle } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  videoSuggestions?: { title: string; category: string }[];
}

const SymptomChecker: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: t.chatGreeting,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const symptoms = [
    { key: 'periodPain', label: t.periodPain, category: 'menstrualHealth' },
    { key: 'irregularPeriods', label: t.irregularPeriods, category: 'menstrualHealth' },
    { key: 'heavyBleeding', label: t.heavyBleeding, category: 'menstrualHealth' },
    { key: 'noPeriodsLong', label: t.noPeriodsLong, category: 'pregnancy' },
    { key: 'pregnancyInfo', label: t.pregnancyInfo, category: 'pregnancy' },
    { key: 'breastHealth', label: t.breastHealth, category: 'generalHealth' },
  ];

  const getBotResponse = (symptomKey: string): Message => {
    const responseMap: Record<string, { text: string; videos: { title: string; category: string }[] }> = {
      periodPain: {
        text: language === 'en' 
          ? "I understand you're experiencing period pain. This is common but can be managed. I recommend watching these helpful videos:"
          : language === 'hi'
          ? "मैं समझती हूं कि आपको माहवारी में दर्द हो रहा है। यह सामान्य है लेकिन इसे संभाला जा सकता है। मैं इन सहायक वीडियो देखने की सलाह देती हूं:"
          : "ನೀವು ಮುಟ್ಟಿನ ನೋವನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ ಎಂದು ನಾನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತೇನೆ. ಇದು ಸಾಮಾನ್ಯ ಆದರೆ ನಿರ್ವಹಿಸಬಹುದು. ಈ ಸಹಾಯಕ ವೀಡಿಯೊಗಳನ್ನು ನೋಡಲು ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ:",
        videos: [
          { title: "Managing Period Pain", category: "menstrualHealth" },
          { title: "Home Remedies for Cramps", category: "menstrualHealth" },
        ],
      },
      irregularPeriods: {
        text: language === 'en'
          ? "Irregular periods can happen for many reasons. Here are some videos that explain more:"
          : language === 'hi'
          ? "अनियमित माहवारी कई कारणों से हो सकती है। यहां कुछ वीडियो हैं जो अधिक समझाते हैं:"
          : "ಅನಿಯಮಿತ ಮುಟ್ಟು ಅನೇಕ ಕಾರಣಗಳಿಂದ ಸಂಭವಿಸಬಹುದು. ಇಲ್ಲಿ ಹೆಚ್ಚಿನ ವಿವರಣೆ ನೀಡುವ ಕೆಲವು ವೀಡಿಯೊಗಳಿವೆ:",
        videos: [
          { title: "Understanding Your Cycle", category: "menstrualHealth" },
          { title: "When to See a Doctor", category: "menstrualHealth" },
        ],
      },
      heavyBleeding: {
        text: language === 'en'
          ? "Heavy bleeding during periods needs attention. Please watch these videos and consider speaking with a doctor:"
          : language === 'hi'
          ? "माहवारी के दौरान अधिक रक्तस्राव पर ध्यान देने की जरूरत है। कृपया ये वीडियो देखें और डॉक्टर से बात करने पर विचार करें:"
          : "ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ಹೆಚ್ಚಿನ ರಕ್ತಸ್ರಾವಕ್ಕೆ ಗಮನ ಬೇಕು. ದಯವಿಟ್ಟು ಈ ವೀಡಿಯೊಗಳನ್ನು ನೋಡಿ ಮತ್ತು ವೈದ್ಯರೊಂದಿಗೆ ಮಾತನಾಡಲು ಪರಿಗಣಿಸಿ:",
        videos: [
          { title: "Managing Heavy Periods", category: "menstrualHealth" },
          { title: "Talk to a Doctor", category: "generalHealth" },
        ],
      },
      noPeriodsLong: {
        text: language === 'en'
          ? "Missing periods could indicate various things including pregnancy. Here's helpful information:"
          : language === 'hi'
          ? "माहवारी न आना कई चीजों का संकेत हो सकता है जिसमें गर्भावस्था भी शामिल है। यहां सहायक जानकारी है:"
          : "ಮುಟ್ಟು ಬಾರದಿರುವುದು ಗರ್ಭಧಾರಣೆ ಸೇರಿದಂತೆ ವಿವಿಧ ವಿಷಯಗಳನ್ನು ಸೂಚಿಸಬಹುದು. ಇಲ್ಲಿ ಸಹಾಯಕ ಮಾಹಿತಿ ಇದೆ:",
        videos: [
          { title: "Pregnancy Signs", category: "pregnancy" },
          { title: "Missed Period Causes", category: "menstrualHealth" },
        ],
      },
      pregnancyInfo: {
        text: language === 'en'
          ? "I can help you learn about pregnancy. Here are some informative videos:"
          : language === 'hi'
          ? "मैं आपको गर्भावस्था के बारे में जानने में मदद कर सकती हूं। यहां कुछ जानकारीपूर्ण वीडियो हैं:"
          : "ಗರ್ಭಧಾರಣೆ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ಇಲ್ಲಿ ಕೆಲವು ಮಾಹಿತಿಪೂರ್ಣ ವೀಡಿಯೊಗಳಿವೆ:",
        videos: [
          { title: "Pregnancy Basics", category: "pregnancy" },
          { title: "Prenatal Care", category: "pregnancy" },
        ],
      },
      breastHealth: {
        text: language === 'en'
          ? "Breast health is important. Here are videos about self-examination and general care:"
          : language === 'hi'
          ? "स्तन स्वास्थ्य महत्वपूर्ण है। यहां स्व-परीक्षण और सामान्य देखभाल के बारे में वीडियो हैं:"
          : "ಸ್ತನ ಆರೋಗ್ಯ ಮುಖ್ಯ. ಇಲ್ಲಿ ಸ್ವಯಂ ಪರೀಕ್ಷೆ ಮತ್ತು ಸಾಮಾನ್ಯ ಆರೈಕೆ ಬಗ್ಗೆ ವೀಡಿಯೊಗಳಿವೆ:",
        videos: [
          { title: "Breast Self-Exam", category: "generalHealth" },
          { title: "Breast Health Tips", category: "generalHealth" },
        ],
      },
    };

    const response = responseMap[symptomKey] || {
      text: language === 'en'
        ? "Thank you for sharing. Here are some general health videos that might help:"
        : language === 'hi'
        ? "साझा करने के लिए धन्यवाद। यहां कुछ सामान्य स्वास्थ्य वीडियो हैं जो मदद कर सकते हैं:"
        : "ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದ. ಸಹಾಯ ಮಾಡಬಹುದಾದ ಕೆಲವು ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ವೀಡಿಯೊಗಳು ಇಲ್ಲಿವೆ:",
      videos: [
        { title: "Women's Health Basics", category: "generalHealth" },
      ],
    };

    return {
      id: Date.now(),
      type: 'bot',
      content: response.text,
      videoSuggestions: response.videos,
    };
  };

  const handleSymptomClick = (symptom: typeof symptoms[0]) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: symptom.label,
    };

    const botResponse = getBotResponse(symptom.key);

    setMessages((prev) => [...prev, userMessage, botResponse]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
    };

    const botResponse: Message = {
      id: Date.now() + 1,
      type: 'bot',
      content: language === 'en'
        ? "Thank you for sharing. To help you better, please select one of the symptoms below or I can show you some general health videos."
        : language === 'hi'
        ? "साझा करने के लिए धन्यवाद। आपकी बेहतर मदद के लिए, कृपया नीचे दिए गए लक्षणों में से एक चुनें या मैं आपको कुछ सामान्य स्वास्थ्य वीडियो दिखा सकती हूं।"
        : "ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದ. ನಿಮಗೆ ಉತ್ತಮವಾಗಿ ಸಹಾಯ ಮಾಡಲು, ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಲಕ್ಷಣಗಳಲ್ಲಿ ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನಾನು ನಿಮಗೆ ಕೆಲವು ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ವೀಡಿಯೊಗಳನ್ನು ತೋರಿಸಬಹುದು.",
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-soft">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t.symptomChecker}</h1>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 max-w-lg mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`chat-bubble ${
                  message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                }`}
              >
                {message.content}
              </div>
              
              {/* Video suggestions */}
              {message.videoSuggestions && (
                <div className="mt-3 space-y-2 mr-auto max-w-[85%]">
                  {message.videoSuggestions.map((video, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/videos?category=${video.category}`)}
                      className="flex items-center gap-3 w-full p-3 bg-accent/10 
                               rounded-xl border border-accent/20 hover:bg-accent/20 
                               transition-colors text-left"
                    >
                      <PlayCircle className="w-8 h-8 text-accent flex-shrink-0" />
                      <span className="text-foreground">{video.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Common symptoms buttons */}
        <div className="mt-6">
          <p className="text-muted-foreground mb-3">{t.commonSymptoms}:</p>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom) => (
              <button
                key={symptom.key}
                onClick={() => handleSymptomClick(symptom)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full 
                         text-base hover:bg-primary hover:text-primary-foreground 
                         transition-colors"
              >
                {symptom.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-background p-4 sticky bottom-0">
        <div className="max-w-lg mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.chatPlaceholder}
            className="flex-1 px-5 py-4 bg-secondary rounded-2xl text-lg 
                     border-2 border-transparent focus:border-primary 
                     focus:outline-none transition-colors"
          />
          <button
            onClick={handleSendMessage}
            className="btn-large btn-primary px-6"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
