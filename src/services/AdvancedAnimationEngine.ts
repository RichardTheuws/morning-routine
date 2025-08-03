// Advanced Physics-Based Animation Engine
import { motion } from 'framer-motion';

export interface PhysicsJoint {
  id: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  constraints: {
    minRotation: { x: number; y: number; z: number };
    maxRotation: { x: number; y: number; z: number };
    stiffness: number;
    damping: number;
  };
  mass: number;
  connected: string[]; // Connected joint IDs
}

export interface MuscleGroup {
  id: string;
  joints: string[];
  activationLevel: number; // 0-1
  color: string;
  primaryFunction: string;
}

export interface ExercisePhysics {
  joints: Record<string, PhysicsJoint>;
  muscles: Record<string, MuscleGroup>;
  gravity: { x: number; y: number; z: number };
  timeStep: number;
  duration: number;
}

export interface AnimationKeyframe {
  timestamp: number; // 0-1
  poses: Record<string, {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
  }>;
  muscleActivations: Record<string, number>;
  breathingPhase: 'inhale' | 'exhale' | 'hold' | null;
  focus: string[];
  instruction?: string;
}

export interface GeneratedAnimation {
  keyframes: AnimationKeyframe[];
  duration: number;
  style: 'smooth' | 'dynamic' | 'controlled';
  difficulty: 'beginner' | 'advanced' | 'expert';
  metadata: {
    exerciseId: string;
    muscleGroups: string[];
    equipment: string[];
    safetyNotes: string[];
  };
}

