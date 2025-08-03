import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Sunrise, Shield, Heart } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  const { t, language, setLanguage, isReady } = useLanguage();
  
  const changeLanguage = (lang: string) => {
    setLanguage(lang as 'nl' | 'en');
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <div className="text-slate-600">Loading translations...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Sunrise className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t('appTitle')}
          </h1>
          <p className="text-slate-600">
            {language === 'nl' 
              ? 'Start elke dag met een gezonde, effectieve ochtendroutine. Privacyvriendelijk en volledig offline.'
              : 'Start every day with a healthy, effective morning routine. Privacy-friendly and completely offline.'
            }
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-slate-700">
              {language === 'nl' 
                ? 'Geen account nodig, alles blijft lokaal'
                : 'No account needed, everything stays local'
              }
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm text-slate-700">
              {language === 'nl' 
                ? 'Aangepast aan jouw doelen en niveau'
                : 'Tailored to your goals and level'
              }
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-slate-700">
            {t('common:chooseLanguage')}
          </p>
          <div className="flex gap-2">
            <Button
              variant={language === 'nl' ? 'primary' : 'outline'}
              onClick={() => changeLanguage('nl')}
              className="flex-1"
            >
              Nederlands
            </Button>
            <Button
              variant={language === 'en' ? 'primary' : 'outline'}
              onClick={() => changeLanguage('en')}
              className="flex-1"
            >
              English
            </Button>
          </div>
        </div>

        <Button onClick={onNext} size="lg" className="w-full">
          {language === 'nl' ? 'Laten we beginnen' : 'Let\'s get started'}
        </Button>
      </Card>
    </div>
  );
};