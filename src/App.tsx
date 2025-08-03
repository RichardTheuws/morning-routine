import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageProvider } from './contexts/LanguageContext';
import { PrivacyConsent } from './components/privacy/PrivacyConsent';
import { usePrivacy } from './hooks/usePrivacy';
import { Welcome } from './components/onboarding/Welcome';
import { GoalSelection } from './components/onboarding/GoalSelection';
import { LevelSelection } from './components/onboarding/LevelSelection';
import { DurationSelection } from './components/onboarding/DurationSelection';
import { Dashboard } from './components/home/Dashboard';
import { RoutineSession } from './components/routine/RoutineSession';
import { SettingsPage } from './components/settings/SettingsPage';
import { exercises } from './data/exercises';
import { UserLevel } from './types/Exercise';
import { useProgress } from './hooks/useProgress';
import { privacyService } from './services/PrivacyService';

type AppState = 
  | 'welcome'
  | 'goals'
  | 'level'
  | 'duration'
  | 'dashboard'
  | 'routine-session'
  | 'exercises'
  | 'create-routine'
  | 'settings';

function AppContent() {
  const { showConsentDialog, updateConsent, isConsentValid } = usePrivacy();
  const [currentState, setCurrentState] = useState<AppState>(() => {
    // Check if user has completed onboarding
    const hasOnboarded = localStorage.getItem('morning-routine-onboarded');
    return hasOnboarded ? 'dashboard' : 'welcome';
  });
  
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>('beginner');
  const [selectedDuration, setSelectedDuration] = useState<number>(10);
  const { updateProgress } = useProgress();

  // Show privacy consent first if needed
  if (showConsentDialog) {
    return (
      <PrivacyConsent 
        onConsentGiven={(consent) => {
          updateConsent(consent);
        }} 
      />
    );
  }

  const handleOnboardingComplete = (goals: string[], level: UserLevel, duration: number) => {
    setSelectedGoals(goals);
    setSelectedLevel(level);
    setSelectedDuration(duration);
    localStorage.setItem('morning-routine-onboarded', 'true');
    setCurrentState('dashboard');
  };

  const handleStartRoutine = () => {
    setCurrentState('routine-session');
  };

  const handleRoutineComplete = () => {
    // Calculate total duration of selected exercises
    const totalDuration = exercises.slice(0, 3).reduce((total, exercise) => {
      const duration = exercise.levels[selectedLevel].duration;
      const minutes = parseInt(duration.replace('m', ''));
      return total + minutes;
    }, 0);
    
    updateProgress(totalDuration);
    setCurrentState('dashboard');
  };

  const selectedExercises = exercises.slice(0, 3); // For demo, use first 3 exercises

  switch (currentState) {
    case 'welcome':
      return <Welcome onNext={() => setCurrentState('goals')} />;
    
    case 'goals':
      return (
        <GoalSelection
          onNext={(goals) => {
            setSelectedGoals(goals);
            setCurrentState('level');
          }}
          onBack={() => setCurrentState('welcome')}
        />
      );
    
    case 'level':
      return (
        <LevelSelection
          onNext={(level) => {
            setSelectedLevel(level);
            setCurrentState('duration');
          }}
          onBack={() => setCurrentState('goals')}
        />
      );
    
    case 'duration':
      return (
        <DurationSelection
          onComplete={(duration) => {
            handleOnboardingComplete(selectedGoals, selectedLevel, duration);
          }}
          onBack={() => setCurrentState('level')}
        />
      );
    
    case 'dashboard':
      return (
        <Dashboard
          onStartRoutine={handleStartRoutine}
          onCreateRoutine={() => setCurrentState('create-routine')}
          onViewExercises={() => setCurrentState('exercises')}
          onSettings={() => setCurrentState('settings')}
        />
      );
    
    case 'routine-session':
      return (
        <RoutineSession
          exercises={selectedExercises}
          level={selectedLevel}
          onComplete={handleRoutineComplete}
          onExit={() => setCurrentState('dashboard')}
        />
      );
    
    case 'settings':
      return (
        <SettingsPage
          onBack={() => setCurrentState('dashboard')}
        />
      );
    
    default:
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Feature Coming Soon
            </h2>
            <p className="text-slate-600 mb-4">This feature is under development.</p>
            <button
              onClick={() => setCurrentState('dashboard')}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
  }
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;