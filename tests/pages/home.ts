import { expect, Page } from '@playwright/test';

export class HomePage {
  constructor(public page: Page) {}

  // Getters para elementos principais
  public get searchInput() {
    return this.page.getByTestId('search-input');
  }

  public get searchButton() {
    return this.page.getByTestId('search-button');
  }

  public get clearButton() {
    return this.page.locator('button:has-text("X")');
  }

  public get personGrid() {
    return this.page.getByTestId('person-grid');
  }

  public get personCards() {
    return this.page.locator('[data-testid="person-card"]');
  }

  public get loadingSpinner() {
    return this.page.locator('text=Carregando...');
  }

  public get noResultsMessage() {
    return this.page.locator('text=Nenhum resultado encontrado');
  }

  public get resultsCounter() {
    return this.page.locator('text=resultados');
  }

  public get desaparecidosCounter() {
    return this.page.getByTestId('desaparecidos-counter');
  }

  public get encontradosCounter() {
    return this.page.getByTestId('encontrados-counter');
  }

  public get loadMoreSpinner() {
    return this.page.locator('text=Carregando mais resultados...');
  }

  public get allResultsLoadedMessage() {
    return this.page.locator('text=Todos os resultados foram carregados');
  }

  // Métodos de navegação
  async navigateToHome() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  // Métodos de busca
  async searchForPerson(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async clearSearch() {
    await this.clearButton.click();
  }

  async waitForSearchResults() {
    // Aguarda o loading desaparecer
    await this.page.waitForSelector('text=Carregando...', {
      state: 'hidden',
      timeout: 10000,
    });

    // Aguarda os resultados aparecerem ou a mensagem de "nenhum resultado"
    await Promise.race([
      this.personGrid.waitFor({ state: 'visible', timeout: 5000 }),
      this.noResultsMessage.waitFor({ state: 'visible', timeout: 5000 }),
    ]);
  }

  // Métodos de verificação
  async isPersonGridVisible() {
    await expect(this.personGrid).toBeVisible();
  }

  async isSearchInputVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async isSearchButtonVisible() {
    await expect(this.searchButton).toBeVisible();
  }

  async isClearButtonVisible() {
    await expect(this.clearButton).toBeVisible();
  }

  async isNoResultsMessageVisible() {
    await expect(this.noResultsMessage).toBeVisible();
  }

  async isCountersVisible() {
    await expect(this.desaparecidosCounter).toBeVisible();
    await expect(this.encontradosCounter).toBeVisible();
  }

  // Métodos de obtenção de dados
  async getPersonCardsCount(): Promise<number> {
    return await this.personCards.count();
  }

  async getDesaparecidosCount(): Promise<string> {
    const counter = this.desaparecidosCounter.locator('div').first();
    return (await counter.textContent()) || '';
  }

  async getEncontradosCount(): Promise<string> {
    const counter = this.encontradosCounter.locator('div').first();
    return (await counter.textContent()) || '';
  }

  async getResultsText(): Promise<string> {
    return (await this.resultsCounter.textContent()) || '';
  }

  // Métodos de interação com cards
  async clickOnPersonCard(index: number) {
    const card = this.personCards.nth(index);
    await card.click();
  }

  async getPersonCardName(index: number): Promise<string> {
    const card = this.personCards.nth(index);
    const nameElement = card
      .locator('h3, h4, [data-testid="person-name"]')
      .first();
    return (await nameElement.textContent()) || '';
  }

  async isPersonCardVisible(index: number): Promise<boolean> {
    const card = this.personCards.nth(index);
    return await card.isVisible();
  }

  // Métodos de scroll infinito
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async waitForMoreResultsToLoad() {
    await this.loadMoreSpinner.waitFor({ state: 'visible', timeout: 5000 });
    await this.loadMoreSpinner.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async isAllResultsLoaded(): Promise<boolean> {
    return await this.allResultsLoadedMessage.isVisible();
  }

  // Métodos de validação
  async expectPersonCardsCountToBe(count: number) {
    await expect(this.personCards).toHaveCount(count);
  }

  async expectSearchInputToHaveValue(value: string) {
    await expect(this.searchInput).toHaveValue(value);
  }

  async expectURLToBeHome() {
    await expect(this.page).toHaveURL('/');
  }

  async expectPersonCardToContainName(index: number, name: string) {
    const card = this.personCards.nth(index);
    const nameElement = card
      .locator('h3, h4, [data-testid="person-name"]')
      .first();
    await expect(nameElement).toContainText(name);
  }

  // Métodos de filtros
  async toggleFilters() {
    const filterButton = this.page.getByTestId('filter-toggle-button');
    await filterButton.click();
  }

  async selectGenderFilter(gender: string) {
    await this.toggleFilters();
    const select = this.page.getByTestId('sexo-select');
    await select.click();
    await this.page.locator(`text=${gender}`).click();
  }

  async selectStatusFilter(status: string) {
    await this.toggleFilters();
    const select = this.page.getByTestId('status-select');
    await select.click();
    await this.page.locator(`text=${status}`).click();
  }

  async setAgeRange(minAge: number, maxAge: number) {
    await this.toggleFilters();
    await this.page.getByTestId('idade-inicial-input').fill(minAge.toString());
    await this.page.getByTestId('idade-final-input').fill(maxAge.toString());
  }

  // Métodos de erro
  async isErrorVisible(): Promise<boolean> {
    const errorMessage = this.page.locator(
      'text=Erro ao carregar a lista de pessoas'
    );
    return await errorMessage.isVisible();
  }

  async retryAfterError() {
    const retryButton = this.page.getByRole('button', {
      name: 'Tentar novamente',
    });
    if (await retryButton.isVisible()) {
      await retryButton.click();
    }
  }

  async waitForInitialLoad() {
    await this.page.waitForSelector('text=Carregando...', {
      state: 'hidden',
      timeout: 15000,
    });
  }

  async isInitialLoadingVisible(): Promise<boolean> {
    return await this.loadingSpinner.isVisible();
  }
}
