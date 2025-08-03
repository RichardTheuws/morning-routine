import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePrivacy } from '../../hooks/usePrivacy';
import { useProgress } from '../../hooks/useProgress';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Header } from '../common/Header';
import { ArrowLeft, Download, Trash2, Globe, Info, Github, Shield, FileText } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation(['common', 'onboarding']);
  const { 
    consent, 
    exportData, 
    revokeConsent, 
    generatePrivacyReport,
    updateConsent 
  } = usePrivacy();
  const { progress, resetProgress } = useProgress();

  const isLanguageDutch = i18n.language === 'nl';

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const resetAllData = () => {
    if (confirm(isLanguageDutch 
      ? 'Weet je zeker dat je alle voortgang wilt wissen? Dit kan niet ongedaan gemaakt worden.'
      : 'Are you sure you want to reset all progress? This cannot be undone.'
    )) {
      resetProgress();
      localStorage.removeItem('morning-routine-onboarded');
      alert(isLanguageDutch 
        ? 'Alle data is gewist. De app wordt opnieuw opgestart.'
        : 'All data has been reset. The app will restart.'
      );
      window.location.reload();
    }
  };

  const downloadPrivacyReport = () => {
    const report = generatePrivacyReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `privacy-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        title={t('settings')} 
        showLanguageSwitch={false}
      />
      
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <Button variant="ghost" onClick={onBack} icon={ArrowLeft} className="mb-4">
          {t('back')}
        </Button>

        {/* Language Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {isLanguageDutch ? 'Taal' : 'Language'}
          </h3>
          <div className="flex gap-3">
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
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {isLanguageDutch ? 'Privacy & Gegevens' : 'Privacy & Data'}
          </h3>
          
          <div className="space-y-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">
                {isLanguageDutch ? 'Video demonstraties' : 'Video demonstrations'}
              </span>
              <button
                onClick={() => updateConsent({ videoContent: !consent?.videoContent })}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  consent?.videoContent ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  consent?.videoContent ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">
                {isLanguageDutch ? 'Anonieme analytics' : 'Anonymous analytics'}
              </span>
              <button
                onClick={() => updateConsent({ analytics: !consent?.analytics })}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  consent?.analytics ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  consent?.analytics ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={downloadPrivacyReport} icon={FileText} variant="outline" className="flex-1">
              {isLanguageDutch ? 'Privacy rapport' : 'Privacy report'}
            </Button>
            <Button onClick={exportData} icon={Download} variant="outline" className="flex-1">
              {isLanguageDutch ? 'Data exporteren' : 'Export data'}
            </Button>
          </div>
        </Card>

        {/* Progress Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {isLanguageDutch ? 'Voortgang overzicht' : 'Progress Overview'}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{progress.routines_completed}</div>
              <div className="text-sm text-slate-600">
                {isLanguageDutch ? 'Routines voltooid' : 'Routines completed'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progress.current_streak}</div>
              <div className="text-sm text-slate-600">
                {isLanguageDutch ? 'Huidige streak' : 'Current streak'}
              </div>
            </div>
          </div>
          <Button onClick={resetAllData} icon={Trash2} variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
            {isLanguageDutch ? 'Alle data wissen' : 'Reset all data'}
          </Button>
        </Card>

        {/* App Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {isLanguageDutch ? 'Over deze app' : 'About this app'}
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              {isLanguageDutch 
                ? 'Morning Routine App v1.0.0 - Privacy-first, open source ochtendroutine app.'
                : 'Morning Routine App v1.0.0 - Privacy-first, open source morning routine app.'
              }
            </p>
            <p>
              {isLanguageDutch
                ? '✓ Geen account nodig - alles blijft lokaal op jouw apparaat'
                : '✓ No account needed - everything stays local on your device'
              }
            </p>
            <p>
              {isLanguageDutch
                ? '✓ Open source - bekijk de code op GitHub'
                : '✓ Open source - view the code on GitHub'
              }
            </p>
            <p>
              {isLanguageDutch
                ? '✓ Geen tracking of data verzameling'
                : '✓ No tracking or data collection'
              }
            </p>
          </div>
          <Button 
            variant="outline" 
            icon={Github} 
            className="w-full mt-4"
            onClick={() => window.open('https://github.com/your-repo/morning-routine-app', '_blank')}
          >
            {isLanguageDutch ? 'Bekijk op GitHub' : 'View on GitHub'}
          </Button>
        </Card>

        {/* Reset Onboarding */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {isLanguageDutch ? 'Opnieuw instellen' : 'Reconfigure'}
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            {isLanguageDutch
              ? 'Doorloop de setup opnieuw om je doelen, niveau of tijdsduur aan te passen.'
              : 'Go through setup again to adjust your goals, level, or duration.'
            }
          </p>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              localStorage.removeItem('morning-routine-onboarded');
              window.location.reload();
            }}
          >
            {isLanguageDutch ? 'Setup opnieuw doorlopen' : 'Restart setup'}
          </Button>
        </Card>
      </div>
    </div>
  );
};