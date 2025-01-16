import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: false,
      name: 'chromium',
    },
    exclude: ['**/node_modules/**'],
    environment: "jsdom",
    setupFiles: 'setup-file.ts'
  },
})