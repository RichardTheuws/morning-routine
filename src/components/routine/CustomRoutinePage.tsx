import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Header } from '../common/Header';
import { ExerciseCard } from './ExerciseCard';
import { exercises } from '../../data/exercises';
import { Exercise, UserLevel, Routine } from '../../types/Exercise';
import { ArrowLeft, Plus, Trash2, Play, Save, Search, Filter } from 'lucide-react';

interface CustomRoutinePageProps {
  onBack: () => void;
  onStartRoutine: (routine: Routine) => void;
}

export const CustomRoutinePage: React.FC<CustomRoutinePageProps> = ({ 
  onBack, 
  onStartRoutine 
}) => {
  const { t, language } = useLanguage();
  const [routineName, setRoutineName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>('beginner');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedRoutines, setSavedRoutines] = useState<Routine[]>(() => {
    try {
      const saved = localStorage.getItem('custom-routines');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const isLanguageDutch = language === 'nl';

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(exercises.flatMap(ex => ex.category)))];

  // Filter available exercises
  const availableExercises = exercises.filter(exercise => {
    const name = isLanguageDutch ? exercise.name_nl : exercise.name_en;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category.includes(selectedCategory);
    const notSelected = !selectedExercises.find(selected => selected.id === exercise.id);
    return matchesSearch && matchesCategory && notSelected;
  });

  const addExercise = (exercise: Exercise) => {
    setSelectedExercises(prev => [...prev, exercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  };

  const moveExercise = (fromIndex: number, toIndex: number) => {
    const newExercises = [...selectedExercises];
    const [movedExercise] = newExercises.splice(fromIndex, 1);
    newExercises.splice(toIndex, 0, movedExercise);
    setSelectedExercises(newExercises);
  };

  const calculateTotalDuration = () => {
    return selectedExercises.reduce((total, exercise) => {
      const duration = exercise.levels[selectedLevel].duration;
      const minutes = parseInt(duration.replace('m', '')) || 1;
      return total + minutes;
    }, 0);
  };

  const saveRoutine = () => {
    if (!routineName.trim()) {
      alert(isLanguageDutch ? 'Geef je routine een naam' : 'Give your routine a name');
      return;
    }

    if (selectedExercises.length === 0) {
      alert(isLanguageDutch ? 'Voeg minimaal één oefening toe' : 'Add at least one exercise');
      return;
    }

    const newRoutine: Routine = {
      id: `custom-${Date.now()}`,
      name_nl: routineName,
      name_en: routineName,
      exercises: selectedExercises.map(ex => ex.id),
      totalDuration: calculateTotalDuration(),
      goals: Array.from(new Set(selectedExercises.flatMap(ex => ex.goals))),
      level: selectedLevel,
      created_at: new Date().toISOString(),
      is_favorite: false
    };

    const updatedRoutines = [...savedRoutines, newRoutine];
    setSavedRoutines(updatedRoutines);
    
    try {
      localStorage.setItem('custom-routines', JSON.stringify(updatedRoutines));
      alert(isLanguageDutch ? 'Routine opgeslagen!' : 'Routine saved!');
      
      // Reset form
      setRoutineName('');
      setSelectedExercises([]);
    } catch (error) {
      alert(isLanguageDutch ? 'Fout bij opslaan' : 'Error saving routine');
    }
  };

  const startCustomRoutine = () => {
    if (selectedExercises.length === 0) {
      alert(isLanguageDutch ? 'Voeg minimaal één oefening toe' : 'Add at least one exercise');
      return;
    }

    const tempRoutine: Routine = {
      id: 'temp-routine',
      name_nl: routineName || 'Tijdelijke Routine',
      name_en: routineName || 'Temporary Routine',
      exercises: selectedExercises.map(ex => ex.id),
      totalDuration: calculateTotalDuration(),
      goals: Array.from(new Set(selectedExercises.flatMap(ex => ex.goals))),
      level: selectedLevel,
      created_at: new Date().toISOString(),
      is_favorite: false
    };

    onStartRoutine(tempRoutine);
  };

  const loadSavedRoutine = (routine: Routine) => {
    const routineExercises = exercises.filter(ex => routine.exercises.includes(ex.id));
    setSelectedExercises(routineExercises);
    setRoutineName(isLanguageDutch ? routine.name_nl : routine.name_en);
    setSelectedLevel(routine.level);
  };

  const deleteSavedRoutine = (routineId: string) => {
    if (confirm(isLanguageDutch ? 'Routine verwijderen?' : 'Delete routine?')) {
      const updatedRoutines = savedRoutines.filter(r => r.id !== routineId);
      setSavedRoutines(updatedRoutines);
      localStorage.setItem('custom-routines', JSON.stringify(updatedRoutines));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        title={isLanguageDutch ? 'Eigen Routine Maken' : 'Create Custom Routine'} 
        showLanguageSwitch={false}
      />
      
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <Button variant="ghost" onClick={onBack} icon={ArrowLeft} className="mb-4">
          {t('back')}
        </Button>

        {/* Routine Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Exercise Selection */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {isLanguageDutch ? 'Oefeningen Selecteren' : 'Select Exercises'}
              </h3>
              
              {/* Search and Filter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={isLanguageDutch ? 'Zoek oefeningen...' : 'Search exercises...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
                  >
                    <option value="all">{isLanguageDutch ? 'Alle categorieën' : 'All categories'}</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Available Exercises */}
              <div className="max-h-96 overflow-y-auto space-y-2">
                {availableExercises.map(exercise => (
                  <div key={exercise.id} className="relative">
                    <ExerciseCard
                      exercise={exercise}
                      level={selectedLevel}
                      onClick={() => addExercise(exercise)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Plus}
                      onClick={() => addExercise(exercise)}
                      className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100"
                    />
                  </div>
                ))}
                
                {availableExercises.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    {isLanguageDutch ? 'Geen oefeningen gevonden' : 'No exercises found'}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right: Routine Builder */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {isLanguageDutch ? 'Jouw Routine' : 'Your Routine'}
              </h3>
              
              {/* Routine Settings */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {isLanguageDutch ? 'Routine Naam' : 'Routine Name'}
                  </label>
                  <input
                    type="text"
                    value={routineName}
                    onChange={(e) => setRoutineName(e.target.value)}
                    placeholder={isLanguageDutch ? 'Mijn ochtendroutine' : 'My morning routine'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {isLanguageDutch ? 'Niveau' : 'Level'}
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value as UserLevel)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
                  >
                    <option value="beginner">{t('beginner')}</option>
                    <option value="advanced">{t('advanced')}</option>
                    <option value="expert">{t('expert')}</option>
                  </select>
                </div>
              </div>

              {/* Routine Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{selectedExercises.length}</div>
                  <div className="text-sm text-slate-600">
                    {isLanguageDutch ? 'Oefeningen' : 'Exercises'}
                  </div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{calculateTotalDuration()}</div>
                  <div className="text-sm text-slate-600">
                    {isLanguageDutch ? 'Minuten' : 'Minutes'}
                  </div>
                </div>
              </div>

              {/* Selected Exercises */}
              <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                {selectedExercises.map((exercise, index) => (
                  <div key={exercise.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">
                        {isLanguageDutch ? exercise.name_nl : exercise.name_en}
                      </div>
                      <div className="text-sm text-slate-600">
                        {exercise.levels[selectedLevel].duration} • {exercise.levels[selectedLevel].reps} reps
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveExercise(index, index - 1)}
                          className="text-slate-600"
                        >
                          ↑
                        </Button>
                      )}
                      {index < selectedExercises.length - 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveExercise(index, index + 1)}
                          className="text-slate-600"
                        >
                          ↓
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onClick={() => removeExercise(exercise.id)}
                        className="text-red-600 hover:text-red-700"
                      />
                    </div>
                  </div>
                ))}
                
                {selectedExercises.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    {isLanguageDutch ? 'Voeg oefeningen toe aan je routine' : 'Add exercises to your routine'}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={startCustomRoutine}
                  disabled={selectedExercises.length === 0}
                  icon={Play}
                  className="flex-1"
                >
                  {isLanguageDutch ? 'Start Routine' : 'Start Routine'}
                </Button>
                <Button
                  variant="outline"
                  onClick={saveRoutine}
                  disabled={selectedExercises.length === 0}
                  icon={Save}
                >
                  {isLanguageDutch ? 'Opslaan' : 'Save'}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Saved Routines */}
        {savedRoutines.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {isLanguageDutch ? 'Opgeslagen Routines' : 'Saved Routines'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedRoutines.map(routine => (
                <div key={routine.id} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-slate-900">
                      {isLanguageDutch ? routine.name_nl : routine.name_en}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => deleteSavedRoutine(routine.id)}
                      className="text-red-600 hover:text-red-700"
                    />
                  </div>
                  
                  <div className="text-sm text-slate-600 mb-3">
                    {routine.exercises.length} {isLanguageDutch ? 'oefeningen' : 'exercises'} • {routine.totalDuration} {isLanguageDutch ? 'min' : 'min'}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadSavedRoutine(routine)}
                      className="flex-1"
                    >
                      {isLanguageDutch ? 'Laden' : 'Load'}
                    </Button>
                    <Button
                      size="sm"
                      icon={Play}
                      onClick={() => onStartRoutine(routine)}
                      className="flex-1"
                    >
                      {isLanguageDutch ? 'Start' : 'Start'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};