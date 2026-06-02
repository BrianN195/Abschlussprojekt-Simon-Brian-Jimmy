// Hinweis: Diese Konfiguration enthält optionalen Support für ältere Browser.
// Wenn `@vitejs/plugin-legacy` installiert ist, erzeugt Vite zusätzliche
// Legacy-Bundles und Polyfill-Loader, die ältere Chromium-/Safari-/WebView-
// Umgebungen unterstützen.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
let legacy: any = undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  legacy = require('@vitejs/plugin-legacy').default;
} catch (e) {
  // plugin not installed in some environments, continue without legacy
  legacy = undefined;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ...(legacy ? [legacy({ targets: ['defaults', 'not IE 11'] })] : [])],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
