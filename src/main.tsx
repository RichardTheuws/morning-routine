import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import i18n from './i18n';

// Wait for i18n to be ready before rendering
const renderApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Check if i18n is already initialized
if (i18n.isInitialized) {
  renderApp();
} else {
  // Wait for i18n to initialize
  i18n.on('initialized', renderApp);
}
