import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

async function enableApiMockingOnBrowser() {
  const { worker } = await import('./app/mocks/browser-interceptor.ts');
  console.log('Iniciando mock de API');
  await worker.start();
}

async function initializeApp() {
  if (import.meta.env.VITE_NODE_ENV === 'test') {
    console.log('Iniciando mock de API');
    await enableApiMockingOnBrowser();
  }
}

initializeApp().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
