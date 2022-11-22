import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';
import 'sanitize.css';

import './index.css';
import App from './app';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
