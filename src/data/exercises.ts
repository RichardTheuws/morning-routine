import { Exercise } from '../types/Exercise';

export const exercises: Exercise[] = [
  {
    "id": "cat-cow-stretch",
    "name_nl": "Cat-Cow Stretch",
    "name_en": "Cat-Cow Stretch",
    "category": ["Rug", "Nek", "Mobiliteit"],
    "goals": ["Rugklachten verminderen", "Mobiliteit", "Opwarmen"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 8,
        "description_nl": "Rustige mobiliteitsstretch voor rug en nek.",
        "description_en": "Gentle mobility stretch for back and neck.",
        "steps_nl": [
          "Ga op handen en knieën zitten, handen onder schouders, knieën onder heupen.",
          "Adem in: maak je rug hol, hoofd omhoog (Koe).",
          "Adem uit: maak je rug bol, kin naar borst (Kat).",
          "Herhaal rustig, 8 keer."
        ],
        "steps_en": [
          "Get on all fours, hands under shoulders, knees under hips.",
          "Inhale: arch your back, head up (Cow).",
          "Exhale: round your back, chin to chest (Cat).",
          "Repeat slowly, 8 times."
        ],
        "tips_nl": ["Beweeg traag en vloeiend.", "Niet forceren.", "Focus op ademhaling."],
        "tips_en": ["Move slowly and smoothly.", "Don't force.", "Focus on your breathing."],
        "common_mistakes_nl": ["Te snel bewegen.", "Te veel druk op polsen."],
        "common_mistakes_en": ["Moving too fast.", "Too much pressure on wrists."],
        "alternative_nl": "Doe de oefening zittend op een stoel met dezelfde beweging.",
        "alternative_en": "Perform the movement seated on a chair if necessary.",
        "animation_instruction_nl": "Lijntekening toont vloeiende overgang van holle naar bolle rug. Highlight rugcurve.",
        "animation_instruction_en": "Line drawing shows smooth transition from arched to rounded back. Highlight spine curve."
      },
      "advanced": {
        "duration": "2m",
        "sets": 1,
        "reps": 12,
        "description_nl": "Vloeiender uitvoeren, eventueel met kleine heupbewegingen.",
        "description_en": "Perform more fluidly, optionally add small hip movements.",
        "steps_nl": [
          "Start als beginner.",
          "Beweeg vloeiender, eventueel heupen licht meebewegen.",
          "Focus op diepe ademhaling."
        ],
        "steps_en": [
          "Start as beginner.",
          "Move more fluidly, optionally add slight hip motion.",
          "Focus on deep breathing."
        ],
        "tips_nl": ["Synchroniseer beweging en ademhaling."],
        "tips_en": ["Synchronize movement and breath."],
        "common_mistakes_nl": ["Beweging te oppervlakkig, niet op ademhaling letten."],
        "common_mistakes_en": ["Movement too shallow, not focusing on breath."],
        "alternative_nl": "Oefen op ellebogen als polsen gevoelig zijn.",
        "alternative_en": "Try on elbows if wrists are sensitive.",
        "animation_instruction_nl": "Snellere flow, ademhaling zichtbaar gemaakt (wolkje/kleuren).",
        "animation_instruction_en": "Faster flow, breathing illustrated (clouds/colors)."
      },
      "expert": {
        "duration": "3m",
        "sets": 1,
        "reps": 20,
        "description_nl": "Combineer met plankpositie en dynamische yoga-flow.",
        "description_en": "Combine with plank and dynamic yoga flow.",
        "steps_nl": [
          "Start in plank, beweeg naar Cat-Cow.",
          "Wissel af met Downward Dog voor dynamiek.",
          "Herhaal in een snelle, gecontroleerde flow."
        ],
        "steps_en": [
          "Start in plank, move into Cat-Cow.",
          "Alternate with Downward Dog for more dynamics.",
          "Repeat in a fast, controlled flow."
        ],
        "tips_nl": ["Blijf op houding letten.", "Laat techniek niet verslappen."],
        "tips_en": ["Keep an eye on posture.", "Don't let technique slip."],
        "common_mistakes_nl": ["Slordige bewegingen door te hoge snelheid."],
        "common_mistakes_en": ["Sloppy movements due to too much speed."],
        "alternative_nl": "Langzamer uitvoeren indien nodig.",
        "alternative_en": "Perform more slowly if necessary.",
        "animation_instruction_nl": "Gecombineerde flow-animatie, highlight overgang plank-cat-cow-dog.",
        "animation_instruction_en": "Combined flow animation, highlight plank-cat-cow-dog transition."
      }
    }
  },
  {
    "id": "bird-dog",
    "name_nl": "Bird-Dog",
    "name_en": "Bird-Dog",
    "category": ["Rug", "Core", "Mobiliteit"],
    "goals": ["Rugklachten verminderen", "Core versterken", "Stabiliteit"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 8,
        "description_nl": "Stabiliteitsoefening voor de rug en romp.",
        "description_en": "Stability exercise for back and core.",
        "steps_nl": [
          "Ga op handen en knieën zitten.",
          "Strek rechterarm naar voren en linkerbeen naar achteren.",
          "Houd even vast, keer terug naar start.",
          "Wissel van kant. Herhaal per zijde."
        ],
        "steps_en": [
          "Get on all fours.",
          "Extend right arm forward and left leg back.",
          "Hold for a moment, return to start.",
          "Switch sides. Repeat per side."
        ],
        "tips_nl": ["Span buikspieren aan.", "Beweeg rustig en gecontroleerd."],
        "tips_en": ["Engage your core.", "Move slowly and controlled."],
        "common_mistakes_nl": ["Rug te hol/bol maken.", "Te snel wisselen."],
        "common_mistakes_en": ["Arching/rounding the back too much.", "Switching too fast."],
        "alternative_nl": "Alleen arm of alleen been strekken bij klachten.",
        "alternative_en": "Only extend arm or leg if needed.",
        "animation_instruction_nl": "Persoon op handen/knieën, om en om arm en been strekken, highlight stabiliteit.",
        "animation_instruction_en": "Person on all fours, alternate extending arm and leg, highlight stability."
      },
      "advanced": {
        "duration": "2m",
        "sets": 1,
        "reps": 12,
        "description_nl": "Voer beweging vloeiender en met langere houdmomenten uit.",
        "description_en": "Perform more fluidly and hold longer.",
        "steps_nl": [
          "Voer als beginner uit.",
          "Houd 3 seconden vast per strekking.",
          "Probeer bekken zo stabiel mogelijk te houden."
        ],
        "steps_en": [
          "Perform as beginner.",
          "Hold each extension for 3 seconds.",
          "Try to keep pelvis as stable as possible."
        ],
        "tips_nl": ["Niet wiebelen, focus op balans.", "Kijk omlaag."],
        "tips_en": ["Avoid wobbling, focus on balance.", "Look down."],
        "common_mistakes_nl": ["Beweging te snel, verlies van balans."],
        "common_mistakes_en": ["Moving too fast, losing balance."],
        "alternative_nl": "Voer met steun van kussen onder knieën uit.",
        "alternative_en": "Support knees with cushion if needed.",
        "animation_instruction_nl": "Langzamere animatie, focus op stabiel midden.",
        "animation_instruction_en": "Slower animation, focus on stable core."
      },
      "expert": {
        "duration": "3m",
        "sets": 1,
        "reps": 16,
        "description_nl": "Dynamische flow: voeg push-up toe na elke Bird-Dog.",
        "description_en": "Dynamic flow: add a push-up after each Bird-Dog.",
        "steps_nl": [
          "Uitvoeren als advanced.",
          "Na iedere Bird-Dog: voer een push-up uit.",
          "Blijf wisselen van zijde."
        ],
        "steps_en": [
          "Perform as advanced.",
          "After each Bird-Dog: perform a push-up.",
          "Keep alternating sides."
        ],
        "tips_nl": ["Techniek blijft belangrijk, niet haasten."],
        "tips_en": ["Technique stays important, don't rush."],
        "common_mistakes_nl": ["Push-up te snel of te diep."],
        "common_mistakes_en": ["Push-up too fast or too deep."],
        "alternative_nl": "Doe push-up op knieën.",
        "alternative_en": "Do push-up on knees.",
        "animation_instruction_nl": "Animatie wisselt Bird-Dog met push-up, duidelijke overgangen.",
        "animation_instruction_en": "Animation alternates Bird-Dog with push-up, clear transitions."
      }
    }
  },
  {
    "id": "lying-knee-to-chest",
    "name_nl": "Liggende knie-naar-borst stretch",
    "name_en": "Lying Knee-to-Chest Stretch",
    "category": ["Rug", "Mobiliteit", "Ontspanning"],
    "goals": ["Rug ontspannen", "Mobiliteit verbeteren", "Voor het slapengaan"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 6,
        "description_nl": "Rustige stretch voor de onderrug.",
        "description_en": "Gentle stretch for the lower back.",
        "steps_nl": [
          "Ga op je rug liggen, knieën gebogen, voeten plat op de vloer.",
          "Breng één knie langzaam richting borst, houd met beide handen vast.",
          "Houd 10 seconden vast, wissel van been."
        ],
        "steps_en": [
          "Lie on your back, knees bent, feet flat on the floor.",
          "Slowly bring one knee towards your chest, hold with both hands.",
          "Hold for 10 seconds, switch legs."
        ],
        "tips_nl": ["Ontspan schouders en nek.", "Adem rustig door."],
        "tips_en": ["Relax shoulders and neck.", "Breathe calmly."],
        "common_mistakes_nl": ["Been te ver doortrekken.", "Rug van de grond trekken."],
        "common_mistakes_en": ["Pulling leg too far.", "Lifting back off the floor."],
        "alternative_nl": "Beide knieën tegelijk naar de borst trekken.",
        "alternative_en": "Pull both knees to the chest if comfortable.",
        "animation_instruction_nl": "Lijntekening: persoon op rug, knie naar borst, om en om.",
        "animation_instruction_en": "Line drawing: person lying, knee to chest, alternating sides."
      },
      "advanced": {
        "duration": "2m",
        "sets": 1,
        "reps": 8,
        "description_nl": "Dynamische stretch: beide knieën tegelijk richting borst.",
        "description_en": "Dynamic stretch: both knees to chest together.",
        "steps_nl": [
          "Voer uit als beginner.",
          "Breng beide knieën tegelijk naar de borst, houd even vast.",
          "Rol lichtjes heen en weer voor extra ontspanning."
        ],
        "steps_en": [
          "Perform as beginner.",
          "Bring both knees to chest together, hold briefly.",
          "Rock gently side to side for extra relaxation."
        ],
        "tips_nl": ["Niet forceren, bewegen op eigen tempo."],
        "tips_en": ["Don't force, move at your own pace."],
        "common_mistakes_nl": ["Heupen te hoog optillen."],
        "common_mistakes_en": ["Lifting hips too high."],
        "alternative_nl": "Beweging kleiner houden bij pijn.",
        "alternative_en": "Make movement smaller if experiencing pain.",
        "animation_instruction_nl": "Beide knieën naar borst, lichte rolbeweging zichtbaar.",
        "animation_instruction_en": "Both knees to chest, slight rocking visible."
      },
      "expert": {
        "duration": "3m",
        "sets": 2,
        "reps": 10,
        "description_nl": "Afwisselend één been en beide benen, meer nadruk op ritmisch bewegen.",
        "description_en": "Alternating one and both legs, focus on rhythmic movement.",
        "steps_nl": [
          "Wissel af tussen één knie en beide knieën naar de borst.",
          "Beweeg in een rustig ritme, houd steeds kort vast.",
          "Adem diep in en uit tijdens de stretch."
        ],
        "steps_en": [
          "Alternate between one knee and both knees to chest.",
          "Move at a steady rhythm, hold briefly each time.",
          "Breathe deeply in and out during the stretch."
        ],
        "tips_nl": ["Let op soepele overgangen.", "Niet forceren."],
        "tips_en": ["Ensure smooth transitions.", "Don't force."],
        "common_mistakes_nl": ["Overhaaste bewegingen."],
        "common_mistakes_en": ["Moving too hastily."],
        "alternative_nl": "Blijf bij alleen één knie als beide niet prettig is.",
        "alternative_en": "Stick to one knee only if both is uncomfortable.",
        "animation_instruction_nl": "Dynamische animatie afwisselend één en beide knieën naar borst.",
        "animation_instruction_en": "Dynamic animation alternating one and both knees to chest."
      }
    }
  },
  {
    "id": "neck-rotations",
    "name_nl": "Nekrotaties",
    "name_en": "Neck Rotations",
    "category": ["Nek", "Schouders", "Mobiliteit"],
    "goals": ["Nekpijn verminderen", "Mobiliteit", "Ontspanning"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 5,
        "description_nl": "Rustige draaiingen van de nek om stijfheid te verminderen.",
        "description_en": "Gentle neck rotations to reduce stiffness.",
        "steps_nl": [
          "Zit of sta rechtop, schouders laag.",
          "Draai langzaam je hoofd van oor naar oor.",
          "Maak grote, zachte cirkels met de kin richting borst.",
          "Doe 5 cirkels linksom, dan 5 rechtsom."
        ],
        "steps_en": [
          "Sit or stand upright, shoulders relaxed.",
          "Slowly rotate your head from ear to ear.",
          "Make large, gentle circles, chin toward chest.",
          "Do 5 circles left, then 5 right."
        ],
        "tips_nl": ["Beweeg langzaam, geen scherpe pijn.", "Houd schouders ontspannen."],
        "tips_en": ["Move slowly, stop with any sharp pain.", "Keep shoulders relaxed."],
        "common_mistakes_nl": ["Te snel draaien.", "Schouders optrekken."],
        "common_mistakes_en": ["Rotating too fast.", "Lifting shoulders."],
        "alternative_nl": "Kleinere cirkels maken bij pijn of stijfheid.",
        "alternative_en": "Make smaller circles if experiencing pain or stiffness.",
        "animation_instruction_nl": "Lijntekening hoofd, langzaam ronddraaiend, pijlen geven richting aan.",
        "animation_instruction_en": "Line drawing of head, slowly rotating, arrows indicate direction."
      },
      "advanced": {
        "duration": "2m",
        "sets": 1,
        "reps": 8,
        "description_nl": "Vloeiender, grotere bewegingen, eventueel met lichte schouderrol na elke cirkel.",
        "description_en": "More fluid, larger circles, optional light shoulder roll after each rotation.",
        "steps_nl": [
          "Voer de basisbeweging uit.",
          "Maak de cirkels geleidelijk groter.",
          "Voeg na elke cirkel een schouderrol toe."
        ],
        "steps_en": [
          "Perform the basic movement.",
          "Gradually make the circles larger.",
          "Add a shoulder roll after each circle."
        ],
        "tips_nl": ["Volg het tempo van je ademhaling.", "Kijk vooruit na elke rotatie."],
        "tips_en": ["Follow the pace of your breath.", "Look ahead after each rotation."],
        "common_mistakes_nl": ["Trekken aan de nekspieren."],
        "common_mistakes_en": ["Pulling on neck muscles."],
        "alternative_nl": "Doe afwisselend links/rechts alleen als volledig draaien niet prettig is.",
        "alternative_en": "Alternate only left/right if full rotations are uncomfortable.",
        "animation_instruction_nl": "Hoofd maakt grotere, vloeiende cirkels, schouderrol zichtbaar.",
        "animation_instruction_en": "Head makes larger, fluid circles, shoulder roll visible."
      },
      "expert": {
        "duration": "3m",
        "sets": 1,
        "reps": 12,
        "description_nl": "Dynamische flow, combineren met diepe ademhaling en stretch van armen boven hoofd.",
        "description_en": "Dynamic flow, combine with deep breathing and stretching arms overhead.",
        "steps_nl": [
          "Start als advanced.",
          "Na elke nekcirkel, strek beide armen boven je hoofd en adem diep in.",
          "Laat armen zakken en ontspan."
        ],
        "steps_en": [
          "Start as advanced.",
          "After each neck circle, stretch both arms overhead and inhale deeply.",
          "Lower arms and relax."
        ],
        "tips_nl": ["Blijf ademhaling en beweging combineren.", "Focus op ontspanning."],
        "tips_en": ["Keep combining breath and movement.", "Focus on relaxation."],
        "common_mistakes_nl": ["Armen snel laten vallen, te veel spanning vasthouden."],
        "common_mistakes_en": ["Dropping arms too quickly, holding too much tension."],
        "alternative_nl": "Armen op schoot houden als strekken lastig is.",
        "alternative_en": "Keep arms on lap if stretching is difficult.",
        "animation_instruction_nl": "Hoofd rotatie met armbeweging in slow-motion.",
        "animation_instruction_en": "Head rotation with arm movement in slow-motion."
      }
    }
  },
  {
    "id": "shoulder-rolls",
    "name_nl": "Schouderrollen",
    "name_en": "Shoulder Rolls",
    "category": ["Schouders", "Nek", "Mobiliteit"],
    "goals": ["Spanning loslaten", "Opwarmen", "Schouderklachten voorkomen"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 10,
        "description_nl": "Langzame grote cirkels met beide schouders naar voren en naar achteren.",
        "description_en": "Slow, large circles with both shoulders forward and backward.",
        "steps_nl": [
          "Sta of zit rechtop.",
          "Haal schouders omhoog richting oren.",
          "Draai ze langzaam naar achter en omlaag, dan naar voren en omhoog.",
          "Herhaal 10x vooruit, 10x achteruit."
        ],
        "steps_en": [
          "Stand or sit upright.",
          "Lift shoulders up toward ears.",
          "Roll them slowly back and down, then forward and up.",
          "Repeat 10x forward, 10x backward."
        ],
        "tips_nl": ["Maak de cirkel zo groot mogelijk.", "Ontspan de nek."],
        "tips_en": ["Make the circle as big as possible.", "Relax the neck."],
        "common_mistakes_nl": ["Te kleine bewegingen.", "Te snel uitvoeren."],
        "common_mistakes_en": ["Movements too small.", "Going too fast."],
        "alternative_nl": "Één schouder tegelijk als beide lastig is.",
        "alternative_en": "One shoulder at a time if both is difficult.",
        "animation_instruction_nl": "Twee schouders maken simultaan grote cirkels, pijlen geven richting aan.",
        "animation_instruction_en": "Both shoulders make large circles simultaneously, arrows indicate direction."
      },
      "advanced": {
        "duration": "2m",
        "sets": 2,
        "reps": 15,
        "description_nl": "Grotere cirkels, afwisselend één schouder tegelijk.",
        "description_en": "Larger circles, alternating one shoulder at a time.",
        "steps_nl": [
          "Begin als beginner.",
          "Maak afwisselend alleen met linker- of rechterschouder een cirkel.",
          "Verhoog tempo na 10 herhalingen."
        ],
        "steps_en": [
          "Start as beginner.",
          "Alternate making circles with left and right shoulder.",
          "Increase speed after 10 reps."
        ],
        "tips_nl": ["Let op symmetrie, beide schouders evenveel rollen."],
        "tips_en": ["Ensure symmetry, roll both shoulders equally."],
        "common_mistakes_nl": ["Over de pijn heen bewegen."],
        "common_mistakes_en": ["Moving through pain."],
        "alternative_nl": "Tempo omlaag als het zwaar wordt.",
        "alternative_en": "Lower the pace if it gets too difficult.",
        "animation_instruction_nl": "Eerst beide tegelijk, dan om en om, tempo zichtbaar versnellen.",
        "animation_instruction_en": "First both together, then alternating, speed visibly increases."
      },
      "expert": {
        "duration": "3m",
        "sets": 3,
        "reps": 20,
        "description_nl": "Combineren met nekrotaties en armzwaaien voor volledige schouderactivatie.",
        "description_en": "Combine with neck rotations and arm swings for full shoulder activation.",
        "steps_nl": [
          "Voer advanced uit.",
          "Na elke 5 cirkels: hoofd langzaam draaien en armen zijwaarts zwaaien.",
          "Herhaal cyclus tot 20 herhalingen."
        ],
        "steps_en": [
          "Perform advanced.",
          "After every 5 circles: slowly rotate head and swing arms sideways.",
          "Repeat cycle for 20 reps."
        ],
        "tips_nl": ["Focus op vloeiende overgangen."],
        "tips_en": ["Focus on smooth transitions."],
        "common_mistakes_nl": ["Bewegingen worden te slordig na vermoeidheid."],
        "common_mistakes_en": ["Movements become sloppy when tired."],
        "alternative_nl": "Minder armzwaaien indien schouderklachten.",
        "alternative_en": "Fewer arm swings if shoulder pain occurs.",
        "animation_instruction_nl": "Animatie toont combinatiebewegingen met arm- en nekactie.",
        "animation_instruction_en": "Animation shows combination moves with arm and neck action."
      }
    }
  },
  {
    "id": "jumping-jacks",
    "name_nl": "Jumping Jacks",
    "name_en": "Jumping Jacks",
    "category": ["Cardio", "Vetverbranding", "Opwarmen"],
    "goals": ["Vetverbranding", "Conditie verbeteren", "Energie boost"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 20,
        "description_nl": "Klassieke cardio-oefening voor opwarming en vetverbranding.",
        "description_en": "Classic cardio exercise for warm-up and fat burning.",
        "steps_nl": [
          "Sta rechtop, armen langs je lichaam, voeten bij elkaar.",
          "Spring omhoog en spreid benen, breng armen boven hoofd.",
          "Spring terug naar startpositie.",
          "Herhaal in een gelijkmatig tempo."
        ],
        "steps_en": [
          "Stand upright, arms at sides, feet together.",
          "Jump up spreading legs, bring arms overhead.",
          "Jump back to starting position.",
          "Repeat at a steady pace."
        ],
        "tips_nl": ["Land zacht op voorvoeten.", "Houd tempo rustig."],
        "tips_en": ["Land softly on the balls of your feet.", "Keep pace moderate."],
        "common_mistakes_nl": ["Te hard landen.", "Armen niet volledig boven hoofd."],
        "common_mistakes_en": ["Landing too hard.", "Not bringing arms fully overhead."],
        "alternative_nl": "Stap in plaats van springen (Low-impact).",
        "alternative_en": "Step instead of jumping (Low-impact).",
        "animation_instruction_nl": "Lijntekening springend figuur, armen/benen spreiden en sluiten.",
        "animation_instruction_en": "Line drawing figure jumping, arms/legs spreading and closing."
      },
      "advanced": {
        "duration": "2m",
        "sets": 1,
        "reps": 40,
        "description_nl": "Sneller tempo, focus op explosieve bewegingen.",
        "description_en": "Faster pace, focus on explosive movements.",
        "steps_nl": [
          "Voer uit als beginner.",
          "Verhoog het tempo geleidelijk.",
          "Focus op explosieve sprongen."
        ],
        "steps_en": [
          "Perform as beginner.",
          "Gradually increase the pace.",
          "Focus on explosive jumps."
        ],
        "tips_nl": ["Beweeg van kerncentrum.", "Blijf ademhalen."],
        "tips_en": ["Move from your core.", "Keep breathing."],
        "common_mistakes_nl": ["Te moe worden, techniek verslappen."],
        "common_mistakes_en": ["Getting too tired, letting technique slip."],
        "alternative_nl": "Pauzes tussendoor nemen indien nodig.",
        "alternative_en": "Take breaks in between if needed.",
        "animation_instruction_nl": "Snellere animatie, emphasis op explosieve beweging.",
        "animation_instruction_en": "Faster animation, emphasis on explosive movement."
      },
      "expert": {
        "duration": "3m",
        "sets": 2,
        "reps": 30,
        "description_nl": "Geavanceerde variaties: X-Jacks, squat-jacks combinaties.",
        "description_en": "Advanced variations: X-Jacks, squat-jack combinations.",
        "steps_nl": [
          "Start als advanced.",
          "Voeg squat toe: spring naar squat-positie, dan jumping jack.",
          "Wissel af met X-pattern (kruisen van armen/benen)."
        ],
        "steps_en": [
          "Start as advanced.",
          "Add squat: jump to squat position, then jumping jack.",
          "Alternate with X-pattern (crossing arms/legs)."
        ],
        "tips_nl": ["Blijf gecontroleerd, ook bij variaties."],
        "tips_en": ["Stay controlled, even with variations."],
        "common_mistakes_nl": ["Variaties te ingewikkeld maken."],
        "common_mistakes_en": ["Making variations too complex."],
        "alternative_nl": "Blijf bij basis jumping jacks.",
        "alternative_en": "Stick to basic jumping jacks.",
        "animation_instruction_nl": "Animatie toont variaties: squat-jack en X-pattern.",
        "animation_instruction_en": "Animation shows variations: squat-jack and X-pattern."
      }
    }
  },
  {
    "id": "glute-bridge",
    "name_nl": "Bruggetje (Glute bridge)",
    "name_en": "Glute Bridge",
    "category": ["Rug", "Core", "Benen"],
    "goals": ["Rug versterken", "Core activeren", "Heupmobiliteit"],
    "levels": {
      "beginner": {
        "duration": "1m",
        "sets": 1,
        "reps": 10,
        "description_nl": "Actieve oefening voor onderrug, billen en core.",
        "description_en": "Active exercise for lower back, glutes, and core.",
        "steps_nl": [
          "Ga op je rug liggen, knieën gebogen, voeten op heupbreedte plat op de grond.",
          "Plaats je armen ontspannen naast je lichaam.",
          "Duw je heupen langzaam omhoog tot je lichaam een rechte lijn vormt van schouders tot knieën.",
          "Houd bovenin 2 seconden vast, span je billen goed aan.",
          "Laat de heupen rustig weer zakken naar de grond."
        ],
        "steps_en": [
          "Lie on your back, knees bent, feet hip-width apart and flat on the floor.",
          "Place your arms relaxed at your sides.",
          "Slowly push your hips up until your body forms a straight line from shoulders to knees.",
          "Hold at the top for 2 seconds, squeezing your glutes.",
          "Lower your hips gently back to the floor."
        ],
        "tips_nl": [
          "Duw vanuit je hielen, niet vanuit de tenen.",
          "Span je buikspieren licht aan tijdens de beweging.",
          "Zorg dat je knieën niet naar buiten vallen."
        ],
        "tips_en": [
          "Push through your heels, not your toes.",
          "Lightly engage your core during the movement.",
          "Keep your knees from splaying outwards."
        ],
        "common_mistakes_nl": [
          "Heupen niet volledig omhoog brengen.",
          "Rug te hol maken bovenin.",
          "Te snel bewegen zonder controle."
        ],
        "common_mistakes_en": [
          "Not lifting hips high enough.",
          "Overarching the back at the top.",
          "Moving too quickly without control."
        ],
        "alternative_nl": "Plaats een kussen onder je onderrug als extra steun, of maak de beweging kleiner bij rugklachten.",
        "alternative_en": "Place a pillow under your lower back for extra support, or make the movement smaller if you have back issues.",
        "animation_instruction_nl": "Lijntekening van persoon die heupen rustig omhoog en omlaag duwt, met focus op rechte lijn van schouders tot knieën. Highlight billen en core bovenin.",
        "animation_instruction_en": "Line drawing of a person gently lifting and lowering the hips, emphasizing a straight line from shoulders to knees. Highlight glutes and core at the top."
      },
      "advanced": {
        "duration": "2m",
        "sets": 2,
        "reps": 12,
        "description_nl": "Voer de oefening langzamer en met extra spanning bovenin uit.",
        "description_en": "Perform more slowly with extra squeeze at the top.",
        "steps_nl": [
          "Voer de oefening uit zoals bij beginner.",
          "Houd bovenin elke herhaling 5 seconden vast en knijp je billen goed samen.",
          "Laat je billen volledig tot de vloer zakken tussen herhalingen.",
          "Duw je heupen krachtig omhoog en controleer de neerwaartse beweging."
        ],
        "steps_en": [
          "Perform the exercise as described for beginner.",
          "Hold at the top of each rep for 5 seconds, squeezing your glutes.",
          "Let your glutes touch the floor fully between repetitions.",
          "Push hips up powerfully and control the downward motion."
        ],
        "tips_nl": [
          "Voel de spanning in de hamstrings en billen.",
          "Houd de schouders op de grond."
        ],
        "tips_en": [
          "Feel the tension in your hamstrings and glutes.",
          "Keep your shoulders on the ground."
        ],
        "common_mistakes_nl": [
          "Rug te hol trekken bovenin.",
          "Heupen niet volledig laten zakken."
        ],
        "common_mistakes_en": [
          "Overarching back at the top.",
          "Not lowering hips fully between reps."
        ],
        "alternative_nl": "Plaats je voeten iets verder uit elkaar voor meer stabiliteit.",
        "alternative_en": "Place your feet slightly further apart for more stability.",
        "animation_instruction_nl": "Langzame beweging, extra lange houdmomenten zichtbaar bovenin. Highlight het aanspannen van de billen.",
        "animation_instruction_en": "Slow movement, extra-long holds visible at the top. Highlight squeezing of the glutes."
      },
      "expert": {
        "duration": "3m",
        "sets": 2,
        "reps": 16,
        "description_nl": "Eenbenige glute bridge (om en om), extra focus op stabiliteit.",
        "description_en": "Single-leg glute bridge (alternate legs), extra focus on stability.",
        "steps_nl": [
          "Voer de oefening uit als bij advanced.",
          "Til één voet van de grond, strek het been uit terwijl je de heupen omhoog duwt.",
          "Houd bovenin 2 seconden vast, houd heupen recht.",
          "Laat langzaam zakken, wissel van been na elke herhaling of set.",
          "Let op dat je bekken niet scheef zakt."
        ],
        "steps_en": [
          "Perform the exercise as in advanced.",
          "Lift one foot off the ground, extend the leg while lifting hips.",
          "Hold at the top for 2 seconds, keep hips level.",
          "Lower slowly, switch legs after each rep or set.",
          "Ensure your pelvis doesn't drop to one side."
        ],
        "tips_nl": [
          "Zorg dat beide heupen op gelijke hoogte blijven.",
          "Blijf rustig ademen en beweeg gecontroleerd."
        ],
        "tips_en": [
          "Keep both hips at equal height.",
          "Continue breathing calmly and move with control."
        ],
        "common_mistakes_nl": [
          "Heupen zakken naar één kant.",
          "Beweging wordt te snel uitgevoerd.",
          "Rug wordt hol getrokken bij vermoeidheid."
        ],
        "common_mistakes_en": [
          "Hips drop to one side.",
          "Movement is performed too quickly.",
          "Back is arched at the top when tired."
        ],
        "alternative_nl": "Blijf beide voeten op de grond als het te zwaar wordt.",
        "alternative_en": "Keep both feet on the floor if it becomes too difficult.",
        "animation_instruction_nl": "Persoon voert beurtelings eenbenige glute bridge uit, met accent op stabiele heupen en langzame, gecontroleerde beweging.",
        "animation_instruction_en": "Person performs alternating single-leg glute bridge, emphasizing stable hips and slow, controlled movement."
      }
    }
  }
];