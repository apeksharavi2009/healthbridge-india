import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser, UserProfile as UserProfileType } from '@/contexts/UserContext';
import { ArrowLeft, User, Phone, Calendar, Baby, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { userProfile, setUserProfile } = useUser();
  const { toast } = useToast();

  const [formData, setFormData] = useState<UserProfileType>({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    age: userProfile?.age || '',
    pregnancyStatus: userProfile?.pregnancyStatus || 'not_sure',
  });

  const pregnancyOptions = [
    { 
      value: 'not_pregnant', 
      label: language === 'en' ? 'Not Pregnant' : language === 'hi' ? 'गर्भवती नहीं' : 'ಗರ್ಭಿಣಿ ಅಲ್ಲ',
      icon: '🚫'
    },
    { 
      value: 'pregnant', 
      label: language === 'en' ? 'Pregnant' : language === 'hi' ? 'गर्भवती' : 'ಗರ್ಭಿಣಿ',
      icon: '🤰'
    },
    { 
      value: 'trying', 
      label: language === 'en' ? 'Trying to Conceive' : language === 'hi' ? 'गर्भधारण की कोशिश' : 'ಗರ್ಭಧಾರಣೆಗೆ ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೇನೆ',
      icon: '💫'
    },
    { 
      value: 'postpartum', 
      label: language === 'en' ? 'Recently Gave Birth' : language === 'hi' ? 'हाल ही में प्रसव हुआ' : 'ಇತ್ತೀಚೆಗೆ ಹೆರಿಗೆಯಾಯಿತು',
      icon: '👶'
    },
    { 
      value: 'not_sure', 
      label: language === 'en' ? 'Not Sure / Prefer Not to Say' : language === 'hi' ? 'पता नहीं / बताना नहीं चाहती' : 'ಗೊತ್ತಿಲ್ಲ / ಹೇಳಲು ಇಷ್ಟಪಡುವುದಿಲ್ಲ',
      icon: '❓'
    },
  ];

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: language === 'en' ? 'Please enter your name' : language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
        variant: 'destructive',
      });
      return;
    }

    setUserProfile(formData);
    toast({
      title: language === 'en' ? 'Profile Saved!' : language === 'hi' ? 'प्रोफ़ाइल सहेजा गया!' : 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಲಾಗಿದೆ!',
      description: language === 'en' ? 'Your information has been saved.' : language === 'hi' ? 'आपकी जानकारी सहेज ली गई है।' : 'ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸಲಾಗಿದೆ.',
    });
    navigate('/home');
  };

  const pageTitle = language === 'en' ? 'Your Profile' : language === 'hi' ? 'आपकी प्रोफ़ाइल' : 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್';
  const nameLabel = language === 'en' ? 'Your Name' : language === 'hi' ? 'आपका नाम' : 'ನಿಮ್ಮ ಹೆಸರು';
  const phoneLabel = language === 'en' ? 'Phone Number' : language === 'hi' ? 'फ़ोन नंबर' : 'ಫೋನ್ ಸಂಖ್ಯೆ';
  const ageLabel = language === 'en' ? 'Age' : language === 'hi' ? 'उम्र' : 'ವಯಸ್ಸು';
  const pregnancyLabel = language === 'en' ? 'Pregnancy Status' : language === 'hi' ? 'गर्भावस्था की स्थिति' : 'ಗರ್ಭಧಾರಣೆ ಸ್ಥಿತಿ';
  const saveButton = language === 'en' ? 'Save Profile' : language === 'hi' ? 'प्रोफ़ाइल सहेजें' : 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ';
  const helpText = language === 'en' 
    ? 'This information helps us give you better health advice.' 
    : language === 'hi' 
    ? 'यह जानकारी हमें आपको बेहतर स्वास्थ्य सलाह देने में मदद करती है।'
    : 'ಈ ಮಾಹಿತಿ ನಿಮಗೆ ಉತ್ತಮ ಆರೋಗ್ಯ ಸಲಹೆ ನೀಡಲು ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-soft">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{pageTitle}</h1>
        </div>
      </header>

      <main className="p-6 max-w-lg mx-auto">
        {/* Help text */}
        <p className="text-muted-foreground text-lg mb-6 text-center">
          {helpText}
        </p>

        <div className="space-y-6">
          {/* Name input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg font-medium text-foreground">
              <User className="w-5 h-5 text-primary" />
              {nameLabel}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={language === 'en' ? 'Enter your name' : language === 'hi' ? 'अपना नाम दर्ज करें' : 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ'}
              className="w-full px-5 py-4 bg-secondary rounded-2xl text-lg 
                       border-2 border-transparent focus:border-primary 
                       focus:outline-none transition-colors"
            />
          </div>

          {/* Phone input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg font-medium text-foreground">
              <Phone className="w-5 h-5 text-primary" />
              {phoneLabel}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={language === 'en' ? 'Enter phone number' : language === 'hi' ? 'फ़ोन नंबर दर्ज करें' : 'ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ'}
              className="w-full px-5 py-4 bg-secondary rounded-2xl text-lg 
                       border-2 border-transparent focus:border-primary 
                       focus:outline-none transition-colors"
            />
          </div>

          {/* Age input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-lg font-medium text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              {ageLabel}
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder={language === 'en' ? 'Enter your age' : language === 'hi' ? 'अपनी उम्र दर्ज करें' : 'ನಿಮ್ಮ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ'}
              className="w-full px-5 py-4 bg-secondary rounded-2xl text-lg 
                       border-2 border-transparent focus:border-primary 
                       focus:outline-none transition-colors"
            />
          </div>

          {/* Pregnancy status */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-medium text-foreground">
              <Baby className="w-5 h-5 text-primary" />
              {pregnancyLabel}
            </label>
            <div className="space-y-2">
              {pregnancyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, pregnancyStatus: option.value as any })}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.pregnancyStatus === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 bg-secondary'
                  }`}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="flex-1 text-lg text-foreground">{option.label}</span>
                  {formData.pregnancyStatus === option.value && (
                    <Check className="w-6 h-6 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="w-full btn-large btn-primary mt-8 text-xl"
          >
            {saveButton}
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
