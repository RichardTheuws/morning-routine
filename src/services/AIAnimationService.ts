// AI-Powered Animation Generation Service
// This service uses Claude/GPT to generate detailed SVG animations

export interface AnimationFrame {
  timestamp: number; // 0-100 percentage of animation
  bodyParts: {
    head?: { x: number; y: number; rotation: number };
    torso?: { x: number; y: number; rotation: number; scaleY?: number };
    leftArm?: { x: number; y: number; rotation: number };
    rightArm?: { x: number; y: number; rotation: number };
    leftLeg?: { x: number; y: number; rotation: number };
    rightLeg?: { x: number; y: number; rotation: number };
    hips?: { x: number; y: number; rotation: number };
  };
  highlights?: string[]; // Body parts to highlight
  breathingIndicator?: 'inhale' | 'exhale' | 'hold';
}

export interface GeneratedAnimation {
  frames: AnimationFrame[];
  duration: number; // in seconds
  loopCount: number;
  style: 'smooth' | 'stepped' | 'dynamic';
}

class AIAnimationService {
  private readonly SYSTEM_PROMPT = `
You are an expert exercise animation generator. Your task is to create precise, anatomically correct SVG animation sequences for fitness exercises.

STRICT REQUIREMENTS:
1. Generate exactly 8-12 keyframes per exercise
2. Use realistic human proportions and movement ranges
3. Focus on the primary muscle groups and movement patterns
4. Include breathing cues where appropriate
5. Highlight active muscle groups during peak contraction
6. Ensure smooth, natural transitions between positions
7. Consider the exercise level (beginner = slower, expert = more dynamic)

COORDINATE SYSTEM:
- SVG viewBox: 0 0 200 160
- Person center: x=100, y=80
- Head center: x=100, y=30
- Torso: from y=45 to y=100
- Arms: shoulder at y=60
- Legs: hip at y=100

BODY PART ROTATIONS:
- All rotations in degrees
- Positive rotation = clockwise
- Realistic joint limits (shoulder: -180 to 180, spine: -30 to 30, etc.)

OUTPUT FORMAT:
Return a JSON object with the GeneratedAnimation interface structure.
`;

  async generateAnimation(
    exerciseId: string,
    exerciseName: string,
    steps: string[],
    animationInstruction: string,
    level: 'beginner' | 'advanced' | 'expert'
  ): Promise<GeneratedAnimation> {
    
    const prompt = `
Generate an SVG animation for this exercise:

Exercise: ${exerciseName} (${exerciseId})
Level: ${level}
Steps: ${steps.join(' | ')}
Animation Instruction: ${animationInstruction}

Create a realistic, smooth animation showing the proper form and movement pattern.
Focus on the key movement phases and muscle activation.
For ${level} level: ${this.getLevelGuidance(level)}

Return the animation as a JSON object following the GeneratedAnimation interface.
`;

    try {
      // In a real implementation, this would call Claude API
      // For now, we'll use a sophisticated rule-based system
      return this.generateRuleBasedAnimation(exerciseId, level, steps, animationInstruction);
    } catch (error) {
      console.error('AI Animation generation failed:', error);
      return this.getFallbackAnimation(exerciseId);
    }
  }

  private getLevelGuidance(level: string): string {
    switch (level) {
      case 'beginner':
        return 'Slower movements, clear pauses, emphasis on form over speed';
      case 'advanced':
        return 'Moderate pace, fluid transitions, some dynamic elements';
      case 'expert':
        return 'Dynamic movements, complex variations, advanced positioning';
      default:
        return 'Standard movement pattern';
    }
  }

  private generateRuleBasedAnimation(
    exerciseId: string,
    level: string,
    steps: string[],
    instruction: string
  ): GeneratedAnimation {
    
    const baseFrames = this.getBaseFrames(exerciseId, instruction);
    const levelModifiedFrames = this.applyLevelModifications(baseFrames, level);
    
    return {
      frames: levelModifiedFrames,
      duration: this.getDurationForLevel(level),
      loopCount: -1, // infinite loop
      style: level === 'expert' ? 'dynamic' : level === 'advanced' ? 'smooth' : 'stepped'
    };
  }

