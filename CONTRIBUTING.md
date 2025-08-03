# Contributing to Morning Routine App

Bedankt voor je interesse in het bijdragen aan Morning Routine App! 🎉

## 🚀 Quick Start voor Contributors

### Development Setup

1. **Fork en clone de repository**
```bash
git clone https://github.com/jouw-username/morning-routine-app.git
cd morning-routine-app
```

2. **Installeer dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open http://localhost:5173**

## 📋 Types of Contributions

### 🐛 Bug Fixes
- Fix broken functionality
- Improve error handling
- Performance optimizations
- Accessibility improvements

### ✨ New Features
- New exercise types
- Animation improvements
- UI/UX enhancements
- Language translations

### 📚 Documentation
- README improvements
- Code comments
- API documentation
- Tutorial content

### 🎨 Design
- UI/UX improvements
- Animation enhancements
- Responsive design fixes
- Accessibility improvements

## 🛠️ Development Guidelines

### Code Style
- **TypeScript** - Use strict typing
- **ESLint** - Follow configured rules
- **Prettier** - Auto-format on save
- **Conventional Commits** - Use semantic commit messages

### Component Guidelines
```typescript
// ✅ Good - Small, focused component
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ❌ Avoid - Large, multi-purpose components
```

### File Organization
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── animations/      # Animation system
│   └── [feature]/       # Feature-specific components
├── hooks/               # Custom React hooks
├── services/            # Business logic
├── types/               # TypeScript definitions
└── utils/               # Helper functions
```

## 🎯 Adding New Exercises

### 1. Exercise Data Structure
Add to `src/data/exercises.ts`:

```typescript
{
  "id": "unique-exercise-id",
  "name_nl": "Nederlandse naam",
  "name_en": "English name",
  "category": ["Rug", "Core", "Mobiliteit"],
  "goals": ["Rugklachten verminderen", "Core versterken"],
  "levels": {
    "beginner": {
      "duration": "1m",
      "sets": 1,
      "reps": 10,
      "description_nl": "Korte beschrijving van de oefening",
      "description_en": "Short description of the exercise",
      "steps_nl": [
        "Stap 1: Duidelijke instructie",
        "Stap 2: Volgende actie",
        "Stap 3: Afronding"
      ],
      "steps_en": [
        "Step 1: Clear instruction",
        "Step 2: Next action", 
        "Step 3: Completion"
      ],
      "tips_nl": [
        "Belangrijk punt om te onthouden",
        "Veiligheidstip"
      ],
      "tips_en": [
        "Important point to remember",
        "Safety tip"
      ],
      "common_mistakes_nl": [
        "Veelgemaakte fout 1",
        "Veelgemaakte fout 2"
      ],
      "common_mistakes_en": [
        "Common mistake 1",
        "Common mistake 2"
      ],
      "alternative_nl": "Alternatieve uitvoering bij beperkingen",
      "alternative_en": "Alternative execution for limitations",
      "animation_instruction_nl": "Gedetailleerde beschrijving voor animatie generatie",
      "animation_instruction_en": "Detailed description for animation generation"
    },
    "advanced": {
      // Similar structure with increased difficulty
    },
    "expert": {
      // Similar structure with maximum difficulty
    }
  }
}
```

### 2. Animation Instructions
Write detailed animation instructions:

```typescript
"animation_instruction_nl": "Persoon ligt op rug, knieën gebogen. Heupen langzaam omhoog duwen tot rechte lijn van knieën naar schouders. Highlight billen en core tijdens piekcontractie. Langzaam terug naar startpositie."
```

### 3. Testing New Exercises
- Test all difficulty levels
- Verify translations
- Check animation generation
- Validate instruction clarity

## 🌍 Adding Translations

### 1. Language Context
Add new language to `src/contexts/LanguageContext.tsx`:

```typescript
const translations = {
  nl: { /* Dutch translations */ },
  en: { /* English translations */ },
  de: { /* German translations */ }, // New language
  fr: { /* French translations */ }, // New language
};

