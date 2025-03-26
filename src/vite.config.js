import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // すべてのホストから接続可能にする
        port: 5173,      // Dockerのポートマッピングと合わせる
        watch: {
            usePolling: true, // Dockerのためにポーリングを有効化
        },
    },
});
