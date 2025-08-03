import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GeneratedAnimation } from '../../services/AdvancedAnimationEngine';

interface ModernAnimationRendererProps {
  animation: GeneratedAnimation;
  exerciseName: string;
  className?: string;
  isPlaying?: boolean;
  onAnimationComplete?: () => void;
}

export const ModernAnimationRenderer: React.FC<ModernAnimationRendererProps> = ({
  animation,
  exerciseName,
  className = '',
  isPlaying = true,
  onAnimationComplete
}) => {
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

  const getBreathingRadius = () => {
    switch (breathingPhase) {
      case 'inhale': return 14;
      case 'exhale': return 8;
      case 'hold': return 11;
      default: return 10;
    }
  };

  const getBreathingColor = () => {
    switch (breathingPhase) {
      case 'inhale': return '#10B981'; // emerald-500
      case 'exhale': return '#3B82F6'; // blue-500
      case 'hold': return '#F59E0B'; // amber-500
      default: return '#6B7280'; // gray-500
    }
  };

  const getMuscleActivationColor = (activation: number) => {
    const intensity = Math.round(activation * 255);
    return `rgba(239, 68, 68, ${activation * 0.8})`; // red with opacity based on activation
  };

  return (
    <div className={`relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 400 300" className="overflow-visible">
        {/* Modern grid background */}
        <defs>
          <pattern id="modernGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
          
          {/* Gradient definitions */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          
          <radialGradient id="muscleActivation" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2"/>
          </radialGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#modernGrid)" />

        {/* Breathing indicator - modern design */}
        <motion.g transform="translate(30, 30)">
          <motion.circle
            cx="0"
            cy="0"
            r={getBreathingRadius()}
            fill="none"
            stroke={getBreathingColor()}
            strokeWidth="3"
            opacity="0.8"
            animate={{
              r: getBreathingRadius(),
              stroke: getBreathingColor(),
              strokeWidth: breathingPhase === 'hold' ? 4 : 3
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="0"
            cy="0"
            r={getBreathingRadius() * 0.3}
            fill={getBreathingColor()}
            opacity="0.4"
            animate={{
              r: getBreathingRadius() * 0.3,
              fill: getBreathingColor()
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <text x="0" y="35" textAnchor="middle" fontSize="10" fill="#64748B" fontWeight="500">
            {breathingPhase}
          </text>
        </motion.g>

        {/* Modern stick figure with smooth animations */}
        <g id="modernFigure" transform="translate(200, 50)">
          
          {/* Head - modern circular design */}
          <motion.circle
            cx="0"
            cy="0"
            r="16"
            fill="url(#bodyGradient)"
            stroke={currentKeyframe.focus.includes('head') ? '#ef4444' : '#1f2937'}
            strokeWidth="2"
            animate={{
              stroke: currentKeyframe.focus.includes('head') ? '#ef4444' : '#1f2937',
              r: currentKeyframe.focus.includes('head') ? 18 : 16
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Neck - sleek connection */}
          <motion.line
            x1="0"
            y1="16"
            x2="0"
            y2="35"
            stroke="url(#bodyGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            animate={{
              stroke: currentKeyframe.focus.includes('neck') ? '#ef4444' : 'url(#bodyGradient)'
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Torso - modern rectangular design */}
          <motion.rect
            x="-20"
            y="35"
            width="40"
            height="80"
            rx="8"
            fill="url(#bodyGradient)"
            stroke={currentKeyframe.focus.includes('core') || currentKeyframe.focus.includes('back') ? '#ef4444' : 'transparent'}
            strokeWidth="3"
            animate={{
              stroke: currentKeyframe.focus.includes('core') || currentKeyframe.focus.includes('back') ? '#ef4444' : 'transparent'
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Arms - modern design with joints */}
          {['left', 'right'].map((side) => {
            const multiplier = side === 'left' ? -1 : 1;
            const isHighlighted = currentKeyframe.focus.includes('arms') || currentKeyframe.focus.includes(`${side}Shoulder`);
            
            return (
              <motion.g key={`arm-${side}`}>
                {/* Shoulder joint */}
                <motion.circle
                  cx={multiplier * 20}
                  cy="45"
                  r="4"
                  fill={isHighlighted ? '#ef4444' : '#374151'}
                  animate={{
                    fill: isHighlighted ? '#ef4444' : '#374151',
                    r: isHighlighted ? 6 : 4
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Upper arm */}
                <motion.line
                  x1={multiplier * 20}
                  y1="45"
                  x2={multiplier * 35}
                  y2="75"
                  stroke={isHighlighted ? '#ef4444' : 'url(#bodyGradient)'}
                  strokeWidth="6"
                  strokeLinecap="round"
                  animate={{
                    stroke: isHighlighted ? '#ef4444' : 'url(#bodyGradient)'
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Forearm */}
                <motion.line
                  x1={multiplier * 35}
                  y1="75"
                  x2={multiplier * 45}
                  y2="105"
                  stroke={isHighlighted ? '#ef4444' : 'url(#bodyGradient)'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{
                    stroke: isHighlighted ? '#ef4444' : 'url(#bodyGradient)'
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.g>
            );
          })}

          {/* Legs - modern design with joints */}
          {['left', 'right'].map((side) => {
            const multiplier = side === 'left' ? -1 : 1;
            const isHighlighted = currentKeyframe.focus.includes('legs') || currentKeyframe.focus.includes(`${side}Hip`);
            
            return (
              <motion.g key={`leg-${side}`}>
                {/* Hip joint */}
                <motion.circle
                  cx={multiplier * 15}
                  cy="115"
                  r="5"
                  fill={isHighlighted || currentKeyframe.focus.includes('glutes') ? '#ef4444' : '#374151'}
                  animate={{
                    fill: isHighlighted || currentKeyframe.focus.includes('glutes') ? '#ef4444' : '#374151',
                    r: isHighlighted ? 7 : 5
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Thigh */}
                <motion.line
                  x1={multiplier * 15}
                  y1="115"
                  x2={multiplier * 20}
                  y2="160"
                  stroke={isHighlighted ? '#ef4444' : 'url(#bodyGradient)'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  animate={{
                    stroke: isHighlighted ? '#ef4444' : 'url(#bodyGradient)'
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Knee joint */}
                <motion.circle
                  cx={multiplier * 20}
                  cy="160"
                  r="4"
                  fill={isHighlighted ? '#ef4444' : '#374151'}
                  animate={{
                    fill: isHighlighted ? '#ef4444' : '#374151'
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shin */}
                <motion.line
                  x1={multiplier * 20}
                  y1="160"
                  x2={multiplier * 25}
                  y2="200"
                  stroke={isHighlighted ? '#ef4444' : 'url(#bodyGradient)'}
                  strokeWidth="6"
                  strokeLinecap="round"
                  animate={{
                    stroke: isHighlighted ? '#ef4444' : 'url(#bodyGradient)'
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Foot */}
                <motion.ellipse
                  cx={multiplier * 35}
                  cy="205"
                  rx="12"
                  ry="6"
                  fill={isHighlighted ? '#ef4444' : '#374151'}
                  animate={{
                    fill: isHighlighted ? '#ef4444' : '#374151'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.g>
            );
          })}

          {/* Muscle activation indicators - modern floating elements */}
          {Object.entries(currentKeyframe.muscleActivations).map(([muscle, activation]) => {
            if (activation < 0.3) return null;
            
            const positions = {
              core: { x: 0, y: 75 },
              glutes: { x: 0, y: 115 },
              back: { x: -30, y: 75 },
              shoulders: { x: 0, y: 45 },
              arms: { x: -40, y: 75 },
              legs: { x: 0, y: 140 }
            };
            
            const pos = positions[muscle as keyof typeof positions] || { x: 0, y: 0 };
            
            return (
              <motion.g key={muscle}>
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="12"
                  fill="url(#muscleActivation)"
                  animate={{
                    r: 12 + activation * 20,
                    opacity: activation * 0.7
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                <motion.text
                  x={pos.x}
                  y={pos.y + 30}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#ef4444"
                  fontWeight="600"
                  animate={{
                    opacity: activation > 0.5 ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {muscle}
                </motion.text>
              </motion.g>
            );
          })}
        </g>

        {/* Exercise info - modern typography */}
        <text x="20" y="280" fontSize="12" fill="#374151" fontFamily="system-ui" fontWeight="600">
          {exerciseName}
        </text>
        
        <text x="20" y="295" fontSize="10" fill="#64748B" fontFamily="system-ui">
          {animation.style} • {animation.difficulty} • {animation.duration}s
        </text>
        
        {/* Current instruction - modern design */}
        {currentKeyframe.instruction && (
          <motion.text
            x="200"
            y="25"
            fontSize="11"
            fill="#1f2937"
            fontFamily="system-ui"
            fontWeight="500"
            textAnchor="middle"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentKeyframe.instruction}
          </motion.text>
        )}
        
        {/* Progress bar - modern design */}
        <rect x="20" y="265" width="360" height="3" fill="#e2e8f0" rx="2" />
        <motion.rect
          x="20"
          y="265"
          height="3"
          fill="linear-gradient(90deg, #10b981, #3b82f6)"
          rx="2"
          animate={{
            width: (currentFrame / (animation.keyframes.length - 1)) * 360
          }}
          transition={{ duration: 0.2 }}
        />
      </svg>
      
      {/* Modern difficulty indicator */}
      <div className="absolute bottom-3 right-3 flex gap-1">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
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