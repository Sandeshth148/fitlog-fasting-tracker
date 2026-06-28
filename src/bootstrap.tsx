import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'

// Mount function to start the React app
const mount = (el: HTMLElement) => {
  const root = ReactDOM.createRoot(el)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
  // Return unmount function for cleanup
  return () => root.unmount()
}

// Export mount for MFE integration
export { mount }

// Default export for standalone dev
export default mount

