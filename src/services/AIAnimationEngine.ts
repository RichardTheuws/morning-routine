// Advanced AI-Powered Animation Engine
// Uses sophisticated biomechanical modeling and procedural animation

export interface BiomechanicalJoint {
  name: string;
  position: { x: number; y: number };
  rotation: number;
  constraints: {
    minRotation: number;
    maxRotation: number;
    naturalPosition: number;
  };
}

export interface MotionKeyframe {
  timestamp: number; // 0-1
  joints: Record<string, BiomechanicalJoint>;
  muscleActivation: Record<string, number>; // 0-1 activation level
  breathingPhase: 'inhale' | 'exhale' | 'hold' | null;
  emphasis: string[]; // Which body parts to highlight
}

export interface ExerciseMotion {
  keyframes: MotionKeyframe[];
  duration: number;
  style: 'controlled' | 'dynamic' | 'flowing';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

class AIAnimationEngine {
  private readonly HUMAN_SKELETON = {
    head: { x: 100, y: 30, constraints: { minRotation: -45, maxRotation: 45, naturalPosition: 0 } },
    neck: { x: 100, y: 45, constraints: { minRotation: -30, maxRotation: 30, naturalPosition: 0 } },
    shoulders: { x: 100, y: 60, constraints: { minRotation: -20, maxRotation: 20, naturalPosition: 0 } },
    leftShoulder: { x: 80, y: 60, constraints: { minRotation: -180, maxRotation: 180, naturalPosition: 0 } },
    rightShoulder: { x: 120, y: 60, constraints: { minRotation: -180, maxRotation: 180, naturalPosition: 0 } },
    spine: { x: 100, y: 80, constraints: { minRotation: -30, maxRotation: 30, naturalPosition: 0 } },
    hips: { x: 100, y: 100, constraints: { minRotation: -20, maxRotation: 20, naturalPosition: 0 } },
    leftHip: { x: 90, y: 100, constraints: { minRotation: -120, maxRotation: 45, naturalPosition: 0 } },
    rightHip: { x: 110, y: 100, constraints: { minRotation: -120, maxRotation: 45, naturalPosition: 0 } },
    leftKnee: { x: 85, y: 130, constraints: { minRotation: 0, maxRotation: 150, naturalPosition: 0 } },
    rightKnee: { x: 115, y: 130, constraints: { minRotation: 0, maxRotation: 150, naturalPosition: 0 } },
    leftAnkle: { x: 85, y: 150, constraints: { minRotation: -30, maxRotation: 30, naturalPosition: 0 } },
    rightAnkle: { x: 115, y: 150, constraints: { minRotation: -30, maxRotation: 30, naturalPosition: 0 } }
  };

  private readonly MUSCLE_GROUPS = {
    core: ['spine', 'hips'],
    glutes: ['hips', 'leftHip', 'rightHip'],
    legs: ['leftHip', 'rightHip', 'leftKnee', 'rightKnee'],
    arms: ['leftShoulder', 'rightShoulder'],
    back: ['spine', 'shoulders'],
    neck: ['head', 'neck']
  };

  async generateExerciseAnimation(
    exerciseId: string,
    exerciseName: string,
    steps: string[],
    animationInstruction: string,
    level: 'beginner' | 'advanced' | 'expert'
  ): Promise<ExerciseMotion> {
    
    // Analyze exercise type and generate appropriate motion
    const exerciseType = this.analyzeExerciseType(exerciseId, exerciseName, steps);
    const baseMotion = this.generateBaseMotion(exerciseType, level);
    const refinedMotion = this.refineWithAIAnalysis(baseMotion, animationInstruction, steps);
    
    return refinedMotion;
  }

  private analyzeExerciseType(exerciseId: string, exerciseName: string, steps: string[]): string {
    const keywords = [exerciseId, exerciseName, ...steps].join(' ').toLowerCase();
    
    if (keywords.includes('bridge') || keywords.includes('heupen')) return 'hip_bridge';
    if (keywords.includes('cat') || keywords.includes('cow') || keywords.includes('rug')) return 'spinal_flexion';
    if (keywords.includes('bird') || keywords.includes('dog')) return 'quadruped_stability';
    if (keywords.includes('neck') || keywords.includes('nek')) return 'neck_mobility';
    if (keywords.includes('shoulder') || keywords.includes('schouder')) return 'shoulder_mobility';
    if (keywords.includes('jumping') || keywords.includes('jack')) return 'cardio_jumping';
    if (keywords.includes('knee') || keywords.includes('knie')) return 'knee_to_chest';
    
    return 'general_mobility';
  }

