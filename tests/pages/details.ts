import { test, expect, Page } from '@playwright/test';

export class DetailsPage {
  constructor(private page: Page) {}

  public async getPersonDetails() {
    return await this.page.getByTestId('person-details');
  }
}
