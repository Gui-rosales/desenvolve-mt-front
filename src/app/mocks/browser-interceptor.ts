import { setupWorker } from 'msw/browser';
import { handlers } from './endpoints-handlers';

export const worker = setupWorker(...handlers); 