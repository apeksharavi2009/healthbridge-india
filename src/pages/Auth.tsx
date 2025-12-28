import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, User, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AuthMode = 'login' | 'signup';
type UserRole = 'patient' | 'doctor';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      navigate('/home');
    }
  }, [user, authLoading, navigate]);

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: {
        en: mode === 'login' ? 'Welcome Back' : 'Create Account',
        hi: mode === 'login' ? 'वापसी पर स्वागत है' : 'खाता बनाएं',
        kn: mode === 'login' ? 'ಮರಳಿ ಸ್ವಾಗತ' : 'ಖಾತೆ ರಚಿಸಿ'
      },
      subtitle: {
        en: mode === 'login' ? 'Sign in to continue' : 'Join Jyothi Health',
        hi: mode === 'login' ? 'जारी रखने के लिए साइन इन करें' : 'ज्योति स्वास्थ्य से जुड़ें',
        kn: mode === 'login' ? 'ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ' : 'ಜ್ಯೋತಿ ಆರೋಗ್ಯಕ್ಕೆ ಸೇರಿ'
      },
      email: {
        en: 'Email',
        hi: 'ईमेल',
        kn: 'ಇಮೇಲ್'
      },
      password: {
        en: 'Password',
        hi: 'पासवर्ड',
        kn: 'ಪಾಸ್ವರ್ಡ್'
      },
      fullName: {
        en: 'Full Name',
        hi: 'पूरा नाम',
        kn: 'ಪೂರ್ಣ ಹೆಸರು'
      },
      login: {
        en: 'Sign In',
        hi: 'साइन इन करें',
        kn: 'ಸೈನ್ ಇನ್'
      },
      signup: {
        en: 'Create Account',
        hi: 'खाता बनाएं',
        kn: 'ಖಾತೆ ರಚಿಸಿ'
      },
      switchToSignup: {
        en: "Don't have an account? Sign up",
        hi: 'खाता नहीं है? साइन अप करें',
        kn: 'ಖಾತೆ ಇಲ್ಲವೇ? ಸೈನ್ ಅಪ್ ಮಾಡಿ'
      },
      switchToLogin: {
        en: 'Already have an account? Sign in',
        hi: 'पहले से खाता है? साइन इन करें',
        kn: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ಸೈನ್ ಇನ್ ಮಾಡಿ'
      },
      patient: {
        en: 'Patient',
        hi: 'मरीज',
        kn: 'ರೋಗಿ'
      },
      doctor: {
        en: 'Doctor',
        hi: 'डॉक्टर',
        kn: 'ವೈದ್ಯರು'
      },
      iAmA: {
        en: 'I am a',
        hi: 'मैं हूं',
        kn: 'ನಾನು'
      }
    };
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive'
          });
        }
      } else {
        if (!fullName.trim()) {
          toast({
            title: 'Error',
            description: 'Please enter your full name',
            variant: 'destructive'
          });
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName, role);
        if (error) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Success',
            description: 'Account created successfully!'
          });
        }
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse-soft text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center">
        <button 
          onClick={() => navigate('/home')}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm animate-slide-up">
          <h1 className="text-center mb-2">{getText('title')}</h1>
          <p className="text-center text-muted-foreground mb-8">{getText('subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-lg">{getText('iAmA')}</Label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('patient')}
                      className={`flex-1 py-4 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                        role === 'patient' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">{getText('patient')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('doctor')}
                      className={`flex-1 py-4 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                        role === 'doctor' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Stethoscope className="w-5 h-5" />
                      <span className="font-medium">{getText('doctor')}</span>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-lg">{getText('fullName')}</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-12 py-6 text-lg"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">{getText('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-6 text-lg"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">{getText('password')}</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 py-6 text-lg"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Submit */}
            <Button 
              type="submit" 
              className="w-full py-6 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? '...' : mode === 'login' ? getText('login') : getText('signup')}
            </Button>
          </form>

          {/* Switch Mode */}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="w-full mt-6 text-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {mode === 'login' ? getText('switchToSignup') : getText('switchToLogin')}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Auth;
