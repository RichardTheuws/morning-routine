import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../types/Exercise';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  nl: {
    appTitle: 'Morning Routine',
    welcome: 'Welkom bij je Morning Routine',
    chooseLanguage: 'Kies je taal',
    chooseGoals: 'Kies je doelen',
    chooseLevel: 'Kies je niveau',
    chooseDuration: 'Kies tijdsduur',
    startRoutine: 'Start je routine',
    myRoutines: 'Mijn routines',
    exercises: 'Oefeningen',
    progress: 'Voortgang',
    settings: 'Instellingen',
    back: 'Terug',
    next: 'Volgende',
    previous: 'Vorige',
    done: 'Klaar',
    start: 'Start',
    pause: 'Pauze',
    resume: 'Hervatten',
    complete: 'Voltooien',
    skip: 'Overslaan',
    beginner: 'Beginner',
    advanced: 'Gevorderd',
    expert: 'Expert',
    minutes: 'minuten',
    seconds: 'seconden',
    wellDone: 'Goed gedaan!',
    routineCompleted: 'Routine voltooid!',
    goals: {
      backPain: 'Rugklachten verminderen',
      neckPain: 'Nekpijn verminderen',
      fatLoss: 'Vetverbranding',
      mobility: 'Mobiliteit',
      energy: 'Energie boost',
      strength: 'Kracht opbouwen',
      relaxation: 'Ontspanning'
    }
  },
  en: {
    appTitle: 'Morning Routine',
    welcome: 'Welcome to your Morning Routine',
    chooseLanguage: 'Choose your language',
    chooseGoals: 'Choose your goals',
    chooseLevel: 'Choose your level',
    chooseDuration: 'Choose duration',
    startRoutine: 'Start your routine',
    myRoutines: 'My routines',
    exercises: 'Exercises',
    progress: 'Progress',
    settings: 'Settings',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    done: 'Done',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    complete: 'Complete',
    skip: 'Skip',
    beginner: 'Beginner',
    advanced: 'Advanced',
    expert: 'Expert',
    minutes: 'minutes',
    seconds: 'seconds',
    wellDone: 'Well done!',
    routineCompleted: 'Routine completed!',
    goals: {
      backPain: 'Reduce back pain',
      neckPain: 'Reduce neck pain',
      fatLoss: 'Fat loss',
      mobility: 'Mobility',
      energy: 'Energy boost',
      strength: 'Build strength',
      relaxation: 'Relaxation'
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, ready } = useTranslation();
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('morning-routine-language');
      return (saved as Language) || 'nl';
    } catch (error) {
      console.warn('localStorage not available, using default language');
      return 'nl';
    }
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for i18n to be ready
    if (ready && i18n.isInitialized) {
      setIsReady(true);
      
      // Set language in i18n
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }
      
      // Save to localStorage
      try {
        localStorage.setItem('morning-routine-language', language);
      } catch (error) {
        console.warn('Could not save language preference');
      }
    }
  }, [language, ready, i18n]);

  useEffect(() => {
    // Listen for i18n language changes
    const handleLanguageChange = (lng: string) => {
      if (lng !== language && (lng === 'nl' || lng === 'en')) {
        setLanguage(lng as Language);
      }
    };

    if (i18n.isInitialized) {
      i18n.on('languageChanged', handleLanguageChange);
      return () => i18n.off('languageChanged', handleLanguageChange);
    }
  }, [language, i18n]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (i18n.isInitialized) {
      i18n.changeLanguage(lang);
    }
  };

  const t = (key: string): string => {
    if (!isReady || !i18n.isInitialized) {
      return key; // Return key as fallback while loading
    }
    
    try {
      const translation = i18n.t(key);
      return translation !== key ? translation : key;
    } catch (error) {
      console.warn(`Translation failed for key: ${key}`);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      isReady 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};