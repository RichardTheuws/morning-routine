import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProgress } from '../../hooks/useProgress';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Header } from '../common/Header';
import { ArrowLeft, Download, Trash2, Globe, Info, Github } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { t, language, setLanguage } = useLanguage();
  const { progress, resetProgress } = useProgress();

  const exportProgress = () => {
    const data = {
      export_date: new Date().toISOString(),
      progress: progress,
      app_version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `morning-routine-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAllData = () => {
    if (confirm(language === 'nl' 
      ? 'Weet je zeker dat je alle voortgang wilt wissen? Dit kan niet ongedaan gemaakt worden.'
      : 'Are you sure you want to reset all progress? This cannot be undone.'
    )) {
      resetProgress();
      localStorage.removeItem('morning-routine-onboarded');
      alert(language === 'nl' 
        ? 'Alle data is gewist. De app wordt opnieuw opgestart.'
        : 'All data has been reset. The app will restart.'
      );
      window.location.reload();
    }
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
            {language === 'nl' ? 'Taal' : 'Language'}
          </h3>
          <div className="flex gap-3">
            <Button
              variant={language === 'nl' ? 'primary' : 'outline'}
              onClick={() => setLanguage('nl')}
              className="flex-1"
            >
              Nederlands
            </Button>
            <Button
              variant={language === 'en' ? 'primary' : 'outline'}
              onClick={() => setLanguage('en')}
              className="flex-1"
            >
              English
            </Button>
          </div>
        </Card>

        {/* Progress Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {language === 'nl' ? 'Voortgang overzicht' : 'Progress Overview'}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{progress.routines_completed}</div>
              <div className="text-sm text-slate-600">
                {language === 'nl' ? 'Routines voltooid' : 'Routines completed'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progress.current_streak}</div>
              <div className="text-sm text-slate-600">
                {language === 'nl' ? 'Huidige streak' : 'Current streak'}
              </div>
            </div>
          </div>
          <Button onClick={exportProgress} icon={Download} variant="outline" className="w-full mb-3">
            {language === 'nl' ? 'Voortgang exporteren' : 'Export progress'}
          </Button>
          <Button onClick={resetAllData} icon={Trash2} variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
            {language === 'nl' ? 'Alle data wissen' : 'Reset all data'}
          </Button>
        </Card>

        {/* App Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {language === 'nl' ? 'Over deze app' : 'About this app'}
          </h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              {language === 'nl' 
                ? 'Morning Routine App v1.0.0 - Privacy-first, open source ochtendroutine app.'
                : 'Morning Routine App v1.0.0 - Privacy-first, open source morning routine app.'
              }
            </p>
            <p>
              {language === 'nl'
                ? '✓ Geen account nodig - alles blijft lokaal op jouw apparaat'
                : '✓ No account needed - everything stays local on your device'
              }
            </p>
            <p>
              {language === 'nl'
                ? '✓ Open source - bekijk de code op GitHub'
                : '✓ Open source - view the code on GitHub'
              }
            </p>
            <p>
              {language === 'nl'
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
            {language === 'nl' ? 'Bekijk op GitHub' : 'View on GitHub'}
          </Button>
        </Card>

        {/* Reset Onboarding */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {language === 'nl' ? 'Opnieuw instellen' : 'Reconfigure'}
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            {language === 'nl'
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
            {language === 'nl' ? 'Setup opnieuw doorlopen' : 'Restart setup'}
          </Button>
        </Card>
      </div>
    </div>
  );
};