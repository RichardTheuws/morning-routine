import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { pexelsVideoService, ExerciseVideoMapping } from '../../services/PexelsVideoService';
import { VideoPlayer } from './VideoPlayer';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { X, Check, Search, RefreshCw, Star, Eye } from 'lucide-react';

interface VideoSelectorProps {
  exerciseId: string;
  exerciseName: string;
  currentVideoUrl?: string;
  onVideoSelected: (videoMapping: ExerciseVideoMapping) => void;
  onClose: () => void;
}

export const VideoSelector: React.FC<VideoSelectorProps> = ({
  exerciseId,
  exerciseName,
  currentVideoUrl,
  onVideoSelected,
  onClose
}) => {
  const { t, i18n } = useTranslation(['common', 'exercises']);
  const [videoOptions, setVideoOptions] = useState<ExerciseVideoMapping[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<ExerciseVideoMapping | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const isLanguageDutch = i18n.language === 'nl';

  useEffect(() => {
    loadVideoOptions();
  }, [exerciseId]);

  const loadVideoOptions = async () => {
    setIsLoading(true);
    try {
      // Get multiple video options for this exercise
      const options = await pexelsVideoService.getMultipleVideoOptions(exerciseId, exerciseName);
      setVideoOptions(options);
      
      // Pre-select current video if available
      const current = options.find(option => option.customVideoUrl === currentVideoUrl);
      if (current) {
        setSelectedVideo(current);
      }
    } catch (error) {
      console.error('Failed to load video options:', error);
    }
    setIsLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const searchResults = await pexelsVideoService.searchCustomVideos(searchQuery);
      setVideoOptions(prev => [...prev, ...searchResults]);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setIsSearching(false);
  };

  const handleVideoSelect = (video: ExerciseVideoMapping) => {
    setSelectedVideo(video);
  };

  const handleConfirmSelection = () => {
    if (selectedVideo) {
      // Save user preference
      pexelsVideoService.saveUserVideoPreference(exerciseId, selectedVideo);
      onVideoSelected(selectedVideo);
      onClose();
    }
  };

  const handleRefresh = () => {
    loadVideoOptions();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              {isLanguageDutch ? 'Video kiezen voor' : 'Choose video for'} {exerciseName}
            </h2>
            <Button variant="ghost" onClick={onClose} icon={X} />
          </div>
          
          {/* Search bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isLanguageDutch ? 'Zoek naar specifieke video...' : 'Search for specific video...'}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={!searchQuery.trim() || isSearching}
              icon={isSearching ? RefreshCw : Search}
            >
              {isSearching ? (isLanguageDutch ? 'Zoeken...' : 'Searching...') : (isLanguageDutch ? 'Zoeken' : 'Search')}
            </Button>
            <Button variant="outline" onClick={handleRefresh} icon={RefreshCw}>
              {isLanguageDutch ? 'Vernieuwen' : 'Refresh'}
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <div className="text-slate-600">{isLanguageDutch ? 'Video opties laden...' : 'Loading video options...'}</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videoOptions.map((video, index) => (
                <div
                  key={`${video.exerciseId}-${index}`}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedVideo?.customVideoUrl === video.customVideoUrl
                      ? 'border-emerald-500 ring-2 ring-emerald-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="aspect-video">
                    <VideoPlayer
                      videoUrl={video.customVideoUrl || ''}
                      thumbnailUrl={video.thumbnailUrl || ''}
                      exerciseName={`${exerciseName} - Option ${index + 1}`}
                      className="w-full h-full"
                      autoplay={false}
                    />
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedVideo?.customVideoUrl === video.customVideoUrl && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Current video indicator */}
                  {video.customVideoUrl === currentVideoUrl && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                      {isLanguageDutch ? 'Huidige' : 'Current'}
                    </div>
                  )}
                  
                  {/* Video info */}
                  <div className="p-3 bg-white">
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {video.description || `${exerciseName} - Option ${index + 1}`}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {video.searchTerms?.join(', ') || 'Exercise demonstration'}
                    </div>
                  </div>
                </div>
              ))}
              
              {videoOptions.length === 0 && !isLoading && (
                <div className="col-span-full text-center py-12">
                  <Eye className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <div className="text-slate-600 mb-2">
                    {isLanguageDutch ? 'Geen video opties gevonden' : 'No video options found'}
                  </div>
                  <div className="text-sm text-slate-500">
                    {isLanguageDutch ? 'Probeer een andere zoekterm' : 'Try a different search term'}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              {selectedVideo ? (
                <>
                  <Star className="w-4 h-4 inline mr-1" />
                  {isLanguageDutch ? 'Video geselecteerd' : 'Video selected'}
                </>
              ) : (
                isLanguageDutch ? 'Kies een video om door te gaan' : 'Select a video to continue'
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                {t('common:cancel')}
              </Button>
              <Button 
                onClick={handleConfirmSelection}
                disabled={!selectedVideo}
                icon={Check}
              >
                {isLanguageDutch ? 'Video gebruiken' : 'Use this video'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};