import { defineConfig } from '@playwright/test';
import serverChromium from '@sparticuz/chromium';
import { existsSync, readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { brotliDecompressSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let launchOptions = {};
// Optional self-contained Linux browser for network-restricted CI environments.
if (process.env.BUNDLED_BROWSER === '1') {
  const bin = join(require.resolve('@sparticuz/chromium'), '../../bin');
  const libs = mkdtempSync(join(tmpdir(), 'forest-browser-'));
  const archive = join(bin, 'al2023.tar.br');
  if (existsSync(archive)) {
    const tar = join(libs, 'libraries.tar');
    writeFileSync(tar, brotliDecompressSync(readFileSync(archive)));
    execFileSync('tar', ['-xf', tar, '-C', libs]);
  }
  launchOptions = {
    executablePath: await serverChromium.executablePath(),
    args: serverChromium.args.filter((arg) => arg !== '--single-process'),
    env: {
      ...process.env,
      LD_LIBRARY_PATH: `${join(libs, 'lib')}:${process.env.LD_LIBRARY_PATH || ''}`,
    },
  };
}
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    viewport: { width: 1440, height: 1000 },
    launchOptions,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --port 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
