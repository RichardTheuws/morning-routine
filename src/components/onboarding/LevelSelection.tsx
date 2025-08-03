import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { UserLevel } from '../../types/Exercise';

interface LevelSelectionProps {
  onNext: (level: UserLevel) => void;
  onBack: () => void;
}

const levels: { id: UserLevel; stars: number }[] = [
  { id: 'beginner', stars: 1 },
  { id: 'advanced', stars: 2 },
  { id: 'expert', stars: 3 }
];

export const LevelSelection: React.FC<LevelSelectionProps> = ({ onNext, onBack }) => {
  const { t, language, isReady } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>('beginner');

  const getLevelDescription = (level: UserLevel) => {
    const descriptions = {
      nl: {
        beginner: 'Ik begin net met beweging of heb weinig ervaring',
        advanced: 'Ik beweeg regelmatig en wil meer uitdaging',
        expert: 'Ik ben ervaren en zoek intensieve oefeningen'
      },
      en: {
        beginner: 'I\'m new to exercise or have little experience',
        advanced: 'I exercise regularly and want more challenge',
        expert: 'I\'m experienced and looking for intensive exercises'
      }
    };
    return descriptions[language][level];
  };

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
          {t('chooseLevel')}
        </h2>
        <p className="text-slate-600 text-center mb-6">
          {language === 'nl' 
            ? 'Kies je fitnessniveau'
            : 'Choose your fitness level'
          }
        </p>

        <div className="space-y-3 mb-8">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedLevel === level.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-900 capitalize">{t(level.id)}</span>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < level.stars ? 'text-yellow-400 fill-current' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-600">
                {getLevelDescription(level.id)}
              </p>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} icon={ArrowLeft} className="flex-1">
            {t('back')}
          </Button>
          <Button 
            onClick={() => onNext(selectedLevel)} 
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