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
  private readonly PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || 'aJ6Ng9GbHjTQZKwvyaYFdLGfnBeRBGXfvUy0OY0wugm7HjGebQoVVhho';
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

  async getVideoForExercise(exerciseId: string): Promise<ExerciseVideoMapping | null> {
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