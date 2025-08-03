import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { AnimationGenerator } from '../animations/AnimationGenerator';
import { Exercise, UserLevel } from '../../types/Exercise';
import { Play, Pause, SkipForward, ArrowLeft, CheckCircle, Activity } from 'lucide-react';

interface RoutineSessionProps {
  exercises: Exercise[];
  level: UserLevel;
  onComplete: () => void;
  onExit: () => void;
}

export const RoutineSession: React.FC<RoutineSessionProps> = ({ 
  exercises, 
  level, 
  onComplete, 
  onExit 
}) => {
  const { t, language } = useLanguage();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const currentExercise = exercises[currentExerciseIndex];
  const exerciseLevel = currentExercise?.levels[level];
  const exerciseName = language === 'nl' ? currentExercise?.name_nl : currentExercise?.name_en;
  const steps = language === 'nl' ? exerciseLevel?.steps_nl : exerciseLevel?.steps_en;
  const tips = language === 'nl' ? exerciseLevel?.tips_nl : exerciseLevel?.tips_en;

  // Convert duration string to seconds
  const getDurationInSeconds = (duration: string): number => {
    const match = duration.match(/(\d+)m/);
    return match ? parseInt(match[1]) * 60 : 60;
  };

  useEffect(() => {
    if (currentExercise) {
      setTimeRemaining(getDurationInSeconds(exerciseLevel.duration));
    }
  }, [currentExerciseIndex, currentExercise, exerciseLevel]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteExercise = () => {
    setCompletedExercises(prev => new Set(prev).add(currentExerciseIndex));
    
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsRunning(false);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsRunning(false);
    } else {
      onComplete();
    }
  };

  if (!currentExercise) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onExit} icon={ArrowLeft}>
            {t('back')}
          </Button>
          <div className="text-sm text-slate-600">
            {currentExerciseIndex + 1} / {exercises.length}
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{exerciseName}</h2>
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-slate-600">
              {exerciseLevel.reps} reps • {exerciseLevel.sets} set{exerciseLevel.sets > 1 ? 's' : ''}
            </p>
          </div>

          {/* Exercise Animation Placeholder */}
          <AnimationGenerator
            exerciseId={currentExercise.id}
            exerciseName={exerciseName || ''}
            steps={steps || []}
            animationInstruction={language === 'nl' ? exerciseLevel.animation_instruction_nl : exerciseLevel.animation_instruction_en}
            level={level}
            className="mb-6"
          />

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                {language === 'nl' ? 'Stappen:' : 'Steps:'}
              </h3>
              <ol className="space-y-2">
                {steps?.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                {language === 'nl' ? 'Tips:' : 'Tips:'}
              </h3>
              <ul className="space-y-1">
                {tips?.map((tip, index) => (
                  <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={isRunning ? () => setIsRunning(false) : () => setIsRunning(true)}
              icon={isRunning ? Pause : Play}
              className="flex-1"
            >
              {isRunning ? t('pause') : t('start')}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              icon={SkipForward}
            >
              {t('skip')}
            </Button>
            
            <Button 
              onClick={handleCompleteExercise}
              icon={CheckCircle}
              className="flex-1"
            >
              {t('complete')}
            </Button>
          </div>
        </Card>

        {/* Progress indicator */}
        <div className="flex gap-2 justify-center">
          {exercises.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                completedExercises.has(index)
                  ? 'bg-emerald-500'
                  : index === currentExerciseIndex
                  ? 'bg-blue-500'
                  : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};