import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'doctor';
  content: string;
  timestamp: Date;
}

const DoctorChat: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const doctorName = searchParams.get('doctor') || 'Doctor';
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'doctor',
      content: language === 'en' 
        ? `Hello! I'm ${doctorName}. How can I help you today?`
        : language === 'hi'
        ? `नमस्ते! मैं ${doctorName} हूं। आज मैं आपकी कैसे मदद कर सकती हूं?`
        : `ನಮಸ್ಕಾರ! ನಾನು ${doctorName}. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse: ChatMessage = {
        id: Date.now() + 1,
        sender: 'doctor',
        content: language === 'en'
          ? "Thank you for sharing that with me. I'm reviewing your message and will respond shortly. In the meantime, please let me know if you have any other concerns."
          : language === 'hi'
          ? "यह मेरे साथ साझा करने के लिए धन्यवाद। मैं आपका संदेश देख रही हूं और जल्द ही जवाब दूंगी। इस बीच, अगर आपकी कोई अन्य चिंता हो तो मुझे बताएं।"
          : "ಅದನ್ನು ನನ್ನೊಂದಿಗೆ ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು. ನಾನು ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೇನೆ ಮತ್ತು ಶೀಘ್ರದಲ್ಲೇ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇನೆ. ಅಷ್ಟರಲ್ಲಿ, ನಿಮಗೆ ಬೇರೆ ಯಾವುದೇ ಕಾಳಜಿಗಳಿದ್ದರೆ ದಯವಿಟ್ಟು ತಿಳಿಸಿ.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, doctorResponse]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const pageTitle = language === 'en' ? 'Chat with Doctor' : language === 'hi' ? 'डॉक्टर से चैट करें' : 'ವೈದ್ಯರೊಂದಿಗೆ ಚಾಟ್';
  const placeholder = language === 'en' ? 'Type your message...' : language === 'hi' ? 'अपना संदेश लिखें...' : 'ನಿಮ್ಮ ಸಂದೇಶ ಬರೆಯಿರಿ...';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-soft">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/connect-doctor')}
              className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold">{doctorName}</h1>
              <p className="text-sm opacity-80">
                {language === 'en' ? 'Online' : language === 'hi' ? 'ऑनलाइन' : 'ಆನ್‌ಲೈನ್'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
              <Video className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 max-w-lg mx-auto w-full">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-secondary text-foreground rounded-bl-md'
                }`}
              >
                <p className="text-base">{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-background p-4 sticky bottom-0">
        <div className="max-w-lg mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={placeholder}
            className="flex-1 px-5 py-4 bg-secondary rounded-2xl text-lg 
                     border-2 border-transparent focus:border-primary 
                     focus:outline-none transition-colors"
          />
          <button
            onClick={handleSend}
            className="btn-large btn-primary px-6"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
