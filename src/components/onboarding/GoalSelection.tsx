import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface GoalSelectionProps {
  onNext: (goals: string[]) => void;
  onBack: () => void;
}

const availableGoals = [
  { id: 'backPain', key: 'goals.backPain' },
  { id: 'neckPain', key: 'goals.neckPain' },
  { id: 'fatLoss', key: 'goals.fatLoss' },
  { id: 'mobility', key: 'goals.mobility' },
  { id: 'energy', key: 'goals.energy' },
  { id: 'strength', key: 'goals.strength' },
  { id: 'relaxation', key: 'goals.relaxation' }
];

export const GoalSelection: React.FC<GoalSelectionProps> = ({ onNext, onBack }) => {
  const { t, language, isReady } = useLanguage();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      onNext(selectedGoals);
    }
  };

  // Show loading state while translations are loading
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <div className="text-slate-600">Loading...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
          {t('chooseGoals')}
        </h2>
        <p className="text-slate-600 text-center mb-6">
          {language === 'nl' 
            ? 'Selecteer één of meer doelen voor je routine'
            : 'Select one or more goals for your routine'
          }
        </p>

        <div className="space-y-3 mb-8">
          {availableGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left flex items-center justify-between ${
                selectedGoals.includes(goal.id)
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="font-medium">{t(`exercises:${goal.key}`)}</span>
              {selectedGoals.includes(goal.id) && (
                <Check className="w-5 h-5 text-emerald-600" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} icon={ArrowLeft} className="flex-1">
            {t('back')}
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={selectedGoals.length === 0}
            icon={ArrowRight}
            iconPosition="right"
            className="flex-1"
          >
            {t('next')}
          </Button>
        </div>
      </Card>
    </div>
  );
};