import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ArrowLeft, Clock } from 'lucide-react';

interface DurationSelectionProps {
  onComplete: (duration: number) => void;
  onBack: () => void;
}

const durations = [5, 10, 15, 20, 25, 30];

export const DurationSelection: React.FC<DurationSelectionProps> = ({ onComplete, onBack }) => {
  const { t, i18n } = useTranslation(['common', 'onboarding']);
  const [selectedDuration, setSelectedDuration] = useState<number>(10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
          {t('chooseDuration')}
        </h2>
        <p className="text-slate-600 text-center mb-6">
          {i18n.language === 'nl' 
            ? 'Hoeveel tijd heb je voor je ochtendroutine?'
            : 'How much time do you have for your morning routine?'
          }
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center ${
                selectedDuration === duration
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-6 h-6 text-slate-600 mb-2" />
              <span className="font-bold text-lg text-slate-900">{duration}</span>
              <span className="text-sm text-slate-600">{t('minutes')}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} icon={ArrowLeft} className="flex-1">
            {t('back')}
          </Button>
          <Button 
            onClick={() => onComplete(selectedDuration)} 
            className="flex-1"
          >
            {i18n.language === 'nl' ? 'Routine maken' : 'Create routine'}
          </Button>
        </div>
      </Card>
    </div>
  );
};