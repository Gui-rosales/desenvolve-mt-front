import { test, expect } from '@playwright/test';
import { DetailsPage } from '../pages/details';
import { HomePage } from '../pages/home';
import { TEST_CONFIG } from '../setup/test-env';

test.describe('Página Details - Funcionalidades Principais', () => {
  let detailsPage: DetailsPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    detailsPage = new DetailsPage(page);
    homePage = new HomePage(page);
    
    // Navegar para home primeiro e depois para details
    await homePage.navigateToHome();
    await homePage.searchForPerson(TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID);
    await homePage.waitForSearchResults();
    
    // Clicar na primeira pessoa para ir para details
    const personCount = await homePage.getPersonCount();
    if (personCount > 0) {
      await homePage.clickOnPersonCard(0);
      await detailsPage.waitForPersonDetailsToLoad();
    }
  });

  test('Deve carregar detalhes da pessoa com informações corretas', async () => {
    // Verificar se os elementos principais estão visíveis
    await detailsPage.isPersonDetailsVisible();
    await detailsPage.isPersonPhotoVisible();
    await detailsPage.isPersonNameVisible();
    await detailsPage.isStatusBadgeVisible();
    
    // Verificar se as informações básicas estão presentes
    const personName = await detailsPage.getPersonName();
    const personAge = await detailsPage.getPersonAge();
    const personGender = await detailsPage.getPersonGender();
    
    expect(personName).toBeTruthy();
    expect(personAge).toBeTruthy();
    expect(personGender).toBeTruthy();
  });

  test('Deve exibir foto da pessoa corretamente', async () => {
    await detailsPage.isPersonPhotoVisible();
    
    // Verificar se a foto tem alt text apropriado
    const photoAlt = await detailsPage.personPhoto.getAttribute('alt');
    expect(photoAlt).toContain('Foto de');
  });

  test('Deve exibir informações do desaparecimento', async () => {
    // Verificar se a data do desaparecimento está presente
    const disappearanceDate = await detailsPage.getDisappearanceDate();
    expect(disappearanceDate).toBeTruthy();
    
    // Verificar se o local do desaparecimento está presente
    const disappearanceLocation = await detailsPage.getDisappearanceLocation();
    expect(disappearanceLocation).toBeTruthy();
  });

  test('Deve exibir status da pessoa corretamente', async () => {
    await detailsPage.isStatusBadgeVisible();
    
    const statusText = await detailsPage.getStatusText();
    expect(statusText).toBeTruthy();
    
    // Verificar se o status é um dos valores esperados
    const validStatuses = ['Desaparecido', 'Localizado', 'Encontrado'];
    expect(validStatuses.some(status => statusText.includes(status))).toBe(true);
  });

  test('Deve exibir seção de informações da comunidade', async () => {
    await detailsPage.isCommunityInfoSectionVisible();
    
    // Verificar se o título está presente
    await expect(detailsPage.page.locator('h2')).toContainText('Informações da Comunidade');
  });

  test('Deve permitir navegação de volta para home', async () => {
    // Verificar se o botão de voltar está visível
    await expect(detailsPage.backButton).toBeVisible();
    
    // Clicar no botão de voltar
    await detailsPage.goBackToHome();
    
    // Verificar se foi redirecionado para home
    await expect(detailsPage.page).toHaveURL('/');
  });

  test('Deve exibir informações adicionais quando disponíveis', async () => {
    // Verificar se as informações adicionais estão visíveis
    const hasAdditionalInfo = await detailsPage.isAdditionalInfoVisible();
    
    if (hasAdditionalInfo) {
      const additionalInfoText = await detailsPage.getAdditionalInfoText();
      expect(additionalInfoText).toBeTruthy();
    }
  });

  test('Deve exibir vestimentas quando disponíveis', async () => {
    // Verificar se as vestimentas estão visíveis
    const hasVestimentas = await detailsPage.isVestimentasVisible();
    
    if (hasVestimentas) {
      const vestimentasText = await detailsPage.getVestimentasText();
      expect(vestimentasText).toBeTruthy();
    }
  });

  test('Deve exibir cartazes quando disponíveis', async () => {
    // Verificar se há cartazes
    const cartazesCount = await detailsPage.getCartazesCount();
    
    if (cartazesCount > 0) {
      // Verificar se pelo menos o primeiro cartaz está visível
      await detailsPage.isCartazVisible(0);
    }
  });

  test('Deve ter URL correta com ID da pessoa', async () => {
    // Verificar se a URL contém o ID da pessoa
    const currentURL = await detailsPage.getCurrentURL();
    const urlMatch = currentURL.match(/\/(\d+)$/);
    
    expect(urlMatch).toBeTruthy();
    const personId = parseInt(urlMatch![1]);
    expect(personId).toBeGreaterThan(0);
  });
});

