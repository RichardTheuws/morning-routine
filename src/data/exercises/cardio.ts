import { Exercise } from '../types/Exercise';

export const cardioExercises: Exercise[] = [
  {
    "id": "jumping-jacks",
    "name_nl": "Jumping Jacks",
    "name_en": "Jumping Jacks",
    "category": ["Cardio", "Energy"],
    "goals": ["Energy boost", "Fat loss"],
    "levels": {
      "beginner": {
        "duration": "30s",
        "sets": 1,
        "reps": 15,
        "description_nl": "Klassieke cardio oefening voor energie boost",
        "description_en": "Classic cardio exercise for energy boost",
        "steps_nl": [
          "Sta rechtop met voeten samen",
          "Spring en spreid benen heupbreedte",
          "Breng armen boven hoofd",
          "Spring terug naar startpositie",
          "Herhaal in vloeiende beweging"
        ],
        "steps_en": [
          "Stand upright with feet together",
          "Jump and spread legs hip-width",
          "Bring arms overhead",
          "Jump back to start position",
          "Repeat in flowing movement"
        ],
        "tips_nl": [
          "Land zacht op voeten",
          "Houd core geactiveerd",
          "Adem regelmatig"
        ],
        "tips_en": [
          "Land softly on feet",
          "Keep core activated",
          "Breathe regularly"
        ],
        "common_mistakes_nl": [
          "Te hard landen",
          "Armen niet volledig strekken",
          "Ademhaling vasthouden"
        ],
        "common_mistakes_en": [
          "Landing too hard",
          "Not fully extending arms",
          "Holding breath"
        ],
        "alternative_nl": "Step-jacks: stappen in plaats van springen",
        "alternative_en": "Step-jacks: stepping instead of jumping",
        "animation_instruction_nl": "Persoon springt met benen uit elkaar en armen omhoog, terug naar startpositie, ritmische beweging",
        "animation_instruction_en": "Person jumps with legs apart and arms up, back to start position, rhythmic movement"
      },
      "advanced": {
        "duration": "45s",
        "sets": 2,
        "reps": 25,
        "description_nl": "Intensievere jumping jacks met variaties",
        "description_en": "More intense jumping jacks with variations",
        "steps_nl": [
          "Voer standaard jumping jacks uit",
          "Voeg squat toe in brede positie",
          "Verhoog tempo geleidelijk",
          "Voeg arm variaties toe",
          "Eindig met power jacks"
        ],
        "steps_en": [
          "Perform standard jumping jacks",
          "Add squat in wide position",
          "Gradually increase tempo",
          "Add arm variations",
          "End with power jacks"
        ],
        "tips_nl": [
          "Behoud goede vorm bij hoger tempo",
          "Voel hartslag stijgen",
          "Gebruik armen voor momentum"
        ],
        "tips_en": [
          "Maintain good form at higher tempo",
          "Feel heart rate increase",
          "Use arms for momentum"
        ],
        "common_mistakes_nl": [
          "Te snel te vroeg",
          "Vorm verliezen voor snelheid",
          "Onregelmatige ademhaling"
        ],
        "common_mistakes_en": [
          "Too fast too early",
          "Losing form for speed",
          "Irregular breathing"
        ],
        "alternative_nl": "Half-jacks: alleen armen of alleen benen",
        "alternative_en": "Half-jacks: only arms or only legs",
        "animation_instruction_nl": "Snellere jumping jacks met squat variatie, arm variaties, power bewegingen",
        "animation_instruction_en": "Faster jumping jacks with squat variation, arm variations, power movements"
      },
      "expert": {
        "duration": "60s",
        "sets": 3,
        "reps": 40,
        "description_nl": "High-intensity jumping jacks met complexe variaties",
        "description_en": "High-intensity jumping jacks with complex variations",
        "steps_nl": [
          "Begin met explosive jumping jacks",
          "Voeg cross-over arm bewegingen toe",
          "Integreer 180-graden draaien",
          "Combineer met burpee elementen",
          "Eindig met plyometric variaties"
        ],
        "steps_en": [
          "Begin with explosive jumping jacks",
          "Add cross-over arm movements",
          "Integrate 180-degree turns",
          "Combine with burpee elements",
          "End with plyometric variations"
        ],
        "tips_nl": [
          "Maximale explosiviteit",
          "Perfecte landing techniek",
          "Gebruik als HIIT interval"
        ],
        "tips_en": [
          "Maximum explosiveness",
          "Perfect landing technique",
          "Use as HIIT interval"
        ],
        "common_mistakes_nl": [
          "Overbelasting van gewrichten",
          "Te complexe bewegingen tegelijk",
          "Uitputting negeren"
        ],
        "common_mistakes_en": [
          "Overloading joints",
          "Too complex movements simultaneously",
          "Ignoring exhaustion"
        ],
        "alternative_nl": "Plyo-jacks op zachte ondergrond",
        "alternative_en": "Plyo-jacks on soft surface",
        "animation_instruction_nl": "Explosieve jumping jacks met cross-over armen, 180-graden draaien, plyometric elementen",
        "animation_instruction_en": "Explosive jumping jacks with cross-over arms, 180-degree turns, plyometric elements"
      }
    }
  },
  {
    "id": "knee-taps",
    "name_nl": "Knie Taps",
    "name_en": "Knee Taps",
    "category": ["Cardio", "Mobility", "Legs"],
    "goals": ["Energy boost", "Mobility", "Fat loss"],
    "levels": {
      "beginner": {
        "duration": "30s",
        "sets": 1,
        "reps": 20,
        "description_nl": "Lichte cardio oefening die hartslag verhoogt en benen mobiliseert",
        "description_en": "Light cardio exercise that increases heart rate and mobilizes legs",
        "steps_nl": [
          "Sta rechtop met voeten heupbreedte uit elkaar",
          "Til rechter knie op naar borst",
          "Raak knie aan met linker hand",
          "Zet voet terug op grond",
          "Herhaal met andere been"
        ],
        "steps_en": [
          "Stand upright with feet hip-width apart",
          "Lift right knee up toward chest",
          "Touch knee with left hand",
          "Place foot back on ground",
          "Repeat with other leg"
        ],
        "tips_nl": [
          "Houd core geactiveerd voor balans",
          "Beweeg in gecontroleerd tempo",
          "Voel de mobilisatie in heupen"
        ],
        "tips_en": [
          "Keep core activated for balance",
          "Move at controlled pace",
          "Feel the mobilization in hips"
        ],
        "common_mistakes_nl": [
          "Te hoge knieën forceren",
          "Balans verliezen",
          "Schouders naar voren hangen"
        ],
        "common_mistakes_en": [
          "Forcing knees too high",
          "Losing balance",
          "Shoulders hanging forward"
        ],
        "alternative_nl": "Zittend: alleen knieën optillen zonder hand contact",
        "alternative_en": "Seated: only lift knees without hand contact",
        "animation_instruction_nl": "Persoon tilt afwisselend knieën op naar borst, raakt aan met tegenovergestelde hand, gecontroleerde beweging",
        "animation_instruction_en": "Person alternately lifts knees toward chest, touches with opposite hand, controlled movement"
      },
      "advanced": {
        "duration": "45s",
        "sets": 2,
        "reps": 30,
        "description_nl": "Snellere knee taps met meer coördinatie uitdaging",
        "description_en": "Faster knee taps with more coordination challenge",
        "steps_nl": [
          "Verhoog het tempo van basis knee taps",
          "Voeg arm zwaaien toe voor momentum",
          "Wissel tussen hoge en lage knieën",
          "Integreer zijdelingse bewegingen",
          "Eindig met dubbele knee taps"
        ],
        "steps_en": [
          "Increase tempo of basic knee taps",
          "Add arm swinging for momentum",
          "Alternate between high and low knees",
          "Integrate lateral movements",
          "End with double knee taps"
        ],
        "tips_nl": [
          "Behoud ritme en coördinatie",
          "Voel hartslag stijgen",
          "Gebruik armen voor balans"
        ],
        "tips_en": [
          "Maintain rhythm and coordination",
          "Feel heart rate increase",
          "Use arms for balance"
        ],
        "common_mistakes_nl": [
          "Ritme verliezen bij hoger tempo",
          "Compensatie met bovenlichaam",
          "Onregelmatige ademhaling"
        ],
        "common_mistakes_en": [
          "Losing rhythm at higher tempo",
          "Compensating with upper body",
          "Irregular breathing"
        ],
        "alternative_nl": "Met lichte gewichten in handen voor extra uitdaging",
        "alternative_en": "With light weights in hands for extra challenge",
        "animation_instruction_nl": "Snellere knee taps met arm zwaaien, zijdelingse bewegingen, dubbele knee taps",
        "animation_instruction_en": "Faster knee taps with arm swinging, lateral movements, double knee taps"
      },
      "expert": {
        "duration": "60s",
        "sets": 3,
        "reps": 50,
        "description_nl": "High-intensity knee taps met plyometric elementen",
        "description_en": "High-intensity knee taps with plyometric elements",
        "steps_nl": [
          "Begin met explosive knee drives",
          "Voeg jump knee taps toe",
          "Integreer cross-body bewegingen",
          "Combineer met mountain climber elementen",
          "Eindig met sprint-style knee drives"
        ],
        "steps_en": [
          "Begin with explosive knee drives",
          "Add jump knee taps",
          "Integrate cross-body movements",
          "Combine with mountain climber elements",
          "End with sprint-style knee drives"
        ],
        "tips_nl": [
          "Maximale knie hoogte en snelheid",
          "Explosieve bewegingen",
          "Perfecte coördinatie behouden"
        ],
        "tips_en": [
          "Maximum knee height and speed",
          "Explosive movements",
          "Maintain perfect coordination"
        ],
        "common_mistakes_nl": [
          "Overbelasting van knieën",
          "Vorm verliezen voor snelheid",
          "Balans problemen bij hoge intensiteit"
        ],
        "common_mistakes_en": [
          "Overloading knees",
          "Losing form for speed",
          "Balance issues at high intensity"
        ],
        "alternative_nl": "Op zachte ondergrond voor gewrichtsbescherming",
        "alternative_en": "On soft surface for joint protection",
        "animation_instruction_nl": "Explosieve knee drives met sprongen, cross-body bewegingen, mountain climber elementen, sprint-style",
        "animation_instruction_en": "Explosive knee drives with jumps, cross-body movements, mountain climber elements, sprint-style"
      }
    }
  }
];