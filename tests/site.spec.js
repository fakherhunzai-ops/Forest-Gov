import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { nav } from '../src/data.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('preserves desktop navigation order and opens every official dropdown', async ({ page }) => {
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(navigation.locator('.nav-trigger')).toHaveText(nav.map((n) => n.label));
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeHidden();
  for (const item of nav.filter((n) => n.links)) {
    const button = navigation.getByRole('button', { name: item.label, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    for (const [label, path] of item.links) {
      const link = navigation.getByRole('link', { name: label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `https://fwegb.gov.pk/${path}/`);
    }
    await button.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toBeFocused();
  }
});

test('update tabs show the correct content and keyboard selection works', async ({ page }) => {
  const panel = page.locator('#updates-panel');
  await page.getByRole('tab', { name: 'Public Notices', exact: true }).click();
  await expect(panel.getByRole('heading', { name: 'Spring tree plantation 2024' })).toBeVisible();
  await expect(panel.locator('.update-card')).toHaveCount(1);
  await page.getByRole('tab', { name: 'Tenders', exact: true }).click();
  await expect(
    panel.getByRole('heading', { name: 'Expression of interest for wildlife census / surveys' }),
  ).toBeVisible();
  await page.getByRole('tab', { name: 'Tenders', exact: true }).press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Jobs', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(
    panel.getByRole('heading', { name: 'No current vacancies announced' }),
  ).toBeVisible();
  await page.getByRole('tab', { name: 'Jobs', exact: true }).press('Home');
  await expect(page.getByRole('tab', { name: 'News', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('resource tabs expose correct official PDF destinations', async ({ page }) => {
  for (const label of ['Reports & Publications', 'Guidelines', 'Acts & Rules']) {
    await page.getByRole('tab', { name: label, exact: true }).click();
    for (const link of await page.locator('#resources-panel a').all()) {
      await expect(link).toHaveAttribute(
        'href',
        /^https:\/\/fwegb\.gov\.pk\/wp-content\/uploads\/.+\.pdf$/,
      );
    }
  }
  const link = page.getByRole('link', { name: 'Open PDF: Gilgit-Baltistan Forest Act, 2019' });
  await expect(link).toHaveAttribute(
    'href',
    'https://fwegb.gov.pk/wp-content/uploads/2025/03/GB-Forest-Act-2019.pdf',
  );
  // Check the actual navigation action without depending on the external server.
  await page.route('https://fwegb.gov.pk/**', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<h1>Official document destination</h1>' }),
  );
  await link.click();
  await expect(page).toHaveURL(
    'https://fwegb.gov.pk/wp-content/uploads/2025/03/GB-Forest-Act-2019.pdf',
  );
});

test('search filters, handles no matches and restores focus on close', async ({ page }) => {
  const trigger = page
    .getByRole('button', { name: 'Search website', exact: true })
    .filter({ visible: true });
  await trigger.click();
  const search = page.getByRole('searchbox');
  await expect(search).toBeFocused();
  await search.fill('forest');
  await expect(page.locator('.search-results')).toContainText('Forest Carbon Inventory');
  await search.fill('nonexistentsearch123');
  await expect(page.getByRole('heading', { name: 'No matching results' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(search).toHaveValue('');
  await expect(search).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.keyboard.press('/');
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('resource library filtering, archive links and dialog focus trap', async ({ page }) => {
  await page.getByRole('button', { name: 'Browse resource library' }).click();
  await page.getByRole('button', { name: 'Guidelines', exact: true }).click();
  await expect(page.locator('.search-result')).toHaveCount(2);
  await page.getByRole('searchbox').fill('trophy');
  await expect(page.locator('.search-result')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'All official reports' })).toHaveAttribute(
    'href',
    'https://fwegb.gov.pk/reports/',
  );
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement.closest('dialog'))).toBe(true);
  }
});

test('mobile navigation toggles, expands and closes with escape or anchor navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const open = page.getByRole('button', { name: 'Open navigation', exact: true });
  await open.click();
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav).toBeVisible();
  const departments = nav.getByRole('button', { name: 'Attached Departments', exact: true });
  await departments.click();
  await expect(nav.getByRole('link', { name: 'Forest', exact: true })).toBeVisible();
  await departments.press('Escape');
  await expect(departments).toHaveAttribute('aria-expanded', 'false');
  await departments.press('Escape');
  await expect(nav).toBeHidden();
  await expect(open).toBeFocused();
  await open.click();
  await nav.getByRole('link', { name: 'Contact Us' }).click();
  await expect(nav).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);
});

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`layout fits ${width}px, all images load, all internal anchors exist`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.evaluate(async () => {
      const images = [...document.images];
      images.forEach((img) => {
        img.loading = 'eager';
      });
      await Promise.all(images.map((img) => img.decode()));
      await document.fonts.ready;
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const images = await page
      .locator('img')
      .evaluateAll((imgs) =>
        imgs.every(
          (img) =>
            img.complete && img.naturalWidth > 0 && new URL(img.src).origin === location.origin,
        ),
      );
    expect(images).toBe(true);
    expect(
      await page
        .locator('a[href^="#"]')
        .evaluateAll((anchors) =>
          anchors.every((a) => a.hash.length > 1 && document.querySelector(a.hash)),
        ),
    ).toBe(true);
    await page.locator('#resources').scrollIntoViewIfNeeded();
    const header = await page.locator('header').boundingBox();
    expect(header.y).toBe(0);
  });
}

test('no runtime errors, missing local assets or placeholder links', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.url().startsWith('http://localhost:5173') && response.status() >= 400)
      errors.push(response.url());
  });
  await page.reload();
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
  expect(
    await page
      .locator('a')
      .evaluateAll((links) =>
        links.every(
          (a) =>
            a.getAttribute('href') &&
            a.getAttribute('href') !== '#' &&
            !a.getAttribute('href').startsWith('javascript:'),
        ),
      ),
  ).toBe(true);
  await expect(page.getByRole('link', { name: '+92 5811 920146', exact: true })).toHaveAttribute(
    'href',
    'tel:+925811920146',
  );
});

for (const width of [390, 1440]) {
  test(`WCAG A/AA automated checks at ${width}px and interactive states`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    const scan = async () => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    };
    await scan();
    await page.getByRole('tab', { name: 'Jobs', exact: true }).click();
    await page.getByRole('tab', { name: 'Acts & Rules', exact: true }).click();
    await scan();
    await page.getByRole('button', { name: 'Search website' }).filter({ visible: true }).click();
    await page.getByRole('searchbox').fill('forest');
    await scan();
  });
}

test('reduced motion, skip link and source information are available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.getByRole('button', { name: 'Sources & image credits' }).click();
  await expect(page.getByRole('dialog')).toContainText('14 October 2026');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('button', { name: 'Accessibility', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Use arrow keys');
});