class AdvancedAnimationEngine {
  private readonly HUMAN_SKELETON: Record<string, PhysicsJoint> = {
    head: {
      id: 'head',
      position: { x: 0, y: 170, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      constraints: {
        minRotation: { x: -45, y: -90, z: -30 },
        maxRotation: { x: 45, y: 90, z: 30 },
        stiffness: 0.8,
        damping: 0.6
      },
      mass: 5,
      connected: ['neck']
    },
    neck: {
      id: 'neck',
      position: { x: 0, y: 155, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      constraints: {
        minRotation: { x: -30, y: -45, z: -20 },
        maxRotation: { x: 30, y: 45, z: 20 },
        stiffness: 0.9,
        damping: 0.7
      },
      mass: 2,
      connected: ['head', 'spine_upper']
    },
    spine_upper: {
      id: 'spine_upper',
      position: { x: 0, y: 140, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      constraints: {
        minRotation: { x: -20, y: -30, z: -15 },
        maxRotation: { x: 20, y: 30, z: 15 },
        stiffness: 0.7,
        damping: 0.8
      },
      mass: 8,
      connected: ['neck', 'spine_middle', 'shoulder_left', 'shoulder_right']
    },
    spine_middle: {
      id: 'spine_middle',
      position: { x: 0, y: 110, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      constraints: {
        minRotation: { x: -25, y: -20, z: -10 },
        maxRotation: { x: 25, y: 20, z: 10 },
        stiffness: 0.6,
        damping: 0.8
      },
      mass: 12,
      connected: ['spine_upper', 'spine_lower']
    },
    spine_lower: {
      id: 'spine_lower',
      position: { x: 0, y: 80, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      constraints: {
        minRotation: { x: -30, y: -15, z: -10 },
        maxRotation: { x: 30, y: 15, z: 10 },
        stiffness: 0.5,
        damping: 0.9
      },
      mass: 15,
      connected: ['spine_middle', 'pelvis']
    },
    pelvis: {
      id: 'pelvis',
      position: { x: 0, y: 50, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      constraints: {
        minRotation: { x: -20, y: -10, z: -5 },
        maxRotation: { x: 20, y: 10, z: 5 },
        stiffness: 0.9,
        damping: 0.9
      },
      mass: 20,
      connected: ['spine_lower', 'hip_left', 'hip_right']
    },
    // Add more joints for complete skeleton...
  };

  private readonly MUSCLE_GROUPS: Record<string, MuscleGroup> = {
    core: {
      id: 'core',
      joints: ['spine_middle', 'spine_lower', 'pelvis'],
      activationLevel: 0,
      color: '#EF4444',
      primaryFunction: 'Stability and posture'
    },
    glutes: {
      id: 'glutes',
      joints: ['pelvis', 'hip_left', 'hip_right'],
      activationLevel: 0,
      color: '#F59E0B',
      primaryFunction: 'Hip extension and stability'
    },
    back: {
      id: 'back',
      joints: ['spine_upper', 'spine_middle', 'spine_lower'],
      activationLevel: 0,
      color: '#10B981',
      primaryFunction: 'Spinal support and movement'
    },
    shoulders: {
      id: 'shoulders',
      joints: ['shoulder_left', 'shoulder_right', 'spine_upper'],
      activationLevel: 0,
      color: '#3B82F6',
      primaryFunction: 'Arm movement and stability'
    }
  };

  async generateExerciseAnimation(
    exerciseId: string,
    exerciseName: string,
    steps: string[],
    animationInstruction: string,
    level: 'beginner' | 'advanced' | 'expert'
  ): Promise<GeneratedAnimation> {
    
    // Analyze exercise type using advanced pattern recognition
    const exerciseType = this.analyzeExercisePattern(exerciseId, exerciseName, steps, animationInstruction);
    
    // Generate physics-based movement
    const baseAnimation = this.generatePhysicsBasedAnimation(exerciseType, level);
    
    // Apply AI refinements
    const refinedAnimation = await this.applyAIRefinements(baseAnimation, animationInstruction, steps);
    
    // Add breathing synchronization
    const finalAnimation = this.addBreathingSynchronization(refinedAnimation, level);
    
    return finalAnimation;
  }

  private analyzeExercisePattern(
    exerciseId: string,
    exerciseName: string,
    steps: string[],
    instruction: string
  ): string {
    const content = [exerciseId, exerciseName, ...steps, instruction].join(' ').toLowerCase();
    
    // Advanced pattern matching with multiple criteria
    const patterns = {
      'spinal_flexion': ['cat', 'cow', 'spine', 'arch', 'round', 'back', 'rug'],
      'hip_bridge': ['bridge', 'glute', 'hip', 'lift', 'heupen', 'billen'],
      'quadruped_stability': ['bird', 'dog', 'all fours', 'stability', 'balance'],
      'neck_mobility': ['neck', 'head', 'rotation', 'nek', 'hoofd'],
      'shoulder_mobility': ['shoulder', 'roll', 'schouder', 'arm'],
      'cardio_jumping': ['jumping', 'jack', 'cardio', 'jump', 'spring'],
      'knee_to_chest': ['knee', 'chest', 'knie', 'borst', 'lying'],
      'plank_variations': ['plank', 'hold', 'core', 'stability'],
      'squat_movements': ['squat', 'sit', 'stand', 'legs', 'benen'],
      'push_movements': ['push', 'up', 'press', 'arms', 'armen']
    };

    for (const [pattern, keywords] of Object.entries(patterns)) {
      const matches = keywords.filter(keyword => content.includes(keyword)).length;
      if (matches >= 2) {
        return pattern;
      }
    }

    return 'general_movement';
  }

  private generatePhysicsBasedAnimation(exerciseType: string, level: string): GeneratedAnimation {
    switch (exerciseType) {
      case 'spinal_flexion':
        return this.generateCatCowPhysics(level);
      case 'hip_bridge':
        return this.generateBridgePhysics(level);
      case 'quadruped_stability':
        return this.generateBirdDogPhysics(level);
      case 'neck_mobility':
        return this.generateNeckMobilityPhysics(level);
      case 'shoulder_mobility':
        return this.generateShoulderMobilityPhysics(level);
      case 'cardio_jumping':
        return this.generateJumpingPhysics(level);
      case 'knee_to_chest':
        return this.generateKneeToChestPhysics(level);
      default:
        return this.generateGenericMovementPhysics(level);
    }
  }

  private generateCatCowPhysics(level: string): GeneratedAnimation {
    const duration = level === 'beginner' ? 6 : level === 'advanced' ? 4 : 3;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          poses: {
            spine_upper: { position: { x: 0, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 110, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 80, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.3, back: 0.2 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Neutral spine position'
        },
        {
          timestamp: 0.25,
          poses: {
            spine_upper: { position: { x: 0, y: 140, z: -5 }, rotation: { x: -15, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 110, z: -8 }, rotation: { x: -20, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 80, z: -5 }, rotation: { x: -10, y: 0, z: 0 } },
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: -20, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.4, back: 0.8 },
          breathingPhase: 'inhale',
          focus: ['spine_middle', 'back'],
          instruction: 'Arch back (Cow pose)'
        },
        {
          timestamp: 0.5,
          poses: {
            spine_upper: { position: { x: 0, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 110, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 80, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.3, back: 0.2 },
          breathingPhase: 'hold',
          focus: [],
          instruction: 'Return to neutral'
        },
        {
          timestamp: 0.75,
          poses: {
            spine_upper: { position: { x: 0, y: 140, z: 5 }, rotation: { x: 15, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 110, z: 8 }, rotation: { x: 20, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 80, z: 5 }, rotation: { x: 10, y: 0, z: 0 } },
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: 25, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.9, back: 0.3 },
          breathingPhase: 'exhale',
          focus: ['spine_middle', 'core'],
          instruction: 'Round back (Cat pose)'
        },
        {
          timestamp: 1,
          poses: {
            spine_upper: { position: { x: 0, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 110, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 80, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.3, back: 0.2 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Return to neutral'
        }
      ],
      duration,
      style: 'smooth',
      difficulty: level as any,
      metadata: {
        exerciseId: 'cat-cow-stretch',
        muscleGroups: ['core', 'back', 'spine'],
        equipment: [],
        safetyNotes: ['Move slowly', 'Don\'t force the movement', 'Stop if you feel pain']
      }
    };
  }

  private generateBridgePhysics(level: string): GeneratedAnimation {
    const duration = level === 'beginner' ? 5 : level === 'advanced' ? 4 : 3;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          poses: {
            pelvis: { position: { x: 0, y: 20, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 25, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 30, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            knee_left: { position: { x: -20, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } },
            knee_right: { position: { x: 20, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } }
          },
          muscleActivations: { glutes: 0.2, core: 0.3 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Starting position - lying down'
        },
        {
          timestamp: 0.4,
          poses: {
            pelvis: { position: { x: 0, y: 45, z: 0 }, rotation: { x: -15, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 50, z: 0 }, rotation: { x: -20, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 55, z: 0 }, rotation: { x: -15, y: 0, z: 0 } },
            knee_left: { position: { x: -20, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } },
            knee_right: { position: { x: 20, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } }
          },
          muscleActivations: { glutes: 0.9, core: 0.8 },
          breathingPhase: 'exhale',
          focus: ['pelvis', 'glutes'],
          instruction: 'Lift hips up'
        },
        {
          timestamp: 0.7,
          poses: {
            pelvis: { position: { x: 0, y: 50, z: 0 }, rotation: { x: -20, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 55, z: 0 }, rotation: { x: -25, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 60, z: 0 }, rotation: { x: -20, y: 0, z: 0 } },
            knee_left: { position: { x: -20, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } },
            knee_right: { position: { x: 20, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } }
          },
          muscleActivations: { glutes: 1.0, core: 0.9 },
          breathingPhase: 'hold',
          focus: ['pelvis', 'glutes', 'core'],
          instruction: 'Hold at top - squeeze glutes'
        },
        {
          timestamp: 1,
          poses: {
            pelvis: { position: { x: 0, y: 20, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_lower: { position: { x: 0, y: 25, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            spine_middle: { position: { x: 0, y: 30, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            knee_left: { position: { x: -20, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } },
            knee_right: { position: { x: 20, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } }
          },
          muscleActivations: { glutes: 0.2, core: 0.3 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Lower back down slowly'
        }
      ],
      duration,
      style: 'controlled',
      difficulty: level as any,
      metadata: {
        exerciseId: 'glute-bridge',
        muscleGroups: ['glutes', 'core', 'hamstrings'],
        equipment: [],
        safetyNotes: ['Keep feet flat', 'Don\'t overarch back', 'Control the movement']
      }
    };
  }

  private generateBirdDogPhysics(level: string): GeneratedAnimation {
    const duration = level === 'beginner' ? 8 : level === 'advanced' ? 6 : 4;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          poses: {
            spine_middle: { position: { x: 0, y: 80, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -30, y: 85, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_right: { position: { x: 30, y: 85, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_left: { position: { x: -15, y: 40, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_right: { position: { x: 15, y: 40, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.5, back: 0.4 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Quadruped position'
        },
        {
          timestamp: 0.3,
          poses: {
            spine_middle: { position: { x: 0, y: 80, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -50, y: 100, z: 0 }, rotation: { x: -30, y: 0, z: 0 } },
            arm_right: { position: { x: 30, y: 85, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_left: { position: { x: -15, y: 40, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_right: { position: { x: 40, y: 60, z: 0 }, rotation: { x: 30, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.9, back: 0.8, glutes: 0.7 },
          breathingPhase: 'exhale',
          focus: ['arm_left', 'leg_right', 'core'],
          instruction: 'Extend opposite arm and leg'
        },
        {
          timestamp: 0.6,
          poses: {
            spine_middle: { position: { x: 0, y: 80, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -30, y: 85, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_right: { position: { x: 50, y: 100, z: 0 }, rotation: { x: -30, y: 0, z: 0 } },
            leg_left: { position: { x: -40, y: 60, z: 0 }, rotation: { x: 30, y: 0, z: 0 } },
            leg_right: { position: { x: 15, y: 40, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.9, back: 0.8, glutes: 0.7 },
          breathingPhase: 'inhale',
          focus: ['arm_right', 'leg_left', 'core'],
          instruction: 'Switch to other side'
        },
        {
          timestamp: 1,
          poses: {
            spine_middle: { position: { x: 0, y: 80, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -30, y: 85, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_right: { position: { x: 30, y: 85, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_left: { position: { x: -15, y: 40, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_right: { position: { x: 15, y: 40, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.5, back: 0.4 },
          breathingPhase: 'exhale',
          focus: [],
          instruction: 'Return to start'
        }
      ],
      duration,
      style: 'controlled',
      difficulty: level as any,
      metadata: {
        exerciseId: 'bird-dog',
        muscleGroups: ['core', 'back', 'glutes', 'shoulders'],
        equipment: [],
        safetyNotes: ['Keep hips level', 'Don\'t rush', 'Maintain neutral spine']
      }
    };
  }

  private generateGenericMovementPhysics(level: string): GeneratedAnimation {
    return {
      keyframes: [
        {
          timestamp: 0,
          poses: {
            spine_middle: { position: { x: 0, y: 110, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.3 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Starting position'
        },
        {
          timestamp: 0.5,
          poses: {
            spine_middle: { position: { x: 0, y: 115, z: 0 }, rotation: { x: 5, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.6 },
          breathingPhase: 'exhale',
          focus: ['core'],
          instruction: 'Engage core'
        },
        {
          timestamp: 1,
          poses: {
            spine_middle: { position: { x: 0, y: 110, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.3 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Return to start'
        }
      ],
      duration: 3,
      style: 'smooth',
      difficulty: level as any,
      metadata: {
        exerciseId: 'generic',
        muscleGroups: ['core'],
        equipment: [],
        safetyNotes: ['Listen to your body']
      }
    };
  }

  private generateShoulderMobilityPhysics(level: string): GeneratedAnimation {
    const duration = level === 'beginner' ? 6 : level === 'advanced' ? 5 : 4;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          poses: {
            shoulder_left: { position: { x: -25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            shoulder_right: { position: { x: 25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -30, y: 120, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_right: { position: { x: 30, y: 120, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { shoulders: 0.3 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Arms at sides'
        },
        {
          timestamp: 0.25,
          poses: {
            shoulder_left: { position: { x: -25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: -30 } },
            shoulder_right: { position: { x: 25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 30 } },
            arm_left: { position: { x: -30, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: -30 } },
            arm_right: { position: { x: 30, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 30 } }
          },
          muscleActivations: { shoulders: 0.6 },
          breathingPhase: 'exhale',
          focus: ['shoulder_left', 'shoulder_right'],
          instruction: 'Roll shoulders back'
        },
        {
          timestamp: 0.5,
          poses: {
            shoulder_left: { position: { x: -25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: -60 } },
            shoulder_right: { position: { x: 25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 60 } },
            arm_left: { position: { x: -30, y: 160, z: 0 }, rotation: { x: 0, y: 0, z: -60 } },
            arm_right: { position: { x: 30, y: 160, z: 0 }, rotation: { x: 0, y: 0, z: 60 } }
          },
          muscleActivations: { shoulders: 0.8 },
          breathingPhase: 'inhale',
          focus: ['shoulder_left', 'shoulder_right'],
          instruction: 'Continue rolling up'
        },
        {
          timestamp: 0.75,
          poses: {
            shoulder_left: { position: { x: -25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: -30 } },
            shoulder_right: { position: { x: 25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 30 } },
            arm_left: { position: { x: -30, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: -30 } },
            arm_right: { position: { x: 30, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 30 } }
          },
          muscleActivations: { shoulders: 0.6 },
          breathingPhase: 'exhale',
          focus: ['shoulder_left', 'shoulder_right'],
          instruction: 'Roll shoulders forward'
        },
        {
          timestamp: 1,
          poses: {
            shoulder_left: { position: { x: -25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            shoulder_right: { position: { x: 25, y: 140, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -30, y: 120, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_right: { position: { x: 30, y: 120, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { shoulders: 0.3 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Return to start'
        }
      ],
      duration,
      style: 'smooth',
      difficulty: level as any,
      metadata: {
        exerciseId: 'shoulder-rolls',
        muscleGroups: ['shoulders', 'neck'],
        equipment: [],
        safetyNotes: ['Move slowly', 'Don\'t force the movement', 'Stop if you feel pain']
      }
    };
  }

  private generateNeckMobilityPhysics(level: string): GeneratedAnimation {
    const duration = level === 'beginner' ? 6 : level === 'advanced' ? 5 : 4;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          poses: {
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            neck: { position: { x: 0, y: 155, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { neck: 0.2 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Neutral head position'
        },
        {
          timestamp: 0.33,
          poses: {
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: 0, y: -30, z: 0 } },
            neck: { position: { x: 0, y: 155, z: 0 }, rotation: { x: 0, y: -20, z: 0 } }
          },
          muscleActivations: { neck: 0.5 },
          breathingPhase: 'exhale',
          focus: ['neck'],
          instruction: 'Turn head left'
        },
        {
          timestamp: 0.66,
          poses: {
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: 0, y: 30, z: 0 } },
            neck: { position: { x: 0, y: 155, z: 0 }, rotation: { x: 0, y: 20, z: 0 } }
          },
          muscleActivations: { neck: 0.5 },
          breathingPhase: 'inhale',
          focus: ['neck'],
          instruction: 'Turn head right'
        },
        {
          timestamp: 1,
          poses: {
            head: { position: { x: 0, y: 170, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            neck: { position: { x: 0, y: 155, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { neck: 0.2 },
          breathingPhase: 'exhale',
          focus: [],
          instruction: 'Return to center'
        }
      ],
      duration,
      style: 'smooth',
      difficulty: level as any,
      metadata: {
        exerciseId: 'neck-rotations',
        muscleGroups: ['neck'],
        equipment: [],
        safetyNotes: ['Move slowly', 'Don\'t force rotation', 'Stop if dizzy']
      }
    };
  }

  private generateJumpingPhysics(level: string): GeneratedAnimation {
    const duration = level === 'beginner' ? 4 : level === 'advanced' ? 3 : 2;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          poses: {
            pelvis: { position: { x: 0, y: 50, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -20, y: 120, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_right: { position: { x: 20, y: 120, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_left: { position: { x: -10, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_right: { position: { x: 10, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.4, legs: 0.3 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Starting position'
        },
        {
          timestamp: 0.5,
          poses: {
            pelvis: { position: { x: 0, y: 70, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -40, y: 160, z: 0 }, rotation: { x: 0, y: 0, z: -45 } },
            arm_right: { position: { x: 40, y: 160, z: 0 }, rotation: { x: 0, y: 0, z: 45 } },
            leg_left: { position: { x: -25, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_right: { position: { x: 25, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.8, legs: 0.9 },
          breathingPhase: 'exhale',
          focus: ['legs', 'core'],
          instruction: 'Jump with arms and legs out'
        },
        {
          timestamp: 1,
          poses: {
            pelvis: { position: { x: 0, y: 50, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_left: { position: { x: -20, y: 120, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            arm_right: { position: { x: 20, y: 120, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_left: { position: { x: -10, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            leg_right: { position: { x: 10, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.4, legs: 0.3 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Return to start'
        }
      ],
      duration,
      style: 'dynamic',
      difficulty: level as any,
      metadata: {
        exerciseId: 'jumping-jacks',
        muscleGroups: ['legs', 'core', 'shoulders'],
        equipment: [],
        safetyNotes: ['Land softly', 'Keep core engaged', 'Modify if needed']
      }
    };
  }

  private generateKneeToChestPhysics(level: string): GeneratedAnimation {
    const duration = level === 'beginner' ? 5 : level === 'advanced' ? 4 : 3;
    
    return {
      keyframes: [
        {
          timestamp: 0,
          poses: {
            pelvis: { position: { x: 0, y: 20, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            knee_left: { position: { x: -15, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } },
            knee_right: { position: { x: 15, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.3, hip_flexors: 0.2 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Lying with knees bent'
        },
        {
          timestamp: 0.5,
          poses: {
            pelvis: { position: { x: 0, y: 20, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            knee_left: { position: { x: -15, y: 80, z: 0 }, rotation: { x: 135, y: 0, z: 0 } },
            knee_right: { position: { x: 15, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.6, hip_flexors: 0.7 },
          breathingPhase: 'exhale',
          focus: ['knee_left', 'hip_flexors'],
          instruction: 'Pull left knee to chest'
        },
        {
          timestamp: 1,
          poses: {
            pelvis: { position: { x: 0, y: 20, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
            knee_left: { position: { x: -15, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } },
            knee_right: { position: { x: 15, y: 40, z: 0 }, rotation: { x: 90, y: 0, z: 0 } }
          },
          muscleActivations: { core: 0.3, hip_flexors: 0.2 },
          breathingPhase: 'inhale',
          focus: [],
          instruction: 'Return to start'
        }
      ],
      duration,
      style: 'controlled',
      difficulty: level as any,
      metadata: {
        exerciseId: 'knee-to-chest',
        muscleGroups: ['hip_flexors', 'core'],
        equipment: [],
        safetyNotes: ['Don\'t force the stretch', 'Keep back flat', 'Breathe deeply']
      }
    };
  }
  private async applyAIRefinements(
    animation: GeneratedAnimation,
    instruction: string,
    steps: string[]
  ): Promise<GeneratedAnimation> {
    // Simulate AI analysis and refinement
    const refinedAnimation = { ...animation };
    
    // Analyze instruction for specific cues
    const instructionLower = instruction.toLowerCase();
    
    if (instructionLower.includes('slow') || instructionLower.includes('langzaam')) {
      refinedAnimation.duration *= 1.3;
      refinedAnimation.style = 'controlled';
    }
    
    if (instructionLower.includes('dynamic') || instructionLower.includes('dynamisch')) {
      refinedAnimation.duration *= 0.8;
      refinedAnimation.style = 'dynamic';
    }
    
    if (instructionLower.includes('breathing') || instructionLower.includes('ademhaling')) {
      // Enhance breathing synchronization
      refinedAnimation.keyframes.forEach((frame, index) => {
        if (index % 2 === 0) {
          frame.breathingPhase = 'inhale';
        } else {
          frame.breathingPhase = 'exhale';
        }
      });
    }
    
    // Add micro-movements for realism
    refinedAnimation.keyframes.forEach(frame => {
      Object.keys(frame.poses).forEach(jointId => {
        const pose = frame.poses[jointId];
        // Add subtle natural sway
        pose.position.x += (Math.random() - 0.5) * 0.5;
        pose.position.y += (Math.random() - 0.5) * 0.3;
      });
    });
    
    return refinedAnimation;
  }

  private addBreathingSynchronization(
    animation: GeneratedAnimation,
    level: string
  ): GeneratedAnimation {
    const breathingRate = level === 'beginner' ? 4 : level === 'advanced' ? 3 : 2; // seconds per breath
    
    animation.keyframes.forEach((frame, index) => {
      const breathingCycle = (frame.timestamp * animation.duration) % breathingRate;
      
      if (breathingCycle < breathingRate * 0.4) {
        frame.breathingPhase = 'inhale';
      } else if (breathingCycle < breathingRate * 0.8) {
        frame.breathingPhase = 'exhale';
      } else {
        frame.breathingPhase = 'hold';
      }
    });
    
    return animation;
  }

  // Generate smooth interpolation between keyframes
  interpolateKeyframes(keyframes: AnimationKeyframe[], targetFrameCount: number): AnimationKeyframe[] {
    if (keyframes.length >= targetFrameCount) return keyframes;
    
    const interpolated: AnimationKeyframe[] = [];
    const step = 1 / (targetFrameCount - 1);
    
    for (let i = 0; i < targetFrameCount; i++) {
      const t = i * step;
      const frame = this.interpolateAtTime(keyframes, t);
      interpolated.push(frame);
    }
    
    return interpolated;
  }

  private interpolateAtTime(keyframes: AnimationKeyframe[], t: number): AnimationKeyframe {
    // Find surrounding keyframes
    let beforeFrame = keyframes[0];
    let afterFrame = keyframes[keyframes.length - 1];
    
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (keyframes[i].timestamp <= t && keyframes[i + 1].timestamp >= t) {
        beforeFrame = keyframes[i];
        afterFrame = keyframes[i + 1];
        break;
      }
    }
    
    // Calculate interpolation factor
    const range = afterFrame.timestamp - beforeFrame.timestamp;
    const factor = range === 0 ? 0 : (t - beforeFrame.timestamp) / range;
    
    // Interpolate poses
    const interpolatedPoses: Record<string, any> = {};
    Object.keys(beforeFrame.poses).forEach(jointId => {
      const beforePose = beforeFrame.poses[jointId];
      const afterPose = afterFrame.poses[jointId];
      
      interpolatedPoses[jointId] = {
        position: {
          x: this.lerp(beforePose.position.x, afterPose.position.x, factor),
          y: this.lerp(beforePose.position.y, afterPose.position.y, factor),
          z: this.lerp(beforePose.position.z, afterPose.position.z, factor)
        },
        rotation: {
          x: this.lerp(beforePose.rotation.x, afterPose.rotation.x, factor),
          y: this.lerp(beforePose.rotation.y, afterPose.rotation.y, factor),
          z: this.lerp(beforePose.rotation.z, afterPose.rotation.z, factor)
        }
      };
    });
    
    // Interpolate muscle activations
    const interpolatedMuscles: Record<string, number> = {};
    Object.keys(beforeFrame.muscleActivations).forEach(muscleId => {
      const beforeActivation = beforeFrame.muscleActivations[muscleId];
      const afterActivation = afterFrame.muscleActivations[muscleId] || beforeActivation;
      interpolatedMuscles[muscleId] = this.lerp(beforeActivation, afterActivation, factor);
    });
    
    return {
      timestamp: t,
      poses: interpolatedPoses,
      muscleActivations: interpolatedMuscles,
      breathingPhase: factor < 0.5 ? beforeFrame.breathingPhase : afterFrame.breathingPhase,
      focus: factor < 0.5 ? beforeFrame.focus : afterFrame.focus,
      instruction: factor < 0.5 ? beforeFrame.instruction : afterFrame.instruction
    };
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // Performance optimization - generate animation data once and cache
  private animationCache = new Map<string, GeneratedAnimation>();

  getCachedAnimation(cacheKey: string): GeneratedAnimation | null {
    return this.animationCache.get(cacheKey) || null;
  }

  setCachedAnimation(cacheKey: string, animation: GeneratedAnimation): void {
    this.animationCache.set(cacheKey, animation);
    
    // Limit cache size
    if (this.animationCache.size > 50) {
      const firstKey = this.animationCache.keys().next().value;
      this.animationCache.delete(firstKey);
    }
  }
}

export const advancedAnimationEngine = new AdvancedAnimationEngine();