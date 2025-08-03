import React, { useEffect, useState } from 'react';
import { videoService, ExerciseVideo } from '../../services/VideoService';
import { aiAnimationEngine, ExerciseMotion } from '../../services/AIAnimationEngine';
import { VideoPlayer } from './VideoPlayer';
import { AdvancedSVGRenderer } from './AdvancedSVGRenderer';

interface AnimationGeneratorProps {
  exerciseId: string;
  exerciseName: string;
  steps: string[];
  animationInstruction: string;
  level: 'beginner' | 'advanced' | 'expert';
  className?: string;
}

export const AnimationGenerator: React.FC<AnimationGeneratorProps> = ({ 
  exerciseId,
  exerciseName,
  steps,
  animationInstruction,
  level,
  className = '' 
}) => {
  const [video, setVideo] = useState<ExerciseVideo | null>(null);
  const [motion, setMotion] = useState<ExerciseMotion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useVideo, setUseVideo] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // First try to get a video
        const exerciseVideo = videoService.getVideoForExercise(exerciseId, level);
        
        if (exerciseVideo && useVideo) {
          setVideo(exerciseVideo);
          setMotion(null);
        } else {
          // Generate AI-powered SVG animation
          const generatedMotion = await aiAnimationEngine.generateExerciseAnimation(
            exerciseId,
            exerciseName,
            steps,
            animationInstruction,
            level
          );
          setMotion(generatedMotion);
          setVideo(null);
        }
      } catch (error) {
        console.error('Failed to generate animation:', error);
        setError('Failed to load demonstration');
        
        // Create fallback placeholder
        const placeholder = videoService.generatePlaceholderVideo(exerciseId, exerciseName);
        setVideo(placeholder);
      }
      
      setIsLoading(false);
    };

    loadAnimation();
  }, [exerciseId, exerciseName, steps, animationInstruction, level, useVideo]);

  if (isLoading) {
    return (
      <div className={`w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <div className="text-slate-600 text-sm">Generating demonstration...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-slate-600 mb-2">⚠️ {error}</div>
          <button
            onClick={() => setUseVideo(!useVideo)}
            className="text-xs text-emerald-600 hover:text-emerald-700 underline"
          >
            Try alternative view
          </button>
        </div>
      </div>
    );
  }

  // Show video if available and preferred
  if (video && useVideo && video.videoUrl) {
    return (
      <div className={`w-full h-48 ${className}`}>
        <VideoPlayer
          videoUrl={video.videoUrl}
          thumbnailUrl={video.thumbnailUrl}
          exerciseName={exerciseName}
          className="w-full h-full"
          autoplay={true}
        />
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setUseVideo(false)}
            className="text-xs text-slate-500 hover:text-slate-700 underline"
          >
            Switch to animated guide
          </button>
        </div>
      </div>
    );
  }

  // Show AI-generated SVG animation
  if (motion) {
    return (
      <div className={`w-full h-48 ${className}`}>
        <AdvancedSVGRenderer
          motion={motion}
          exerciseName={exerciseName}
          className="w-full h-full"
        />
        {video && (
          <div className="mt-2 flex justify-center">
            <button
              onClick={() => setUseVideo(true)}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              Switch to video demonstration
            </button>
          </div>
        )}
      </div>
    );
  }

  // Final fallback - simple placeholder
  return (
    <div className={`w-full h-48 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3 mx-auto">
          <span className="text-2xl">🧘‍♀️</span>
        </div>
        <div className="text-slate-700 font-medium mb-1">{exerciseName}</div>
        <div className="text-xs text-slate-500">Follow the written instructions</div>
      </div>
    </div>
  );
};