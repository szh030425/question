import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@vte/scoring-core': fileURLToPath(
        new URL('../../packages/scoring-core/src/index.ts', import.meta.url)
      ),
      '@vte/scale-data': fileURLToPath(
        new URL('../../packages/scale-data/src/index.ts', import.meta.url)
      ),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
});
