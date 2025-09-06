import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Setup MSW if NODE_ENV is test
  if (process.env.NODE_ENV === 'test') {
    console.log('🔧 Configurando MSW para testes...');
    
    // Start the browser to initialize MSW
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Navigate to the app to trigger MSW initialization
    await page.goto(config.projects[0].use?.baseURL || 'http://localhost:5173');
    
    // Wait a bit for MSW to initialize
    await page.waitForTimeout(1000);
    
    await browser.close();
    console.log('✅ MSW configurado com sucesso!');
  } else {
    console.log('🌐 Usando API de staging...');
  }
}

export default globalSetup;
