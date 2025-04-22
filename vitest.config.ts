import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()], // tsconfigPaths first helps resolve paths for react plugin too
  test: {
    globals: true, // Allows using describe, it, expect globally without importing
    environment: 'jsdom', // Simulate browser environment
    setupFiles: './vitest.setup.ts', // Path to the setup file
    exclude: [
      '**/node_modules/**', // Default exclusion
      '**/dist/**', // Default exclusion
      '**/cypress/**', // Default exclusion
      '**/.{idea,git,cache,output,temp}/**', // Default exclusion
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*', // Default config exclusion
      '**/e2e/**' // <--- Add this line to exclude Playwright tests
    ],
  },
}); 