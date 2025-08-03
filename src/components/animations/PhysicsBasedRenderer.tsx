import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { GeneratedAnimation, AnimationKeyframe } from '../../services/AdvancedAnimationEngine';

interface PhysicsBasedRendererProps {
  animation: GeneratedAnimation;
  exerciseName: string;
  className?: string;
  isPlaying?: boolean;
  onAnimationComplete?: () => void;
}

export const PhysicsBasedRenderer: React.FC<PhysicsBasedRendererProps> = ({
  animation,
  exerciseName,
  className = '',
  isPlaying = true,
  onAnimationComplete
}) => {
  const controls = useAnimation();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<string>('inhale');
  const animationRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => stopAnimation();
  }, [isPlaying, animation]);

  const startAnimation = () => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = (elapsed % animation.duration) / animation.duration;
      
      const frameIndex = Math.floor(progress * animation.keyframes.length);
      const currentKeyframe = animation.keyframes[frameIndex] || animation.keyframes[0];
      
      setCurrentFrame(frameIndex);
      setBreathingPhase(currentKeyframe.breathingPhase || 'inhale');
      
      if (elapsed >= animation.duration && onAnimationComplete) {
        onAnimationComplete();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const currentKeyframe = animation.keyframes[currentFrame] || animation.keyframes[0];
  const nextKeyframe = animation.keyframes[currentFrame + 1] || animation.keyframes[0];

  // Generate smooth animation variants for Framer Motion
  const generateMotionVariants = () => {
    const variants: Record<string, any> = {};
    
    animation.keyframes.forEach((frame, index) => {
      variants[`frame${index}`] = {
        transition: {
          duration: animation.duration / animation.keyframes.length,
          ease: animation.style === 'dynamic' ? 'easeInOut' : 'linear'
        }
      };
    });
    
    return variants;
  };

  const getJointPosition = (jointId: string) => {
    const pose = currentKeyframe.poses[jointId];
    if (!pose) return { x: 100, y: 100 };
    
    // Convert 3D to 2D for SVG display
    return {
      x: 100 + pose.position.x,
      y: 160 - pose.position.y // Flip Y axis for SVG
    };
  };

  const getJointRotation = (jointId: string) => {
    const pose = currentKeyframe.poses[jointId];
    return pose ? pose.rotation.z : 0; // Use Z rotation for 2D display
  };

  const getMuscleActivation = (muscleId: string) => {
    return currentKeyframe.muscleActivations[muscleId] || 0;
  };

  const isJointHighlighted = (jointId: string) => {
    return currentKeyframe.focus.includes(jointId);
  };

  const getBreathingRadius = () => {
    switch (breathingPhase) {
      case 'inhale': return 12;
      case 'exhale': return 6;
      case 'hold': return 9;
      default: return 8;
    }
  };

  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl overflow-hidden ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 200 180" className="overflow-visible">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
          
          {/* Muscle activation gradient */}
          <radialGradient id="muscleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2"/>
          </radialGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Breathing indicator */}
        <motion.g transform="translate(20, 20)">
          <motion.circle
            cx="0"
            cy="0"
            r={getBreathingRadius()}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            opacity="0.7"
            animate={{
              r: getBreathingRadius(),
              strokeWidth: breathingPhase === 'hold' ? 3 : 2
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          <text x="0" y="25" textAnchor="middle" fontSize="8" fill="#64748B">
            {breathingPhase}
          </text>
        </motion.g>

        {/* Advanced stick figure with physics */}
        <g id="humanFigure">
          
          {/* Head */}
          <motion.circle
            cx={getJointPosition('head').x}
            cy={getJointPosition('head').y}
            r="10"
            fill="none"
            stroke={isJointHighlighted('head') ? '#EF4444' : '#374151'}
            strokeWidth="3"
            animate={{
              cx: getJointPosition('head').x,
              cy: getJointPosition('head').y,
              stroke: isJointHighlighted('head') ? '#EF4444' : '#374151'
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Spine segments with realistic curvature */}
          {['spine_upper', 'spine_middle', 'spine_lower'].map((jointId, index) => {
            const pos = getJointPosition(jointId);
            const rotation = getJointRotation(jointId);
            const isHighlighted = isJointHighlighted(jointId) || currentKeyframe.focus.includes('core') || currentKeyframe.focus.includes('back');
            
            return (
              <motion.g key={jointId}>
                <motion.line
                  x1={pos.x}
                  y1={pos.y}
                  x2={pos.x}
                  y2={pos.y + 25}
                  stroke={isHighlighted ? '#EF4444' : '#374151'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{
                    x1: pos.x,
                    y1: pos.y,
                    x2: pos.x,
                    y2: pos.y + 25,
                    stroke: isHighlighted ? '#EF4444' : '#374151',
                    rotate: rotation
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                />
                
                {/* Muscle activation indicator */}
                {getMuscleActivation('core') > 0.5 && (
                  <motion.circle
                    cx={pos.x + 15}
                    cy={pos.y + 10}
                    r="4"
                    fill="url(#muscleGradient)"
                    animate={{
                      r: 4 + getMuscleActivation('core') * 6,
                      opacity: getMuscleActivation('core')
                    }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.g>
            );
          })}

          {/* Arms with realistic joint movement */}
          {['arm_left', 'arm_right'].map((jointId) => {
            const pos = getJointPosition(jointId);
            const rotation = getJointRotation(jointId);
            const isHighlighted = isJointHighlighted(jointId) || currentKeyframe.focus.includes('arms');
            const side = jointId.includes('left') ? -1 : 1;
            
            return (
              <motion.g key={jointId}>
                {/* Upper arm */}
                <motion.line
                  x1={100}
                  y1={140}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isHighlighted ? '#EF4444' : '#374151'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{
                    x2: pos.x,
                    y2: pos.y,
                    stroke: isHighlighted ? '#EF4444' : '#374151'
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                
                {/* Forearm */}
                <motion.line
                  x1={pos.x}
                  y1={pos.y}
                  x2={pos.x + side * 15}
                  y2={pos.y + 20}
                  stroke={isHighlighted ? '#EF4444' : '#374151'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{
                    x1: pos.x,
                    y1: pos.y,
                    stroke: isHighlighted ? '#EF4444' : '#374151'
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.g>
            );
          })}

          {/* Legs with knee joints */}
          {['leg_left', 'leg_right'].map((jointId) => {
            const pos = getJointPosition(jointId);
            const isHighlighted = isJointHighlighted(jointId) || currentKeyframe.focus.includes('legs');
            const side = jointId.includes('left') ? -1 : 1;
            
            return (
              <motion.g key={jointId}>
                {/* Thigh */}
                <motion.line
                  x1={100}
                  y1={80}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isHighlighted ? '#EF4444' : '#374151'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{
                    x2: pos.x,
                    y2: pos.y,
                    stroke: isHighlighted ? '#EF4444' : '#374151'
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                
                {/* Shin */}
                <motion.line
                  x1={pos.x}
                  y1={pos.y}
                  x2={pos.x}
                  y2={pos.y - 30}
                  stroke={isHighlighted ? '#EF4444' : '#374151'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{
                    x1: pos.x,
                    y1: pos.y,
                    stroke: isHighlighted ? '#EF4444' : '#374151'
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.g>
            );
          })}

          {/* Pelvis/Hip indicator */}
          <motion.circle
            cx={getJointPosition('pelvis').x}
            cy={getJointPosition('pelvis').y}
            r="6"
            fill={isJointHighlighted('pelvis') || currentKeyframe.focus.includes('glutes') ? '#EF4444' : '#374151'}
            animate={{
              cx: getJointPosition('pelvis').x,
              cy: getJointPosition('pelvis').y,
              fill: isJointHighlighted('pelvis') || currentKeyframe.focus.includes('glutes') ? '#EF4444' : '#374151',
              r: 6 + getMuscleActivation('glutes') * 4
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Muscle activation zones */}
          {Object.entries(currentKeyframe.muscleActivations).map(([muscleId, activation]) => {
            if (activation < 0.3) return null;
            
            const positions = {
              core: { x: 100, y: 110 },
              glutes: { x: 100, y: 80 },
              back: { x: 100, y: 120 },
              shoulders: { x: 100, y: 140 },
              arms: { x: 85, y: 130 },
              legs: { x: 100, y: 60 }
            };
            
            const pos = positions[muscleId as keyof typeof positions] || { x: 100, y: 100 };
            
            return (
              <motion.circle
                key={muscleId}
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill="#EF4444"
                animate={{
                  r: 8 + activation * 12,
                  opacity: activation * 0.6
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            );
          })}
        </g>

        {/* Exercise metadata */}
        <text x="10" y="170" fontSize="10" fill="#64748B" fontFamily="system-ui">
          {exerciseName} • {animation.style} • {animation.difficulty}
        </text>
        
        {/* Current instruction */}
        {currentKeyframe.instruction && (
          <text x="100" y="15" fontSize="9" fill="#374151" fontFamily="system-ui" textAnchor="middle">
            {currentKeyframe.instruction}
          </text>
        )}
        
        {/* Progress indicator */}
        <rect x="10" y="175" width="180" height="2" fill="#E2E8F0" rx="1" />
        <motion.rect
          x="10"
          y="175"
          height="2"
          fill="#10B981"
          rx="1"
          animate={{
            width: (currentFrame / (animation.keyframes.length - 1)) * 180
          }}
          transition={{ duration: 0.1 }}
        />
      </svg>
      
      {/* Animation controls overlay */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < (animation.difficulty === 'beginner' ? 1 : animation.difficulty === 'advanced' ? 2 : 3)
                ? 'bg-emerald-500'
                : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};