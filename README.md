# 🍎 FitLog Fasting Tracker (React MFE)

This is a **React 19** micro-frontend integrated into the Angular Shell using **Web Components**.

## 🚀 How to Run

### **1. Build & Serve**
This MFE must be served as a static asset.

```bash
cd fitlog-fasting-tracker
npm install
npm run build
npx http-server dist -p 4206 --cors
```

### **2. Access via Shell**
Start the main Shell app:
```bash
cd ../fitlog-shell
npm start
```
Go to: http://localhost:4200/fasting

---

## 🏗️ Architecture

- **Wrapper:** `src/web-component.tsx` wraps the React App in a custom element `<fitlog-fasting-tracker-element>`.
- **Props:** The wrapper observes attributes (e.g., `user`) and passes them as props to the React App.
- **Output:** Vite builds a single bundle `dist/fasting-tracker.js` in Library Mode.
- **Integration:** Angular Shell loads this script dynamically and renders the custom element.

## 🔄 Development Workflow

1. Make changes in `src/App.tsx`
2. Run `npm run build` (Required to update the bundle)
3. Refresh Shell browser

## 📝 Key Files

- `vite.config.ts` - Configured for Library Mode build
- `src/web-component.tsx` - Custom Element definition
- `src/App.tsx` - Main React component
