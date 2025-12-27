import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

class FastingTrackerElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  static get observedAttributes() {
    return ['user'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(`⚛️ React WC: Attribute ${name} changed from ${oldValue} to ${newValue}`);
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
        <App user={user} />
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
