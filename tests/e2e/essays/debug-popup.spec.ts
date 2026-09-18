// tests/e2e/debug-theme.spec.ts
import { test, users, Essays, Login } from '../../support';

test.setTimeout(0);

test('dump da área de Resultado', async ({ page }) => {
  const login = new Login(page);
  const essays = new Essays(page);

  await login.login(users.valid.email, users.valid.password);
  await login.IsLoggedIn();
  await essays.clickCreateEssay();

  await essays.selectVestibular('Enem'); // ajuste o valor conforme seu método real
  await essays.selectRandomArea();

  await page.waitForTimeout(3000);

  const resultTitle = page.getByText('Resultado', { exact: true });
  console.log('Resultado title count:', await resultTitle.count());

  const allDivsWithResultado = page.locator('div', { hasText: 'Resultado' });
  console.log('divs contendo "Resultado":', await allDivsWithResultado.count());

  const themeText = 'O estigma associado às doenças mentais na sociedade brasileira';
  const byText = page.getByText(themeText);
  console.log('getByText(tema) count:', await byText.count());

  const allP = page.locator('p');
  console.log('total de <p> na página:', await allP.count());

  const pWithTheme = page.locator('p').filter({ hasText: 'estigma associado' });
  console.log('p filtrado por "estigma associado":', await pWithTheme.count());

  if (await pWithTheme.count() > 0) {
    const box = await pWithTheme.first().boundingBox();
    console.log('bounding box do <p> encontrado:', box);
    const isVisible = await pWithTheme.first().isVisible();
    console.log('está visível?', isVisible);
  }

  await page.screenshot({ path: 'debug-theme-screenshot.png', fullPage: true });
});