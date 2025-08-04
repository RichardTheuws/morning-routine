import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Header } from '../common/Header';
import { ExerciseCard } from '../routine/ExerciseCard';
import { ExerciseEditor } from './ExerciseEditor';
import { exercises } from '../../data/exercises';
import { Exercise, UserLevel } from '../../types/Exercise';
import { ArrowLeft, Plus, Search, Filter, Edit3 } from 'lucide-react';

interface ExercisesPageProps {
  onBack: () => void;
}

export const ExercisesPage: React.FC<ExercisesPageProps> = ({ onBack }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>('beginner');
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const isLanguageDutch = language === 'nl';

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(exercises.flatMap(ex => ex.category)))];

  // Filter exercises
  const filteredExercises = exercises.filter(exercise => {
    const name = isLanguageDutch ? exercise.name_nl : exercise.name_en;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setShowEditor(true);
  };

  const handleSaveExercise = (updatedExercise: Exercise) => {
    // In a real app, this would update the database
    // For now, we'll just close the editor
    console.log('Exercise updated:', updatedExercise);
    setShowEditor(false);
    setEditingExercise(null);
    
    // Show success message
    alert(isLanguageDutch 
      ? 'Oefening opgeslagen! (In deze demo worden wijzigingen niet permanent opgeslagen)'
      : 'Exercise saved! (In this demo, changes are not permanently saved)'
    );
  };

  const handleCreateNew = () => {
    const newExercise: Exercise = {
      id: `custom-${Date.now()}`,
      name_nl: 'Nieuwe Oefening',
      name_en: 'New Exercise',
      category: ['Custom'],
      goals: ['Mobility'],
      levels: {
        beginner: {
          duration: '1m',
          sets: 1,
          reps: 10,
          description_nl: 'Beschrijving van de oefening',
          description_en: 'Description of the exercise',
          steps_nl: ['Stap 1', 'Stap 2', 'Stap 3'],
          steps_en: ['Step 1', 'Step 2', 'Step 3'],
          tips_nl: ['Tip 1', 'Tip 2'],
          tips_en: ['Tip 1', 'Tip 2'],
          common_mistakes_nl: ['Fout 1', 'Fout 2'],
          common_mistakes_en: ['Mistake 1', 'Mistake 2'],
          alternative_nl: 'Alternatieve uitvoering',
          alternative_en: 'Alternative execution',
          animation_instruction_nl: 'Animatie instructie in het Nederlands',
          animation_instruction_en: 'Animation instruction in English'
        },
        advanced: {
          duration: '2m',
          sets: 2,
          reps: 15,
          description_nl: 'Gevorderde versie van de oefening',
          description_en: 'Advanced version of the exercise',
          steps_nl: ['Gevorderde stap 1', 'Gevorderde stap 2'],
          steps_en: ['Advanced step 1', 'Advanced step 2'],
          tips_nl: ['Gevorderde tip 1'],
          tips_en: ['Advanced tip 1'],
          common_mistakes_nl: ['Gevorderde fout 1'],
          common_mistakes_en: ['Advanced mistake 1'],
          alternative_nl: 'Gevorderde alternatief',
          alternative_en: 'Advanced alternative',
          animation_instruction_nl: 'Gevorderde animatie instructie',
          animation_instruction_en: 'Advanced animation instruction'
        },
        expert: {
          duration: '3m',
          sets: 3,
          reps: 20,
          description_nl: 'Expert versie van de oefening',
          description_en: 'Expert version of the exercise',
          steps_nl: ['Expert stap 1', 'Expert stap 2'],
          steps_en: ['Expert step 1', 'Expert step 2'],
          tips_nl: ['Expert tip 1'],
          tips_en: ['Expert tip 1'],
          common_mistakes_nl: ['Expert fout 1'],
          common_mistakes_en: ['Expert mistake 1'],
          alternative_nl: 'Expert alternatief',
          alternative_en: 'Expert alternative',
          animation_instruction_nl: 'Expert animatie instructie',
          animation_instruction_en: 'Expert animation instruction'
        }
      }
    };
    
    setEditingExercise(newExercise);
    setShowEditor(true);
  };

  if (showEditor && editingExercise) {
    return (
      <ExerciseEditor
        exercise={editingExercise}
        onSave={handleSaveExercise}
        onCancel={() => {
          setShowEditor(false);
          setEditingExercise(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        title={t('exercises')} 
        showLanguageSwitch={false}
      />
      
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} icon={ArrowLeft}>
            {t('back')}
          </Button>
          <Button onClick={handleCreateNew} icon={Plus}>
            {isLanguageDutch ? 'Nieuwe Oefening' : 'New Exercise'}
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
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

            {/* Category Filter */}
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

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as UserLevel)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
            >
              <option value="beginner">{t('beginner')}</option>
              <option value="advanced">{t('advanced')}</option>
              <option value="expert">{t('expert')}</option>
            </select>
          </div>
        </Card>

        {/* Exercise Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{exercises.length}</div>
            <div className="text-sm text-slate-600">
              {isLanguageDutch ? 'Totaal Oefeningen' : 'Total Exercises'}
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-sm text-slate-600">
              {isLanguageDutch ? 'Categorieën' : 'Categories'}
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{filteredExercises.length}</div>
            <div className="text-sm text-slate-600">
              {isLanguageDutch ? 'Gefilterd' : 'Filtered'}
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Array.from(new Set(exercises.flatMap(ex => ex.goals))).length}
            </div>
            <div className="text-sm text-slate-600">
              {isLanguageDutch ? 'Doelen' : 'Goals'}
            </div>
          </Card>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="relative">
              <ExerciseCard
                exercise={exercise}
                level={selectedLevel}
                onClick={() => handleEditExercise(exercise)}
              />
              <Button
                variant="ghost"
                size="sm"
                icon={Edit3}
                onClick={() => handleEditExercise(exercise)}
                className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100"
                aria-label={isLanguageDutch ? 'Bewerk oefening' : 'Edit exercise'}
              />
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-slate-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {isLanguageDutch ? 'Geen oefeningen gevonden' : 'No exercises found'}
            </h3>
            <p className="text-slate-600 mb-4">
              {isLanguageDutch 
                ? 'Probeer een andere zoekterm of filter'
                : 'Try a different search term or filter'
              }
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}>
              {isLanguageDutch ? 'Filters wissen' : 'Clear filters'}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};