import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';
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
  const { isReady } = useLanguage();
  const [currentState, setCurrentState] = useState<AppState>(() => {
    try {
      // Check if user has completed onboarding
      const hasOnboarded = localStorage.getItem('morning-routine-onboarded');
      return hasOnboarded ? 'dashboard' : 'welcome';
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return 'welcome';
    }
  });
  
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>('beginner');
  const [selectedDuration, setSelectedDuration] = useState<number>(10);
  const { updateProgress } = useProgress();

  // Select exercises based on user goals and level - MUST be at top level before any returns
  const selectedExercises = React.useMemo(() => {
    console.log('Selecting exercises for goals:', selectedGoals, 'duration:', selectedDuration);
    
    if (selectedGoals.length === 0) {
      // Default selection for first-time users
      return exercises.slice(0, Math.min(5, exercises.length));
    }
    
    // Step 1: Filter exercises based on selected goals
    const filteredExercises = exercises.filter(exercise => 
      exercise.goals.some(goal => selectedGoals.includes(goal))
    );
    
    console.log('Filtered exercises by goals:', filteredExercises.length);
    
    // Step 2: Calculate target number of exercises based on duration
    // Assume average exercise takes 2-3 minutes
    const targetExerciseCount = Math.max(3, Math.min(8, Math.floor(selectedDuration / 2.5)));
    
    console.log('Target exercise count for', selectedDuration, 'minutes:', targetExerciseCount);
    
    let finalExercises: typeof exercises = [];
    
    // Step 3: Prioritize goal-specific exercises
    if (filteredExercises.length >= targetExerciseCount) {
      // We have enough goal-specific exercises
      finalExercises = filteredExercises.slice(0, targetExerciseCount);
    } else {
      // Need to supplement with general exercises
      finalExercises = [...filteredExercises];
      
      // Add general exercises that don't conflict with goals
      const generalExercises = exercises.filter(exercise => 
        !filteredExercises.includes(exercise) &&
        // Prefer exercises that are generally beneficial
        (exercise.goals.includes('Mobility') || 
         exercise.goals.includes('Reduce back pain') ||
         exercise.category.includes('Mobility'))
      );
      
      const remainingSlots = targetExerciseCount - finalExercises.length;
      finalExercises = [...finalExercises, ...generalExercises.slice(0, remainingSlots)];
      
      // If still not enough, add any remaining exercises
      if (finalExercises.length < targetExerciseCount) {
        const anyRemaining = exercises.filter(ex => !finalExercises.includes(ex));
        finalExercises = [...finalExercises, ...anyRemaining.slice(0, targetExerciseCount - finalExercises.length)];
      }
    }
    
    console.log('Final selected exercises:', finalExercises.map(ex => ex.name_en));
    return finalExercises;
  }, [selectedGoals, selectedDuration]);

  // Save user preferences when they complete onboarding
  const saveUserPreferences = (goals: string[], level: UserLevel, duration: number) => {
    try {
      const preferences = {
        goals,
        level,
        duration,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('morning-routine-preferences', JSON.stringify(preferences));
      console.log('Saved user preferences:', preferences);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  // Load user preferences on app start
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('morning-routine-preferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        console.log('Loaded user preferences:', preferences);
        setSelectedGoals(preferences.goals || []);
        setSelectedLevel(preferences.level || 'beginner');
        setSelectedDuration(preferences.duration || 10);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  }, []);
    

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

  // Show loading screen while translations are loading
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-slate-700 font-medium">Loading Morning Routine...</div>
          <div className="text-slate-500 text-sm mt-1">Preparing your experience</div>
        </div>
      </div>
    );
  }

  const handleOnboardingComplete = (goals: string[], level: UserLevel, duration: number) => {
    console.log('Onboarding completed with:', { goals, level, duration });
    setSelectedGoals(goals);
    setSelectedLevel(level);
    setSelectedDuration(duration);
    saveUserPreferences(goals, level, duration);
    try {
      localStorage.setItem('morning-routine-onboarded', 'true');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    setCurrentState('dashboard');
  };

  const handleStartRoutine = () => {
    setCurrentState('routine-session');
  };

  const handleRoutineComplete = () => {
    // Calculate total duration of selected exercises
    const totalDuration = selectedExercises.reduce((total, exercise) => {
      const duration = exercise.levels[selectedLevel].duration;
      const minutes = parseInt(duration.replace('m', ''));
      return total + minutes;
    }, 0);
    
    updateProgress(totalDuration);
    setCurrentState('dashboard');
  };

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