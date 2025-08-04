import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Header } from '../common/Header';
import { Exercise, UserLevel } from '../../types/Exercise';
import { Save, X, Plus, Trash2, Eye } from 'lucide-react';
import { AnimationGenerator } from '../animations/AnimationGenerator';

interface ExerciseEditorProps {
  exercise: Exercise;
  onSave: (exercise: Exercise) => void;
  onCancel: () => void;
}

const availableGoals = [
  'Reduce back pain',
  'Reduce neck pain', 
  'Fat loss',
  'Mobility',
  'Energy boost',
  'Build strength',
  'Relaxation'
];

const availableCategories = [
  'Back',
  'Neck', 
  'Core',
  'Cardio',
  'Mobility',
  'Strength',
  'Relaxation',
  'Custom'
];

export const ExerciseEditor: React.FC<ExerciseEditorProps> = ({
  exercise,
  onSave,
  onCancel
}) => {
  const { language } = useLanguage();
  const [editedExercise, setEditedExercise] = useState<Exercise>({ ...exercise });
  const [activeLevel, setActiveLevel] = useState<UserLevel>('beginner');
  const [showPreview, setShowPreview] = useState(false);

  const isLanguageDutch = language === 'nl';

  const updateExercise = (field: keyof Exercise, value: any) => {
    setEditedExercise(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateLevel = (level: UserLevel, field: string, value: any) => {
    setEditedExercise(prev => ({
      ...prev,
      levels: {
        ...prev.levels,
        [level]: {
          ...prev.levels[level],
          [field]: value
        }
      }
    }));
  };

  const addArrayItem = (level: UserLevel, field: string) => {
    const currentArray = editedExercise.levels[level][field as keyof typeof editedExercise.levels[level]] as string[];
    updateLevel(level, field, [...currentArray, '']);
  };

  const updateArrayItem = (level: UserLevel, field: string, index: number, value: string) => {
    const currentArray = editedExercise.levels[level][field as keyof typeof editedExercise.levels[level]] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    updateLevel(level, field, newArray);
  };

  const removeArrayItem = (level: UserLevel, field: string, index: number) => {
    const currentArray = editedExercise.levels[level][field as keyof typeof editedExercise.levels[level]] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    updateLevel(level, field, newArray);
  };

  const toggleGoal = (goal: string) => {
    const currentGoals = editedExercise.goals;
    if (currentGoals.includes(goal)) {
      updateExercise('goals', currentGoals.filter(g => g !== goal));
    } else {
      updateExercise('goals', [...currentGoals, goal]);
    }
  };

  const toggleCategory = (category: string) => {
    const currentCategories = editedExercise.category;
    if (currentCategories.includes(category)) {
      updateExercise('category', currentCategories.filter(c => c !== category));
    } else {
      updateExercise('category', [...currentCategories, category]);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!editedExercise.name_nl.trim() || !editedExercise.name_en.trim()) {
      alert(isLanguageDutch ? 'Naam is verplicht' : 'Name is required');
      return;
    }
    
    if (editedExercise.goals.length === 0) {
      alert(isLanguageDutch ? 'Selecteer minimaal één doel' : 'Select at least one goal');
      return;
    }

    onSave(editedExercise);
  };

  const currentLevel = editedExercise.levels[activeLevel];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        title={isLanguageDutch ? 'Oefening Bewerken' : 'Edit Exercise'} 
        showLanguageSwitch={false}
      />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onCancel} icon={X}>
            {isLanguageDutch ? 'Annuleren' : 'Cancel'}
          </Button>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(!showPreview)} 
              icon={Eye}
            >
              {showPreview ? (isLanguageDutch ? 'Bewerken' : 'Edit') : (isLanguageDutch ? 'Voorbeeld' : 'Preview')}
            </Button>
            <Button onClick={handleSave} icon={Save}>
              {isLanguageDutch ? 'Opslaan' : 'Save'}
            </Button>
          </div>
        </div>

        {showPreview ? (
          /* Preview Mode */
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {isLanguageDutch ? editedExercise.name_nl : editedExercise.name_en}
            </h2>
            
            <div className="mb-6">
              <AnimationGenerator
                exerciseId={editedExercise.id}
                exerciseName={isLanguageDutch ? editedExercise.name_nl : editedExercise.name_en}
                steps={isLanguageDutch ? currentLevel.steps_nl : currentLevel.steps_en}
                animationInstruction={isLanguageDutch ? currentLevel.animation_instruction_nl : currentLevel.animation_instruction_en}
                level={activeLevel}
                className="mb-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {isLanguageDutch ? 'Stappen:' : 'Steps:'}
                </h3>
                <ol className="space-y-2 text-sm">
                  {(isLanguageDutch ? currentLevel.steps_nl : currentLevel.steps_en).map((step, index) => (
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
                  {isLanguageDutch ? 'Tips:' : 'Tips:'}
                </h3>
                <ul className="space-y-1 text-sm">
                  {(isLanguageDutch ? currentLevel.tips_nl : currentLevel.tips_en).map((tip, index) => (
                    <li key={index} className="text-slate-600 flex items-start gap-2">
                      <span className="text-emerald-500">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ) : (
          /* Edit Mode */
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {isLanguageDutch ? 'Basis Informatie' : 'Basic Information'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {isLanguageDutch ? 'Nederlandse Naam' : 'Dutch Name'}
                  </label>
                  <input
                    type="text"
                    value={editedExercise.name_nl}
                    onChange={(e) => updateExercise('name_nl', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {isLanguageDutch ? 'Engelse Naam' : 'English Name'}
                  </label>
                  <input
                    type="text"
                    value={editedExercise.name_en}
                    onChange={(e) => updateExercise('name_en', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Goals */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {isLanguageDutch ? 'Doelen' : 'Goals'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableGoals.map(goal => (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        editedExercise.goals.includes(goal)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {isLanguageDutch ? 'Categorieën' : 'Categories'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        editedExercise.category.includes(category)
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Level Tabs */}
            <Card className="p-6">
              <div className="flex gap-2 mb-6">
                {(['beginner', 'advanced', 'expert'] as UserLevel[]).map(level => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeLevel === level
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>

              {/* Level Details */}
              <div className="space-y-6">
                {/* Duration, Sets, Reps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {isLanguageDutch ? 'Duur' : 'Duration'}
                    </label>
                    <input
                      type="text"
                      value={currentLevel.duration}
                      onChange={(e) => updateLevel(activeLevel, 'duration', e.target.value)}
                      placeholder="1m"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {isLanguageDutch ? 'Sets' : 'Sets'}
                    </label>
                    <input
                      type="number"
                      value={currentLevel.sets}
                      onChange={(e) => updateLevel(activeLevel, 'sets', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {isLanguageDutch ? 'Herhalingen' : 'Reps'}
                    </label>
                    <input
                      type="number"
                      value={currentLevel.reps}
                      onChange={(e) => updateLevel(activeLevel, 'reps', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {isLanguageDutch ? 'Nederlandse Beschrijving' : 'Dutch Description'}
                    </label>
                    <textarea
                      value={currentLevel.description_nl}
                      onChange={(e) => updateLevel(activeLevel, 'description_nl', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {isLanguageDutch ? 'Engelse Beschrijving' : 'English Description'}
                    </label>
                    <textarea
                      value={currentLevel.description_en}
                      onChange={(e) => updateLevel(activeLevel, 'description_en', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {isLanguageDutch ? 'Nederlandse Stappen' : 'Dutch Steps'}
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Plus}
                        onClick={() => addArrayItem(activeLevel, 'steps_nl')}
                      />
                    </div>
                    <div className="space-y-2">
                      {currentLevel.steps_nl.map((step, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={step}
                            onChange={(e) => updateArrayItem(activeLevel, 'steps_nl', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder={`Stap ${index + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Trash2}
                            onClick={() => removeArrayItem(activeLevel, 'steps_nl', index)}
                            className="text-red-600 hover:text-red-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {isLanguageDutch ? 'Engelse Stappen' : 'English Steps'}
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Plus}
                        onClick={() => addArrayItem(activeLevel, 'steps_en')}
                      />
                    </div>
                    <div className="space-y-2">
                      {currentLevel.steps_en.map((step, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={step}
                            onChange={(e) => updateArrayItem(activeLevel, 'steps_en', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder={`Step ${index + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Trash2}
                            onClick={() => removeArrayItem(activeLevel, 'steps_en', index)}
                            className="text-red-600 hover:text-red-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {isLanguageDutch ? 'Nederlandse Tips' : 'Dutch Tips'}
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Plus}
                        onClick={() => addArrayItem(activeLevel, 'tips_nl')}
                      />
                    </div>
                    <div className="space-y-2">
                      {currentLevel.tips_nl.map((tip, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={tip}
                            onChange={(e) => updateArrayItem(activeLevel, 'tips_nl', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder={`Tip ${index + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Trash2}
                            onClick={() => removeArrayItem(activeLevel, 'tips_nl', index)}
                            className="text-red-600 hover:text-red-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {isLanguageDutch ? 'Engelse Tips' : 'English Tips'}
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Plus}
                        onClick={() => addArrayItem(activeLevel, 'tips_en')}
                      />
                    </div>
                    <div className="space-y-2">
                      {currentLevel.tips_en.map((tip, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={tip}
                            onChange={(e) => updateArrayItem(activeLevel, 'tips_en', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder={`Tip ${index + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Trash2}
                            onClick={() => removeArrayItem(activeLevel, 'tips_en', index)}
                            className="text-red-600 hover:text-red-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animation Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {isLanguageDutch ? 'Nederlandse Animatie Instructie' : 'Dutch Animation Instruction'}
                    </label>
                    <textarea
                      value={currentLevel.animation_instruction_nl}
                      onChange={(e) => updateLevel(activeLevel, 'animation_instruction_nl', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Beschrijf de beweging voor de animatie..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {isLanguageDutch ? 'Engelse Animatie Instructie' : 'English Animation Instruction'}
                    </label>
                    <textarea
                      value={currentLevel.animation_instruction_en}
                      onChange={(e) => updateLevel(activeLevel, 'animation_instruction_en', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Describe the movement for animation..."
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};