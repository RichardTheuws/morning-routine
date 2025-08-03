import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Shield, Eye, Database, Video, Info } from 'lucide-react';
import { privacyService, PrivacyConsent as IPrivacyConsent } from '../../services/PrivacyService';

interface PrivacyConsentProps {
  onConsentGiven: (consent: IPrivacyConsent) => void;
}

export const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ onConsentGiven }) => {
  const { t, i18n } = useTranslation(['common', 'onboarding']);
  const [consent, setConsent] = useState<Partial<IPrivacyConsent>>({
    functionalCookies: true, // Required for app functionality
    exerciseData: true, // Required for app functionality
    analytics: false,
    videoContent: false
  });
  const [showDetails, setShowDetails] = useState(false);

  const handleConsentChange = (key: keyof IPrivacyConsent, value: boolean) => {
    setConsent(prev => ({ ...prev, [key]: value }));
  };

  const handleAcceptAll = () => {
    const fullConsent = {
      ...consent,
      analytics: true,
      videoContent: true
    };
    privacyService.setConsent(fullConsent);
    onConsentGiven(fullConsent as IPrivacyConsent);
  };

  const handleAcceptSelected = () => {
    privacyService.setConsent(consent);
    onConsentGiven(consent as IPrivacyConsent);
  };

  const isLanguageDutch = i18n.language === 'nl';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-6">
          <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {isLanguageDutch ? 'Privacy & Gegevensverwerking' : 'Privacy & Data Processing'}
          </h2>
          <p className="text-slate-600">
            {isLanguageDutch 
              ? 'We respecteren je privacy. Kies welke gegevens je wilt delen.'
              : 'We respect your privacy. Choose what data you want to share.'
            }
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Required functional data */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <span className="font-medium text-emerald-900">
                {isLanguageDutch ? 'Functionele gegevens (Vereist)' : 'Functional Data (Required)'}
              </span>
            </div>
            <p className="text-sm text-emerald-800 mb-3">
              {isLanguageDutch 
                ? 'Nodig voor het opslaan van je routines, voortgang en instellingen. Blijft lokaal op je apparaat.'
                : 'Required to save your routines, progress and settings. Stays local on your device.'
              }
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-700">
                {isLanguageDutch ? 'Altijd ingeschakeld' : 'Always enabled'}
              </span>
              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
            </div>
          </div>

          {/* Optional video content */}
          <div className="p-4 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Video className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-slate-900">
                {isLanguageDutch ? 'Video demonstraties' : 'Video Demonstrations'}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              {isLanguageDutch 
                ? 'Laadt video\'s van Pexels voor betere oefening demonstraties. Geen tracking.'
                : 'Loads videos from Pexels for better exercise demonstrations. No tracking.'
              }
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                {isLanguageDutch ? 'Optioneel - verbetert ervaring' : 'Optional - improves experience'}
              </span>
              <button
                onClick={() => handleConsentChange('videoContent', !consent.videoContent)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  consent.videoContent ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  consent.videoContent ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          {/* Analytics (disabled by default) */}
          <div className="p-4 bg-white border border-slate-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-slate-900">
                {isLanguageDutch ? 'Anonieme gebruiksstatistieken' : 'Anonymous Usage Analytics'}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              {isLanguageDutch 
                ? 'Helpt ons de app te verbeteren. Geen persoonlijke gegevens, volledig anoniem.'
                : 'Helps us improve the app. No personal data, completely anonymous.'
              }
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                {isLanguageDutch ? 'Optioneel - helpt ontwikkeling' : 'Optional - helps development'}
              </span>
              <button
                onClick={() => handleConsentChange('analytics', !consent.analytics)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  consent.analytics ? 'bg-purple-500' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  consent.analytics ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy details toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full p-3 text-left text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 flex items-center gap-2"
        >
          <Info className="w-4 h-4" />
          {isLanguageDutch ? 'Meer privacy details' : 'More privacy details'}
          <span className="ml-auto">{showDetails ? '−' : '+'}</span>
        </button>

        {showDetails && (
          <div className="mb-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-700 space-y-2">
            <h4 className="font-medium text-slate-900">
              {isLanguageDutch ? 'Gegevensverwerking Details:' : 'Data Processing Details:'}
            </h4>
            <ul className="space-y-1 text-xs">
              <li>• {isLanguageDutch ? 'Lokale opslag: Alle data blijft op jouw apparaat' : 'Local storage: All data stays on your device'}</li>
              <li>• {isLanguageDutch ? 'Geen servers: Geen data wordt naar externe servers gestuurd' : 'No servers: No data sent to external servers'}</li>
              <li>• {isLanguageDutch ? 'Open source: Code is volledig transparant en controleerbaar' : 'Open source: Code is fully transparent and auditable'}</li>
              <li>• {isLanguageDutch ? 'GDPR compliant: Volledige naleving van Europese privacy wetgeving' : 'GDPR compliant: Full compliance with European privacy legislation'}</li>
              <li>• {isLanguageDutch ? 'Recht op vergetelheid: Data kan altijd volledig gewist worden' : 'Right to erasure: Data can always be completely deleted'}</li>
            </ul>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleAcceptSelected}
            className="flex-1"
          >
            {isLanguageDutch ? 'Alleen geselecteerde' : 'Selected only'}
          </Button>
          <Button 
            onClick={handleAcceptAll}
            className="flex-1"
          >
            {isLanguageDutch ? 'Alles accepteren' : 'Accept all'}
          </Button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          {isLanguageDutch 
            ? 'Je kunt deze instellingen altijd wijzigen in de app instellingen.'
            : 'You can always change these settings in the app settings.'
          }
        </p>
      </Card>
    </div>
  );
};