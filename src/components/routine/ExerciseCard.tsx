import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../common/Card';
import { Exercise, UserLevel } from '../../types/Exercise';
import { Clock, Target, CheckCircle } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  level: UserLevel;
  isCompleted?: boolean;
  onClick?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  level, 
  isCompleted = false, 
  onClick 
}) => {
  const { language } = useLanguage();
  const exerciseLevel = exercise.levels[level];
  const name = language === 'nl' ? exercise.name_nl : exercise.name_en;
  const description = language === 'nl' ? exerciseLevel.description_nl : exerciseLevel.description_en;

  return (
    <Card hover onClick={onClick} className="p-4 relative">
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="w-6 h-6 text-emerald-500 fill-current" />
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
          <Target className="w-8 h-8 text-slate-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 mb-1">{name}</h3>
          <p className="text-sm text-slate-600 mb-3">{description}</p>
          
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{exerciseLevel.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{exerciseLevel.reps} reps</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{exerciseLevel.sets} set{exerciseLevel.sets > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};