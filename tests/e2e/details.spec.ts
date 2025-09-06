import { test, expect } from '../setup/test-setup';
import { DetailsPage } from '../pages/details';
import { TestHelpers } from '../utils/test-helpers';

test.describe('Details Page', () => {
  let detailsPage: DetailsPage;
  let testHelpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    detailsPage = new DetailsPage(page);
    testHelpers = new TestHelpers(page);
  });

  test('Deve carregar a página de detalhes de uma pessoa', async () => {
    await detailsPage.navigateToPersonDetails(1);
    
    const hasError = await detailsPage.page.locator('text=Pessoa não encontrada ou erro ao carregar informações').isVisible();
    if (hasError) {
      throw new Error('Pessoa não encontrada - verifique se existe uma pessoa com ID 1');
    }
    
    await detailsPage.waitForPersonDetailsToLoad();
    await detailsPage.isPersonDetailsVisible();
  });

  test('Deve exibir a foto da pessoa', async () => {
    await detailsPage.navigateToPersonDetails(1);
    await detailsPage.waitForPersonDetailsToLoad();
    await detailsPage.isPersonPhotoVisible();
  });

  test('Deve exibir o nome da pessoa', async () => {
    await detailsPage.navigateToPersonDetails(1);
    await detailsPage.waitForPersonDetailsToLoad();
    await detailsPage.isPersonNameVisible();
  });

  test('Deve exibir o botão de voltar', async () => {
    await detailsPage.navigateToPersonDetails(1);
    await detailsPage.waitForPersonDetailsToLoad();
    await expect(detailsPage.backButton).toBeVisible();
  });

  test('Deve navegar de volta para a home ao clicar no botão voltar', async () => {
    await detailsPage.navigateToPersonDetails(1);
    await detailsPage.waitForPersonDetailsToLoad();
    
    await detailsPage.goBackToHome();
    await expect(detailsPage.page).toHaveURL('/');
  });
});