test.describe('Página Details - Modal de Ocorrência', () => {
  let detailsPage: DetailsPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    detailsPage = new DetailsPage(page);
    homePage = new HomePage(page);
    
    // Navegar para details
    await homePage.navigateToHome();
    await homePage.searchForPerson(TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID);
    await homePage.waitForSearchResults();
    
    const personCount = await homePage.getPersonCount();
    if (personCount > 0) {
      await homePage.clickOnPersonCard(0);
      await detailsPage.waitForPersonDetailsToLoad();
    }
  });

  test('Deve abrir modal de adicionar ocorrência', async () => {
    // Verificar se o botão está visível
    await expect(detailsPage.addOcorrenciaButton).toBeVisible();
    
    // Clicar no botão para abrir o modal
    await detailsPage.openAddOcorrenciaModal();
    
    // Verificar se o modal está visível
    const isModalVisible = await detailsPage.isAddOcorrenciaModalVisible();
    expect(isModalVisible).toBe(true);
  });

  test('Deve exibir campos obrigatórios no modal', async () => {
    // Abrir modal
    await detailsPage.openAddOcorrenciaModal();
    
    // Verificar se os campos obrigatórios estão presentes
    await expect(detailsPage.page.getByTestId('descricao-textarea')).toBeVisible();
    await expect(detailsPage.page.getByTestId('informacao-textarea')).toBeVisible();
    await expect(detailsPage.page.getByTestId('date-picker-button')).toBeVisible();
  });

  test('Deve permitir preenchimento do formulário de ocorrência', async () => {
    // Abrir modal
    await detailsPage.openAddOcorrenciaModal();
    
    // Preencher formulário
    const testData = {
      descricao: 'Teste de descrição da ocorrência',
      informacao: 'Informação adicional sobre a pessoa',
      data: new Date()
    };
    
    await detailsPage.fillOcorrenciaForm(testData);
    
    // Verificar se os campos foram preenchidos
    await expect(detailsPage.page.getByTestId('descricao-textarea')).toHaveValue(testData.descricao);
    await expect(detailsPage.page.getByTestId('informacao-textarea')).toHaveValue(testData.informacao);
  });

  test('Deve permitir seleção de data no modal', async () => {
    // Abrir modal
    await detailsPage.openAddOcorrenciaModal();
    
    // Selecionar data
    const testDate = new Date();
    await detailsPage.selectDateInOcorrenciaModal(testDate);
    
    // Verificar se a data foi selecionada
    const dateButton = detailsPage.page.getByTestId('date-picker-button');
    await expect(dateButton).toContainText(testDate.getDate().toString());
  });

  test('Deve permitir upload de arquivos', async () => {
    // Abrir modal
    await detailsPage.openAddOcorrenciaModal();
    
    // Verificar se o campo de upload está presente
    await expect(detailsPage.page.getByTestId('file-upload-input')).toBeVisible();
    
    // Verificar se a área de upload está visível
    await expect(detailsPage.page.locator('text=Clique para selecionar arquivos')).toBeVisible();
  });

  test('Deve permitir cancelamento do formulário', async () => {
    // Abrir modal
    await detailsPage.openAddOcorrenciaModal();
    
    // Verificar se o botão de cancelar está presente
    await expect(detailsPage.page.getByTestId('cancel-button')).toBeVisible();
    
    // Clicar no botão de cancelar
    await detailsPage.cancelOcorrenciaForm();
    
    // Verificar se o modal foi fechado
    const isModalVisible = await detailsPage.isAddOcorrenciaModalVisible();
    expect(isModalVisible).toBe(false);
  });

  test('Deve permitir fechamento do modal com ESC', async () => {
    // Abrir modal
    await detailsPage.openAddOcorrenciaModal();
    
    // Fechar modal com ESC
    await detailsPage.closeOcorrenciaModal();
    
    // Verificar se o modal foi fechado
    const isModalVisible = await detailsPage.isAddOcorrenciaModalVisible();
    expect(isModalVisible).toBe(false);
  });

  test('Deve submeter formulário corretamente', async () => {
    // Abrir modal
    await detailsPage.openAddOcorrenciaModal();
    
    // Preencher formulário
    const testData = {
      descricao: 'Descrição de teste',
      informacao: 'Informação de teste',
      data: new Date()
    };
    
    await detailsPage.fillOcorrenciaForm(testData);
    
    // Verificar se o botão de submeter está presente
    await expect(detailsPage.page.getByTestId('submit-button')).toBeVisible();
    
    // Submeter formulário
    await detailsPage.submitOcorrenciaForm();
    
    // Verificar se o modal foi fechado após submissão
    const isModalVisible = await detailsPage.isAddOcorrenciaModalVisible();
    expect(isModalVisible).toBe(false);
  });
});

