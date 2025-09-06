import { Page } from '@playwright/test';


export class TestHelpers {
  constructor(private page: Page) {}

 
  async waitForElement(
    selector: string,
    state: 'visible' | 'hidden' = 'visible',
    timeout: number = 10000
  ) {
    await this.page.waitForSelector(selector, { state, timeout });
  }

 
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }


  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }


  async waitForRequest(urlPattern: string | RegExp) {
    return await this.page.waitForRequest(request => {
      const url = request.url();
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern);
      }
      return urlPattern.test(url);
    });
  }


  async waitForResponse(urlPattern: string | RegExp, statusCode?: number) {
    return await this.page.waitForResponse(response => {
      const url = response.url();
      const status = response.status();
      
      const urlMatches = typeof urlPattern === 'string' 
        ? url.includes(urlPattern)
        : urlPattern.test(url);
      
      if (statusCode) {
        return urlMatches && status === statusCode;
      }
      
      return urlMatches;
    });
  }


  async elementExists(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }


  async waitForText(text: string, timeout: number = 10000) {
    await this.page.waitForSelector(`text=${text}`, { timeout });
  }


  async clearStorage() {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }


  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }


  async scrollToTop() {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async isPageLoading(): Promise<boolean> {
    return await this.page.evaluate(() => {
      return document.readyState !== 'complete';
    });
  }

  async waitForPageToStopLoading() {
    await this.page.waitForFunction(() => {
      return document.readyState === 'complete';
    });
  }


  async clickWithDelay(selector: string, delay: number = 100) {
    await this.page.waitForSelector(selector);
    await this.page.waitForTimeout(delay);
    await this.page.click(selector);
  }


  async typeWithDelay(selector: string, text: string, delay: number = 50) {
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, '');
    for (const char of text) {
      await this.page.type(selector, char);
      await this.page.waitForTimeout(delay);
    }
  }
}
