export interface Exercise {
  id: string;
  name_nl: string;
  name_en: string;
  category: string[];
  goals: string[];
  levels: {
    beginner: ExerciseLevel;
    advanced: ExerciseLevel;
    expert: ExerciseLevel;
  };
}

export interface ExerciseLevel {
  duration: string;
  sets: number;
  reps: number;
  description_nl: string;
  description_en: string;
  steps_nl: string[];
  steps_en: string[];
  tips_nl: string[];
  tips_en: string[];
  common_mistakes_nl: string[];
  common_mistakes_en: string[];
  alternative_nl: string;
  alternative_en: string;
  animation_instruction_nl: string;
  animation_instruction_en: string;
}

export interface Routine {
  id: string;
  name_nl: string;
  name_en: string;
  exercises: string[]; // Exercise IDs
  totalDuration: number;
  goals: string[];
  level: 'beginner' | 'advanced' | 'expert';
  created_at: string;
  is_favorite: boolean;
}

export interface UserProgress {
  routines_completed: number;
  current_streak: number;
  total_time_spent: number; // in minutes
  last_completed: string;
  completed_dates: string[];
}

export type Language = 'nl' | 'en';
export type UserLevel = 'beginner' | 'advanced' | 'expert';