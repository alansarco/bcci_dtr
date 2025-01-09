import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.scss',
                'resources/js/app.js',
                'resources/js/persona.js',
                'resources/js/customFingerprint.js',
                'resources/js/registerFingerprint.js',
            ],
            refresh: true,
        }),
        commonjs({
            include: [
                '@digitalpersona/core',
                '@digitalpersona/devices', // Add this to ensure it's included
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    build: {
        commonjsOptions: {
            include: [/node_modules/],
            transformMixedEsModules: true, // Ensure mixed ESM/CommonJS modules are transformed
        },
        rollupOptions: {
            external: ['@digitalpersona/devices'], // Externalize the module if not meant to be bundled
        },
    },
});
