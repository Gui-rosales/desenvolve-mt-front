import axios from 'axios';
import { envConfig } from '@/app/config/env-config';

export const api = axios.create({
  baseURL: envConfig.API_URL,
});
