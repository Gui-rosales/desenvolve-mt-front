import { test, expect, Page } from '@playwright/test';

export class HomePage {
  constructor(public page: Page) {}

  // Getters para elementos principais
  public get searchInput() {
    return this.page.getByTestId('search-input');
  }

  public get searchButton() {
    return this.page.getByTestId('search-button');
  }

  public get filterToggleButton() {
    return this.page.getByTestId('filter-toggle-button');
  }

  public get sexoSelect() {
    return this.page.getByTestId('sexo-select');
  }

  public get idadeInicialInput() {
    return this.page.getByTestId('idade-inicial-input');
  }

  public get idadeFinalInput() {
    return this.page.getByTestId('idade-final-input');
  }

  public get statusSelect() {
    return this.page.getByTestId('status-select');
  }

  public get personGrid() {
    return this.page.getByTestId('person-grid');
  }

  public get desaparecidosCounter() {
    return this.page.getByTestId('desaparecidos-counter');
  }

  public get encontradosCounter() {
    return this.page.getByTestId('encontrados-counter');
  }

  // Métodos de navegação
  async navigateToHome() {
    await this.page.goto('/');
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  // Métodos de busca
  async searchForPerson(name: string) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async searchWithFilters(filters: {
    nome?: string;
    sexo?: 'MASCULINO' | 'FEMININO';
    idadeInicial?: number;
    idadeFinal?: number;
    status?: 'DESAPARECIDO' | 'LOCALIZADO';
  }) {
    if (filters.nome) {
      await this.searchInput.fill(filters.nome);
    }

    // Abrir filtros se necessário
    const filtersVisible = await this.sexoSelect.isVisible();
    if (!filtersVisible) {
      await this.filterToggleButton.click();
    }

    if (filters.sexo) {
      await this.sexoSelect.click();
      await this.page.getByRole('option', { name: filters.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino' }).click();
    }

    if (filters.idadeInicial) {
      await this.idadeInicialInput.fill(filters.idadeInicial.toString());
    }

    if (filters.idadeFinal) {
      await this.idadeFinalInput.fill(filters.idadeFinal.toString());
    }

    if (filters.status) {
      await this.statusSelect.click();
      await this.page.getByRole('option', { name: filters.status === 'LOCALIZADO' ? 'Localizada' : 'Desaparecida' }).click();
    }

    await this.searchButton.click();
  }

  // Métodos de verificação
  async isSearchInputVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async isSearchButtonVisible() {
    await expect(this.searchButton).toBeVisible();
  }

  async isFilterToggleButtonVisible() {
    await expect(this.filterToggleButton).toBeVisible();
  }

  async isPersonGridVisible() {
    await expect(this.personGrid).toBeVisible();
  }

  async isPersonGridEmpty() {
    await expect(this.personGrid).toBeEmpty();
  }

  async getPersonCount(): Promise<number> {
    const personCards = await this.page.locator('[data-testid="person-card"]').count();
    return personCards;
  }

  async getPersonCard(index: number) {
    return this.page.locator('[data-testid="person-card"]').nth(index);
  }

  async clickOnPersonCard(index: number) {
    const personCard = await this.getPersonCard(index);
    await personCard.click();
  }

  async waitForSearchResults() {
    await this.page.waitForSelector('[data-testid="person-grid"]');
  }

  async waitForLoadingToComplete() {
    await this.page.waitForSelector('[data-testid="person-grid"]', { state: 'visible' });
  }

  // Métodos de contadores
  async getDesaparecidosCount(): Promise<string> {
    const counter = await this.desaparecidosCounter.locator('.text-2xl').textContent();
    return counter || '0';
  }

  async getEncontradosCount(): Promise<string> {
    const counter = await this.encontradosCounter.locator('.text-2xl').textContent();
    return counter || '0';
  }

  // Métodos de filtros
  async toggleFilters() {
    await this.filterToggleButton.click();
  }

  async areFiltersVisible(): Promise<boolean> {
    return await this.sexoSelect.isVisible();
  }

  // Métodos de validação
  async expectPersonCardToContain(index: number, text: string) {
    const personCard = await this.getPersonCard(index);
    await expect(personCard).toContainText(text);
  }

  async expectSearchResultsToContain(text: string) {
    await expect(this.personGrid).toContainText(text);
  }

  async expectNoSearchResults() {
    await expect(this.page.getByText('Nenhum resultado encontrado')).toBeVisible();
  }

  // Métodos de scroll infinito
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async waitForMoreResults() {
    await this.page.waitForSelector('text=Carregando mais resultados...', { state: 'visible' });
    await this.page.waitForSelector('text=Carregando mais resultados...', { state: 'hidden' });
  }

  // Métodos de erro
  async expectErrorToBeVisible() {
    await expect(this.page.getByText('Erro ao carregar a lista de pessoas')).toBeVisible();
  }

  async retryAfterError() {
    await this.page.getByRole('button', { name: 'Tentar novamente' }).click();
  }
}
