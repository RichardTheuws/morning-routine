import { Exercise } from '../types/Exercise';

export const coreExercises: Exercise[] = [
  {
    "id": "bird-dog",
    "name_nl": "Bird Dog",
    "name_en": "Bird Dog",
    "category": ["Core", "Back", "Stability"],
    "goals": ["Build strength", "Reduce back pain", "Mobility"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 5,
        "description_nl": "Stabiliteit oefening voor core en rug",
        "description_en": "Stability exercise for core and back",
        "steps_nl": [
          "Begin in viervoetenstand",
          "Strek rechterarm naar voren",
          "Strek linkerbeen naar achteren",
          "Houd 5 seconden vast",
          "Wissel van arm en been"
        ],
        "steps_en": [
          "Begin in quadruped position",
          "Extend right arm forward",
          "Extend left leg backward",
          "Hold for 5 seconds",
          "Switch arm and leg"
        ],
        "tips_nl": [
          "Houd heupen level",
          "Activeer core spieren",
          "Beweeg langzaam en gecontroleerd"
        ],
        "tips_en": [
          "Keep hips level",
          "Activate core muscles",
          "Move slowly and controlled"
        ],
        "common_mistakes_nl": [
          "Heupen draaien",
          "Te hoge arm of been",
          "Rug doorbuigen"
        ],
        "common_mistakes_en": [
          "Rotating hips",
          "Arm or leg too high",
          "Arching back"
        ],
        "alternative_nl": "Alleen arm of alleen been bewegen",
        "alternative_en": "Move only arm or only leg",
        "animation_instruction_nl": "Viervoetenstand, tegenovergestelde arm en been strekken, 5 seconden vasthouden, wisselen",
        "animation_instruction_en": "Quadruped position, extend opposite arm and leg, hold 5 seconds, switch"
      },
      "advanced": {
        "duration": "2m",
        "sets": 2,
        "reps": 8,
        "description_nl": "Uitgebreidere bird dog met meer uitdaging",
        "description_en": "Extended bird dog with more challenge",
        "steps_nl": [
          "Voer basis bird dog uit",
          "Voeg knie-naar-elleboog beweging toe",
          "Houd eindpositie 8 seconden vast",
          "Voeg instabiliteit toe met ogen dicht",
          "Eindig met beide armen en benen"
        ],
        "steps_en": [
          "Perform basic bird dog",
          "Add knee-to-elbow movement",
          "Hold end position 8 seconds",
          "Add instability with eyes closed",
          "End with both arms and legs"
        ],
        "tips_nl": [
          "Focus op perfecte vorm",
          "Voel core activatie",
          "Gebruik ademhaling voor stabiliteit"
        ],
        "tips_en": [
          "Focus on perfect form",
          "Feel core activation",
          "Use breathing for stability"
        ],
        "common_mistakes_nl": [
          "Te snelle bewegingen",
          "Core activatie verliezen",
          "Compensatie bewegingen"
        ],
        "common_mistakes_en": [
          "Moving too quickly",
          "Losing core activation",
          "Compensation movements"
        ],
        "alternative_nl": "Op verhoogd oppervlak voor extra uitdaging",
        "alternative_en": "On elevated surface for extra challenge",
        "animation_instruction_nl": "Geavanceerde bird dog met knie-elleboog beweging, langere houdingen, ogen dicht variatie",
        "animation_instruction_en": "Advanced bird dog with knee-elbow movement, longer holds, eyes closed variation"
      },
      "expert": {
        "duration": "3m",
        "sets": 3,
        "reps": 10,
        "description_nl": "Expert bird dog met dynamische bewegingen",
        "description_en": "Expert bird dog with dynamic movements",
        "steps_nl": [
          "Begin met perfecte bird dog basis",
          "Voeg rotatie bewegingen toe",
          "Integreer push-up beweging",
          "Combineer met been zwaaien",
          "Eindig met flow sequentie"
        ],
        "steps_en": [
          "Begin with perfect bird dog base",
          "Add rotation movements",
          "Integrate push-up movement",
          "Combine with leg swings",
          "End with flow sequence"
        ],
        "tips_nl": [
          "Behoud core controle bij beweging",
          "Integreer hele lichaam",
          "Gebruik als kracht en stabiliteit"
        ],
        "tips_en": [
          "Maintain core control during movement",
          "Integrate whole body",
          "Use as strength and stability"
        ],
        "common_mistakes_nl": [
          "Te complexe bewegingen tegelijk",
          "Vorm verliezen voor snelheid",
          "Overbelasting van polsen"
        ],
        "common_mistakes_en": [
          "Too complex movements simultaneously",
          "Losing form for speed",
          "Overloading wrists"
        ],
        "alternative_nl": "Op instabiel oppervlak zoals balance pad",
        "alternative_en": "On unstable surface like balance pad",
        "animation_instruction_nl": "Dynamische bird dog met rotaties, push-up integratie, been zwaaien, vloeiende sequentie",
        "animation_instruction_en": "Dynamic bird dog with rotations, push-up integration, leg swings, flowing sequence"
      }
    }
  }
];