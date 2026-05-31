import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import { createApp } from 'vue';

import '../css/app.css';
import App from './App.vue';
import { i18n } from './i18n';
import MyPreset from './presets/MyPreset';
import router from './router';

createApp(App)
    .use(router)
    .use(i18n)
    .use(PrimeVue, {
        ripple: true,
        theme: {
            preset: MyPreset,
            options: {
                darkModeSelector: '.dark',
            },
        },
    })
    .mount('#app');
