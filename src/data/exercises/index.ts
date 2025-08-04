// Main exercises export - combines all exercise modules
import { backExercises } from './back';
import { neckExercises } from './neck';
import { coreExercises } from './core';
import { cardioExercises } from './cardio';
import { mobilityExercises } from './mobility';
import { strengthExercises } from './strength';
import { relaxationExercises } from './relaxation';

export const exercises = [
  ...backExercises,
  ...neckExercises,
  ...coreExercises,
  ...cardioExercises,
  ...mobilityExercises,
  ...strengthExercises,
  ...relaxationExercises
];

// Re-export types for convenience
export * from '../../types/Exercise';