import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        exclude: ['**/node_modules/**', '**/public/**'],
        environment: 'jsdom', // for testing DOM related functionalities
        setupFiles: 'setup.vitest.ts',
        globals: true, // TODO setup globals per environment https://github.com/vitest-dev/vitest/tree/main/test/global-setup/test
    },
});
