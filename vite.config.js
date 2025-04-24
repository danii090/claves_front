import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.', // raíz del proyecto
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/views/index.html'),
                dashboard: resolve(__dirname, 'src/views/dashboard.html'),
            },
        },
    },
    server: {
        open: '/src/views/index.html', // para que abra el login al hacer npm run dev
    },
});
