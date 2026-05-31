import { createRouter, createWebHistory } from 'vue-router';

import Experience from '@/pages/Experience.vue';
import Home from '@/pages/Home.vue';
import Projects from '@/pages/Projects.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Trimzales';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'CV',
            },
        },
        {
            path: '/experience',
            name: 'experience',
            component: Experience,
            meta: {
                title: 'Work Experience',
            },
        },
        {
            path: '/projects',
            name: 'projects',
            component: Projects,
            meta: {
                title: 'Projects',
            },
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
    scrollBehavior() {
        return { top: 0 };
    },
});

router.afterEach((to) => {
    const title = typeof to.meta.title === 'string' ? to.meta.title : undefined;
    document.title = title ? `${title} - ${appName}` : appName;
});

export default router;
