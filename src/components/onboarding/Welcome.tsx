import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Sunrise, Shield, Heart } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  const { t, i18n } = useTranslation(['common', 'onboarding']);
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Sunrise className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t('common:appTitle')}
          </h1>
          <p className="text-slate-600">
            {t('onboarding:welcome.subtitle')}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm text-slate-700">
              {t('onboarding:welcome.features.privacy')}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm text-slate-700">
              {t('onboarding:welcome.features.personalized')}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-slate-700">
            {t('common:chooseLanguage')}
          </p>
          <div className="flex gap-2">
            <Button
              variant={i18n.language === 'nl' ? 'primary' : 'outline'}
              onClick={() => changeLanguage('nl')}
              className="flex-1"
            >
              Nederlands
            </Button>
            <Button
              variant={i18n.language === 'en' ? 'primary' : 'outline'}
              onClick={() => changeLanguage('en')}
              className="flex-1"
            >
              English
            </Button>
          </div>
        </div>

        <Button onClick={onNext} size="lg" className="w-full">
          {t('onboarding:welcome.getStarted')}
        </Button>
      </Card>
    </div>
  );
};