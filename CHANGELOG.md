# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-27

### Added
- Initial release of Morning Routine App
- Privacy-first architecture with local storage only
- 11 complete exercise demonstrations with 3 difficulty levels each
- Multilingual support (English/Dutch)
- Advanced animation engine with physics-based rendering
- Pexels video integration with API key support
- Progressive Web App (PWA) capabilities
- GDPR-compliant privacy controls
- Comprehensive exercise library:
  - Cat-Cow Stretch
  - Bird Dog
  - Glute Bridge
  - Neck Rotations
  - Shoulder Rolls
  - Jumping Jacks
  - Lying Knee to Chest
  - Standing Forward Bend
  - Seated Spinal Twist
  - Knee Rolls
  - Superman
- Golden Commandments compliance for ethical AI development
- Complete English documentation
- Professional setup guides and API integration instructions

### Features
- **Exercise Demonstrations**: Both video and animated demonstrations
- **Privacy Controls**: Granular consent management for analytics and video content
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Offline Support**: Core functionality works without internet
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Performance**: Optimized loading with caching and lazy loading

### Technical
- Built with React 18 + TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- i18next for internationalization
- Lucide React for icons
- Physics-based animation engine
- Service worker for PWA functionality

### Documentation
- Complete README with setup instructions
- Contributing guidelines
- Pexels API integration guide
- Privacy compliance documentation
- Golden Commandments compliance report

## [Unreleased]

## [1.1.1] - 2025-01-27

### Fixed
- **iOS Mobile Compatibility** - Fixed translation keys showing instead of actual translations on iOS Safari/Chrome
- **White Screen Issue** - Resolved blank screen after goal selection on mobile devices
- **localStorage Errors** - Added try-catch blocks for localStorage access in private browsing mode
- **Video Validation** - Disabled CORS video validation on mobile to prevent loading issues
- **iOS Viewport** - Added iOS-specific CSS fixes for proper viewport handling
- **Mobile Input** - Fixed zoom-on-focus issue with 16px minimum font size
- **PWA Manifest** - Enhanced PWA configuration for better mobile installation

### Improved
- **Mobile Performance** - Optimized video loading for mobile devices
- **Error Handling** - Better error logging and graceful degradation
- **iOS Safari Support** - Specific fixes for iOS Safari rendering issues

### Added
- **Video Selection System** - Users can now choose from multiple video options for each exercise
- **Fullscreen Mode** - Expand demonstrations to fullscreen for better visibility
- **User Video Preferences** - App remembers user's preferred videos for each exercise
- **Modern Animation System** - Completely redesigned animation renderer with smooth transitions
- **Enhanced Video Search** - Multiple video options per exercise with custom search capability

### Improved
- **Video Display** - Larger, more visible video demonstrations
- **Animation Quality** - Modern design with gradient backgrounds and smooth muscle activation indicators
- **User Experience** - Better video selection workflow with thumbnail previews
- **Performance** - Optimized video loading and caching system

### Fixed
- **Video Loading Errors** - Resolved CORS and URL validation issues
- **Animation Rendering** - Improved physics-based movement calculations
- **User Preferences** - Proper storage and retrieval of video selections

### Planned
- Additional exercise categories (strength training, cardio)
- Custom routine builder
- Progress tracking and analytics
- Social sharing features
- Advanced animation customization
- More language support

---

## Version History

- **1.0.0** - Initial release with core functionality
- **0.x.x** - Development versions (not released)

## Semantic Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version when making incompatible API changes
- **MINOR** version when adding functionality in a backwards compatible manner  
- **PATCH** version when making backwards compatible bug fixes

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` with new version details
3. Create git tag with version number
4. Deploy to production
5. Create GitHub release with changelog notes