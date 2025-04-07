import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.', // raíz del proyecto
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                dashboard: resolve(__dirname, 'src/dashboard.html'),
            },
        },
    },
    server: {
        open: '/src/index.html', // para que abra el login al hacer npm run dev
    },
});