test.describe('Página Details - Cenários de Erro e Loading', () => {
  let detailsPage: DetailsPage;

  test.beforeEach(async ({ page }) => {
    detailsPage = new DetailsPage(page);
  });

  test('Deve exibir loading ao carregar detalhes', async () => {
    // Navegar para uma pessoa que não existe para simular loading
    await detailsPage.navigateToPersonDetails(999999);
    
    // Verificar se o loading é exibido
    await detailsPage.expectLoadingToBeVisible();
  });

  test('Deve exibir erro quando pessoa não é encontrada', async () => {
    // Navegar para uma pessoa que não existe
    await detailsPage.navigateToPersonDetails(999999);
    
    // Aguardar e verificar se o erro é exibido
    await detailsPage.page.waitForTimeout(2000);
    await detailsPage.expectErrorToBeVisible();
  });

  test('Deve permitir nova tentativa após erro', async () => {
    // Navegar para uma pessoa que não existe
    await detailsPage.navigateToPersonDetails(999999);
    
    // Aguardar erro
    await detailsPage.page.waitForTimeout(2000);
    await detailsPage.expectErrorToBeVisible();
    
    // Verificar se o botão de retry está presente
    const retryButton = detailsPage.page.getByRole('button', { name: 'Tentar novamente' });
    await expect(retryButton).toBeVisible();
  });

  test('Deve exibir botão de voltar mesmo com erro', async () => {
    // Navegar para uma pessoa que não existe
    await detailsPage.navigateToPersonDetails(999999);
    
    // Aguardar erro
    await detailsPage.page.waitForTimeout(2000);
    
    // Verificar se o botão de voltar ainda está visível
    await expect(detailsPage.backButton).toBeVisible();
  });
});

test.describe('Página Details - Responsividade e UX', () => {
  let detailsPage: DetailsPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    detailsPage = new DetailsPage(page);
    homePage = new HomePage(page);
    
    // Navegar para details
    await homePage.navigateToHome();
    await homePage.searchForPerson(TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID);
    await homePage.waitForSearchResults();
    
    const personCount = await homePage.getPersonCount();
    if (personCount > 0) {
      await homePage.clickOnPersonCard(0);
      await detailsPage.waitForPersonDetailsToLoad();
    }
  });

  test('Deve exibir layout responsivo em diferentes tamanhos de tela', async () => {
    // Testar em tela pequena
    await detailsPage.page.setViewportSize({ width: 375, height: 667 });
    await expect(detailsPage.page.locator('h1')).toBeVisible();
    
    // Testar em tela média
    await detailsPage.page.setViewportSize({ width: 768, height: 1024 });
    await expect(detailsPage.page.locator('h1')).toBeVisible();
    
    // Testar em tela grande
    await detailsPage.page.setViewportSize({ width: 1920, height: 1080 });
    await expect(detailsPage.page.locator('h1')).toBeVisible();
  });

  test('Deve ter navegação por teclado funcional', async () => {
    // Navegar pelo modal usando Tab
    await detailsPage.openAddOcorrenciaModal();
    
    // Focar no primeiro campo
    await detailsPage.page.getByTestId('descricao-textarea').focus();
    
    // Navegar com Tab
    await detailsPage.page.keyboard.press('Tab');
    
    // Verificar se o foco foi para o próximo campo
    await expect(detailsPage.page.getByTestId('informacao-textarea')).toBeFocused();
  });

  test('Deve ter mensagens de acessibilidade apropriadas', async () => {
    // Verificar se os elementos têm labels apropriados
    await expect(detailsPage.personPhoto).toHaveAttribute('alt');
    
    // Verificar se os botões têm textos descritivos
    await expect(detailsPage.backButton).toContainText('Voltar');
    await expect(detailsPage.addOcorrenciaButton).toContainText('Registrar Informação');
  });

  test('Deve exibir informações organizadas em cards', async () => {
    // Verificar se as informações estão organizadas em cards
    const cards = detailsPage.page.locator('.border, .bg-card');
    const cardCount = await cards.count();
    
    expect(cardCount).toBeGreaterThan(0);
  });

  test('Deve ter espaçamento e hierarquia visual adequados', async () => {
    // Verificar se há espaçamento adequado entre seções
    const sections = detailsPage.page.locator('.space-y-6, .space-y-4');
    const sectionCount = await sections.count();
    
    expect(sectionCount).toBeGreaterThan(0);
  });
});
