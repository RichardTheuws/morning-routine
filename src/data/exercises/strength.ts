import { Exercise } from '../types/Exercise';

export const strengthExercises: Exercise[] = [
  {
    "id": "glute-bridge",
    "name_nl": "Glute Bridge",
    "name_en": "Glute Bridge",
    "category": ["Strength", "Glutes", "Core"],
    "goals": ["Build strength", "Reduce back pain"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 10,
        "description_nl": "Kracht oefening voor bilspieren en core",
        "description_en": "Strength exercise for glutes and core",
        "steps_nl": [
          "Lig op rug met knieën gebogen",
          "Voeten plat op grond, heupbreedte uit elkaar",
          "Span bilspieren aan",
          "Til heupen op tot rechte lijn",
          "Houd 2 seconden vast en laat zakken"
        ],
        "steps_en": [
          "Lie on back with knees bent",
          "Feet flat on ground, hip-width apart",
          "Squeeze glutes",
          "Lift hips to straight line",
          "Hold 2 seconds and lower"
        ],
        "tips_nl": [
          "Span bilspieren aan, niet onderrug",
          "Houd core geactiveerd",
          "Beweeg gecontroleerd"
        ],
        "tips_en": [
          "Squeeze glutes, not lower back",
          "Keep core activated",
          "Move controlled"
        ],
        "common_mistakes_nl": [
          "Te hoog tillen (overextensie)",
          "Druk op onderrug",
          "Knieën naar binnen vallen"
        ],
        "common_mistakes_en": [
          "Lifting too high (overextension)",
          "Pressure on lower back",
          "Knees falling inward"
        ],
        "alternative_nl": "Kussen onder hoofd voor comfort",
        "alternative_en": "Pillow under head for comfort",
        "animation_instruction_nl": "Persoon ligt op rug, tilt heupen op tot rechte lijn, bilspieren geactiveerd, gecontroleerde beweging",
        "animation_instruction_en": "Person lies on back, lifts hips to straight line, glutes activated, controlled movement"
      },
      "advanced": {
        "duration": "2m",
        "sets": 2,
        "reps": 15,
        "description_nl": "Uitgebreidere glute bridge met meer uitdaging",
        "description_en": "Extended glute bridge with more challenge",
        "steps_nl": [
          "Voer basis glute bridge uit",
          "Houd eindpositie 5 seconden vast",
          "Voeg single-leg variatie toe",
          "Integreer pulsing bewegingen",
          "Eindig met isometrische hold"
        ],
        "steps_en": [
          "Perform basic glute bridge",
          "Hold end position 5 seconds",
          "Add single-leg variation",
          "Integrate pulsing movements",
          "End with isometric hold"
        ],
        "tips_nl": [
          "Voel maximale bilspier activatie",
          "Behoud perfecte vorm",
          "Gebruik ademhaling voor kracht"
        ],
        "tips_en": [
          "Feel maximum glute activation",
          "Maintain perfect form",
          "Use breathing for strength"
        ],
        "common_mistakes_nl": [
          "Vorm verliezen bij vermoeidheid",
          "Compensatie met andere spieren",
          "Te snelle bewegingen"
        ],
        "common_mistakes_en": [
          "Losing form when fatigued",
          "Compensating with other muscles",
          "Moving too quickly"
        ],
        "alternative_nl": "Voeten op verhoging voor extra range",
        "alternative_en": "Feet on elevation for extra range",
        "animation_instruction_nl": "Geavanceerde glute bridge met 5 seconden hold, single-leg variatie, pulsing bewegingen",
        "animation_instruction_en": "Advanced glute bridge with 5 second hold, single-leg variation, pulsing movements"
      },
      "expert": {
        "duration": "3m",
        "sets": 3,
        "reps": 20,
        "description_nl": "Expert glute bridge met maximale uitdaging",
        "description_en": "Expert glute bridge with maximum challenge",
        "steps_nl": [
          "Begin met weighted glute bridge",
          "Voeg instabiliteit toe met bal",
          "Integreer plyometric bewegingen",
          "Combineer met core rotaties",
          "Eindig met endurance challenge"
        ],
        "steps_en": [
          "Begin with weighted glute bridge",
          "Add instability with ball",
          "Integrate plyometric movements",
          "Combine with core rotations",
          "End with endurance challenge"
        ],
        "tips_nl": [
          "Maximale kracht en controle",
          "Perfecte vorm onder belasting",
          "Functionele kracht ontwikkeling"
        ],
        "tips_en": [
          "Maximum strength and control",
          "Perfect form under load",
          "Functional strength development"
        ],
        "common_mistakes_nl": [
          "Te veel gewicht te vroeg",
          "Instabiliteit niet beheersen",
          "Overbelasting van onderrug"
        ],
        "common_mistakes_en": [
          "Too much weight too early",
          "Not controlling instability",
          "Overloading lower back"
        ],
        "alternative_nl": "Progressieve overload met weerstand band",
        "alternative_en": "Progressive overload with resistance band",
        "animation_instruction_nl": "Expert glute bridge met gewicht, instabiliteit, plyometric bewegingen, core rotaties",
        "animation_instruction_en": "Expert glute bridge with weight, instability, plyometric movements, core rotations"
      }
    }
  }
];