// Enhanced Animation Service with Video Integration
export interface ExerciseVideo {
  id: string;
  exerciseId: string;
  level: 'beginner' | 'advanced' | 'expert';
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  source: 'youtube' | 'local' | 'generated';
  quality: 'low' | 'medium' | 'high';
}

export interface AnimationConfig {
  preferVideo: boolean;
  fallbackToSVG: boolean;
  autoplay: boolean;
  showControls: boolean;
}

class VideoAnimationService {
  private readonly YOUTUBE_API_KEY = ''; // Would need API key for production
  
  // Curated exercise video database - high quality, consistent style
  private readonly EXERCISE_VIDEOS: Record<string, ExerciseVideo[]> = {
    'cat-cow-stretch': [
      {
        id: 'cat-cow-beginner',
        exerciseId: 'cat-cow-stretch',
        level: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/kqnua4rHVVA?start=15&end=75&autoplay=1&mute=1&loop=1&playlist=kqnua4rHVVA',
        thumbnailUrl: 'https://img.youtube.com/vi/kqnua4rHVVA/mqdefault.jpg',
        duration: 60,
        source: 'youtube',
        quality: 'high'
      }
    ],
    'bird-dog': [
      {
        id: 'bird-dog-beginner',
        exerciseId: 'bird-dog',
        level: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/wiFNA3sqjCA?start=10&end=70&autoplay=1&mute=1&loop=1&playlist=wiFNA3sqjCA',
        thumbnailUrl: 'https://img.youtube.com/vi/wiFNA3sqjCA/mqdefault.jpg',
        duration: 60,
        source: 'youtube',
        quality: 'high'
      }
    ],
    'glute-bridge': [
      {
        id: 'glute-bridge-beginner',
        exerciseId: 'glute-bridge',
        level: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/OUgsJ8-Vi0E?start=20&end=80&autoplay=1&mute=1&loop=1&playlist=OUgsJ8-Vi0E',
        thumbnailUrl: 'https://img.youtube.com/vi/OUgsJ8-Vi0E/mqdefault.jpg',
        duration: 60,
        source: 'youtube',
        quality: 'high'
      }
    ],
    'neck-rotations': [
      {
        id: 'neck-rotations-beginner',
        exerciseId: 'neck-rotations',
        level: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/SeczCGLOX8Q?start=5&end=65&autoplay=1&mute=1&loop=1&playlist=SeczCGLOX8Q',
        thumbnailUrl: 'https://img.youtube.com/vi/SeczCGLOX8Q/mqdefault.jpg',
        duration: 60,
        source: 'youtube',
        quality: 'high'
      }
    ],
    'shoulder-rolls': [
      {
        id: 'shoulder-rolls-beginner',
        exerciseId: 'shoulder-rolls',
        level: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI?start=10&end=70&autoplay=1&mute=1&loop=1&playlist=2yjwXTZQDDI',
        thumbnailUrl: 'https://img.youtube.com/vi/2yjwXTZQDDI/mqdefault.jpg',
        duration: 60,
        source: 'youtube',
        quality: 'high'
      }
    ],
    'jumping-jacks': [
      {
        id: 'jumping-jacks-beginner',
        exerciseId: 'jumping-jacks',
        level: 'beginner',
        videoUrl: 'https://www.youtube.com/embed/c4DAnQ6DtF8?start=5&end=65&autoplay=1&mute=1&loop=1&playlist=c4DAnQ6DtF8',
        thumbnailUrl: 'https://img.youtube.com/vi/c4DAnQ6DtF8/mqdefault.jpg',
        duration: 60,
        source: 'youtube',
        quality: 'high'
      }
    ]
  };

  getVideoForExercise(exerciseId: string, level: 'beginner' | 'advanced' | 'expert'): ExerciseVideo | null {
    const videos = this.EXERCISE_VIDEOS[exerciseId];
    if (!videos) return null;
    
    // Try to find exact level match, fallback to beginner
    return videos.find(v => v.level === level) || videos.find(v => v.level === 'beginner') || null;
  }

  getAllVideos(): ExerciseVideo[] {
    return Object.values(this.EXERCISE_VIDEOS).flat();
  }

  // Future: Auto-discover videos from YouTube
  async searchYouTubeForExercise(exerciseName: string, level: string): Promise<ExerciseVideo[]> {
    // This would use YouTube API to find appropriate videos
    // For now, return empty array
    return [];
  }

  // Generate fallback animation instructions for AI
  generateEnhancedAnimationPrompt(
    exerciseId: string, 
    exerciseName: string, 
    steps: string[], 
    level: string
  ): string {
    return `
Create a detailed, anatomically accurate SVG animation for the exercise "${exerciseName}" at ${level} level.

Exercise Steps:
${steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Requirements:
- Use stick figure representation with proper human proportions
- Show 8-12 key movement phases with smooth transitions
- Highlight active muscle groups during peak contraction (red color)
- Include breathing indicators where appropriate (blue expanding/contracting circle)
- Movement should be ${level === 'beginner' ? 'slow and controlled' : level === 'advanced' ? 'moderate pace' : 'dynamic and fluid'}
- Focus on proper form and technique demonstration
- Use realistic joint movement ranges
- Show clear start and end positions

Animation Style:
- Clean line art style
- Minimal but informative
- Loop seamlessly
- 3-4 second duration per cycle
- Emphasize the primary movement pattern

Return detailed SVG animation keyframes with precise coordinates and timing.
`;
  }
}

export const videoAnimationService = new VideoAnimationService();