  private generateBaseMotion(exerciseType: string, level: string): ExerciseMotion {
    switch (exerciseType) {
      case 'hip_bridge':
        return this.generateHipBridgeMotion(level);
      case 'spinal_flexion':
        return this.generateCatCowMotion(level);
      case 'quadruped_stability':
        return this.generateBirdDogMotion(level);
      case 'neck_mobility':
        return this.generateNeckMotion(level);
      case 'shoulder_mobility':
        return this.generateShoulderMotion(level);
      case 'cardio_jumping':
        return this.generateJumpingMotion(level);
      case 'knee_to_chest':
        return this.generateKneeToChestMotion(level);
      default:
        return this.generateGenericMotion(level);
    }
  }

  private generateHipBridgeMotion(level: string): ExerciseMotion {
    const duration = level === 'beginner' ? 4 : level === 'advanced' ? 3 : 2;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            hips: { ...this.HUMAN_SKELETON.hips, position: { x: 100, y: 120 }, rotation: 0 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -45 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 45 },
            leftKnee: { ...this.HUMAN_SKELETON.leftKnee, rotation: 90 },
            rightKnee: { ...this.HUMAN_SKELETON.rightKnee, rotation: 90 }
          },
          muscleActivation: { glutes: 0.2, core: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.4,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: -15 },
            hips: { ...this.HUMAN_SKELETON.hips, position: { x: 100, y: 90 }, rotation: -15 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -70 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 70 },
            leftKnee: { ...this.HUMAN_SKELETON.leftKnee, rotation: 90 },
            rightKnee: { ...this.HUMAN_SKELETON.rightKnee, rotation: 90 }
          },
          muscleActivation: { glutes: 0.9, core: 0.8 },
          breathingPhase: 'exhale',
          emphasis: ['hips', 'glutes']
        },
        {
          timestamp: 0.7,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: -20 },
            hips: { ...this.HUMAN_SKELETON.hips, position: { x: 100, y: 85 }, rotation: -20 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -75 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 75 },
            leftKnee: { ...this.HUMAN_SKELETON.leftKnee, rotation: 90 },
            rightKnee: { ...this.HUMAN_SKELETON.rightKnee, rotation: 90 }
          },
          muscleActivation: { glutes: 1.0, core: 0.9 },
          breathingPhase: 'hold',
          emphasis: ['hips', 'glutes', 'core']
        },
        {
          timestamp: 1,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            hips: { ...this.HUMAN_SKELETON.hips, position: { x: 100, y: 120 }, rotation: 0 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -45 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 45 },
            leftKnee: { ...this.HUMAN_SKELETON.leftKnee, rotation: 90 },
            rightKnee: { ...this.HUMAN_SKELETON.rightKnee, rotation: 90 }
          },
          muscleActivation: { glutes: 0.2, core: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        }
      ],
      duration,
      style: level === 'expert' ? 'dynamic' : 'controlled',
      difficulty: level as any
    };
  }

  private generateCatCowMotion(level: string): ExerciseMotion {
    const duration = level === 'beginner' ? 5 : level === 'advanced' ? 4 : 3;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            head: { ...this.HUMAN_SKELETON.head, rotation: 0 },
            hips: { ...this.HUMAN_SKELETON.hips, rotation: 0 }
          },
          muscleActivation: { back: 0.3, core: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.25,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: -12 },
            head: { ...this.HUMAN_SKELETON.head, rotation: -20 },
            hips: { ...this.HUMAN_SKELETON.hips, rotation: -8 }
          },
          muscleActivation: { back: 0.7, core: 0.4 },
          breathingPhase: 'inhale',
          emphasis: ['spine', 'back']
        },
        {
          timestamp: 0.5,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            head: { ...this.HUMAN_SKELETON.head, rotation: 0 },
            hips: { ...this.HUMAN_SKELETON.hips, rotation: 0 }
          },
          muscleActivation: { back: 0.3, core: 0.3 },
          breathingPhase: 'hold',
          emphasis: []
        },
        {
          timestamp: 0.75,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 12 },
            head: { ...this.HUMAN_SKELETON.head, rotation: 25 },
            hips: { ...this.HUMAN_SKELETON.hips, rotation: 8 }
          },
          muscleActivation: { back: 0.4, core: 0.8 },
          breathingPhase: 'exhale',
          emphasis: ['spine', 'core']
        },
        {
          timestamp: 1,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            head: { ...this.HUMAN_SKELETON.head, rotation: 0 },
            hips: { ...this.HUMAN_SKELETON.hips, rotation: 0 }
          },
          muscleActivation: { back: 0.3, core: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        }
      ],
      duration,
      style: 'flowing',
      difficulty: level as any
    };
  }

  private generateBirdDogMotion(level: string): ExerciseMotion {
    const duration = level === 'beginner' ? 6 : level === 'advanced' ? 4 : 3;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: 0 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 0 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: 0 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 0 }
          },
          muscleActivation: { core: 0.5, back: 0.4 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.3,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: -45 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 0 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: 0 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 30 }
          },
          muscleActivation: { core: 0.9, back: 0.8, glutes: 0.7 },
          breathingPhase: 'exhale',
          emphasis: ['core', 'leftShoulder', 'rightHip']
        },
        {
          timestamp: 0.7,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: 0 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 45 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -30 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 0 }
          },
          muscleActivation: { core: 0.9, back: 0.8, glutes: 0.7 },
          breathingPhase: 'inhale',
          emphasis: ['core', 'rightShoulder', 'leftHip']
        },
        {
          timestamp: 1,
          joints: {
            spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 },
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: 0 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 0 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: 0 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 0 }
          },
          muscleActivation: { core: 0.5, back: 0.4 },
          breathingPhase: 'exhale',
          emphasis: []
        }
      ],
      duration,
      style: 'controlled',
      difficulty: level as any
    };
  }

  private generateNeckMotion(level: string): ExerciseMotion {
    return {
      keyframes: [
        {
          timestamp: 0,
          joints: { head: { ...this.HUMAN_SKELETON.head, rotation: 0 } },
          muscleActivation: { neck: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.25,
          joints: { head: { ...this.HUMAN_SKELETON.head, rotation: -30 } },
          muscleActivation: { neck: 0.6 },
          breathingPhase: 'exhale',
          emphasis: ['head', 'neck']
        },
        {
          timestamp: 0.5,
          joints: { head: { ...this.HUMAN_SKELETON.head, rotation: 0 } },
          muscleActivation: { neck: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.75,
          joints: { head: { ...this.HUMAN_SKELETON.head, rotation: 30 } },
          muscleActivation: { neck: 0.6 },
          breathingPhase: 'exhale',
          emphasis: ['head', 'neck']
        },
        {
          timestamp: 1,
          joints: { head: { ...this.HUMAN_SKELETON.head, rotation: 0 } },
          muscleActivation: { neck: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        }
      ],
      duration: 4,
      style: 'flowing',
      difficulty: level as any
    };
  }

  private generateShoulderMotion(level: string): ExerciseMotion {
    return {
      keyframes: [
        {
          timestamp: 0,
          joints: {
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: 0 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 0 }
          },
          muscleActivation: { arms: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.25,
          joints: {
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: -45 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 45 }
          },
          muscleActivation: { arms: 0.7 },
          breathingPhase: 'exhale',
          emphasis: ['leftShoulder', 'rightShoulder']
        },
        {
          timestamp: 0.5,
          joints: {
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: -90 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 90 }
          },
          muscleActivation: { arms: 0.8 },
          breathingPhase: 'hold',
          emphasis: ['leftShoulder', 'rightShoulder']
        },
        {
          timestamp: 0.75,
          joints: {
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: -45 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 45 }
          },
          muscleActivation: { arms: 0.7 },
          breathingPhase: 'inhale',
          emphasis: ['leftShoulder', 'rightShoulder']
        },
        {
          timestamp: 1,
          joints: {
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: 0 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 0 }
          },
          muscleActivation: { arms: 0.3 },
          breathingPhase: 'exhale',
          emphasis: []
        }
      ],
      duration: 3,
      style: 'controlled',
      difficulty: level as any
    };
  }

  private generateJumpingMotion(level: string): ExerciseMotion {
    return {
      keyframes: [
        {
          timestamp: 0,
          joints: {
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: 0 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 0 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: 0 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 0 }
          },
          muscleActivation: { legs: 0.4, arms: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.5,
          joints: {
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: 45 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: -45 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -20 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 20 }
          },
          muscleActivation: { legs: 0.9, arms: 0.8 },
          breathingPhase: 'exhale',
          emphasis: ['legs', 'arms']
        },
        {
          timestamp: 1,
          joints: {
            leftShoulder: { ...this.HUMAN_SKELETON.leftShoulder, rotation: 0 },
            rightShoulder: { ...this.HUMAN_SKELETON.rightShoulder, rotation: 0 },
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: 0 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 0 }
          },
          muscleActivation: { legs: 0.4, arms: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        }
      ],
      duration: 2,
      style: 'dynamic',
      difficulty: level as any
    };
  }

  private generateKneeToChestMotion(level: string): ExerciseMotion {
    return {
      keyframes: [
        {
          timestamp: 0,
          joints: {
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -45 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 45 },
            leftKnee: { ...this.HUMAN_SKELETON.leftKnee, rotation: 90 },
            rightKnee: { ...this.HUMAN_SKELETON.rightKnee, rotation: 90 }
          },
          muscleActivation: { core: 0.4, legs: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.5,
          joints: {
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -120 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: 45 },
            leftKnee: { ...this.HUMAN_SKELETON.leftKnee, rotation: 150 },
            rightKnee: { ...this.HUMAN_SKELETON.rightKnee, rotation: 90 }
          },
          muscleActivation: { core: 0.8, legs: 0.6 },
          breathingPhase: 'exhale',
          emphasis: ['leftHip', 'core']
        },
        {
          timestamp: 1,
          joints: {
            leftHip: { ...this.HUMAN_SKELETON.leftHip, rotation: -45 },
            rightHip: { ...this.HUMAN_SKELETON.rightHip, rotation: -120 },
            leftKnee: { ...this.HUMAN_SKELETON.leftKnee, rotation: 90 },
            rightKnee: { ...this.HUMAN_SKELETON.rightKnee, rotation: 150 }
          },
          muscleActivation: { core: 0.8, legs: 0.6 },
          breathingPhase: 'inhale',
          emphasis: ['rightHip', 'core']
        }
      ],
      duration: 4,
      style: 'controlled',
      difficulty: level as any
    };
  }

  private generateGenericMotion(level: string): ExerciseMotion {
    return {
      keyframes: [
        {
          timestamp: 0,
          joints: { spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 } },
          muscleActivation: { core: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        },
        {
          timestamp: 0.5,
          joints: { spine: { ...this.HUMAN_SKELETON.spine, rotation: 5 } },
          muscleActivation: { core: 0.6 },
          breathingPhase: 'exhale',
          emphasis: ['core']
        },
        {
          timestamp: 1,
          joints: { spine: { ...this.HUMAN_SKELETON.spine, rotation: 0 } },
          muscleActivation: { core: 0.3 },
          breathingPhase: 'inhale',
          emphasis: []
        }
      ],
      duration: 3,
      style: 'controlled',
      difficulty: level as any
    };
  }

  private refineWithAIAnalysis(
    baseMotion: ExerciseMotion, 
    instruction: string, 
    steps: string[]
  ): ExerciseMotion {
    // Future: Use actual AI to refine the motion based on text analysis
    // For now, apply some heuristic improvements
    
    const refinedMotion = { ...baseMotion };
    
    // Analyze instruction for specific cues
    if (instruction.includes('langzaam') || instruction.includes('slow')) {
      refinedMotion.duration *= 1.3;
      refinedMotion.style = 'controlled';
    }
    
    if (instruction.includes('highlight') || instruction.includes('focus')) {
      // Enhance muscle activation visualization
      refinedMotion.keyframes.forEach(frame => {
        Object.keys(frame.muscleActivation).forEach(muscle => {
          frame.muscleActivation[muscle] = Math.min(1, frame.muscleActivation[muscle] * 1.2);
        });
      });
    }
    
    return refinedMotion;
  }
}

export const aiAnimationEngine = new AIAnimationEngine();