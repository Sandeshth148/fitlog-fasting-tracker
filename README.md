# 🍎 FitLog Fasting Tracker (React MFE)

A beautiful, modern **React 19** micro-frontend for tracking intermittent fasting sessions, integrated into the FitLog Angular Shell using **Web Components**.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/fitlog-fasting-tracker/deploys)

## ✨ Features

- ⏱️ **Real-time Timer** - Track your fasting duration with live updates
- 📊 **Statistics Dashboard** - View total fasts, average duration, longest fast, and current streak
- 📜 **Fasting History** - See your last 10 fasting sessions with detailed insights
- 🔬 **Fasting Insights** - Detailed breakdown of each fast:
  - Calories burned
  - Fat burned
  - Ketosis level
  - Autophagy activation
  - Fasting phases timeline
- 💾 **Local Storage** - All data persists in browser
- 🎨 **Modern UI** - Beautiful cards, animations, and responsive design
- 🔔 **Custom Modals** - Confirmation dialogs and insights modal

## 🚀 Quick Start

### **Development**

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Serve locally (for integration with Shell)
npx http-server dist -p 4206 --cors
```

### **Access via Shell**
Start the main Shell app:
```bash
cd ../fitlog-shell
npm start
```
Navigate to: http://localhost:4200/fasting

## 🌐 Production Deployment

This app is deployed on **Netlify** and integrated into the FitLog Shell.

**Live URL:** `https://fitlog-fasting-tracker.netlify.app`

### Deploy to Netlify

1. **Connect Repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to this GitHub repository

2. **Build Settings** (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 20

3. **Deploy!**
   - Netlify will automatically deploy on every push to `main`

## 🏗️ Architecture

### **Web Component Integration**
- **Custom Element:** `<fitlog-fasting-tracker-element>`
- **Wrapper:** `src/web-component.tsx` wraps the React App
- **Props:** Observes `user` attribute from Angular Shell
- **Output:** Vite builds to `dist/fasting-tracker.js` and `dist/fasting-tracker.css`

### **State Management**
- **Redux Toolkit** for global state
- **Local Storage** middleware for persistence
- **Selectors** for computed stats

### **Tech Stack**
- React 19
- Redux Toolkit
- TypeScript
- Vite
- Lucide React (icons)
- date-fns (date formatting)

## 📁 Project Structure

```
src/
├── components/
│   ├── ConfirmDialog.tsx      # Confirmation modal
│   ├── FastingControls.tsx    # Start/End buttons
│   ├── FastingHistory.tsx     # History list
│   ├── FastingInsights.tsx    # Detailed insights modal
│   ├── Modal.tsx              # Reusable modal
│   ├── StatsCards.tsx         # Statistics cards
│   └── TimerDisplay.tsx       # Live timer
├── store/
│   ├── fastingSlice.ts        # Redux slice
│   └── store.ts               # Store configuration
├── utils/
│   └── fastingInsights.ts     # Insights calculations
├── App.tsx                    # Main app component
├── App.css                    # Styles
└── web-component.tsx          # Web component wrapper
```

## 🔄 Development Workflow

1. Make changes in `src/`
2. Run `npm run build`
3. Refresh Shell browser to see changes
4. Push to GitHub for automatic Netlify deployment

## 📝 Key Configuration Files

- `vite.config.ts` - Library mode build configuration
- `netlify.toml` - Netlify deployment settings
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## 🎨 Fasting Phases

The app tracks 6 fasting phases:

1. **Anabolic (0-4h)** - Digestion and nutrient absorption
2. **Catabolic (4-16h)** - Glycogen depletion begins
3. **Fat Burning (16-24h)** - Ketosis activation
4. **Ketosis (24-48h)** - Deep fat burning
5. **Autophagy (48-72h)** - Cellular cleanup
6. **Deep Autophagy (72h+)** - Maximum benefits

## 🔧 Environment Variables

No environment variables required for this MFE. All configuration is handled by the Shell app.

## 📦 Build Output

```
dist/
├── fasting-tracker.js      # Main bundle (1.8MB)
├── fasting-tracker.css     # Styles (14.6KB)
└── index.html              # (Not used in integration)
```

## 🤝 Integration with Shell

The Angular Shell loads this MFE dynamically:

```typescript
// Shell loads the script
const script = document.createElement('script');
script.src = 'https://fitlog-fasting-tracker.netlify.app/fasting-tracker.js';
document.body.appendChild(script);

// Shell uses the custom element
<fitlog-fasting-tracker-element [attr.user]="userName">
</fitlog-fasting-tracker-element>
```

## 📄 License

MIT

## 👨‍💻 Author

Sandesh - [GitHub](https://github.com/Sandeshth148)
