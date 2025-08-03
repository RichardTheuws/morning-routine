# Setup Guide - Morning Routine App

This guide will help you set up the Morning Routine App for development or deployment.

## 📋 Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Pexels API Key** (free, required for video demonstrations)

## 🔑 Getting Your Pexels API Key

The app uses Pexels for professional exercise demonstration videos. Here's how to get your free API key:

### Step 1: Create Pexels Account
1. Go to [pexels.com](https://www.pexels.com)
2. Click "Join" in the top right corner
3. Sign up with your email or social account

### Step 2: Access the API
1. Once logged in, go to [pexels.com/api](https://www.pexels.com/api/)
2. Click "Get Started" button
3. You'll see your API key immediately (no approval needed!)

### Step 3: Copy Your API Key
Your API key will look like this:
```
aJ6Ng9GbHjTQZKwvyaYFdLGfnBeRBGXfvUy0OY0wugm7HjGebQoVVhho
```

**Important:** Keep this key private and never commit it to version control!

## 🚀 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/richardtheuws/morning-routine-app.git
cd morning-routine-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file and add your Pexels API key
nano .env  # or use your preferred editor
```

Add your API key to the `.env` file:
```env
VITE_PEXELS_API_KEY=your_actual_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🌐 Production Deployment

### Netlify (Recommended)
1. **Connect your GitHub repository** to Netlify
2. **Set environment variables** in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add `VITE_PEXELS_API_KEY` with your API key
3. **Deploy** - Netlify will automatically build and deploy

### Vercel
1. **Import your GitHub repository** to Vercel
2. **Add environment variables** in project settings:
   - Add `VITE_PEXELS_API_KEY` with your API key
3. **Deploy** - Vercel will handle the build process

### Other Hosting Providers
For any static hosting provider:
1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Upload the `dist` folder** to your hosting provider
3. **Set environment variables** if supported by your provider

## 🔧 Configuration Options

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_PEXELS_API_KEY` | Yes* | Your Pexels API key for video demonstrations |
| `VITE_APP_NAME` | No | Custom app name (default: "Morning Routine App") |
| `VITE_APP_VERSION` | No | App version for display |
| `VITE_DEV_MODE` | No | Enable development features |

*Required for video demonstrations. App works without it but with limited visual content.

### PWA Configuration
The app is configured as a Progressive Web App (PWA) by default. Users can install it on their devices for a native app experience.

To customize PWA settings, edit:
- `public/manifest.json` - App manifest
- `vite.config.ts` - PWA plugin configuration

## 🎯 Features Without API Key

If you don't have a Pexels API key, the app will still work with:

✅ **Full functionality** - All exercises and routines work
✅ **AI animations** - Advanced SVG animations for all exercises  
✅ **Offline support** - Complete offline functionality
✅ **Privacy features** - All privacy and data management features

❌ **Video demonstrations** - No professional video content
❌ **Dynamic video search** - Can't search for new exercise videos

## 🔍 Troubleshooting

### Common Issues

**"Videos not loading"**
- Check your Pexels API key is correct
- Verify the key is set in environment variables
- Check browser console for API errors

**"App not starting"**
- Ensure Node.js version 18 or higher
- Delete `node_modules` and run `npm install` again
- Check for any error messages in the terminal

**"Build failing"**
- Make sure all environment variables are set
- Check TypeScript errors with `npm run lint`
- Verify all dependencies are installed

### Getting Help

- **GitHub Issues** - Report bugs or ask questions
- **Discussions** - Community support and feature requests
- **Email** - richard@theuws.com for direct support

## 📚 Next Steps

Once you have the app running:

1. **Explore the codebase** - Check out the architecture in `src/`
2. **Read the contributing guide** - `CONTRIBUTING.md`
3. **Try adding exercises** - See the exercise data structure
4. **Customize the design** - Modify Tailwind CSS classes
5. **Add translations** - Extend the i18n system

Happy coding! 🚀