type Language = 'nl' | 'en' | 'de' | 'fr'; // Update type
```

### 2. Exercise Translations
Add translated fields to exercise data:

```typescript
{
  "name_de": "Deutsche Name",
  "name_fr": "Nom français",
  "description_de": "Deutsche Beschreibung",
  "description_fr": "Description française",
  // ... other translated fields
}
```

### 3. UI Translations
Add UI text translations:

```typescript
de: {
  appTitle: 'Morgenroutine',
  welcome: 'Willkommen zu Ihrer Morgenroutine',
  // ... all UI strings
}
```

## 🎬 Improving Animations

### 1. AI Animation Engine
Enhance `src/services/AIAnimationEngine.ts`:

```typescript
// Add new exercise pattern
private generateNewExerciseMotion(level: string): ExerciseMotion {
  return {
    keyframes: [
      {
        timestamp: 0,
        joints: { /* initial position */ },
        muscleActivation: { /* muscle groups */ },
        breathingPhase: 'inhale',
        emphasis: []
      },
      // ... more keyframes
    ],
    duration: this.getDurationForLevel(level),
    style: 'controlled',
    difficulty: level as any
  };
}
```

### 2. Video Integration
Add exercise videos to `src/services/VideoService.ts`:

```typescript
'new-exercise-id': [
  {
    id: 'new-exercise-video',
    exerciseId: 'new-exercise-id',
    level: 'beginner',
    source: 'pexels',
    videoUrl: 'https://example.com/video.mp4',
    thumbnailUrl: 'https://example.com/thumb.jpg',
    duration: 60,
    quality: 'high',
    description: 'Exercise demonstration'
  }
]
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] All exercise levels work correctly
- [ ] Animations play smoothly
- [ ] Translations are accurate
- [ ] Responsive design on mobile/tablet/desktop
- [ ] PWA installation works
- [ ] Offline functionality
- [ ] Settings persist correctly

### Automated Testing
```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when available)
npm test
```

## 📝 Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat: add new yoga exercise category"

# Bug fixes  
git commit -m "fix: resolve animation timing issue"

# Documentation
git commit -m "docs: update exercise adding guide"

# Styling
git commit -m "style: improve mobile responsive design"

# Refactoring
git commit -m "refactor: simplify animation engine"
```

## 🔄 Pull Request Process

### 1. Before Submitting
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

### 2. PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested offline functionality

## Screenshots
(if applicable)
```

### 3. Review Process
- Code review by maintainers
- Automated checks must pass
- Documentation review
- Testing verification

## 🎯 Priority Areas

### High Priority
- **Accessibility improvements** - Screen reader support, keyboard navigation
- **Performance optimization** - Faster loading, smoother animations
- **Exercise library expansion** - More diverse workout options
- **Mobile experience** - Touch interactions, responsive design

### Medium Priority
- **Advanced features** - Custom routines, progress tracking
- **Integrations** - Wearable devices, health apps
- **Internationalization** - More language support
- **Analytics** - Privacy-friendly usage insights

### Future Considerations
- **3D animations** - Three.js integration
- **Voice guidance** - Audio instructions
- **AR features** - Augmented reality overlays
- **AI coaching** - Personalized feedback

## 🤝 Community Guidelines

### Be Respectful
- Use inclusive language
- Respect different perspectives
- Provide constructive feedback
- Help newcomers

### Be Collaborative
- Share knowledge openly
- Ask questions when unclear
- Offer help to others
- Celebrate contributions

### Be Professional
- Keep discussions on-topic
- Avoid personal attacks
- Focus on the code/feature
- Maintain a positive attitude

## 📞 Getting Help

### Questions?
- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
- **Code Review** - Ask for feedback on your changes

### Stuck?
- Check existing issues and discussions
- Read the documentation thoroughly
- Ask specific questions with context
- Provide minimal reproduction examples

---

**Thank you for contributing to Morning Routine App! 🙏**

*Together we're building a healthier world, one morning routine at a time.*