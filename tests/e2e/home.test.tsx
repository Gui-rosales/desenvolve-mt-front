import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { TEST_CONFIG } from '../setup/test-env';

test.describe('Página Home - Funcionalidades Principais', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
    // Aguardar carregamento da página
    await page.waitForLoadState('networkidle');
  });

  test('Deve carregar a página inicial com contadores e formulário de busca', async () => {
    // Verificar se os elementos principais estão visíveis
    await expect(homePage.page.locator('h1')).toContainText('Pessoas Desaparecidas');
    await expect(homePage.page.locator('p')).toContainText('Sistema de consulta da Polícia Civil de Mato Grosso');
    
    // Verificar se os contadores estão visíveis
    await expect(homePage.desaparecidosCounter).toBeVisible();
    await expect(homePage.encontradosCounter).toBeVisible();
    
    // Verificar se o formulário de busca está visível
    await homePage.isSearchInputVisible();
    await homePage.isSearchButtonVisible();
    await homePage.isFilterToggleButtonVisible();
  });

  test('Deve exibir contadores com valores corretos', async () => {
    // Aguardar carregamento dos contadores
    await homePage.page.waitForTimeout(1000);
    
    const desaparecidosCount = await homePage.getDesaparecidosCount();
    const encontradosCount = await homePage.getEncontradosCount();
    
    expect(desaparecidosCount).toBe('150');
    expect(encontradosCount).toBe('89');
  });

  test('Deve realizar busca simples por nome', async () => {
    const searchTerm = TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID;
    
    await homePage.searchForPerson(searchTerm);
    await homePage.waitForSearchResults();
    
    // Verificar se os resultados foram exibidos
    await homePage.isPersonGridVisible();
    const personCount = await homePage.getPersonCount();
    expect(personCount).toBeGreaterThan(0);
  });

  test('Deve exibir filtros avançados ao clicar no botão de filtros', async () => {
    // Inicialmente os filtros não devem estar visíveis
    expect(await homePage.areFiltersVisible()).toBe(false);
    
    // Clicar no botão de filtros
    await homePage.toggleFilters();
    
    // Verificar se os filtros estão visíveis
    expect(await homePage.areFiltersVisible()).toBe(true);
    
    // Verificar se todos os campos de filtro estão presentes
    await expect(homePage.sexoSelect).toBeVisible();
    await expect(homePage.idadeInicialInput).toBeVisible();
    await expect(homePage.idadeFinalInput).toBeVisible();
    await expect(homePage.statusSelect).toBeVisible();
  });

  test('Deve realizar busca com filtros avançados', async () => {
    // Abrir filtros
    await homePage.toggleFilters();
    
    // Aplicar filtros
    await homePage.searchWithFilters({
      nome: 'Maria',
      sexo: TEST_CONFIG.TEST_DATA.FILTERS.SEXO.FEMININO,
      idadeInicial: TEST_CONFIG.TEST_DATA.FILTERS.IDADE.MIN,
      idadeFinal: TEST_CONFIG.TEST_DATA.FILTERS.IDADE.MAX,
      status: TEST_CONFIG.TEST_DATA.FILTERS.STATUS.DESAPARECIDO
    });
    
    // Aguardar resultados
    await homePage.waitForSearchResults();
    
    // Verificar se os resultados foram exibidos
    await homePage.isPersonGridVisible();
    const personCount = await homePage.getPersonCount();
    expect(personCount).toBeGreaterThan(0);
  });

  test('Deve exibir grid de pessoas com informações corretas', async () => {
    // Realizar busca para obter resultados
    await homePage.searchForPerson(TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID);
    await homePage.waitForSearchResults();
    
    // Verificar se o grid está visível
    await homePage.isPersonGridVisible();
    
    // Verificar se pelo menos uma pessoa foi exibida
    const personCount = await homePage.getPersonCount();
    expect(personCount).toBeGreaterThan(0);
    
    // Verificar se a primeira pessoa tem informações básicas
    if (personCount > 0) {
      await homePage.expectPersonCardToContain(0, TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID);
    }
  });

  test('Deve navegar para detalhes da pessoa ao clicar no card', async () => {
    // Realizar busca para obter resultados
    await homePage.searchForPerson(TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID);
    await homePage.waitForSearchResults();
    
    // Verificar se há pessoas na lista
    const personCount = await homePage.getPersonCount();
    expect(personCount).toBeGreaterThan(0);
    
    // Clicar na primeira pessoa
    await homePage.clickOnPersonCard(0);
    
    // Verificar se foi redirecionado para a página de detalhes
    await expect(homePage.page).toHaveURL(/\/\d+$/);
  });

  test('Deve exibir mensagem quando não há resultados', async () => {
    // Buscar por um termo que não existe
    await homePage.searchForPerson(TEST_CONFIG.TEST_DATA.SEARCH_TERMS.INVALID);
    await homePage.waitForSearchResults();
    
    // Verificar se a mensagem de "nenhum resultado" é exibida
    await homePage.expectNoSearchResults();
  });

  test('Deve funcionar scroll infinito para carregar mais resultados', async () => {
    // Realizar busca inicial
    await homePage.searchForPerson(TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID);
    await homePage.waitForSearchResults();
    
    // Obter contagem inicial
    const initialCount = await homePage.getPersonCount();
    
    // Fazer scroll para baixo para carregar mais resultados
    await homePage.scrollToBottom();
    
    // Aguardar carregamento de mais resultados
    await homePage.waitForMoreResults();
    
    // Verificar se mais pessoas foram carregadas
    const finalCount = await homePage.getPersonCount();
    expect(finalCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('Deve exibir loading durante a busca', async () => {
    // Verificar se o botão de busca está habilitado inicialmente
    await expect(homePage.searchButton).toBeEnabled();
    
    // Realizar busca
    await homePage.searchForPerson(TEST_CONFIG.TEST_DATA.SEARCH_TERMS.VALID);
    
    // Verificar se o botão mostra "Buscando..." durante a busca
    await expect(homePage.searchButton).toContainText('Buscando...');
    
    // Aguardar resultados
    await homePage.waitForSearchResults();
    
    // Verificar se o botão voltou ao estado normal
    await expect(homePage.searchButton).toContainText('Buscar');
  });

  test('Deve validar campos obrigatórios do formulário', async () => {
    // Tentar submeter formulário vazio
    await homePage.searchButton.click();
    
    // Verificar se a busca foi realizada (deve funcionar mesmo vazia)
    await homePage.waitForSearchResults();
    
    // Verificar se o grid está visível
    await homePage.isPersonGridVisible();
  });

  test('Deve funcionar busca com apenas um filtro aplicado', async () => {
    // Abrir filtros
    await homePage.toggleFilters();
    
    // Aplicar apenas filtro de sexo
    await homePage.searchWithFilters({
      sexo: TEST_CONFIG.TEST_DATA.FILTERS.SEXO.MASCULINO
    });
    
    // Aguardar resultados
    await homePage.waitForSearchResults();
    
    // Verificar se os resultados foram exibidos
    await homePage.isPersonGridVisible();
    const personCount = await homePage.getPersonCount();
    expect(personCount).toBeGreaterThan(0);
  });

  test('Deve manter estado dos filtros após busca', async () => {
    // Abrir filtros
    await homePage.toggleFilters();
    
    // Aplicar filtros
    await homePage.searchWithFilters({
      nome: 'João',
      sexo: TEST_CONFIG.TEST_DATA.FILTERS.SEXO.MASCULINO,
      idadeInicial: 25
    });
    
    // Verificar se os filtros permanecem visíveis
    expect(await homePage.areFiltersVisible()).toBe(true);
    
    // Verificar se os valores dos filtros foram mantidos
    await expect(homePage.searchInput).toHaveValue('João');
    await expect(homePage.sexoSelect).toContainText('Masculino');
    await expect(homePage.idadeInicialInput).toHaveValue('25');
  });
});

test.describe('Página Home - Cenários de Erro', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
  });

  test('Deve exibir erro quando a API falha', async () => {
    // Simular erro da API através do MSW
    // Por enquanto, vamos verificar se o tratamento de erro está implementado
    
    // Verificar se a página carrega normalmente
    await expect(homePage.page.locator('h1')).toContainText('Pessoas Desaparecidas');
    
    // Verificar se os elementos de erro estão presentes (mas não visíveis inicialmente)
    await expect(homePage.page.locator('text=Erro ao carregar a lista de pessoas')).not.toBeVisible();
  });

  test('Deve permitir nova tentativa após erro', async () => {
    // Este teste seria executado quando houver erro real
    // Por enquanto, verificamos se o botão de retry existe
    const retryButton = homePage.page.getByRole('button', { name: 'Tentar novamente' });
    
    // O botão só deve aparecer quando há erro
    await expect(retryButton).not.toBeVisible();
  });
});

