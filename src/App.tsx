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
import { ExercisesPage } from './components/exercises/ExercisesPage';
import { CustomRoutinePage } from './components/routine/CustomRoutinePage';
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
    console.log('🎯 Selecting exercises for goals:', selectedGoals, 'duration:', selectedDuration);
    
    if (selectedGoals.length === 0) {
      // Default selection for first-time users
      console.log('⚠️ No goals selected, using default exercises');
      const defaultExercises = exercises
        .filter(ex => ex.goals.includes('Mobility') || ex.goals.includes('Energy boost'))
        .slice(0, Math.min(5, exercises.length));
      console.log('📋 Default exercises:', defaultExercises.map(ex => ex.name_en));
      return defaultExercises;
    }
    
    // Step 1: Score exercises based on goal relevance
    const scoredExercises = exercises.map(exercise => {
      let score = 0;
      let matchedGoals: string[] = [];
      
      exercise.goals.forEach(goal => {
        if (selectedGoals.includes(goal)) {
          score += 10; // High score for direct goal match
          matchedGoals.push(goal);
        }
      });
      
      // Bonus points for exercises that support multiple selected goals
      const goalMatches = exercise.goals.filter(goal => selectedGoals.includes(goal)).length;
      if (goalMatches > 1) {
        score += goalMatches * 5; // Bonus for multi-goal exercises
      }
      
      // Category-based scoring for better variety
      if (selectedGoals.includes('Reduce back pain') && exercise.category.includes('Back')) score += 5;
      if (selectedGoals.includes('Reduce neck pain') && exercise.category.includes('Neck')) score += 5;
      if (selectedGoals.includes('Build strength') && exercise.category.includes('Strength')) score += 5;
      if (selectedGoals.includes('Energy boost') && exercise.category.includes('Cardio')) score += 5;
      if (selectedGoals.includes('Mobility') && exercise.category.includes('Mobility')) score += 5;
      if (selectedGoals.includes('Fat loss') && exercise.category.includes('Cardio')) score += 5;
      if (selectedGoals.includes('Relaxation') && exercise.category.includes('Relaxation')) score += 5;
      
      return { exercise, score, matchedGoals };
    }).filter(item => item.score > 0); // Only include exercises with some relevance
    
    // Sort by score (highest first)
    scoredExercises.sort((a, b) => b.score - a.score);
    
    console.log('🔍 Scored exercises by goals:', scoredExercises.length, 'exercises found');
    console.log('📝 Top scored exercises:', scoredExercises.slice(0, 8).map(item => 
      `${item.exercise.name_en} (score: ${item.score}, goals: ${item.matchedGoals.join(', ')})`
    ));
    
    // Step 2: Calculate target number of exercises based on duration
    // More realistic: 1.5-2 minutes per exercise including rest
    const targetExerciseCount = Math.max(4, Math.min(10, Math.floor(selectedDuration / 2)));
    
    console.log('🎯 Target exercise count for', selectedDuration, 'minutes:', targetExerciseCount);
    
    // Step 3: Smart selection for balanced routine
    let finalExercises: typeof exercises = [];
    const selectedCategories = new Set<string>();
    
    // Prioritize highest scoring exercises but ensure variety
    for (const item of scoredExercises) {
      if (finalExercises.length >= targetExerciseCount) break;
      
      const exercise = item.exercise;
      const exerciseCategories = exercise.category;
      
      // Check if we already have too many exercises from the same category
      const categoryOverlap = exerciseCategories.some(cat => selectedCategories.has(cat));
      const categoryCount = Array.from(selectedCategories).filter(cat => 
        exerciseCategories.includes(cat)
      ).length;
      
      // Add exercise if:
      // 1. High score (>15) - always include top matches
      // 2. Or if we need variety and this adds new category
      // 3. Or if we have few exercises and this is relevant
      if (item.score >= 15 || 
          (!categoryOverlap && finalExercises.length < targetExerciseCount * 0.7) ||
          (finalExercises.length < 3 && item.score >= 5)) {
        
        finalExercises.push(exercise);
        exerciseCategories.forEach(cat => selectedCategories.add(cat));
        
        console.log(`✅ Added: ${exercise.name_en} (score: ${item.score}, categories: ${exerciseCategories.join(', ')})`);
      }
    }
    
    // Step 4: Fill remaining slots with complementary exercises
    if (finalExercises.length < targetExerciseCount) {
      console.log('🔄 Need more exercises, adding complementary ones...');
      
      // Add complementary exercises that work well with selected goals
      const complementaryExercises = exercises.filter(exercise => {
        if (finalExercises.includes(exercise)) return false;
        
        // Always good: mobility and core
        if (exercise.goals.includes('Mobility') || exercise.category.includes('Core')) return true;
        
        // For back pain: add core and mobility
        if (selectedGoals.includes('Reduce back pain') && 
            (exercise.category.includes('Core') || exercise.category.includes('Mobility'))) return true;
            
        // For neck pain: add shoulder mobility
        if (selectedGoals.includes('Reduce neck pain') && 
            exercise.category.includes('Shoulders')) return true;
            
        // For energy: add light cardio
        if (selectedGoals.includes('Energy boost') && 
            exercise.category.includes('Cardio')) return true;
            
        // For strength: add core
        if (selectedGoals.includes('Build strength') && 
            exercise.category.includes('Core')) return true;
            
        return false;
      });
      
      const remainingSlots = targetExerciseCount - finalExercises.length;
      finalExercises = [...finalExercises, ...complementaryExercises.slice(0, remainingSlots)];
      
      console.log('🔄 Added complementary exercises:', complementaryExercises.slice(0, remainingSlots).map(ex => ex.name_en));
    }
    
    // Step 5: Ensure we have at least minimum exercises
    if (finalExercises.length < 3) {
      console.log('⚠️ Still need more exercises, adding any suitable ones...');
      const anyRemaining = exercises.filter(ex => !finalExercises.includes(ex));
      const needed = Math.min(3 - finalExercises.length, anyRemaining.length);
      finalExercises = [...finalExercises, ...anyRemaining.slice(0, needed)];
    }
    
    // Step 6: Optimize order for better flow
    finalExercises = optimizeExerciseOrder(finalExercises, selectedGoals);
    
    console.log('🎉 Final selected exercises:');
    finalExercises.forEach((ex, index) => {
      const goalMatches = ex.goals.filter(goal => selectedGoals.includes(goal));
      console.log(`${index + 1}. ${ex.name_en} - Goals: ${goalMatches.join(', ')} - Categories: ${ex.category.join(', ')}`);
    });
    
    return finalExercises;
  }, [selectedGoals, selectedDuration]);

  // Helper function to optimize exercise order
  const optimizeExerciseOrder = (exerciseList: typeof exercises, goals: string[]) => {
    const ordered = [...exerciseList];
    
    // Sort by exercise type for better flow:
    // 1. Mobility/warm-up first
    // 2. Strength in middle  
    // 3. Cardio for energy
    // 4. Relaxation last
    ordered.sort((a, b) => {
      const getOrderScore = (ex: typeof exercises[0]) => {
        if (ex.category.includes('Relaxation')) return 4; // Last
        if (ex.category.includes('Cardio')) return 3; // Energy boost
        if (ex.category.includes('Strength')) return 2; // Middle
        if (ex.category.includes('Mobility')) return 1; // First
        return 2.5; // Default middle
      };
      
      return getOrderScore(a) - getOrderScore(b);
    });
    
    return ordered;
  };

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
    console.log('🎉 Routine completed!');
    // Calculate total duration of selected exercises
    const totalDuration = selectedExercises.reduce((total, exercise) => {
      const duration = exercise.levels[selectedLevel].duration;
      const minutes = parseInt(duration.replace('m', ''));
      return total + minutes;
    }, 0);
    
    console.log(`⏱️ Total routine duration: ${totalDuration} minutes`);
    updateProgress(totalDuration);
    console.log('📊 Progress updated');
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
    
    case 'exercises':
      return (
        <ExercisesPage
          onBack={() => setCurrentState('dashboard')}
        />
      );
    
    case 'create-routine':
      return (
        <CustomRoutinePage
          onBack={() => setCurrentState('dashboard')}
          onStartRoutine={(routine) => {
            // Convert routine to exercises for RoutineSession
            const routineExercises = exercises.filter(ex => routine.exercises.includes(ex.id));
            console.log('🎯 Starting custom routine:', routine.name_en, 'with', routineExercises.length, 'exercises');
            // For now, we'll use the existing routine session with the custom exercises
            // In the future, we could create a CustomRoutineSession component
            setCurrentState('routine-session');
          }}
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