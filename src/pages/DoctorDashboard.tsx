import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  LogOut, 
  Phone, 
  Video, 
  MessageSquare, 
  Users, 
  Clock,
  CheckCircle,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DoctorProfile {
  specialty: string;
  experience_years: number;
  is_available: boolean;
  languages: string[];
}

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut, isDoctor, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: {
        en: 'Doctor Dashboard',
        hi: 'डॉक्टर डैशबोर्ड',
        kn: 'ವೈದ್ಯರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'
      },
      availability: {
        en: 'Availability',
        hi: 'उपलब्धता',
        kn: 'ಲಭ್ಯತೆ'
      },
      available: {
        en: 'Available for calls',
        hi: 'कॉल के लिए उपलब्ध',
        kn: 'ಕರೆಗಳಿಗೆ ಲಭ್ಯ'
      },
      unavailable: {
        en: 'Not available',
        hi: 'उपलब्ध नहीं',
        kn: 'ಲಭ್ಯವಿಲ್ಲ'
      },
      stats: {
        en: 'Today\'s Stats',
        hi: 'आज के आंकड़े',
        kn: 'ಇಂದಿನ ಅಂಕಿಅಂಶಗಳು'
      },
      patients: {
        en: 'Patients',
        hi: 'मरीज',
        kn: 'ರೋಗಿಗಳು'
      },
      calls: {
        en: 'Calls',
        hi: 'कॉल्स',
        kn: 'ಕರೆಗಳು'
      },
      chats: {
        en: 'Chats',
        hi: 'चैट',
        kn: 'ಚಾಟ್‌ಗಳು'
      },
      quickActions: {
        en: 'Quick Actions',
        hi: 'त्वरित कार्रवाई',
        kn: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು'
      },
      startCall: {
        en: 'Start Call',
        hi: 'कॉल शुरू करें',
        kn: 'ಕರೆ ಪ್ರಾರಂಭಿಸಿ'
      },
      startVideo: {
        en: 'Video Call',
        hi: 'वीडियो कॉल',
        kn: 'ವೀಡಿಯೊ ಕರೆ'
      },
      viewChats: {
        en: 'View Chats',
        hi: 'चैट देखें',
        kn: 'ಚಾಟ್‌ಗಳನ್ನು ನೋಡಿ'
      },
      settings: {
        en: 'Settings',
        hi: 'सेटिंग्स',
        kn: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು'
      },
      signOut: {
        en: 'Sign Out',
        hi: 'साइन आउट',
        kn: 'ಸೈನ್ ಔಟ್'
      },
      unauthorized: {
        en: 'You are not authorized to access this page',
        hi: 'आप इस पृष्ठ तक पहुंचने के लिए अधिकृत नहीं हैं',
        kn: 'ಈ ಪುಟವನ್ನು ಪ್ರವೇಶಿಸಲು ನಿಮಗೆ ಅಧಿಕಾರವಿಲ್ಲ'
      }
    };
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (!authLoading && user && !isDoctor) {
      navigate('/home');
      return;
    }

    if (user && isDoctor) {
      fetchDoctorProfile();
    }
  }, [user, isDoctor, authLoading, navigate]);

  const fetchDoctorProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching doctor profile:', error);
    } else if (data) {
      setProfile(data);
      setIsAvailable(data.is_available);
    }
    setLoading(false);
  };

  const toggleAvailability = async () => {
    if (!user) return;

    const newStatus = !isAvailable;
    setIsAvailable(newStatus);

    const { error } = await supabase
      .from('doctor_profiles')
      .update({ is_available: newStatus })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating availability:', error);
      setIsAvailable(!newStatus);
      toast({
        title: 'Error',
        description: 'Failed to update availability',
        variant: 'destructive'
      });
    } else {
      toast({
        title: newStatus ? getText('available') : getText('unavailable'),
        description: newStatus ? 'Patients can now reach you' : 'You are now offline'
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/home');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse-soft text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!isDoctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-xl text-foreground mb-4">{getText('unauthorized')}</p>
          <Button onClick={() => navigate('/home')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{getText('title')}</h1>
          <button 
            onClick={handleSignOut}
            className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        {/* Availability Toggle */}
        <div className="bg-primary-foreground/10 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">{getText('availability')}</p>
            <p className="text-sm opacity-80">
              {isAvailable ? getText('available') : getText('unavailable')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <Switch
              checked={isAvailable}
              onCheckedChange={toggleAvailability}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <section>
          <h2 className="text-lg font-semibold mb-4">{getText('stats')}</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-4 text-center border border-border">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">{getText('patients')}</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center border border-border">
              <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">{getText('calls')}</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center border border-border">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">{getText('chats')}</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-4">{getText('quickActions')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="feature-card flex flex-col items-center py-6">
              <div className="icon-circle bg-green-500/10">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <span className="font-medium">{getText('startCall')}</span>
            </button>
            <button className="feature-card flex flex-col items-center py-6">
              <div className="icon-circle bg-blue-500/10">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <span className="font-medium">{getText('startVideo')}</span>
            </button>
            <button 
              onClick={() => navigate('/doctor-chat')}
              className="feature-card flex flex-col items-center py-6"
            >
              <div className="icon-circle bg-purple-500/10">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <span className="font-medium">{getText('viewChats')}</span>
            </button>
            <button className="feature-card flex flex-col items-center py-6">
              <div className="icon-circle bg-orange-500/10">
                <Settings className="w-8 h-8 text-orange-600" />
              </div>
              <span className="font-medium">{getText('settings')}</span>
            </button>
          </div>
        </section>

        {/* Pending Requests */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>
          <div className="bg-card rounded-xl p-6 border border-border text-center">
            <Clock className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">No pending requests</p>
            <p className="text-sm text-muted-foreground mt-1">
              Patient requests will appear here
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
