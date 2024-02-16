import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],

    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/utils/index.ts'),
            name: 'HotKeysController',
            // the proper extensions will be added
            fileName: 'index'
        },
        outDir: 'dist',
        emptyOutDir: false,
        minify: 'esbuild'
    }
});
