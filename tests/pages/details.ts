import { expect, Page } from '@playwright/test';

export class DetailsPage {
  constructor(public page: Page) {}

  // Getters para elementos principais
  public get backButton() {
    return this.page.getByTestId('back-button');
  }

  public get addOcorrenciaButton() {
    return this.page.getByTestId('add-ocorrencia-button');
  }

  public get communityInfoSection() {
    return this.page.getByTestId('community-info-section');
  }

  public get personDetails() {
    return this.page.locator('[data-testid="person-details"]');
  }

  public get personPhoto() {
    return this.page.getByTestId('person-photo');
  }

  public get personName() {
    return this.page.locator('h1.text-3xl');
  }

  public get personAge() {
    return this.page.locator('text=Idade:').locator('..');
  }

  public get personGender() {
    return this.page.locator('text=Sexo:').locator('..');
  }

  public get statusBadge() {
    return this.page.locator(
      '[data-testid="person-details"] .bg-primary, [data-testid="person-details"] .bg-destructive, [data-testid="person-details"] .bg-yellow-500'
    );
  }

  // Métodos de navegação
  async navigateToPersonDetails(personId: number) {
    await this.page.goto(`/pessoa/${personId}`);
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  async goBackToHome() {
    await this.backButton.click();
  }

  // Métodos de verificação
  async isPersonDetailsVisible() {
    await expect(this.personDetails).toBeVisible();
  }

  async isPersonPhotoVisible() {
    await expect(this.personPhoto).toBeVisible();
  }

  async isPersonNameVisible() {
    await expect(this.personName).toBeVisible();
  }

  async isStatusBadgeVisible() {
    await expect(this.statusBadge).toBeVisible();
  }

  async isCommunityInfoSectionVisible() {
    await expect(this.communityInfoSection).toBeVisible();
  }

  // Métodos de obtenção de dados
  async getPersonName(): Promise<string> {
    const name = await this.personName.textContent();
    return name || '';
  }

  async getPersonAge(): Promise<string> {
    const ageText = await this.personAge.textContent();
    const ageMatch = ageText?.match(/(\d+)/);
    return ageMatch ? ageMatch[1] : '';
  }

  async getPersonGender(): Promise<string> {
    const genderText = await this.personGender.textContent();
    return genderText?.includes('Masculino') ? 'Masculino' : 'Feminino';
  }

  async getStatusText(): Promise<string> {
    const statusText = await this.statusBadge.textContent();
    return statusText || '';
  }

  async getDisappearanceDate(): Promise<string> {
    const dateElement = await this.page
      .locator('text=Data do Desaparecimento')
      .locator('..')
      .locator('.text-lg');
    const dateText = await dateElement.textContent();
    return dateText || '';
  }

  async getDisappearanceLocation(): Promise<string> {
    const locationElement = await this.page
      .locator('text=Local do Desaparecimento')
      .locator('..')
      .locator('.text-foreground');
    const locationText = await locationElement.textContent();
    return locationText || '';
  }

  // Métodos do modal de ocorrência
  async openAddOcorrenciaModal() {
    await this.addOcorrenciaButton.click();
  }

  async isAddOcorrenciaModalVisible(): Promise<boolean> {
    return await this.page.locator('[role="dialog"]').isVisible();
  }

  async fillOcorrenciaForm(data: {
    descricao: string;
    informacao: string;
    data: Date;
  }) {
    // Preencher descrição
    await this.page.getByTestId('descricao-textarea').fill(data.descricao);

    // Preencher informação
    await this.page.getByTestId('informacao-textarea').fill(data.informacao);

    // Selecionar data
    await this.page.getByTestId('date-picker-button').click();
    await this.page
      .locator('[role="grid"]')
      .locator(`text=${data.data.getDate()}`)
      .click();
  }

  async selectDateInOcorrenciaModal(date: Date) {
    await this.page.getByTestId('date-picker-button').click();
    await this.page
      .locator('[role="grid"]')
      .locator(`text=${date.getDate()}`)
      .click();
  }

  async uploadFileInOcorrenciaModal(filePath: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.getByTestId('file-upload-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async submitOcorrenciaForm() {
    await this.page.getByTestId('submit-button').click();
  }

  async cancelOcorrenciaForm() {
    await this.page.getByTestId('cancel-button').click();
  }

  async closeOcorrenciaModal() {
    await this.page.keyboard.press('Escape');
  }

  // Métodos de validação
  async expectPersonNameToBe(name: string) {
    await expect(this.personName).toContainText(name);
  }

  async expectPersonAgeToBe(age: string) {
    await expect(this.personAge).toContainText(age);
  }

  async expectPersonGenderToBe(gender: string) {
    await expect(this.personGender).toContainText(gender);
  }

  async expectStatusToBe(status: string) {
    await expect(this.statusBadge).toContainText(status);
  }

  async expectDisappearanceDateToBe(date: string) {
    const dateElement = await this.page
      .locator('text=Data do Desaparecimento')
      .locator('..')
      .locator('.text-lg');
    await expect(dateElement).toContainText(date);
  }

  async expectDisappearanceLocationToBe(location: string) {
    const locationElement = await this.page
      .locator('text=Local do Desaparecimento')
      .locator('..')
      .locator('.text-foreground');
    await expect(locationElement).toContainText(location);
  }

  // Métodos de ocorrências
  async getOcorrenciasCount(): Promise<number> {
    const ocorrencias = await this.page
      .locator('[data-testid="ocorrencia-item"]')
      .count();
    return ocorrencias;
  }

  async isOcorrenciaVisible(index: number): Promise<boolean> {
    const ocorrencia = await this.page
      .locator('[data-testid="ocorrencia-item"]')
      .nth(index);
    return await ocorrencia.isVisible();
  }

  async getOcorrenciaText(index: number): Promise<string> {
    const ocorrencia = await this.page
      .locator('[data-testid="ocorrencia-item"]')
      .nth(index);
    const text = await ocorrencia.locator('.text-foreground').textContent();
    return text || '';
  }

  // Métodos de cartazes
  async getCartazesCount(): Promise<number> {
    const cartazes = await this.page.locator('img[alt*="Cartaz"]').count();
    return cartazes;
  }

  async isCartazVisible(index: number): Promise<boolean> {
    const cartaz = await this.page.locator('img[alt*="Cartaz"]').nth(index);
    return await cartaz.isVisible();
  }

  // Métodos de loading e erro
  async waitForPersonDetailsToLoad() {
    // Aguarda o loading desaparecer primeiro
    await this.page.waitForSelector('text=Carregando informações...', {
      state: 'hidden',
      timeout: 10000,
    });

    // Aguarda o elemento person-details aparecer
    await this.page.waitForSelector('[data-testid="person-details"]', {
      state: 'visible',
      timeout: 20000,
    });
  }

  async waitForOcorrenciasToLoad() {
    await this.page.waitForSelector('[data-testid="ocorrencia-item"]', {
      state: 'visible',
    });
  }

  async expectLoadingToBeVisible() {
    await expect(
      this.page.getByText('Carregando informações...')
    ).toBeVisible();
  }

  async expectErrorToBeVisible() {
    await expect(
      this.page.getByText(
        'Pessoa não encontrada ou erro ao carregar informações'
      )
    ).toBeVisible();
  }

  async retryAfterError() {
    await this.page.getByRole('button', { name: 'Tentar novamente' }).click();
  }

  // Métodos de validação de URL
  async expectURLToContainPersonId(personId: number) {
    await expect(this.page).toHaveURL(new RegExp(`/${personId}$`));
  }

  // Métodos de informações adicionais
  async isAdditionalInfoVisible(): Promise<boolean> {
    const infoElement = await this.page
      .locator('text=Informações Adicionais')
      .first();
    return await infoElement.isVisible();
  }

  async isVestimentasVisible(): Promise<boolean> {
    const vestimentasElement = await this.page
      .locator('text=Vestimentas')
      .first();
    return await vestimentasElement.isVisible();
  }

  async getAdditionalInfoText(): Promise<string> {
    const infoElement = await this.page
      .locator('text=Informações Adicionais')
      .first()
      .locator('..')
      .locator('.text-foreground');
    const text = await infoElement.textContent();
    return text || '';
  }

  async getVestimentasText(): Promise<string> {
    const vestimentasElement = await this.page
      .locator('text=Vestimentas')
      .first()
      .locator('..')
      .locator('.text-foreground');
    const text = await vestimentasElement.textContent();
    return text || '';
  }
}
