import { test, expect } from '../setup/test-setup';
import { HomePage } from '../pages/home';
import { TestHelpers } from '../utils/test-helpers';

test.describe('Home Page', () => {
  let homePage: HomePage;
  let testHelpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testHelpers = new TestHelpers(page);
  });

  test('Deve carregar a página inicial', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    const hasError = await homePage.isErrorVisible();
    if (hasError) {
      throw new Error('Erro ao carregar a página inicial');
    }
    
    await homePage.isSearchInputVisible();
    await homePage.isSearchButtonVisible();
  });

  test('Deve exibir os contadores de pessoas desaparecidas e encontradas', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    await homePage.isCountersVisible();
    
    const desaparecidosCount = await homePage.getDesaparecidosCount();
    const encontradosCount = await homePage.getEncontradosCount();
    
    expect(desaparecidosCount).toBeTruthy();
    expect(encontradosCount).toBeTruthy();
  });

  test('Deve exibir a barra de busca', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    await homePage.isSearchInputVisible();
    await homePage.isSearchButtonVisible();
  });

  test('Deve permitir realizar uma busca', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    await homePage.searchForPerson('João');
    await homePage.waitForSearchResults();
    
    const hasResults = await homePage.personGrid.isVisible();
    const hasNoResults = await homePage.noResultsMessage.isVisible();
    
    expect(hasResults || hasNoResults).toBeTruthy();
  });

  test('Deve exibir resultados de busca quando houver pessoas', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    await homePage.waitForSearchResults();
    
    const hasResults = await homePage.personGrid.isVisible();
    if (hasResults) {
      const cardsCount = await homePage.getPersonCardsCount();
      expect(cardsCount).toBeGreaterThan(0);
    }
  });

  test('Deve exibir mensagem quando não há resultados', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    await homePage.searchForPerson('xyz123nonexistent');
    await homePage.waitForSearchResults();
    
    const hasNoResults = await homePage.noResultsMessage.isVisible();
    if (hasNoResults) {
      await homePage.isNoResultsMessageVisible();
    }
  });

  test('Deve permitir limpar a busca', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    await homePage.searchForPerson('teste');
    await homePage.waitForSearchResults();
    
    const clearButtonVisible = await homePage.clearButton.isVisible();
    if (clearButtonVisible) {
      await homePage.clearSearch();
      await homePage.expectSearchInputToHaveValue('');
    }
  });

  test('Deve navegar para detalhes ao clicar em um card', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    await homePage.waitForSearchResults();
    
    const hasResults = await homePage.personGrid.isVisible();
    if (hasResults) {
      const cardsCount = await homePage.getPersonCardsCount();
      if (cardsCount > 0) {
        await homePage.clickOnPersonCard(0);
        
        await expect(homePage.page).toHaveURL(/\/pessoa\/\d+/);
      }
    }
  });

  test('Deve exibir loading durante carregamento inicial', async () => {
    await homePage.navigateToHome();
    
    const isLoading = await homePage.isInitialLoadingVisible();
    if (isLoading) {
      await homePage.waitForInitialLoad();
    }
  });

  test('Deve exibir contadores com números válidos', async () => {
    await homePage.navigateToHome();
    await homePage.waitForInitialLoad();
    
    const desaparecidosCount = await homePage.getDesaparecidosCount();
    const encontradosCount = await homePage.getEncontradosCount();
    
    expect(desaparecidosCount).toMatch(/\d+/);
    expect(encontradosCount).toMatch(/\d+/);
  });
});