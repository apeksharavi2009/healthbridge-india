import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Phone, Video, MessageSquare, Clock, Star, User } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  nameHi: string;
  nameKn: string;
  specialty: string;
  specialtyHi: string;
  specialtyKn: string;
  experience: number;
  available: boolean;
  rating: number;
  avatar: string;
}

const ConnectDoctor: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<'call' | 'video' | 'chat' | null>(null);

  const connectionMethods = [
    {
      id: 'call' as const,
      icon: Phone,
      label: t.callDoctor,
      description: language === 'en' 
        ? 'Talk directly with a doctor' 
        : language === 'hi' 
        ? 'डॉक्टर से सीधे बात करें'
        : 'ವೈದ್ಯರೊಂದಿಗೆ ನೇರವಾಗಿ ಮಾತನಾಡಿ',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 'video' as const,
      icon: Video,
      label: t.videoCall,
      description: language === 'en' 
        ? 'See and talk with a doctor' 
        : language === 'hi' 
        ? 'डॉक्टर को देखें और बात करें'
        : 'ವೈದ್ಯರನ್ನು ನೋಡಿ ಮತ್ತು ಮಾತನಾಡಿ',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'chat' as const,
      icon: MessageSquare,
      label: t.chatDoctor,
      description: language === 'en' 
        ? 'Send messages to a doctor' 
        : language === 'hi' 
        ? 'डॉक्टर को संदेश भेजें'
        : 'ವೈದ್ಯರಿಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ',
      color: 'bg-primary/10',
      iconColor: 'text-primary',
    },
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      nameHi: 'डॉ. प्रिया शर्मा',
      nameKn: 'ಡಾ. ಪ್ರಿಯಾ ಶರ್ಮಾ',
      specialty: 'Gynecologist',
      specialtyHi: 'स्त्री रोग विशेषज्ञ',
      specialtyKn: 'ಸ್ತ್ರೀರೋಗ ತಜ್ಞ',
      experience: 12,
      available: true,
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80',
    },
    {
      id: '2',
      name: 'Dr. Anjali Patel',
      nameHi: 'डॉ. अंजलि पटेल',
      nameKn: 'ಡಾ. ಅಂಜಲಿ ಪಟೇಲ್',
      specialty: 'Obstetrician',
      specialtyHi: 'प्रसूति विशेषज्ञ',
      specialtyKn: 'ಪ್ರಸೂತಿ ತಜ್ಞ',
      experience: 8,
      available: true,
      rating: 4.6,
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&q=80',
    },
    {
      id: '3',
      name: 'Dr. Kavitha Rao',
      nameHi: 'डॉ. कविता राव',
      nameKn: 'ಡಾ. ಕವಿತಾ ರಾವ್',
      specialty: 'Women\'s Health Specialist',
      specialtyHi: 'महिला स्वास्थ्य विशेषज्ञ',
      specialtyKn: 'ಮಹಿಳಾ ಆರೋಗ್ಯ ತಜ್ಞ',
      experience: 15,
      available: false,
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&q=80',
    },
    {
      id: '4',
      name: 'Dr. Meera Krishnan',
      nameHi: 'डॉ. मीरा कृष्णन',
      nameKn: 'ಡಾ. ಮೀರಾ ಕೃಷ್ಣನ್',
      specialty: 'General Physician',
      specialtyHi: 'सामान्य चिकित्सक',
      specialtyKn: 'ಸಾಮಾನ್ಯ ವೈದ್ಯ',
      experience: 10,
      available: true,
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80',
    },
  ];

  const getLocalizedName = (doctor: Doctor) => {
    switch (language) {
      case 'hi': return doctor.nameHi;
      case 'kn': return doctor.nameKn;
      default: return doctor.name;
    }
  };

  const getLocalizedSpecialty = (doctor: Doctor) => {
    switch (language) {
      case 'hi': return doctor.specialtyHi;
      case 'kn': return doctor.specialtyKn;
      default: return doctor.specialty;
    }
  };

  const handleConnect = (doctorId: string) => {
    // In a real app, this would initiate the connection
    alert(
      language === 'en'
        ? `Connecting you with the doctor via ${selectedMethod}...`
        : language === 'hi'
        ? `${selectedMethod} के माध्यम से डॉक्टर से जोड़ रहे हैं...`
        : `${selectedMethod} ಮೂಲಕ ವೈದ್ಯರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತಿದ್ದೇವೆ...`
    );
  };

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
          <h1 className="text-xl font-bold">{t.connectDoctor}</h1>
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        {/* Connection method selection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {language === 'en' 
              ? 'How would you like to connect?' 
              : language === 'hi'
              ? 'आप कैसे जुड़ना चाहेंगी?'
              : 'ನೀವು ಹೇಗೆ ಸಂಪರ್ಕಿಸಲು ಬಯಸುತ್ತೀರಿ?'}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {connectionMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-center ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-14 h-14 ${method.color} rounded-full 
                              flex items-center justify-center mx-auto mb-3`}>
                  <method.icon className={`w-7 h-7 ${method.iconColor}`} />
                </div>
                <p className="font-medium text-foreground text-base">{method.label}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Doctor list */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {t.availableDoctors}
          </h2>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="feature-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={doctor.avatar}
                      alt={getLocalizedName(doctor)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {getLocalizedName(doctor)}
                        </h3>
                        <p className="text-muted-foreground text-base">
                          {getLocalizedSpecialty(doctor)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        doctor.available 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {doctor.available ? t.available : t.busy}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {doctor.experience} {t.years}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                        {doctor.rating}
                      </span>
                    </div>

                    {selectedMethod && doctor.available && (
                      <button
                        onClick={() => handleConnect(doctor.id)}
                        className="mt-4 w-full btn-large btn-primary text-base"
                      >
                        {t.connectNow}
                      </button>
                    )}
                    {!doctor.available && (
                      <button
                        className="mt-4 w-full btn-large bg-secondary text-secondary-foreground text-base"
                      >
                        {t.schedule}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConnectDoctor;
