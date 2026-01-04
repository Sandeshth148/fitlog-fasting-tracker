import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import './App.css'

class FastingTrackerElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  static get observedAttributes() {
    return ['user'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    console.log(`⚛️ React WC: Attribute ${_name} changed from ${oldValue} to ${newValue}`);
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    if (!this.root) {
      this.root = ReactDOM.createRoot(this);
    }
    
    const user = this.getAttribute('user') || undefined;
    console.log('⚛️ React WC: Rendering with user:', user);

    this.root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App user={user} />
        </Provider>
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

// Define the custom element
const ELEMENT_NAME = 'fitlog-fasting-tracker-element';

if (!customElements.get(ELEMENT_NAME)) {
  customElements.define(ELEMENT_NAME, FastingTrackerElement);
}

console.log('✅ Fasting Tracker Web Component Registered');
