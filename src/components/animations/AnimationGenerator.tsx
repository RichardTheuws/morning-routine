import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { advancedAnimationEngine, GeneratedAnimation } from '../../services/AdvancedAnimationEngine';
import { pexelsVideoService, ExerciseVideoMapping } from '../../services/PexelsVideoService';
import { privacyService } from '../../services/PrivacyService';
import { ModernAnimationRenderer } from './ModernAnimationRenderer';
import { VideoPlayer } from './VideoPlayer';
import { VideoSelector } from './VideoSelector';
import { Button } from '../common/Button';
import { Play, Zap, Video, Eye, Settings, Maximize } from 'lucide-react';

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
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [showVideoSelector, setShowVideoSelector] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const loadContent = useCallback(async (videoConsent: boolean) => {
    setIsLoading(true);
    setError(null);
    setIsVideoLoading(true);
    
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
      if (videoConsent) {
        try {
          console.log(`Loading video for exercise: ${exerciseId}`);
          const video = await pexelsVideoService.getVideoForExercise(exerciseId);
          
          if (video) {
            setVideoMapping(video);
            
            // Validate video URL before setting view mode
            if (video.customVideoUrl) {
              // Skip validation on mobile to avoid CORS issues
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
              const isValid = isMobile ? true : await pexelsVideoService.validateVideoUrl(video.customVideoUrl);
              
              if (isValid && viewMode === 'auto') {
                setViewMode('video');
              } else if (!isValid) {
                if (viewMode === 'auto') {
                  setViewMode('animation');
                }
              }
            } else {
              if (viewMode === 'auto') {
                setViewMode('animation');
              }
            }
          } else {
            if (viewMode === 'auto') {
              setViewMode('animation');
            }
          }
          
          pexelsVideoService.trackVideoPerformance(exerciseId, 'load', { 
            hasVideo: !!video?.customVideoUrl,
            videoUrl: video?.customVideoUrl 
          });
        } catch (videoError) {
          console.error('Video loading failed:', videoError);
          pexelsVideoService.trackVideoPerformance(exerciseId, 'error', { error: videoError });
          
          // Fallback to animation on video error
          if (viewMode === 'auto') {
            setViewMode('animation');
          }
        }
      } else {
        // No video consent, always use animation
        console.log(`No video consent, using animation for ${exerciseId}`);
        if (viewMode === 'auto') {
          setViewMode('animation');
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
      
      if (viewMode === 'auto') {
        setViewMode('animation');
      }
    }
    
    setIsLoading(false);
    setIsVideoLoading(false);
  }, [exerciseId, exerciseName, steps, animationInstruction, level, viewMode]);

  useEffect(() => {
    // Check video consent
    const consent = privacyService.getConsent();
    const videoConsent = consent?.videoContent || false;
    setHasVideoConsent(videoConsent);
    
    loadContent(videoConsent);
  }, [loadContent]);

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

  const handleVideoSelection = (selectedVideo: ExerciseVideoMapping) => {
    setVideoMapping(selectedVideo);
    if (viewMode === 'auto') {
      setViewMode('video');
    }
  };

  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
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
          <Button variant="outline" onClick={() => loadContent(hasVideoConsent)} size="sm">
            {t('common:retry')}
          </Button>
        </div>
      </div>
    );
  }

  // Determine what to show
  const showVideo = viewMode === 'video' && videoMapping?.customVideoUrl && hasVideoConsent;
  const showAnimation = viewMode === 'animation' || (!showVideo && animation);

  const contentComponent = (
    <>
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
        <ModernAnimationRenderer
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
    </>
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Content area */}
      <div className={`w-full relative ${showFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-48'}`}>
        {showFullscreen ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl h-full max-h-[80vh]">
              {contentComponent}
            </div>
            <Button
              variant="ghost"
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20"
              icon={Maximize}
            />
          </div>
        ) : (
          <>
            {contentComponent}
            
            {/* Fullscreen button */}
            <Button
              variant="ghost"
              onClick={toggleFullscreen}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              icon={Maximize}
              size="sm"
            />
          </>
        )}
      </div>

      {/* View mode controls */}
      <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
        {videoMapping?.customVideoUrl && hasVideoConsent && (
          <>
            <Button
              variant={viewMode === 'video' ? 'primary' : 'outline'}
              size="sm"
              icon={Video}
              onClick={() => handleViewModeChange('video')}
            >
              Video
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Settings}
              onClick={() => setShowVideoSelector(true)}
            >
              {t('common:language') === 'nl' ? 'Andere video' : 'Choose video'}
            </Button>
          </>
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

      {/* Video Selector Modal */}
      {showVideoSelector && (
        <VideoSelector
          exerciseId={exerciseId}
          exerciseName={exerciseName}
          currentVideoUrl={videoMapping?.customVideoUrl}
          onVideoSelected={handleVideoSelection}
          onClose={() => setShowVideoSelector(false)}
        />
      )}

      {/* Exercise metadata */}
      {animation && (
        <div className="mt-2 text-xs text-slate-500 text-center">
          <div className="flex items-center justify-center gap-4">
            <span>Muscles: {animation.metadata.muscleGroups.join(', ')}</span>
            <span>Style: {animation.style}</span>
            <span>Duration: {animation.duration}s</span>
          </div>
          <div className="text-slate-500 text-xs mt-1">
            {isVideoLoading ? 'Loading video...' : 'Generating demonstration...'}
          </div>
        </div>
      )}
    </div>
  );
};