  private getBaseFrames(exerciseId: string, instruction: string): AnimationFrame[] {
    // Sophisticated pattern matching for different exercise types
    
    if (exerciseId.includes('cat-cow') || instruction.includes('arch') && instruction.includes('round')) {
      return this.generateCatCowFrames();
    }
    
    if (exerciseId.includes('glute-bridge') || instruction.includes('hips') && instruction.includes('lift')) {
      return this.generateGluteBridgeFrames();
    }
    
    if (exerciseId.includes('neck') && instruction.includes('rotation')) {
      return this.generateNeckRotationFrames();
    }
    
    if (exerciseId.includes('shoulder') && instruction.includes('roll')) {
      return this.generateShoulderRollFrames();
    }
    
    if (exerciseId.includes('bird-dog')) {
      return this.generateBirdDogFrames();
    }
    
    if (exerciseId.includes('jumping') || instruction.includes('jump')) {
      return this.generateJumpingJacksFrames();
    }
    
    if (exerciseId.includes('knee') && instruction.includes('chest')) {
      return this.generateKneeToChestFrames();
    }
    
    // Default gentle movement
    return this.generateDefaultFrames();
  }

  private generateCatCowFrames(): AnimationFrame[] {
    return [
      {
        timestamp: 0,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 72, rotation: 0 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        breathingIndicator: 'inhale'
      },
      {
        timestamp: 25,
        bodyParts: {
          head: { x: 100, y: 25, rotation: -15 },
          torso: { x: 100, y: 72, rotation: -8, scaleY: 1.1 },
          leftArm: { x: 70, y: 85, rotation: -5 },
          rightArm: { x: 130, y: 85, rotation: 5 }
        },
        highlights: ['torso'],
        breathingIndicator: 'inhale'
      },
      {
        timestamp: 50,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 72, rotation: 0 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        breathingIndicator: 'hold'
      },
      {
        timestamp: 75,
        bodyParts: {
          head: { x: 100, y: 35, rotation: 15 },
          torso: { x: 100, y: 72, rotation: 8, scaleY: 0.9 },
          leftArm: { x: 70, y: 85, rotation: 5 },
          rightArm: { x: 130, y: 85, rotation: -5 }
        },
        highlights: ['torso'],
        breathingIndicator: 'exhale'
      },
      {
        timestamp: 100,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 72, rotation: 0 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        breathingIndicator: 'inhale'
      }
    ];
  }

  private generateGluteBridgeFrames(): AnimationFrame[] {
    return [
      {
        timestamp: 0,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 },
          hips: { x: 100, y: 100, rotation: 0 },
          leftLeg: { x: 85, y: 120, rotation: -45 },
          rightLeg: { x: 115, y: 120, rotation: 45 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        breathingIndicator: 'inhale'
      },
      {
        timestamp: 30,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 70, rotation: -15 },
          hips: { x: 100, y: 85, rotation: -15 },
          leftLeg: { x: 85, y: 120, rotation: -60 },
          rightLeg: { x: 115, y: 120, rotation: 60 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        highlights: ['hips'],
        breathingIndicator: 'exhale'
      },
      {
        timestamp: 60,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 65, rotation: -20 },
          hips: { x: 100, y: 80, rotation: -20 },
          leftLeg: { x: 85, y: 120, rotation: -70 },
          rightLeg: { x: 115, y: 120, rotation: 70 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        highlights: ['hips', 'torso'],
        breathingIndicator: 'hold'
      },
      {
        timestamp: 100,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 },
          hips: { x: 100, y: 100, rotation: 0 },
          leftLeg: { x: 85, y: 120, rotation: -45 },
          rightLeg: { x: 115, y: 120, rotation: 45 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        breathingIndicator: 'inhale'
      }
    ];
  }

