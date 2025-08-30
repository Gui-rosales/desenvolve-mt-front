import { test, expect, Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  public async searchForPerson(name: string) {
    await this.page.fill(
      'input[placeholder="Digite o nome da pessoa..."]',
      name
    );
    await this.page.click('button[type="submit"]');
  }

  public async getPersonList() {
    return await this.page.getByTestId('person-list');
  }
}
