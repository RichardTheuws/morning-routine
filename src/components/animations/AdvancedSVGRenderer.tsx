import React from 'react';
import { ExerciseMotion, MotionKeyframe } from '../../services/AIAnimationEngine';

interface AdvancedSVGRendererProps {
  motion: ExerciseMotion;
  exerciseName: string;
  className?: string;
}

export const AdvancedSVGRenderer: React.FC<AdvancedSVGRendererProps> = ({
  motion,
  exerciseName,
  className = ''
}) => {
  const { keyframes, duration, style } = motion;

  // Generate smooth animation values for each joint
  const generateAnimationValues = (jointName: string, property: 'x' | 'y' | 'rotation') => {
    return keyframes
      .filter(frame => frame.joints[jointName])
      .map(frame => {
        const joint = frame.joints[jointName];
        if (property === 'rotation') {
          return joint.rotation;
        }
        return joint.position?.[property] || 0;
      })
      .join(';');
  };

  const generateKeyTimes = () => {
    return keyframes.map(frame => frame.timestamp).join(';');
  };

  const generateMuscleActivation = (muscleGroup: string) => {
    return keyframes.map(frame => {
      const activation = frame.muscleActivation[muscleGroup] || 0;
      // Convert activation to color intensity
      const intensity = Math.round(activation * 255);
      return `rgb(${255 - intensity}, ${Math.max(0, 255 - intensity * 2)}, ${Math.max(0, 255 - intensity * 2)})`;
    }).join(';');
  };

  const generateBreathingAnimation = () => {
    return keyframes.map(frame => {
      switch (frame.breathingPhase) {
        case 'inhale': return '12';
        case 'exhale': return '6';
        case 'hold': return '9';
        default: return '8';
      }
    }).join(';');
  };

  return (
    <div className={`relative bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg overflow-hidden ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 200 180" className="overflow-visible">
        {/* Background grid for reference */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Breathing indicator */}
        <g id="breathingIndicator">
          <circle cx="20" cy="20" r="8" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.7">
            <animate
              attributeName="r"
              values={generateBreathingAnimation()}
              keyTimes={generateKeyTimes()}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              values={keyframes.map(f => f.breathingPhase === 'hold' ? '3' : '2').join(';')}
              keyTimes={generateKeyTimes()}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </circle>
          <text x="20" y="45" textAnchor="middle" fontSize="8" fill="#64748B">
            <animate
              attributeName="opacity"
              values={keyframes.map(f => f.breathingPhase ? '1' : '0.5').join(';')}
              keyTimes={generateKeyTimes()}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
            Breathing
          </text>
        </g>

        {/* Advanced stick figure with proper biomechanics */}
        <g id="humanFigure" transform="translate(0, 10)">
          
          {/* Head */}
          <circle cx="100" cy="30" r="12" fill="none" stroke="#374151" strokeWidth="3">
            {keyframes.some(f => f.joints.head) && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={generateAnimationValues('head', 'rotation')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            )}
            <animate
              attributeName="stroke"
              values={keyframes.map(f => f.emphasis.includes('head') ? '#EF4444' : '#374151').join(';')}
              keyTimes={generateKeyTimes()}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </circle>

          {/* Neck */}
          <line x1="100" y1="42" x2="100" y2="55" stroke="#374151" strokeWidth="3">
            <animate
              attributeName="stroke"
              values={keyframes.map(f => f.emphasis.includes('neck') ? '#EF4444' : '#374151').join(';')}
              keyTimes={generateKeyTimes()}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </line>

          {/* Spine/Torso */}
          <line x1="100" y1="55" x2="100" y2="100" stroke="#374151" strokeWidth="4">
            {keyframes.some(f => f.joints.spine) && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={generateAnimationValues('spine', 'rotation')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            )}
            <animate
              attributeName="stroke"
              values={keyframes.map(f => 
                f.emphasis.includes('spine') || f.emphasis.includes('core') || f.emphasis.includes('back') 
                  ? '#EF4444' : '#374151'
              ).join(';')}
              keyTimes={generateKeyTimes()}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </line>

          {/* Left Arm */}
          <g id="leftArm">
            <line x1="100" y1="65" x2="70" y2="85" stroke="#374151" strokeWidth="3">
              {keyframes.some(f => f.joints.leftShoulder) && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={generateAnimationValues('leftShoulder', 'rotation')}
                  keyTimes={generateKeyTimes()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
              )}
              <animate
                attributeName="stroke"
                values={keyframes.map(f => 
                  f.emphasis.includes('leftShoulder') || f.emphasis.includes('arms') 
                    ? '#EF4444' : '#374151'
                ).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </line>
            {/* Forearm */}
            <line x1="70" y1="85" x2="60" y2="105" stroke="#374151" strokeWidth="2">
              <animate
                attributeName="stroke"
                values={keyframes.map(f => 
                  f.emphasis.includes('leftShoulder') || f.emphasis.includes('arms') 
                    ? '#EF4444' : '#374151'
                ).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>

          {/* Right Arm */}
          <g id="rightArm">
            <line x1="100" y1="65" x2="130" y2="85" stroke="#374151" strokeWidth="3">
              {keyframes.some(f => f.joints.rightShoulder) && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={generateAnimationValues('rightShoulder', 'rotation')}
                  keyTimes={generateKeyTimes()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
              )}
              <animate
                attributeName="stroke"
                values={keyframes.map(f => 
                  f.emphasis.includes('rightShoulder') || f.emphasis.includes('arms') 
                    ? '#EF4444' : '#374151'
                ).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </line>
            {/* Forearm */}
            <line x1="130" y1="85" x2="140" y2="105" stroke="#374151" strokeWidth="2">
              <animate
                attributeName="stroke"
                values={keyframes.map(f => 
                  f.emphasis.includes('rightShoulder') || f.emphasis.includes('arms') 
                    ? '#EF4444' : '#374151'
                ).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>

          {/* Hips indicator */}
          <circle cx="100" cy="100" r="4" fill="#374151">
            {keyframes.some(f => f.joints.hips) && (
              <>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={keyframes.filter(f => f.joints.hips).map(f => {
                    const pos = f.joints.hips.position || { x: 100, y: 100 };
                    return `${pos.x - 100} ${pos.y - 100}`;
                  }).join(';')}
                  keyTimes={keyframes.filter(f => f.joints.hips).map(f => f.timestamp).join(';')}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={generateAnimationValues('hips', 'rotation')}
                  keyTimes={generateKeyTimes()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  additive="sum"
                />
              </>
            )}
            <animate
              attributeName="fill"
              values={keyframes.map(f => 
                f.emphasis.includes('hips') || f.emphasis.includes('glutes') 
                  ? '#EF4444' : '#374151'
              ).join(';')}
              keyTimes={generateKeyTimes()}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </circle>

          {/* Left Leg */}
          <g id="leftLeg">
            <line x1="100" y1="100" x2="85" y2="130" stroke="#374151" strokeWidth="3">
              {keyframes.some(f => f.joints.leftHip) && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={generateAnimationValues('leftHip', 'rotation')}
                  keyTimes={generateKeyTimes()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
              )}
              <animate
                attributeName="stroke"
                values={keyframes.map(f => 
                  f.emphasis.includes('leftHip') || f.emphasis.includes('legs') 
                    ? '#EF4444' : '#374151'
                ).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </line>
            {/* Lower leg */}
            <line x1="85" y1="130" x2="85" y2="155" stroke="#374151" strokeWidth="2">
              {keyframes.some(f => f.joints.leftKnee) && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={generateAnimationValues('leftKnee', 'rotation')}
                  keyTimes={generateKeyTimes()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
              )}
              <animate
                attributeName="stroke"
                values={keyframes.map(f => 
                  f.emphasis.includes('leftHip') || f.emphasis.includes('legs') 
                    ? '#EF4444' : '#374151'
                ).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>

          {/* Right Leg */}
          <g id="rightLeg">
            <line x1="100" y1="100" x2="115" y2="130" stroke="#374151" strokeWidth="3">
              {keyframes.some(f => f.joints.rightHip) && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={generateAnimationValues('rightHip', 'rotation')}
                  keyTimes={generateKeyTimes()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
              )}
              <animate
                attributeName="stroke"
                values={keyframes.map(f => 
                  f.emphasis.includes('rightHip') || f.emphasis.includes('legs') 
                    ? '#EF4444' : '#374151'
                ).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </line>
            {/* Lower leg */}
            <line x1="115" y1="130" x2="115" y2="155" stroke="#374151" strokeWidth="2">
              {keyframes.some(f => f.joints.rightKnee) && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values={generateAnimationValues('rightKnee', 'rotation')}
                  keyTimes={generateKeyTimes()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
              )}
              <animate
                attributeName="stroke"
                values={keyframes.map(f => 
                  f.emphasis.includes('rightHip') || f.emphasis.includes('legs') 
                    ? '#EF4444' : '#374151'
                ).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>

          {/* Muscle activation indicators */}
          {Object.keys(motion.keyframes[0]?.muscleActivation || {}).map(muscle => (
            <circle
              key={muscle}
              cx={muscle === 'core' ? 100 : muscle === 'arms' ? 85 : muscle === 'legs' ? 100 : 115}
              cy={muscle === 'core' ? 80 : muscle === 'arms' ? 75 : muscle === 'legs' ? 115 : 75}
              r="3"
              fill="#EF4444"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values={keyframes.map(f => (f.muscleActivation[muscle] || 0) * 0.8).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values={keyframes.map(f => 3 + (f.muscleActivation[muscle] || 0) * 4).join(';')}
                keyTimes={generateKeyTimes()}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Exercise info and style indicator */}
        <text x="10" y="170" fontSize="10" fill="#64748B" fontFamily="system-ui">
          {exerciseName} • {style} • {duration}s
        </text>
        
        {/* Difficulty indicator */}
        <g transform="translate(160, 160)">
          {Array.from({ length: 3 }, (_, i) => (
            <circle
              key={i}
              cx={i * 8}
              cy="0"
              r="3"
              fill={i < (motion.difficulty === 'beginner' ? 1 : motion.difficulty === 'intermediate' ? 2 : 3) ? '#EF4444' : '#E2E8F0'}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};