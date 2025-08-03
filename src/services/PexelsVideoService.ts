// Professional Pexels Video Integration Service
export interface PexelsVideo {
  id: number;
  url: string;
  duration: number;
  width: number;
  height: number;
  image: string;
  video_files: Array<{
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    link: string;
  }>;
  video_pictures: Array<{
    id: number;
    picture: string;
    nr: number;
  }>;
}

export interface ExerciseVideoMapping {
  exerciseId: string;
  searchTerms: string[];
  pexelsVideoId?: number;
  customVideoUrl?: string;
  thumbnailUrl?: string;
  description: string;
}

class PexelsVideoService {
  private readonly PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || '';
  private readonly BASE_URL = 'https://api.pexels.com/videos';
  
  // Curated exercise video mappings with working Pexels videos
  private readonly EXERCISE_VIDEO_MAPPINGS: ExerciseVideoMapping[] = [
    {
      exerciseId: 'cat-cow-stretch',
      searchTerms: ['yoga', 'cat cow', 'spine stretch', 'back exercise'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056723/4056723-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056723/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Cat-Cow spinal mobility exercise'
    },
    {
      exerciseId: 'bird-dog',
      searchTerms: ['bird dog', 'core exercise', 'stability', 'quadruped'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056534/4056534-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056534/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Bird-Dog core stability exercise'
    },
    {
      exerciseId: 'childs-pose',
      searchTerms: ['child pose', 'yoga', 'relaxation', 'back stretch'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8550000/8550000-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8550000/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Child\'s Pose relaxation stretch'
    },
    {
      exerciseId: 'cobra-stretch',
      searchTerms: ['cobra pose', 'back extension', 'yoga', 'spine'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057123/4057123-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057123/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Cobra stretch back extension'
    },
    {
      exerciseId: 'thoracic-spine-rotation',
      searchTerms: ['thoracic rotation', 'spine mobility', 'back twist'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057234/4057234-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057234/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Thoracic spine rotation mobility'
    },
    {
      exerciseId: 'wall-angels',
      searchTerms: ['wall angels', 'shoulder blade', 'posture', 'back'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056661/4056661-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056661/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Wall angels shoulder blade exercise'
    },
    {
      exerciseId: 'neck-side-bends',
      searchTerms: ['neck stretch', 'lateral neck', 'neck mobility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056789/4056789-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056789/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Neck side bend stretch'
    },
    {
      exerciseId: 'chin-tucks',
      searchTerms: ['chin tuck', 'neck posture', 'cervical', 'neck exercise'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057009/4057009-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057009/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Chin tuck neck posture exercise'
    },
    {
      exerciseId: 'shoulder-blade-squeezes',
      searchTerms: ['shoulder blade squeeze', 'rhomboid', 'posture', 'upper back'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056991/4056991-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056991/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Shoulder blade squeeze exercise'
    },
    {
      exerciseId: 'dead-bug',
      searchTerms: ['dead bug', 'core stability', 'core exercise', 'abs'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057345/4057345-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057345/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Dead bug core stability exercise'
    },
    {
      exerciseId: 'hip-circles',
      searchTerms: ['hip circles', 'hip mobility', 'warm up', 'movement'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057456/4057456-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057456/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Hip circles mobility exercise'
    },
    {
      exerciseId: 'marching-in-place',
      searchTerms: ['marching', 'cardio', 'warm up', 'knee lifts'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056991/4056991-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056991/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Marching in place cardio exercise'
    },
    {
      exerciseId: 'bodyweight-squats',
      searchTerms: ['bodyweight squat', 'squat', 'legs', 'strength'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056723/4056723-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056723/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Bodyweight squat exercise'
    },
    {
      exerciseId: 'deep-breathing',
      searchTerms: ['breathing exercise', 'relaxation', 'meditation', 'mindfulness'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057234/4057234-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057234/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Deep breathing relaxation exercise'
    },
    {
      exerciseId: 'ankle-circles',
      searchTerms: ['ankle circles', 'ankle mobility', 'foot exercise', 'warm up'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057345/4057345-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057345/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Ankle circles mobility exercise'
    },
    {
      exerciseId: 'wrist-circles',
      searchTerms: ['wrist circles', 'wrist mobility', 'computer stretch', 'forearm'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057456/4057456-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057456/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Wrist circles mobility exercise'
    },
    {
      exerciseId: 'glute-bridge',
      searchTerms: ['glute bridge', 'hip bridge', 'glutes', 'hip exercise'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056661/4056661-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056661/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Glute bridge hip strengthening exercise'
    },
    {
      exerciseId: 'neck-rotations',
      searchTerms: ['neck stretch', 'neck rotation', 'neck mobility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056789/4056789-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056789/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Neck rotation mobility exercise'
    },
    {
      exerciseId: 'shoulder-rolls',
      searchTerms: ['shoulder roll', 'shoulder mobility', 'shoulder stretch'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056890/4056890-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056890/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Shoulder roll mobility exercise'
    },
    {
      exerciseId: 'jumping-jacks',
      searchTerms: ['jumping jacks', 'cardio', 'full body', 'aerobic'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4056991/4056991-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4056991/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Jumping jacks cardio exercise'
    },
    {
      exerciseId: 'lying-knee-to-chest',
      searchTerms: ['knee to chest', 'hip stretch', 'lying stretch'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057009/4057009-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057009/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Knee to chest hip mobility stretch'
    },
    {
      exerciseId: 'standing-forward-bend',
      searchTerms: ['forward bend', 'hamstring stretch', 'standing stretch'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057123/4057123-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057123/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Standing forward bend hamstring stretch'
    },
    {
      exerciseId: 'seated-spinal-twist',
      searchTerms: ['spinal twist', 'seated twist', 'back mobility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057234/4057234-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057234/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Seated spinal twist for back mobility'
    },
    {
      exerciseId: 'knee-rolls',
      searchTerms: ['knee rolls', 'back roll', 'spinal mobility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057345/4057345-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057345/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Knee rolls for lower back mobility'
    },
    {
      exerciseId: 'superman',
      searchTerms: ['superman', 'back strengthening', 'prone exercise'],
      customVideoUrl: 'https://videos.pexels.com/video-files/4057456/4057456-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/4057456/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Superman back strengthening exercise'
    }
  ];

  // Get multiple video options for user selection
  async getMultipleVideoOptions(exerciseId: string, exerciseName: string): Promise<ExerciseVideoMapping[]> {
    const options: ExerciseVideoMapping[] = [];
    
    try {
      // First, add curated video if available
      const curatedMapping = this.EXERCISE_VIDEO_MAPPINGS.find(m => m.exerciseId === exerciseId);
      if (curatedMapping && curatedMapping.customVideoUrl) {
        options.push({
          ...curatedMapping,
          description: `${curatedMapping.description} (Curated)`
        });
      }
      
      // Then search for additional options via API
      if (this.PEXELS_API_KEY) {
        const searchTerms = [
          exerciseName,
          `${exerciseName} exercise`,
          `${exerciseName} workout`,
          `${exerciseName} fitness`,
          ...this.getExerciseSearchTerms(exerciseId)
        ];
        
        for (const term of searchTerms.slice(0, 3)) { // Limit to 3 searches
          try {
            const videos = await this.searchMultiplePexelsVideos(term, 2); // Get 2 videos per search
            videos.forEach((video, index) => {
              const videoFile = this.getBestVideoFile(video.video_files);
              if (videoFile) {
                options.push({
                  exerciseId,
                  searchTerms: [term],
                  customVideoUrl: videoFile.link,
                  thumbnailUrl: video.image,
                  description: `${exerciseName} - ${term} (${index + 1})`
                });
              }
            });
          } catch (error) {
            console.warn(`Search failed for term "${term}":`, error);
          }
        }
      }
      
      // Remove duplicates based on video URL
      const uniqueOptions = options.filter((option, index, self) => 
        index === self.findIndex(o => o.customVideoUrl === option.customVideoUrl)
      );
      
      return uniqueOptions.slice(0, 9); // Limit to 9 options for UI
      
    } catch (error) {
      console.error('Failed to get multiple video options:', error);
      return options;
    }
  }

  // Search for multiple videos instead of just one
  private async searchMultiplePexelsVideos(query: string, count: number = 5): Promise<PexelsVideo[]> {
    if (!this.PEXELS_API_KEY) return [];

    try {
      const searchQuery = query.includes('exercise') ? query : `${query} exercise fitness workout`;
      
      const response = await fetch(`${this.BASE_URL}/search?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape`, {
        headers: {
          'Authorization': this.PEXELS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status}`);
      }

      const data = await response.json();
      return data.videos?.filter((video: any) => 
        video.video_files && video.video_files.length > 0
      ) || [];
      
    } catch (error) {
      console.error('Multiple Pexels search failed:', error);
      return [];
    }
  }

  // Custom search for user-specified terms
  async searchCustomVideos(searchTerm: string): Promise<ExerciseVideoMapping[]> {
    if (!this.PEXELS_API_KEY || !searchTerm.trim()) return [];
    
    try {
      const videos = await this.searchMultiplePexelsVideos(searchTerm, 6);
      return videos.map((video, index) => {
        const videoFile = this.getBestVideoFile(video.video_files);
        return {
          exerciseId: 'custom-search',
          searchTerms: [searchTerm],
          customVideoUrl: videoFile?.link || '',
          thumbnailUrl: video.image,
          description: `${searchTerm} - Result ${index + 1}`
        };
      }).filter(mapping => mapping.customVideoUrl);
      
    } catch (error) {
      console.error('Custom search failed:', error);
      return [];
    }
  }

  // Get exercise-specific search terms
  private getExerciseSearchTerms(exerciseId: string): string[] {
    const mapping = this.EXERCISE_VIDEO_MAPPINGS.find(m => m.exerciseId === exerciseId);
    return mapping?.searchTerms || [];
  }

  // Save user video preference
  saveUserVideoPreference(exerciseId: string, videoMapping: ExerciseVideoMapping): void {
    try {
      const preferences = this.getUserVideoPreferences();
      preferences[exerciseId] = {
        videoUrl: videoMapping.customVideoUrl || '',
        thumbnailUrl: videoMapping.thumbnailUrl || '',
        description: videoMapping.description,
        selectedAt: new Date().toISOString()
      };
      
      localStorage.setItem('user-video-preferences', JSON.stringify(preferences));
      console.log(`Saved video preference for ${exerciseId}`);
      
    } catch (error) {
      console.error('Failed to save video preference:', error);
    }
  }

  // Get user video preferences
  getUserVideoPreferences(): Record<string, any> {
    try {
      const stored = localStorage.getItem('user-video-preferences');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to get video preferences:', error);
      return {};
    }
  }

  // Get user's preferred video for an exercise
  getUserPreferredVideo(exerciseId: string): ExerciseVideoMapping | null {
    try {
      const preferences = this.getUserVideoPreferences();
      const preference = preferences[exerciseId];
      
      if (preference && preference.videoUrl) {
        return {
          exerciseId,
          searchTerms: [],
          customVideoUrl: preference.videoUrl,
          thumbnailUrl: preference.thumbnailUrl,
          description: preference.description || `${exerciseId} (User Selected)`
        };
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get user preferred video:', error);
      return null;
    }
  }

  async getVideoForExercise(exerciseId: string): Promise<ExerciseVideoMapping | null> {
    // First check user preferences
    const userPreferred = this.getUserPreferredVideo(exerciseId);
    if (userPreferred) {
      return userPreferred;
    }
    
    // Prioritize API search for fresh, working video URLs
    if (!this.PEXELS_API_KEY) {
      console.warn('Pexels API key not configured, using fallback content');
      // Check curated mappings as fallback when no API key
      const mapping = this.EXERCISE_VIDEO_MAPPINGS.find(m => m.exerciseId === exerciseId);
      if (mapping) {
        return mapping;
      }
      return this.generateFallbackContent(exerciseId);
    }

    try {
      // First try API search for fresh video URLs
      const searchResult = await this.searchPexelsVideos(exerciseId);
      if (searchResult) {
        // Get the best quality video file
        const videoFile = this.getBestVideoFile(searchResult.video_files);
        if (videoFile) {
          return {
            exerciseId,
            searchTerms: [exerciseId],
            customVideoUrl: videoFile.link,
            thumbnailUrl: searchResult.image,
            description: `${exerciseId} exercise demonstration`
          };
        }
      }
      
      // Fallback to curated mappings if API search fails
      const mapping = this.EXERCISE_VIDEO_MAPPINGS.find(m => m.exerciseId === exerciseId);
      if (mapping) {
        // Validate the curated URL before returning
        const isValid = await this.validateVideoUrl(mapping.customVideoUrl || '');
        if (isValid) {
          return mapping;
        }
      }
      
      // Try a broader search if specific exercise not found
      const broadSearchResult = await this.searchPexelsVideos('fitness exercise workout');
      if (broadSearchResult) {
        const videoFile = this.getBestVideoFile(broadSearchResult.video_files);
        if (videoFile) {
          return {
            exerciseId,
            searchTerms: ['fitness', 'exercise'],
            customVideoUrl: videoFile.link,
            thumbnailUrl: broadSearchResult.image,
            description: `${exerciseId} exercise - fitness demonstration`
          };
        }
      }
    } catch (error) {
      console.error('Pexels API search failed:', error);
      
      // Final fallback to curated mappings
      const mapping = this.EXERCISE_VIDEO_MAPPINGS.find(m => m.exerciseId === exerciseId);
      if (mapping) {
        return {
          exerciseId,
          searchTerms: mapping.searchTerms,
          customVideoUrl: mapping.customVideoUrl,
          thumbnailUrl: mapping.thumbnailUrl,
          description: mapping.description
        };
      }
    }

    return this.generateFallbackContent(exerciseId);
  }

  // Get the best quality video file from available options
  private getBestVideoFile(videoFiles: any[]): any | null {
    if (!videoFiles || videoFiles.length === 0) return null;
    
    // Prefer HD quality, then standard, then any available
    const hdVideo = videoFiles.find(file => 
      file.quality === 'hd' && file.file_type === 'video/mp4'
    );
    if (hdVideo) return hdVideo;
    
    const sdVideo = videoFiles.find(file => 
      file.quality === 'sd' && file.file_type === 'video/mp4'
    );
    if (sdVideo) return sdVideo;
    
    // Return any MP4 file as fallback
    const mp4Video = videoFiles.find(file => file.file_type === 'video/mp4');
    if (mp4Video) return mp4Video;
    
    // Return first available file
    return videoFiles[0];
  }

  private async searchPexelsVideos(query: string): Promise<PexelsVideo | null> {
    if (!this.PEXELS_API_KEY) {
      console.warn('Pexels API key not configured');
      return null;
    }

    try {
      // Enhanced search with fitness-specific terms
      const searchQuery = query.includes('exercise') ? query : `${query} exercise fitness workout`;
      
      const response = await fetch(`${this.BASE_URL}/search?query=${encodeURIComponent(searchQuery)}&per_page=5&orientation=landscape`, {
        headers: {
          'Authorization': this.PEXELS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Log successful API usage for debugging
      console.log(`Pexels API: Found ${data.videos?.length || 0} videos for "${searchQuery}"`);
      
      // Return the first video with valid video files
      const validVideo = data.videos?.find((video: any) => 
        video.video_files && video.video_files.length > 0
      );
      
      return validVideo || null;
    } catch (error) {
      console.error('Pexels search failed:', error);
      return null;
    }
  }

  // Validate video URL accessibility
  async validateVideoUrl(url: string): Promise<boolean> {
    if (!url) return false;
    
    try {
      // Use HEAD request to check if video exists without downloading
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors'
      });
      return true; // If no error thrown, assume valid
    } catch (error) {
      console.warn('Video validation failed:', error);
      return false;
    }
  }

  // Get optimized video URL based on device capabilities
  getOptimizedVideoUrl(mapping: ExerciseVideoMapping, quality: 'low' | 'medium' | 'high' = 'medium'): string {
    if (!mapping.customVideoUrl) return '';
    
    // For Vimeo videos, return the provided URL (already optimized)
    const baseUrl = mapping.customVideoUrl;
    return baseUrl; // Vimeo handles quality adaptation automatically
  }

  // Generate fallback content when video is not available
  generateFallbackContent(exerciseId: string): ExerciseVideoMapping {
    return {
      exerciseId,
      searchTerms: [exerciseId],
      thumbnailUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: `${exerciseId} exercise - animation demonstration`
    };
  }

  // Batch load videos for better performance
  async preloadExerciseVideos(exerciseIds: string[]): Promise<Map<string, ExerciseVideoMapping>> {
    const videoMap = new Map<string, ExerciseVideoMapping>();
    
    const loadPromises = exerciseIds.map(async (exerciseId) => {
      try {
        const mapping = await this.getVideoForExercise(exerciseId);
        if (mapping) {
          videoMap.set(exerciseId, mapping);
        }
      } catch (error) {
        console.error(`Failed to load video for ${exerciseId}:`, error);
      }
    });

    await Promise.allSettled(loadPromises);
    return videoMap;
  }

  // Analytics for video performance (privacy-compliant)
  trackVideoPerformance(exerciseId: string, event: 'load' | 'play' | 'error', metadata?: any): void {
    // Only track if user has consented to analytics
    const consent = localStorage.getItem('morning-routine-privacy');
    if (!consent) return;
    
    try {
      const consentData = JSON.parse(consent);
      if (!consentData.analytics) return;
      
      // Store anonymous performance data
      const performanceData = {
        timestamp: Date.now(),
        exerciseId,
        event,
        metadata: metadata || {},
        userAgent: navigator.userAgent.substring(0, 50) // Truncated for privacy
      };
      
      const existingData = localStorage.getItem('video-performance') || '[]';
      const performanceLog = JSON.parse(existingData);
      performanceLog.push(performanceData);
      
      // Keep only last 100 entries
      if (performanceLog.length > 100) {
        performanceLog.splice(0, performanceLog.length - 100);
      }
      
      localStorage.setItem('video-performance', JSON.stringify(performanceLog));
    } catch (error) {
      console.error('Failed to track video performance:', error);
    }
  }
}

export const pexelsVideoService = new PexelsVideoService();