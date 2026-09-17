import { test, users, Essays, Login } from '../../support';

test.setTimeout(0);

let login: Login;
let essays: Essays;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essays = new Essays(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
    await essays.clickCreateEssay();

});
test('dump do banner de cookies', async ({ page }) => {
  await page.goto('/'); // ajuste se precisar de URL completa
  await page.waitForTimeout(10000); // tempo pro banner subir


  // 1) Existe iframe na página?
  console.log('--- FRAMES ---');
  for (const f of page.frames()) {
    console.log(`frame: name="${f.name()}" url="${f.url()}"`);
  }

  // 2) Todos os elementos clicáveis visíveis e seus textos
  console.log('--- CLICÁVEIS VISÍVEIS ---');
  const dump = await page.evaluate(() => {
    const out: string[] = [];
    document
      .querySelectorAll('button, a, [role="button"], input[type="button"], input[type="submit"]')
      .forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        out.push(
          `<${el.tagName.toLowerCase()}> text="${(el.textContent || '').trim().slice(0, 60)}" ` +
          `id="${el.id}" class="${(el.className || '').toString().slice(0, 60)}" ` +
          `aria-label="${el.getAttribute('aria-label') ?? ''}"`,
        );
      });
    return out;
  });
  dump.forEach((l) => console.log(l));

  // 3) Existe shadow DOM fechado? (Playwright não enxerga esses)
  const shadowHosts = await page.evaluate(() =>
    [...document.querySelectorAll('*')]
      .filter((el) => (el as any).shadowRoot)
      .map((el) => el.tagName.toLowerCase()),
  );
  console.log('--- SHADOW HOSTS ---', shadowHosts);
});