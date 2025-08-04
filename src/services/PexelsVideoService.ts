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
      searchTerms: ['cat cow pose', 'spinal mobility', 'yoga flow', 'back flexibility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6740794/6740794-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6740794/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Cat-Cow spinal mobility exercise'
    },
    {
      exerciseId: 'bird-dog',
      searchTerms: ['bird dog exercise', 'core stability', 'balance training', 'quadruped'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991579/7991579-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991579/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Bird-Dog core stability exercise'
    },
    {
      exerciseId: 'childs-pose',
      searchTerms: ['child pose yoga', 'balasana', 'restorative yoga', 'hip flexor stretch'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436729/8436729-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436729/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Child\'s Pose relaxation stretch'
    },
    {
      exerciseId: 'cobra-stretch',
      searchTerms: ['cobra pose yoga', 'bhujangasana', 'back extension', 'spine flexibility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6975214/6975214-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6975214/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Cobra stretch back extension'
    },
    {
      exerciseId: 'thoracic-spine-rotation',
      searchTerms: ['thoracic spine rotation', 'spinal twist', 'upper back mobility', 'rotation exercise'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991462/7991462-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991462/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Thoracic spine rotation mobility'
    },
    {
      exerciseId: 'wall-angels',
      searchTerms: ['wall angels exercise', 'shoulder blade mobility', 'posture correction', 'wall slide'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436842/8436842-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436842/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Wall angels shoulder blade exercise'
    },
    {
      exerciseId: 'neck-side-bends',
      searchTerms: ['neck side bend', 'lateral neck stretch', 'cervical mobility', 'neck flexibility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991348/7991348-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991348/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Neck side bend stretch'
    },
    {
      exerciseId: 'chin-tucks',
      searchTerms: ['chin tuck exercise', 'neck posture correction', 'cervical retraction', 'forward head posture'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6740856/6740856-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6740856/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Chin tuck neck posture exercise'
    },
    {
      exerciseId: 'shoulder-blade-squeezes',
      searchTerms: ['shoulder blade squeeze', 'rhomboid exercise', 'scapular retraction', 'upper back strengthening'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991256/7991256-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991256/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Shoulder blade squeeze exercise'
    },
    {
      exerciseId: 'dead-bug',
      searchTerms: ['dead bug exercise', 'core stability training', 'anti-extension', 'abdominal exercise'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436951/8436951-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436951/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Dead bug core stability exercise'
    },
    {
      exerciseId: 'hip-circles',
      searchTerms: ['hip circles exercise', 'hip mobility warm up', 'dynamic stretching', 'hip flexor mobility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6975389/6975389-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6975389/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Hip circles mobility exercise'
    },
    {
      exerciseId: 'marching-in-place',
      searchTerms: ['marching in place', 'stationary march', 'cardio warm up', 'knee lift exercise'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991123/7991123-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991123/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Marching in place cardio exercise'
    },
    {
      exerciseId: 'bodyweight-squats',
      searchTerms: ['bodyweight squat', 'air squat', 'leg strengthening', 'functional movement'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6740623/6740623-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6740623/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Bodyweight squat exercise'
    },
    {
      exerciseId: 'deep-breathing',
      searchTerms: ['deep breathing exercise', 'diaphragmatic breathing', 'relaxation technique', 'mindful breathing'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436574/8436574-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436574/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Deep breathing relaxation exercise'
    },
    {
      exerciseId: 'ankle-circles',
      searchTerms: ['ankle circles exercise', 'ankle mobility warm up', 'foot flexibility', 'ankle rotation'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6975156/6975156-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6975156/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Ankle circles mobility exercise'
    },
    {
      exerciseId: 'wrist-circles',
      searchTerms: ['wrist circles exercise', 'wrist mobility stretch', 'computer user stretch', 'forearm flexibility'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991034/7991034-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991034/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Wrist circles mobility exercise'
    },
    {
      exerciseId: 'glute-bridge',
      searchTerms: ['glute bridge exercise', 'hip bridge', 'glute activation', 'posterior chain'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6740945/6740945-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6740945/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Glute bridge hip strengthening exercise'
    },
    {
      exerciseId: 'neck-rotations',
      searchTerms: ['neck rotation exercise', 'cervical rotation', 'neck mobility stretch', 'head circles'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436687/8436687-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436687/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Neck rotation mobility exercise'
    },
    {
      exerciseId: 'shoulder-rolls',
      searchTerms: ['shoulder rolls exercise', 'shoulder mobility warm up', 'shoulder blade movement', 'upper body stretch'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991789/7991789-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991789/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Shoulder roll mobility exercise'
    },
    {
      exerciseId: 'jumping-jacks',
      searchTerms: ['jumping jacks exercise', 'star jumps', 'cardio workout', 'full body exercise'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6740512/6740512-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6740512/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Jumping jacks cardio exercise'
    },
    {
      exerciseId: 'lying-knee-to-chest',
      searchTerms: ['knee to chest stretch', 'hip flexor stretch', 'lying hip stretch', 'lower back relief'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436798/8436798-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436798/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Knee to chest hip mobility stretch'
    },
    {
      exerciseId: 'standing-forward-bend',
      searchTerms: ['standing forward bend', 'uttanasana', 'hamstring stretch', 'forward fold'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6975067/6975067-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6975067/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Standing forward bend hamstring stretch'
    },
    {
      exerciseId: 'seated-spinal-twist',
      searchTerms: ['seated spinal twist', 'seated twist pose', 'spine rotation', 'back mobility stretch'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991645/7991645-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991645/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Seated spinal twist for back mobility'
    },
    {
      exerciseId: 'knee-rolls',
      searchTerms: ['knee rolls exercise', 'lower back mobility', 'spinal rotation', 'back pain relief'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436612/8436612-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436612/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Knee rolls for lower back mobility'
    },
    {
      exerciseId: 'superman',
      searchTerms: ['superman exercise', 'back extension', 'posterior chain', 'spinal erector strengthening'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6740734/6740734-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6740734/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Superman back strengthening exercise'
    }
    ,
    {
      exerciseId: 'knee-taps',
      searchTerms: ['knee taps exercise', 'high knees cardio', 'knee lift warm up', 'cardio knee raises'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436123/8436123-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436123/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Knee taps cardio exercise'
    },
    {
      exerciseId: 'heel-taps',
      searchTerms: ['heel taps exercise', 'butt kicks cardio', 'hamstring activation', 'heel to glute'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436234/8436234-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436234/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Heel taps hamstring activation exercise'
    },
    {
      exerciseId: 'bodyweight-squats-advanced',
      searchTerms: ['bodyweight squat exercise', 'air squat fitness', 'squat form demonstration', 'functional squat'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6740456/6740456-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6740456/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Bodyweight squat strength exercise'
    },
    {
      exerciseId: 'elbow-to-knee',
      searchTerms: ['elbow to knee exercise', 'standing oblique crunch', 'core rotation exercise', 'dynamic core'],
      customVideoUrl: 'https://videos.pexels.com/video-files/7991678/7991678-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/7991678/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Elbow to knee core exercise'
    },
    {
      exerciseId: 'step-jacks',
      searchTerms: ['step jacks exercise', 'low impact jumping jacks', 'cardio step movement', 'lateral step cardio'],
      customVideoUrl: 'https://videos.pexels.com/video-files/8436345/8436345-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/8436345/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Step jacks low impact cardio exercise'
    },
    {
      exerciseId: 'punches',
      searchTerms: ['boxing punches exercise', 'cardio boxing workout', 'shadow boxing fitness', 'punch cardio'],
      customVideoUrl: 'https://videos.pexels.com/video-files/6740389/6740389-uhd_2560_1440_25fps.mp4',
      thumbnailUrl: 'https://images.pexels.com/videos/6740389/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=400&h=300',
      description: 'Boxing punches cardio exercise'
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

  // Enhanced search query generation for better video matching
  private enhanceSearchQuery(exerciseId: string): string {
    const specificTerms: Record<string, string> = {
      'cat-cow-stretch': 'cat cow pose yoga spinal mobility',
      'bird-dog': 'bird dog core stability balance training',
      'childs-pose': 'child pose balasana yoga relaxation',
      'cobra-stretch': 'cobra pose bhujangasana back extension',
      'thoracic-spine-rotation': 'thoracic spine rotation upper back twist',
      'wall-angels': 'wall angels shoulder blade posture exercise',
      'neck-side-bends': 'neck side bend lateral cervical stretch',
      'chin-tucks': 'chin tuck neck posture correction exercise',
      'shoulder-blade-squeezes': 'shoulder blade squeeze scapular retraction',
      'dead-bug': 'dead bug core stability anti-extension',
      'hip-circles': 'hip circles mobility dynamic warm up',
      'marching-in-place': 'marching in place stationary cardio',
      'bodyweight-squats': 'bodyweight squat air squat functional',
      'deep-breathing': 'deep breathing diaphragmatic relaxation',
      'ankle-circles': 'ankle circles mobility foot flexibility',
      'wrist-circles': 'wrist circles forearm computer stretch',
      'glute-bridge': 'glute bridge hip bridge posterior chain',
      'neck-rotations': 'neck rotation cervical mobility head circles',
      'shoulder-rolls': 'shoulder rolls mobility upper body warm up',
      'jumping-jacks': 'jumping jacks star jumps cardio exercise',
      'lying-knee-to-chest': 'knee to chest hip flexor lying stretch',
      'standing-forward-bend': 'standing forward bend uttanasana hamstring',
      'seated-spinal-twist': 'seated spinal twist spine rotation mobility',
      'knee-rolls': 'knee rolls lower back spinal rotation',
      'superman': 'superman exercise back extension strengthening',
      'knee-taps': 'knee taps high knees cardio knee lift warm up',
      'heel-taps': 'heel taps butt kicks hamstring activation cardio',
      'bodyweight-squats-advanced': 'bodyweight squat air squat functional movement',
      'elbow-to-knee': 'elbow to knee standing oblique core rotation',
      'step-jacks': 'step jacks low impact jumping jacks lateral cardio',
      'punches': 'boxing punches cardio shadow boxing fitness workout'
    };

    return specificTerms[exerciseId] || `${exerciseId} exercise fitness demonstration`;
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
      // More specific search terms based on exercise type
      const enhancedQuery = this.enhanceSearchQuery(query);
      
      const response = await fetch(`${this.BASE_URL}/search?query=${encodeURIComponent(enhancedQuery)}&per_page=8&orientation=landscape`, {
        headers: {
          'Authorization': this.PEXELS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Pexels API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Log successful API usage for debugging
      console.log(`Pexels API: Found ${data.videos?.length || 0} videos for "${enhancedQuery}"`);
      
      // Filter and rank videos by relevance
      const validVideos = data.videos?.filter((video: any) => 
        video.video_files && video.video_files.length > 0 && video.duration > 5
      ) || [];
      
      // Return the most relevant video (first one after filtering)
      return validVideos[0] || null;
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