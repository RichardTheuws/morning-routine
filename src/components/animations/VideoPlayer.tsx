import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, RotateCcw, Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  exerciseName: string;
  className?: string;
  autoplay?: boolean;
  onPlay?: () => void;
  onError?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  exerciseName,
  className = '',
  autoplay = false,
  onPlay,
  onError
}) => {
  const { t } = useTranslation('common');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      // Reset states when video URL changes
      setHasError(false);
      setIsVideoReady(false);
      setShowThumbnail(true);
      setIsPlaying(false);
      setLoadAttempts(0);
      
      // Preload video metadata
      videoRef.current.load();
    }
  }, [videoUrl]);

  const handlePlayClick = async () => {
    if (!videoUrl || !videoRef.current || hasError) return;
    
    setIsLoading(true);
    setHasError(false);
    
    try {
      const video = videoRef.current;
      
      // Ensure video is loaded
      if (video.readyState < 2) {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Video load timeout'));
          }, 10000); // 10 second timeout
          
          const onLoadedData = () => {
            clearTimeout(timeout);
            video.removeEventListener('loadeddata', onLoadedData);
            video.removeEventListener('error', onError);
            setIsVideoReady(true);
            resolve();
          };
          
          const onError = () => {
            clearTimeout(timeout);
            video.removeEventListener('loadeddata', onLoadedData);
            video.removeEventListener('error', onError);
            reject(new Error('Video failed to load'));
          };
          
          video.addEventListener('loadeddata', onLoadedData);
          video.addEventListener('error', onError);
          
          // Trigger load if not already loading
          if (video.readyState === 0) {
            video.load();
          }
        });
      }
      
      // Attempt to play
      await video.play();
      setShowThumbnail(false);
      setIsPlaying(true);
      setIsLoading(false);
      onPlay?.();
      
    } catch (error) {
      console.error('Video play failed:', error);
      setHasError(true);
      setIsLoading(false);
      setShowThumbnail(true);
      setLoadAttempts(prev => prev + 1);
      onError?.();
    }
  };

  const handlePauseClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (!isPlaying) {
        handlePlayClick();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    console.error(`Video error for ${exerciseName}:`, {
      error: video.error,
      networkState: video.networkState,
      readyState: video.readyState, 
      src: video.src,
      videoUrl: videoUrl
    });
    
    // Provide more specific error information
    let errorMessage = 'Video failed to load';
    if (video.networkState === 3) { // NETWORK_NO_SOURCE
      errorMessage = 'Video source not available';
    } else if (video.error) {
      switch (video.error.code) {
        case 1: // MEDIA_ERR_ABORTED
          errorMessage = 'Video loading aborted';
          break;
        case 2: // MEDIA_ERR_NETWORK
          errorMessage = 'Network error loading video';
          break;
        case 3: // MEDIA_ERR_DECODE
          errorMessage = 'Video decode error';
          break;
        case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
          errorMessage = 'Video format not supported';
          break;
      }
    }
    
    console.warn(`${errorMessage} for ${exerciseName}: ${videoUrl}`);
    setHasError(true);
    setShowThumbnail(true);
    setIsLoading(false);
    setIsVideoReady(false);
    onError?.();
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setShowThumbnail(false);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoLoadedData = () => {
    setIsVideoReady(true);
    setHasError(false);
  };

  // Fallback thumbnail if main thumbnail fails
  const fallbackThumbnail = 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400';

  return (
    <div className={`relative bg-slate-100 rounded-xl overflow-hidden ${className}`}>
      {/* Video element - always in DOM to prevent removal errors */}
      {videoUrl && (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            showThumbnail ? 'opacity-0 absolute inset-0' : 'opacity-100'
          }`}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onError={handleVideoError}
          onLoadedData={handleVideoLoadedData}
          crossOrigin="anonymous"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
          {t('common:error')}: Video not supported
        </video>
      )}

      {/* Thumbnail overlay */}
      {(showThumbnail || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50">
          {thumbnailUrl && !hasError && (
            <img 
              src={thumbnailUrl} 
              alt={`${exerciseName} demonstration`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Try fallback thumbnail
                const currentSrc = e.currentTarget.src;
                if (!currentSrc.includes('fallback')) {
                  e.currentTarget.src = `${fallbackThumbnail}?fallback=true`;
                } else {
                  e.currentTarget.style.display = 'none';
                }
              }}
            />
          )}
          
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            {hasError ? (
              <div className="text-center text-white">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-80" />
                <div className="text-sm font-medium">Video unavailable</div>
                <div className="text-xs opacity-80">Using animation instead</div>
                {loadAttempts < 3 && (
                  <button
                    onClick={handlePlayClick}
                    className="mt-2 px-3 py-1 bg-white bg-opacity-20 rounded text-xs hover:bg-opacity-30 transition-colors"
                  >
                    {t('common:retry')}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handlePlayClick}
                disabled={!videoUrl || isLoading || !isVideoReady}
                className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Play ${exerciseName} video`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play className="w-8 h-8 text-slate-700 ml-1" />
                )}
              </button>
            )}
          </div>
          
          {/* Exercise name overlay */}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {exerciseName}
          </div>
          
          {/* Status indicators */}
          <div className="absolute top-2 right-2 flex gap-1">
            {hasError && (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                Error
              </div>
            )}
            {!videoUrl && (
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Demo
              </div>
            )}
            {isVideoReady && !hasError && (
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                Ready
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video controls - only show when video is playing */}
      {!showThumbnail && videoUrl && !hasError && isVideoReady && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={isPlaying ? handlePauseClick : handlePlayClick}
            className="w-8 h-8 bg-black bg-opacity-70 text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200"
            aria-label={isPlaying ? t('common:pause') : t('common:start')}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          
          <button
            onClick={handleRestart}
            className="w-8 h-8 bg-black bg-opacity-70 text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200"
            aria-label="Restart video"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleMute}
            className="w-8 h-8 bg-black bg-opacity-70 text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}
      
      {/* Exercise name for video mode */}
      {!showThumbnail && videoUrl && !hasError && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {exerciseName} • Video Demo
        </div>
      )}
    </div>
  );
};