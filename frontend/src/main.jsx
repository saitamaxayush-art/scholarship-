import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { AppStateProvider } from './context/AppState';
import App from './App';
import './index.css';

// Route changes manage scroll themselves (see App and ScrollManager).
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <MotionConfig reducedMotion="user">
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
