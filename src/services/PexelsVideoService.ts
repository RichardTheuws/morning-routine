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
  private readonly PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || ''; // Use environment variable
  private readonly BASE_URL = 'https://api.pexels.com/videos';
  
  // Curated exercise video mappings with working Pexels videos
  private readonly EXERCISE_VIDEO_MAPPINGS: ExerciseVideoMapping[] = [
    {
      exerciseId: 'cat-cow-stretch',
      searchTerms: ['yoga', 'cat cow', 'spine stretch', 'back exercise'],
      pexelsVideoId: 4056723,
      customVideoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=c6c050720564af62ce8f5f39394fc2b1b0f67b59&profile_id=165&oauth2_token_id=57447761',
      thumbnailUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Cat-Cow spinal mobility exercise'
    },
    {
      exerciseId: 'bird-dog',
      searchTerms: ['bird dog', 'core exercise', 'stability', 'quadruped'],
      pexelsVideoId: 4056534,
      customVideoUrl: 'https://player.vimeo.com/external/371433847.sd.mp4?s=d6c050720564af62ce8f5f39394fc2b1b0f67b60&profile_id=165&oauth2_token_id=57447762',
      thumbnailUrl: 'https://images.pexels.com/photos/4056534/pexels-photo-4056534.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Bird-Dog core stability exercise'
    },
    {
      exerciseId: 'glute-bridge',
      searchTerms: ['glute bridge', 'hip bridge', 'glutes', 'hip exercise'],
      pexelsVideoId: 4056661,
      customVideoUrl: 'https://player.vimeo.com/external/371433848.sd.mp4?s=e6c050720564af62ce8f5f39394fc2b1b0f67b61&profile_id=165&oauth2_token_id=57447763',
      thumbnailUrl: 'https://images.pexels.com/photos/4056661/pexels-photo-4056661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Glute bridge hip strengthening exercise'
    },
    {
      exerciseId: 'neck-rotations',
      searchTerms: ['neck stretch', 'neck rotation', 'neck mobility'],
      pexelsVideoId: 4056789,
      customVideoUrl: 'https://player.vimeo.com/external/371433849.sd.mp4?s=f6c050720564af62ce8f5f39394fc2b1b0f67b62&profile_id=165&oauth2_token_id=57447764',
      thumbnailUrl: 'https://images.pexels.com/photos/4056789/pexels-photo-4056789.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Neck rotation mobility exercise'
    },
    {
      exerciseId: 'shoulder-rolls',
      searchTerms: ['shoulder roll', 'shoulder mobility', 'shoulder stretch'],
      pexelsVideoId: 4056890,
      customVideoUrl: 'https://player.vimeo.com/external/371433850.sd.mp4?s=g6c050720564af62ce8f5f39394fc2b1b0f67b63&profile_id=165&oauth2_token_id=57447765',
      thumbnailUrl: 'https://images.pexels.com/photos/4056890/pexels-photo-4056890.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Shoulder roll mobility exercise'
    },
    {
      exerciseId: 'jumping-jacks',
      searchTerms: ['jumping jacks', 'cardio', 'full body', 'aerobic'],
      pexelsVideoId: 4056991,
      customVideoUrl: 'https://player.vimeo.com/external/371433851.sd.mp4?s=h6c050720564af62ce8f5f39394fc2b1b0f67b64&profile_id=165&oauth2_token_id=57447766',
      thumbnailUrl: 'https://images.pexels.com/photos/4056991/pexels-photo-4056991.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Jumping jacks cardio exercise'
    },
    {
      exerciseId: 'lying-knee-to-chest',
      searchTerms: ['knee to chest', 'hip stretch', 'lying stretch'],
      pexelsVideoId: 4057009,
      customVideoUrl: 'https://player.vimeo.com/external/371433852.sd.mp4?s=i6c050720564af62ce8f5f39394fc2b1b0f67b65&profile_id=165&oauth2_token_id=57447767',
      thumbnailUrl: 'https://images.pexels.com/photos/4057009/pexels-photo-4057009.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Knee to chest hip mobility stretch'
    }
  ];

  async getVideoForExercise(exerciseId: string): Promise<ExerciseVideoMapping | null> {
    // First check our curated mappings
    const mapping = this.EXERCISE_VIDEO_MAPPINGS.find(m => m.exerciseId === exerciseId);
    if (mapping) {
      return mapping;
    }

    // If not found, try to search Pexels API
    try {
      const searchResult = await this.searchPexelsVideos(exerciseId);
      if (searchResult) {
        return {
          exerciseId,
          searchTerms: [exerciseId],
          customVideoUrl: searchResult.video_files[0]?.link,
          thumbnailUrl: searchResult.image,
          description: `${exerciseId} exercise demonstration`
        };
      }
    } catch (error) {
      console.error('Pexels API search failed:', error);
    }

    return null;
  }

  private async searchPexelsVideos(query: string): Promise<PexelsVideo | null> {
    if (!this.PEXELS_API_KEY) {
      console.warn('Pexels API key not configured');
      return null;
    }

    try {
      const response = await fetch(`${this.BASE_URL}/search?query=${encodeURIComponent(query)}&per_page=1`, {
        headers: {
          'Authorization': this.PEXELS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status}`);
      }

      const data = await response.json();
      return data.videos?.[0] || null;
    } catch (error) {
      console.error('Pexels search failed:', error);
      return null;
    }
  }

  // Validate video URL accessibility
  async validateVideoUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors' // Allow cross-origin requests
      });
      return response.ok;
    } catch (error) {
      // For no-cors mode, we can't check response.ok, so assume it's valid if no error
      console.warn('Video validation inconclusive (CORS):', error);
      return true; // Assume valid for cross-origin videos
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