import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Settings, Globe } from 'lucide-react';

interface HeaderProps {
  title?: string;
  onSettingsClick?: () => void;
  showLanguageSwitch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onSettingsClick, 
  showLanguageSwitch = true 
}) => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'nl' ? 'en' : 'nl');
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">
          {title || t('appTitle')}
        </h1>
        
        <div className="flex items-center gap-3">
          {showLanguageSwitch && (
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label={`Switch to ${language === 'nl' ? 'English' : 'Nederlands'}`}
            >
              <Globe size={16} />
              <span className="uppercase font-bold">
                {language === 'nl' ? 'EN' : 'NL'}
              </span>
            </button>
          )}
          
          {onSettingsClick && (
            <button
              onClick={onSettingsClick}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              aria-label={t('settings')}
            >
              <Settings size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};