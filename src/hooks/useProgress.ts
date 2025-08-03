import { useLocalStorage } from './useLocalStorage';
import { UserProgress } from '../types/Exercise';

const initialProgress: UserProgress = {
  routines_completed: 0,
  current_streak: 0,
  total_time_spent: 0,
  last_completed: '',
  completed_dates: []
};

export const useProgress = () => {
  const [progress, setProgress] = useLocalStorage<UserProgress>('morning-routine-progress', initialProgress);

  const updateProgress = (routineDuration: number) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    const newProgress: UserProgress = {
      routines_completed: progress.routines_completed + 1,
      current_streak: progress.last_completed === yesterday ? progress.current_streak + 1 : 1,
      total_time_spent: progress.total_time_spent + routineDuration,
      last_completed: today,
      completed_dates: [...progress.completed_dates.filter(date => date !== today), today]
    };

    setProgress(newProgress);
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  return {
    progress,
    updateProgress,
    resetProgress
  };
};