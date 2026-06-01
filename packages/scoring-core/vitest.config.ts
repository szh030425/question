import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@vte/scale-data': fileURLToPath(
        new URL('../scale-data/src/index.ts', import.meta.url)
      ),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
