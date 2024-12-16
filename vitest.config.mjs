import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

process.env.TZ = 'UTC';

export default defineConfig({
    test: {
        include: ['**/*.spec.ts'],
        globals: true,
        setupFiles: ['./vitest.faketimers.js'],
        exclude: ['**/node_modules/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            reportsDirectory: './coverage',
            exclude: ['**/node_modules/**', '**/*.js'],
        },
        clearMocks: true,
    },
    plugins: [swc.vite()],
});
