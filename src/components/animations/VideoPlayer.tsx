import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  exerciseName: string;
  className?: string;
  autoplay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  exerciseName,
  className = '',
  autoplay = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = async () => {
    if (!videoUrl) return;
    
    setIsLoading(true);
    setShowVideo(true);
    
    // Small delay to ensure video element is rendered
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        }).catch(error => {
          console.error('Video play failed:', error);
          setIsLoading(false);
        });
      }
    }, 100);
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
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Show thumbnail with play button if video hasn't started
  if (!showVideo) {
    return (
      <div className={`relative bg-slate-100 rounded-lg overflow-hidden ${className}`}>
        <img 
          src={thumbnailUrl} 
          alt={`${exerciseName} demonstration`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to a solid color if thumbnail fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <button
            onClick={handlePlayClick}
            disabled={!videoUrl || isLoading}
            className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 disabled:opacity-50"
            aria-label={`Play ${exerciseName} video`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-8 h-8 text-slate-700 ml-1" />
            )}
          </button>
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {exerciseName}
        </div>
        {!videoUrl && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Demo
          </div>
        )}
      </div>
    );
  }

  // Show video player
  return (
    <div className={`relative bg-slate-100 rounded-lg overflow-hidden ${className}`}>
      {videoUrl ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            console.error('Video failed to load');
            setShowVideo(false);
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback to animated placeholder
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-2 mx-auto animate-pulse">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-slate-600">Video Demo</div>
          </div>
        </div>
      )}
      
      {/* Video controls */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={isPlaying ? handlePauseClick : () => videoRef.current?.play()}
          className="w-8 h-8 bg-black bg-opacity-70 text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200"
          aria-label={isPlaying ? "Pause video" : "Play video"}
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

        {videoUrl && (
          <button
            onClick={toggleMute}
            className="w-8 h-8 bg-black bg-opacity-70 text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
        {exerciseName}
      </div>
    </div>
  );
};