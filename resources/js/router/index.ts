import { createRouter, createWebHistory } from 'vue-router';

const appName = import.meta.env.VITE_APP_NAME || 'Trimzales';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/Home.vue'),
            meta: {
                title: 'CV',
            },
        },
        {
            path: '/experience',
            name: 'experience',
            component: () => import('@/pages/Experience.vue'),
            meta: {
                title: 'Work Experience',
            },
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('@/pages/Projects.vue'),
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
