<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRoute } from 'vue-router';

import ProjectStory from '@/components/ProjectStory.vue';
import { usePortfolio } from '@/composables/usePortfolio';

const appName = import.meta.env.VITE_APP_NAME || "That's me";
const route = useRoute();
const { t } = useI18n({ useScope: 'global' });
const { content } = usePortfolio();

const projectSlug = computed(() => {
    const slug = route.params.slug;

    return Array.isArray(slug) ? slug[0] : slug;
});

const project = computed(() => {
    return content.value.projects.find(
        (projectItem) => projectItem.slug === projectSlug.value,
    );
});

watchEffect(() => {
    if (typeof document === 'undefined') {
        return;
    }

    document.title = project.value
        ? `${project.value.title} - ${appName}`
        : `${t('pages.projectStory.missingTitle')} - ${appName}`;
});
</script>

<template>
    <section class="px-3 sm:px-5 lg:px-12 py-4 sm:py-8 lg:py-10">
        <div class="mx-auto max-w-7xl">
            <RouterLink
                to="/projects"
                class="inline-flex items-center gap-2 bg-white shadow-sm mb-4 sm:mb-6 px-3 py-2 border border-slate-200 hover:border-slate-300 rounded-lg font-semibold text-slate-700 hover:text-slate-950 text-sm transition"
            >
                <i class="pi-angle-left text-base pi" aria-hidden="true" />
                <span>{{ t('actions.backToProjects') }}</span>
            </RouterLink>

            <ProjectStory v-if="project" :project="project" />

            <section
                v-else
                class="bg-white shadow-sm p-8 border border-slate-200 rounded-lg text-center"
            >
                <i
                    class="text-slate-400 text-4xl pi pi-exclamation-circle"
                    aria-hidden="true"
                />
                <h1
                    class="mt-4 font-semibold text-slate-950 text-2xl tracking-normal"
                >
                    {{ t('pages.projectStory.missingTitle') }}
                </h1>
                <p
                    class="mx-auto mt-3 max-w-xl text-slate-600 text-base leading-7"
                >
                    {{ t('pages.projectStory.missingIntro') }}
                </p>
                <RouterLink
                    to="/projects"
                    class="inline-flex justify-center items-center gap-2 bg-slate-950 hover:bg-slate-800 mt-6 px-4 py-3 rounded-lg font-semibold text-white text-sm transition"
                >
                    <i class="text-base pi pi-star" aria-hidden="true" />
                    <span>{{ t('actions.backToProjects') }}</span>
                </RouterLink>
            </section>
        </div>
    </section>
</template>
