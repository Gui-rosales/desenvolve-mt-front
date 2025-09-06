import { test as base } from '@playwright/test';

// Setup MSW for browser tests
export const test = base.extend({
  page: async ({ page }, use) => {
    // Start MSW worker if NODE_ENV is test
    if (process.env.NODE_ENV === 'test') {
      await page.addInitScript(() => {
        // This will be handled by the MSW setup in the app
        window.__MSW_ENABLED__ = true;
      });
    }
    
    await use(page);
  },
});

export { expect } from '@playwright/test';