  private generateNeckRotationFrames(): AnimationFrame[] {
    return [
      { timestamp: 0, bodyParts: { head: { x: 100, y: 30, rotation: 0 } } },
      { timestamp: 25, bodyParts: { head: { x: 100, y: 30, rotation: -30 } }, highlights: ['head'] },
      { timestamp: 50, bodyParts: { head: { x: 100, y: 30, rotation: 0 } } },
      { timestamp: 75, bodyParts: { head: { x: 100, y: 30, rotation: 30 } }, highlights: ['head'] },
      { timestamp: 100, bodyParts: { head: { x: 100, y: 30, rotation: 0 } } }
    ];
  }

  private generateShoulderRollFrames(): AnimationFrame[] {
    return [
      {
        timestamp: 0,
        bodyParts: {
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        }
      },
      {
        timestamp: 25,
        bodyParts: {
          leftArm: { x: 70, y: 75, rotation: -30 },
          rightArm: { x: 130, y: 75, rotation: 30 }
        },
        highlights: ['leftArm', 'rightArm']
      },
      {
        timestamp: 50,
        bodyParts: {
          leftArm: { x: 70, y: 70, rotation: -60 },
          rightArm: { x: 130, y: 70, rotation: 60 }
        },
        highlights: ['leftArm', 'rightArm']
      },
      {
        timestamp: 75,
        bodyParts: {
          leftArm: { x: 70, y: 80, rotation: -30 },
          rightArm: { x: 130, y: 80, rotation: 30 }
        }
      },
      {
        timestamp: 100,
        bodyParts: {
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        }
      }
    ];
  }

