import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { advancedAnimationEngine, GeneratedAnimation } from '../../services/AdvancedAnimationEngine';
import { pexelsVideoService, ExerciseVideoMapping } from '../../services/PexelsVideoService';
import { privacyService } from '../../services/PrivacyService';
import { PhysicsBasedRenderer } from './PhysicsBasedRenderer';
import { VideoPlayer } from './VideoPlayer';
import { Button } from '../common/Button';
import { Play, Zap, Video, Eye } from 'lucide-react';

interface AnimationGeneratorProps {
  exerciseId: string;
  exerciseName: string;
  steps: string[];
  animationInstruction: string;
  level: 'beginner' | 'advanced' | 'expert';
  className?: string;
}

type ViewMode = 'auto' | 'video' | 'animation';

export const AnimationGenerator: React.FC<AnimationGeneratorProps> = ({ 
  exerciseId,
  exerciseName,
  steps,
  animationInstruction,
  level,
  className = '' 
}) => {
  const { t } = useTranslation(['common', 'exercises']);
  const [animation, setAnimation] = useState<GeneratedAnimation | null>(null);
  const [videoMapping, setVideoMapping] = useState<ExerciseVideoMapping | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('auto');
  const [error, setError] = useState<string | null>(null);
  const [hasVideoConsent, setHasVideoConsent] = useState(false);

  useEffect(() => {
    // Check video consent
    const consent = privacyService.getConsent();
    setHasVideoConsent(consent?.videoContent || false);
    
    loadContent();
  }, [exerciseId, exerciseName, steps, animationInstruction, level]);

  const loadContent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate cache key for animation
      const cacheKey = `${exerciseId}-${level}-${animationInstruction.substring(0, 50)}`;
      
      // Try to get cached animation first
      let generatedAnimation = advancedAnimationEngine.getCachedAnimation(cacheKey);
      
      if (!generatedAnimation) {
        // Generate new animation
        generatedAnimation = await advancedAnimationEngine.generateExerciseAnimation(
          exerciseId,
          exerciseName,
          steps,
          animationInstruction,
          level
        );
        
        // Cache the result
        advancedAnimationEngine.setCachedAnimation(cacheKey, generatedAnimation);
      }
      
      setAnimation(generatedAnimation);
      
      // Load video if consent given
      if (hasVideoConsent) {
        try {
          const video = await pexelsVideoService.getVideoForExercise(exerciseId);
          setVideoMapping(video);
          
          // Always start with animation, let user choose video
          if (viewMode === 'auto') {
            setViewMode('animation');
          }
        } catch (videoError) {
          console.error('Video loading failed:', videoError);
          pexelsVideoService.trackVideoPerformance(exerciseId, 'error', { error: videoError });
        }
      }
      
    } catch (error) {
      console.error('Content loading failed:', error);
      setError('Failed to load exercise demonstration');
      
      // Create minimal fallback animation
      setAnimation({
        keyframes: [
          {
            timestamp: 0,
            poses: { spine_middle: { position: { x: 0, y: 110, z: 0 }, rotation: { x: 0, y: 0, z: 0 } } },
            muscleActivations: { core: 0.3 },
            breathingPhase: 'inhale',
            focus: [],
            instruction: 'Follow written instructions'
          }
        ],
        duration: 3,
        style: 'smooth',
        difficulty: level,
        metadata: {
          exerciseId,
          muscleGroups: ['core'],
          equipment: [],
          safetyNotes: []
        }
      });
    }
    
    setIsLoading(false);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    
    // Track user preference (if analytics consent given)
    const consent = privacyService.getConsent();
    if (consent?.analytics) {
      const preference = { exerciseId, preferredMode: mode, timestamp: Date.now() };
      const existing = localStorage.getItem('view-preferences') || '[]';
      const preferences = JSON.parse(existing);
      preferences.push(preference);
      localStorage.setItem('view-preferences', JSON.stringify(preferences.slice(-50))); // Keep last 50
    }
  };

  if (isLoading) {
    return (
      <div className={`w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <div className="text-slate-600 text-sm font-medium">{t('common:loading')}</div>
          <div className="text-slate-500 text-xs mt-1">Generating demonstration...</div>
        </div>
      </div>
    );
  }

  if (error && !animation) {
    return (
      <div className={`w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-slate-600 mb-2">⚠️ {error}</div>
          <Button variant="outline" onClick={loadContent} size="sm">
            {t('common:retry')}
          </Button>
        </div>
      </div>
    );
  }

  // Determine what to show
  const showVideo = viewMode === 'video' && videoMapping?.customVideoUrl && hasVideoConsent;
  const showAnimation = viewMode === 'animation' || (!showVideo && animation);

  return (
    <div className={`w-full ${className}`}>
      {/* Content area */}
      <div className="w-full h-48 relative">
        {showVideo && videoMapping && (
          <VideoPlayer
            videoUrl={videoMapping.customVideoUrl!}
            thumbnailUrl={videoMapping.thumbnailUrl || ''}
            exerciseName={exerciseName}
            className="w-full h-full"
            autoplay={false}
            onPlay={() => pexelsVideoService.trackVideoPerformance(exerciseId, 'play')}
            onError={() => pexelsVideoService.trackVideoPerformance(exerciseId, 'error')}
          />
        )}
        
        {showAnimation && animation && (
          <PhysicsBasedRenderer
            animation={animation}
            exerciseName={exerciseName}
            className="w-full h-full"
            isPlaying={true}
          />
        )}
        
        {!showVideo && !showAnimation && (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <Play className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-slate-700 font-medium mb-1">{exerciseName}</div>
              <div className="text-xs text-slate-500">Follow the written instructions</div>
            </div>
          </div>
        )}
      </div>

      {/* View mode controls */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {videoMapping?.customVideoUrl && hasVideoConsent && (
          <Button
            variant={viewMode === 'video' ? 'primary' : 'outline'}
            size="sm"
            icon={Video}
            onClick={() => handleViewModeChange('video')}
          >
            Video
          </Button>
        )}
        
        {animation && (
          <Button
            variant={viewMode === 'animation' ? 'primary' : 'outline'}
            size="sm"
            icon={Zap}
            onClick={() => handleViewModeChange('animation')}
          >
            Animation
          </Button>
        )}
        
        {!hasVideoConsent && videoMapping?.customVideoUrl && (
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Eye className="w-3 h-3" />
            Enable video in privacy settings
          </div>
        )}
      </div>

      {/* Exercise metadata */}
      {animation && (
        <div className="mt-2 text-xs text-slate-500 text-center">
          <div className="flex items-center justify-center gap-4">
            <span>Muscles: {animation.metadata.muscleGroups.join(', ')}</span>
            <span>Style: {animation.style}</span>
            <span>Duration: {animation.duration}s</span>
          </div>
        </div>
      )}
    </div>
  );
};