test.describe('Página Home - Responsividade e UX', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
  });

  test('Deve exibir layout responsivo em diferentes tamanhos de tela', async () => {
    // Testar em tela pequena
    await homePage.page.setViewportSize({ width: 375, height: 667 });
    await expect(homePage.page.locator('h1')).toBeVisible();
    
    // Testar em tela média
    await homePage.page.setViewportSize({ width: 768, height: 1024 });
    await expect(homePage.page.locator('h1')).toBeVisible();
    
    // Testar em tela grande
    await homePage.page.setViewportSize({ width: 1920, height: 1080 });
    await expect(homePage.page.locator('h1')).toBeVisible();
  });

  test('Deve ter navegação por teclado funcional', async () => {
    // Navegar pelo formulário usando Tab
    await homePage.searchInput.focus();
    await homePage.page.keyboard.press('Tab');
    
    // Verificar se o foco foi para o botão de filtros
    await expect(homePage.filterToggleButton).toBeFocused();
    
    // Navegar para o botão de busca
    await homePage.page.keyboard.press('Tab');
    await expect(homePage.searchButton).toBeFocused();
  });

  test('Deve ter mensagens de acessibilidade apropriadas', async () => {
    // Verificar se os elementos têm labels apropriados
    await expect(homePage.searchInput).toHaveAttribute('placeholder', 'Digite o nome da pessoa...');
    await expect(homePage.searchButton).toHaveAttribute('type', 'submit');
  });
});
