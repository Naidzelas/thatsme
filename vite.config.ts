import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { copyFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const githubPagesBase = process.env.VITE_BASE_PATH ?? '/thatsme/';

const githubPagesFallback = () => ({
    name: 'github-pages-fallback',
    closeBundle: async () => {
        await copyFile('dist/index.html', 'dist/404.html');
    },
});

export default defineConfig(({ command }) => ({
    base: command === 'build' ? githubPagesBase : '/',
    build: {
        outDir: 'dist',
    },
    plugins: [
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        githubPagesFallback(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
        },
    },
}));
