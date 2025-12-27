import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Mount function to start the React app
const mount = (el: HTMLElement) => {
  const root = ReactDOM.createRoot(el)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  // Return unmount function for cleanup
  return () => root.unmount()
}

// Export mount for MFE integration
export { mount }

// Default export for standalone dev
export default mount
