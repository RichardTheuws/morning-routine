# Morning Routine App 🌅

Een privacy-first, open source Progressive Web App (PWA) voor het creëren en volgen van gepersonaliseerde ochtendroutines. Volledig offline werkend, geen account vereist, alle data blijft lokaal op jouw apparaat.

![Morning Routine App](https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

## ✨ Features

### 🎯 **Gepersonaliseerde Routines**
- Kies uit 7+ verschillende doelen (rugklachten, nekpijn, vetverbranding, mobiliteit, etc.)
- 3 niveaus: Beginner, Gevorderd, Expert
- Aanpasbare tijdsduur (5-30 minuten)
- Intelligente oefening-selectie op basis van jouw voorkeuren

### 🎬 **Geavanceerde Animaties**
- **AI-gegenereerde SVG animaties** met biomechanische precisie
- **Video demonstraties** van professionele trainers
- **Spier-activatie visualisatie** - zie welke spieren actief zijn
- **Ademhalingsindicatoren** voor optimale uitvoering
- **Niveau-specifieke timing** en bewegingssnelheid

### 🔒 **Privacy & Offline**
- **Geen account nodig** - start direct
- **Volledig offline** - werkt zonder internetverbinding
- **Lokale data opslag** - alles blijft op jouw apparaat
- **Geen tracking** - geen analytics of data verzameling
- **Open source** - transparante code

### 📱 **Progressive Web App**
- **Installeerbaar** op telefoon, tablet en desktop
- **Responsive design** - werkt op alle schermformaten
- **Offline caching** - laadt snel, ook zonder internet
- **Native app gevoel** - smooth animaties en interacties

### 🌍 **Meertalig**
- **Nederlands** en **Engels** volledig ondersteund
- **Eenvoudig uitbreidbaar** naar andere talen
- **Contextgevoelige vertalingen** voor oefeningen en tips

## 🚀 Quick Start

### Lokaal draaien

```bash
# Clone de repository
git clone https://github.com/jouw-username/morning-routine-app.git
cd morning-routine-app

# Installeer dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in je browser
```

### Productie build

```bash
# Build voor productie
npm run build

# Preview productie build
npm run preview
```

### Deployment

De app is een statische PWA en kan gedeployed worden op:
- **Netlify** (aanbevolen)
- **Vercel**
- **GitHub Pages**
- **Elke statische hosting service**

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type safety en developer experience
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Consistente iconografie

### Build & Development
- **Vite** - Snelle build tool en dev server
- **ESLint** - Code quality en consistency
- **PostCSS** - CSS processing
- **PWA Plugin** - Service worker en manifest generatie

### Animaties & Media
- **Custom SVG Engine** - AI-gegenereerde oefening animaties
- **Video Integration** - Pexels en lokale video ondersteuning
- **Biomechanical Modeling** - Realistische bewegingspatronen

## 📁 Project Structuur

```
src/
├── components/           # React componenten
│   ├── animations/      # Animatie systeem
│   ├── common/          # Herbruikbare UI componenten
│   ├── home/            # Dashboard en hoofdscherm
│   ├── onboarding/      # Setup flow
│   ├── routine/         # Routine uitvoering
│   └── settings/        # Instellingen pagina
├── contexts/            # React contexts (taal, state)
├── data/                # Oefeningen database
├── hooks/               # Custom React hooks
├── services/            # Business logic en AI engines
├── types/               # TypeScript type definities
└── styles/              # Globale CSS
```

## 🎨 Oefeningen Toevoegen

Nieuwe oefeningen kunnen eenvoudig toegevoegd worden in `src/data/exercises.ts`:

```typescript
{
  "id": "nieuwe-oefening",
  "name_nl": "Nederlandse naam",
  "name_en": "English name",
  "category": ["Rug", "Core"],
  "goals": ["Rugklachten verminderen"],
  "levels": {
    "beginner": {
      "duration": "1m",
      "sets": 1,
      "reps": 10,
      "description_nl": "Beschrijving...",
      "description_en": "Description...",
      "steps_nl": ["Stap 1", "Stap 2"],
      "steps_en": ["Step 1", "Step 2"],
      "tips_nl": ["Tip 1"],
      "tips_en": ["Tip 1"],
      "animation_instruction_nl": "Animatie beschrijving...",
      "animation_instruction_en": "Animation description..."
    }
    // ... advanced en expert levels
  }
}
```

## 🤖 AI Animatie Engine

De app gebruikt een geavanceerde AI-engine voor het genereren van oefening animaties:

### Features
- **Biomechanische modeling** - Realistische gewrichtslimieten
- **Spier-activatie mapping** - Visuele feedback van actieve spieren
- **Ademhaling synchronisatie** - Timing met in/uitademen
- **Niveau aanpassingen** - Snelheid en complexiteit per niveau
- **Pattern recognition** - Automatische bewegingsherkenning

### Uitbreiden
```typescript
// Nieuwe bewegingspatronen toevoegen in AIAnimationEngine.ts
private generateCustomMotion(exerciseType: string): ExerciseMotion {
  // Implementeer nieuwe bewegingslogica
}
```

## 🌍 Vertalingen Toevoegen

Nieuwe talen kunnen toegevoegd worden in `src/contexts/LanguageContext.tsx`:

```typescript
const translations = {
  nl: { /* Nederlandse vertalingen */ },
  en: { /* English translations */ },
  de: { /* Deutsche Übersetzungen */ }, // Nieuwe taal
  // ...
};
```

## 🔧 Configuratie

### PWA Instellingen
PWA configuratie in `vite.config.ts` en `public/manifest.json`:

```typescript
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}']
  }
})
```

### Tailwind Aanpassingen
Styling aanpassen in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#059669', // Emerald-600
        // Voeg custom kleuren toe
      }
    }
  }
}
```

## 🤝 Contributing

We verwelkomen bijdragen! Hier is hoe je kunt helpen:

### 🐛 Bug Reports
- Gebruik GitHub Issues
- Beschrijf het probleem duidelijk
- Voeg screenshots toe indien mogelijk
- Vermeld browser/device informatie

### ✨ Feature Requests
- Open een GitHub Issue met label "enhancement"
- Beschrijf de gewenste functionaliteit
- Leg uit waarom het nuttig zou zijn
- Voeg mockups toe indien mogelijk

### 💻 Code Contributions

1. **Fork** de repository
2. **Clone** je fork lokaal
3. **Maak een branch** voor je feature: `git checkout -b feature/nieuwe-functie`
4. **Commit** je wijzigingen: `git commit -m 'Voeg nieuwe functie toe'`
5. **Push** naar je branch: `git push origin feature/nieuwe-functie`
6. **Open een Pull Request**

### 📝 Development Guidelines

- **TypeScript** - Gebruik strikte typing
- **ESLint** - Volg de code style regels
- **Componenten** - Houd ze klein en herbruikbaar
- **Tests** - Voeg tests toe voor nieuwe functionaliteit
- **Documentatie** - Update README en code comments

## 📄 Licentie

Dit project is gelicenseerd onder de **MIT License** - zie het [LICENSE](LICENSE) bestand voor details.

### Wat betekent dit?
- ✅ **Commercieel gebruik** toegestaan
- ✅ **Modificatie** toegestaan  
- ✅ **Distributie** toegestaan
- ✅ **Private gebruik** toegestaan
- ❗ **Licentie en copyright** moeten behouden blijven

## 🙏 Acknowledgments

- **Pexels** - Voor de hoogwaardige oefening video's
- **Lucide** - Voor de prachtige iconenset
- **Tailwind CSS** - Voor het geweldige styling framework
- **React Community** - Voor de uitstekende documentatie en tools

## 📞 Contact & Support

- **GitHub Issues** - Voor bugs en feature requests
- **Discussions** - Voor vragen en community support
- **Email** - [jouw-email@example.com] voor directe vragen

## 🗺️ Roadmap

### Versie 1.1 (Q2 2024)
- [ ] **Meer oefeningen** - Uitbreiding naar 50+ oefeningen
- [ ] **Custom routines** - Gebruikers kunnen eigen routines maken
- [ ] **Progress tracking** - Geavanceerde voortgang analytics
- [ ] **Social features** - Routines delen (optioneel)

### Versie 1.2 (Q3 2024)
- [ ] **AI Coach** - Intelligente feedback op vorm
- [ ] **Wearable integration** - Apple Watch, Fitbit ondersteuning
- [ ] **Voice guidance** - Audio instructies tijdens oefeningen
- [ ] **Accessibility** - Screen reader en keyboard navigation

### Versie 2.0 (Q4 2024)
- [ ] **3D Animaties** - Three.js gebaseerde 3D demonstraties
- [ ] **AR Mode** - Augmented reality oefening overlay
- [ ] **Machine Learning** - Personalized routine optimization
- [ ] **Multi-platform** - Native iOS en Android apps

---

**Gemaakt met ❤️ voor een gezondere wereld**

*Morning Routine App - Start elke dag met energie en focus*