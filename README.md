# Morning Routine App 🌅

A privacy-first, open source Progressive Web App (PWA) for creating and following personalized morning routines. Works completely offline, no account required, all data stays local on your device.

![Morning Routine App](https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

## ✨ Features

### 🎯 **Personalized Routines**
- Choose from 7+ different goals (back pain, neck pain, fat loss, mobility, etc.)
- 3 levels: Beginner, Intermediate, Expert
- Customizable duration (5-30 minutes)
- Intelligent exercise selection based on your preferences

### 🎬 **Advanced Animations**
- **AI-generated SVG animations** with biomechanical precision
- **Professional video demonstrations** from certified trainers
- **Muscle activation visualization** - see which muscles are active
- **Breathing indicators** for optimal execution
- **Level-specific timing** and movement speed

### 🔒 **Privacy & Offline**
- **No account needed** - start immediately
- **Completely offline** - works without internet connection
- **Local data storage** - everything stays on your device
- **No tracking** - no analytics or data collection
- **Open source** - transparent code

### 📱 **Progressive Web App**
- **Installable** on phone, tablet and desktop
- **Responsive design** - works on all screen sizes
- **Offline caching** - loads fast, even without internet
- **Native app feel** - smooth animations and interactions

### 🌍 **Multilingual**
- **Dutch** and **English** fully supported
- **Easy to extend** to other languages
- **Context-aware translations** for exercises and tips

## 🚀 Quick Start

### Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/morning-routine-app.git
cd morning-routine-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

The app is a static PWA and can be deployed on:
- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**
- **Any static hosting service**

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Consistent iconography

### Build & Development
- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **PWA Plugin** - Service worker and manifest generation

### Animations & Media
- **Custom SVG Engine** - AI-generated exercise animations
- **Video Integration** - Pexels and local video support
- **Biomechanical Modeling** - Realistic movement patterns

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── animations/      # Animation system
│   ├── common/          # Reusable UI components
│   ├── home/            # Dashboard and main screen
│   ├── onboarding/      # Setup flow
│   ├── privacy/         # Privacy consent components
│   ├── routine/         # Routine execution
│   └── settings/        # Settings page
├── contexts/            # React contexts (language, state)
├── data/                # Exercise database
├── hooks/               # Custom React hooks
├── i18n/                # Internationalization
├── services/            # Business logic and AI engines
├── types/               # TypeScript type definitions
└── styles/              # Global CSS
```

## 🎨 Adding Exercises

New exercises can be easily added in `src/data/exercises.ts`:

```typescript
{
  "id": "new-exercise",
  "name_nl": "Nederlandse naam",
  "name_en": "English name",
  "category": ["Back", "Core"],
  "goals": ["Reduce back pain"],
  "levels": {
    "beginner": {
      "duration": "1m",
      "sets": 1,
      "reps": 10,
      "description_nl": "Beschrijving...",
      "description_en": "Description...",
      "steps_nl": ["Step 1", "Step 2"],
      "steps_en": ["Step 1", "Step 2"],
      "tips_nl": ["Tip 1"],
      "tips_en": ["Tip 1"],
      "animation_instruction_nl": "Animation description...",
      "animation_instruction_en": "Animation description..."
    }
    // ... advanced and expert levels
  }
}
```

## 🤖 AI Animation Engine

The app uses an advanced AI-engine for generating exercise animations:

### Features
- **Biomechanical modeling** - Realistic joint limitations
- **Muscle activation mapping** - Visual feedback of active muscles
- **Breathing synchronization** - Timing with inhale/exhale
- **Level adjustments** - Speed and complexity per level
- **Pattern recognition** - Automatic movement recognition

### Extending
```typescript
// Add new movement patterns in AdvancedAnimationEngine.ts
private generateCustomMotion(exerciseType: string): ExerciseMotion {
  // Implement new movement logic
}
```

## 🌍 Adding Translations

New languages can be added in `src/i18n/locales/`:

```typescript
// Add to src/i18n/index.ts
const resources = {
  en: { /* English translations */ },
  nl: { /* Dutch translations */ },
  de: { /* German translations */ }, // New language
  // ...
};
```

## 🔧 Configuration

### PWA Settings
PWA configuration in `vite.config.ts` and `public/manifest.json`:

```typescript
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}']
  }
})
```

### Tailwind Customization
Styling adjustments in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#059669', // Emerald-600
        // Add custom colors
      }
    }
  }
}
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use GitHub Issues
- Describe the problem clearly
- Add screenshots if possible
- Include browser/device information

### ✨ Feature Requests
- Open a GitHub Issue with label "enhancement"
- Describe the desired functionality
- Explain why it would be useful
- Add mockups if possible

### 💻 Code Contributions

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** for your feature: `git checkout -b feature/new-feature`
4. **Commit** your changes: `git commit -m 'Add new feature'`
5. **Push** to your branch: `git push origin feature/new-feature`
6. **Open a Pull Request**

### 📝 Development Guidelines

- **TypeScript** - Use strict typing
- **ESLint** - Follow the code style rules
- **Components** - Keep them small and reusable
- **Tests** - Add tests for new functionality
- **Documentation** - Update README and code comments

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What does this mean?
- ✅ **Commercial use** allowed
- ✅ **Modification** allowed  
- ✅ **Distribution** allowed
- ✅ **Private use** allowed
- ❗ **License and copyright** must be preserved

## 🙏 Acknowledgments

- **Pexels** - For the high-quality exercise videos
- **Lucide** - For the beautiful icon set
- **Tailwind CSS** - For the excellent styling framework
- **React Community** - For the outstanding documentation and tools

## 📞 Contact & Support

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and community support
- **Email** - [your-email@example.com] for direct questions

## 🗺️ Roadmap

### Version 1.1 (Q2 2024)
- [ ] **More exercises** - Expansion to 50+ exercises
- [ ] **Custom routines** - Users can create own routines
- [ ] **Progress tracking** - Advanced progress analytics
- [ ] **Social features** - Share routines (optional)

### Version 1.2 (Q3 2024)
- [ ] **AI Coach** - Intelligent feedback on form
- [ ] **Wearable integration** - Apple Watch, Fitbit support
- [ ] **Voice guidance** - Audio instructions during exercises
- [ ] **Accessibility** - Screen reader and keyboard navigation

### Version 2.0 (Q4 2024)
- [ ] **3D Animations** - Three.js based 3D demonstrations
- [ ] **AR Mode** - Augmented reality exercise overlay
- [ ] **Machine Learning** - Personalized routine optimization
- [ ] **Multi-platform** - Native iOS and Android apps

---

**Made with ❤️ for a healthier world**

*Morning Routine App - Start every day with energy and focus*