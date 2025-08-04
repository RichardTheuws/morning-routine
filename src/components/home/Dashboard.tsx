import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProgress } from '../../hooks/useProgress';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Header } from '../common/Header';
import { Play, Trophy, Calendar, Clock } from 'lucide-react';

interface DashboardProps {
  onStartRoutine: () => void;
  onCreateRoutine: () => void;
  onViewExercises: () => void;
  onSettings: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onStartRoutine, 
  onCreateRoutine,
  onViewExercises,
  onSettings
}) => {
  const { t, language } = useLanguage();
  const { progress } = useProgress();

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onSettingsClick={onSettings} />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {t('welcome')}
          </h2>
          <p className="text-slate-600">
            {language === 'nl' 
              ? 'Klaar voor je dagelijkse routine?'
              : 'Ready for your daily routine?'
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{progress.current_streak}</div>
            <div className="text-sm text-slate-600">
              {language === 'nl' ? 'Dagen streak' : 'Day streak'}
            </div>
          </Card>
          
          <Card className="p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{progress.routines_completed}</div>
            <div className="text-sm text-slate-600">
              {language === 'nl' ? 'Routines voltooid' : 'Routines completed'}
            </div>
          </Card>
          
          <Card className="p-6 text-center">
            <Clock className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{formatTime(progress.total_time_spent)}</div>
            <div className="text-sm text-slate-600">
              {language === 'nl' ? 'Totale tijd' : 'Total time'}
            </div>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <Button 
            onClick={onStartRoutine} 
            size="lg" 
            className="w-full"
            icon={Play}
          >
            {t('startRoutine')}
          </Button>
          
          {/* Debug Info - Remove in production */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <h4 className="font-medium text-blue-900 mb-2">🔧 Debug Info:</h4>
            <div className="space-y-1 text-blue-800">
              <div>Routines completed: {progress.routines_completed}</div>
              <div>Current streak: {progress.current_streak}</div>
              <div>Total time: {formatTime(progress.total_time_spent)}</div>
              <div>Last completed: {progress.last_completed || 'Never'}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={onCreateRoutine}
              className="w-full"
            >
              {language === 'nl' ? 'Eigen routine maken' : 'Create custom routine'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onViewExercises}
              className="w-full"
            >
              {t('exercises')}
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        {progress.completed_dates.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              {language === 'nl' ? 'Recente activiteit' : 'Recent activity'}
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - i));
                const dateString = date.toISOString().split('T')[0];
                const isCompleted = progress.completed_dates.includes(dateString);
                
                return (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};