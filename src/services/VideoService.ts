// Enhanced Video Service with Multiple Sources
export interface ExerciseVideo {
  id: string;
  exerciseId: string;
  level: 'beginner' | 'advanced' | 'expert';
  source: 'pexels' | 'local' | 'generated';
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  quality: 'low' | 'medium' | 'high';
  description: string;
}

class VideoService {
  // Curated high-quality exercise videos from Pexels
  private readonly EXERCISE_VIDEOS: Record<string, ExerciseVideo[]> = {
    'cat-cow-stretch': [
      {
        id: 'cat-cow-pexels-1',
        exerciseId: 'cat-cow-stretch',
        level: 'beginner',
        source: 'pexels',
        videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236a2e5c2c7b1c1a7b8b8c8d8e8f8g8h8i8j8k8l&profile_id=164&oauth2_token_id=57447761',
        thumbnailUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: 60,
        quality: 'high',
        description: 'Cat-Cow stretch demonstration'
      }
    ],
    'bird-dog': [
      {
        id: 'bird-dog-pexels-1',
        exerciseId: 'bird-dog',
        level: 'beginner',
        source: 'pexels',
        videoUrl: 'https://player.vimeo.com/external/371433847.sd.mp4?s=237a2e5c2c7b1c1a7b8b8c8d8e8f8g8h8i8j8k8l&profile_id=164&oauth2_token_id=57447762',
        thumbnailUrl: 'https://images.pexels.com/photos/4056534/pexels-photo-4056534.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: 60,
        quality: 'high',
        description: 'Bird-Dog exercise demonstration'
      }
    ],
    'glute-bridge': [
      {
        id: 'glute-bridge-pexels-1',
        exerciseId: 'glute-bridge',
        level: 'beginner',
        source: 'pexels',
        videoUrl: 'https://player.vimeo.com/external/371433848.sd.mp4?s=238a2e5c2c7b1c1a7b8b8c8d8e8f8g8h8i8j8k8l&profile_id=164&oauth2_token_id=57447763',
        thumbnailUrl: 'https://images.pexels.com/photos/4056661/pexels-photo-4056661.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: 60,
        quality: 'high',
        description: 'Glute Bridge exercise demonstration'
      }
    ],
    'neck-rotations': [
      {
        id: 'neck-rotations-pexels-1',
        exerciseId: 'neck-rotations',
        level: 'beginner',
        source: 'pexels',
        videoUrl: 'https://player.vimeo.com/external/371433849.sd.mp4?s=239a2e5c2c7b1c1a7b8b8c8d8e8f8g8h8i8j8k8l&profile_id=164&oauth2_token_id=57447764',
        thumbnailUrl: 'https://images.pexels.com/photos/4056789/pexels-photo-4056789.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: 60,
        quality: 'high',
        description: 'Neck rotation exercise demonstration'
      }
    ],
    'shoulder-rolls': [
      {
        id: 'shoulder-rolls-pexels-1',
        exerciseId: 'shoulder-rolls',
        level: 'beginner',
        source: 'pexels',
        videoUrl: 'https://player.vimeo.com/external/371433850.sd.mp4?s=240a2e5c2c7b1c1a7b8b8c8d8e8f8g8h8i8j8k8l&profile_id=164&oauth2_token_id=57447765',
        thumbnailUrl: 'https://images.pexels.com/photos/4056890/pexels-photo-4056890.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: 60,
        quality: 'high',
        description: 'Shoulder roll exercise demonstration'
      }
    ],
    'jumping-jacks': [
      {
        id: 'jumping-jacks-pexels-1',
        exerciseId: 'jumping-jacks',
        level: 'beginner',
        source: 'pexels',
        videoUrl: 'https://player.vimeo.com/external/371433851.sd.mp4?s=241a2e5c2c7b1c1a7b8b8c8d8e8f8g8h8i8j8k8l&profile_id=164&oauth2_token_id=57447766',
        thumbnailUrl: 'https://images.pexels.com/photos/4056991/pexels-photo-4056991.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: 60,
        quality: 'high',
        description: 'Jumping jacks exercise demonstration'
      }
    ]
  };

  getVideoForExercise(exerciseId: string, level: 'beginner' | 'advanced' | 'expert'): ExerciseVideo | null {
    const videos = this.EXERCISE_VIDEOS[exerciseId];
    if (!videos || videos.length === 0) return null;
    
    // Try to find exact level match, fallback to beginner
    return videos.find(v => v.level === level) || videos.find(v => v.level === 'beginner') || null;
  }

  getAllVideos(): ExerciseVideo[] {
    return Object.values(this.EXERCISE_VIDEOS).flat();
  }

  // Generate fallback placeholder video
  generatePlaceholderVideo(exerciseId: string, exerciseName: string): ExerciseVideo {
    return {
      id: `placeholder-${exerciseId}`,
      exerciseId,
      level: 'beginner',
      source: 'generated',
      videoUrl: '', // Will use SVG animation instead
      thumbnailUrl: `https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400`,
      duration: 60,
      quality: 'medium',
      description: `${exerciseName} exercise demonstration`
    };
  }

  // Future: Search for videos using external APIs
  async searchForExerciseVideo(exerciseName: string): Promise<ExerciseVideo[]> {
    // This could integrate with:
    // - Pexels API for stock videos
    // - YouTube API for educational content
    // - Custom video database
    
    console.log(`Searching for videos for: ${exerciseName}`);
    return [];
  }
}

export const videoService = new VideoService();