  private generateBirdDogFrames(): AnimationFrame[] {
    return [
      {
        timestamp: 0,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 72, rotation: 0 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 },
          leftLeg: { x: 85, y: 140, rotation: 0 },
          rightLeg: { x: 115, y: 140, rotation: 0 }
        }
      },
      {
        timestamp: 50,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 72, rotation: 0 },
          leftArm: { x: 50, y: 60, rotation: -45 },
          rightArm: { x: 130, y: 85, rotation: 0 },
          leftLeg: { x: 85, y: 140, rotation: 0 },
          rightLeg: { x: 140, y: 120, rotation: 30 }
        },
        highlights: ['leftArm', 'rightLeg', 'torso']
      },
      {
        timestamp: 100,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 72, rotation: 0 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 150, y: 60, rotation: 45 },
          leftLeg: { x: 60, y: 120, rotation: -30 },
          rightLeg: { x: 115, y: 140, rotation: 0 }
        },
        highlights: ['rightArm', 'leftLeg', 'torso']
      }
    ];
  }

  private generateJumpingJacksFrames(): AnimationFrame[] {
    return [
      {
        timestamp: 0,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 },
          leftArm: { x: 80, y: 85, rotation: 0 },
          rightArm: { x: 120, y: 85, rotation: 0 },
          leftLeg: { x: 95, y: 140, rotation: 0 },
          rightLeg: { x: 105, y: 140, rotation: 0 }
        }
      },
      {
        timestamp: 50,
        bodyParts: {
          head: { x: 100, y: 20, rotation: 0 },
          torso: { x: 100, y: 70, rotation: 0 },
          leftArm: { x: 60, y: 50, rotation: 45 },
          rightArm: { x: 140, y: 50, rotation: -45 },
          leftLeg: { x: 80, y: 140, rotation: -20 },
          rightLeg: { x: 120, y: 140, rotation: 20 }
        },
        highlights: ['leftArm', 'rightArm', 'leftLeg', 'rightLeg']
      },
      {
        timestamp: 100,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 },
          leftArm: { x: 80, y: 85, rotation: 0 },
          rightArm: { x: 120, y: 85, rotation: 0 },
          leftLeg: { x: 95, y: 140, rotation: 0 },
          rightLeg: { x: 105, y: 140, rotation: 0 }
        }
      }
    ];
  }

  private generateKneeToChestFrames(): AnimationFrame[] {
    return [
      {
        timestamp: 0,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 },
          leftLeg: { x: 85, y: 120, rotation: -45 },
          rightLeg: { x: 115, y: 120, rotation: 45 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        breathingIndicator: 'inhale'
      },
      {
        timestamp: 50,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 },
          leftLeg: { x: 100, y: 60, rotation: -90 },
          rightLeg: { x: 115, y: 120, rotation: 45 },
          leftArm: { x: 90, y: 70, rotation: 30 },
          rightArm: { x: 130, y: 85, rotation: 0 }
        },
        highlights: ['leftLeg'],
        breathingIndicator: 'exhale'
      },
      {
        timestamp: 100,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 },
          leftLeg: { x: 85, y: 120, rotation: -45 },
          rightLeg: { x: 100, y: 60, rotation: 90 },
          leftArm: { x: 70, y: 85, rotation: 0 },
          rightArm: { x: 110, y: 70, rotation: -30 }
        },
        highlights: ['rightLeg'],
        breathingIndicator: 'inhale'
      }
    ];
  }

  private generateDefaultFrames(): AnimationFrame[] {
    return [
      {
        timestamp: 0,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 }
        }
      },
      {
        timestamp: 50,
        bodyParts: {
          head: { x: 100, y: 28, rotation: 0 },
          torso: { x: 100, y: 78, rotation: 0, scaleY: 1.05 }
        }
      },
      {
        timestamp: 100,
        bodyParts: {
          head: { x: 100, y: 30, rotation: 0 },
          torso: { x: 100, y: 80, rotation: 0 }
        }
      }
    ];
  }

  private applyLevelModifications(frames: AnimationFrame[], level: string): AnimationFrame[] {
    switch (level) {
      case 'beginner':
        // Add more intermediate frames for smoother, slower movement
        return this.interpolateFrames(frames, 1.5);
      case 'expert':
        // Add dynamic elements and faster transitions
        return this.addDynamicElements(frames);
      default:
        return frames;
    }
  }

  private interpolateFrames(frames: AnimationFrame[], factor: number): AnimationFrame[] {
    const interpolated: AnimationFrame[] = [];
    
    for (let i = 0; i < frames.length - 1; i++) {
      interpolated.push(frames[i]);
      
      // Add intermediate frame
      const current = frames[i];
      const next = frames[i + 1];
      const midFrame: AnimationFrame = {
        timestamp: (current.timestamp + next.timestamp) / 2,
        bodyParts: {}
      };
      
      // Interpolate each body part
      Object.keys(current.bodyParts).forEach(part => {
        const currentPart = current.bodyParts[part as keyof typeof current.bodyParts];
        const nextPart = next.bodyParts[part as keyof typeof next.bodyParts];
        
        if (currentPart && nextPart) {
          midFrame.bodyParts[part as keyof typeof midFrame.bodyParts] = {
            x: (currentPart.x + nextPart.x) / 2,
            y: (currentPart.y + nextPart.y) / 2,
            rotation: (currentPart.rotation + nextPart.rotation) / 2
          };
        }
      });
      
      interpolated.push(midFrame);
    }
    
    interpolated.push(frames[frames.length - 1]);
    return interpolated;
  }

  private addDynamicElements(frames: AnimationFrame[]): AnimationFrame[] {
    // Add slight variations and more dynamic movements for expert level
    return frames.map(frame => ({
      ...frame,
      bodyParts: Object.fromEntries(
        Object.entries(frame.bodyParts).map(([part, data]) => [
          part,
          {
            ...data,
            rotation: data.rotation + (Math.random() - 0.5) * 2 // Add slight variation
          }
        ])
      )
    }));
  }

  private getDurationForLevel(level: string): number {
    switch (level) {
      case 'beginner': return 4; // 4 seconds per cycle
      case 'advanced': return 3; // 3 seconds per cycle
      case 'expert': return 2; // 2 seconds per cycle
      default: return 3;
    }
  }

  private getFallbackAnimation(exerciseId: string): GeneratedAnimation {
    return {
      frames: this.generateDefaultFrames(),
      duration: 3,
      loopCount: -1,
      style: 'smooth'
    };
  }
}

export const aiAnimationService = new AIAnimationService();