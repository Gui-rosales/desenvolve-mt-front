import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);

    page.on('request', (request) => {
      console.log(`→ ${request.method()} ${request.url()}`);
    });

    page.on('response', (response) => {
      console.log(`← ${response.status()} ${response.url()}`);
    });

    await use(page);
  },
});

export const expect = base.expect;

export const TEST_CONSTANTS = {
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
  },
  PERSON_IDS: {
    VALID: 1,
    INVALID: 99999,
  },
  SEARCH_TERMS: {
    VALID: 'João',
    INVALID: 'xyz123nonexistent',
    EMPTY: '',
  },
} as const;
