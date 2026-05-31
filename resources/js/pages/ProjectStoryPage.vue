<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRoute } from 'vue-router';

import ProjectStory from '@/components/ProjectStory.vue';
import { usePortfolio } from '@/composables/usePortfolio';

const appName = import.meta.env.VITE_APP_NAME || 'Trimzales';
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
    <section class="px-3 py-4 sm:px-5 sm:py-8 lg:px-12 lg:py-10">
        <div class="mx-auto max-w-7xl">
            <RouterLink
                to="/projects"
                class="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 sm:mb-6"
            >
                <i class="pi-angle-left pi text-base" aria-hidden="true" />
                <span>{{ t('actions.backToProjects') }}</span>
            </RouterLink>

            <ProjectStory v-if="project" :project="project" />

            <section
                v-else
                class="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm"
            >
                <i
                    class="pi pi-exclamation-circle text-4xl text-slate-400"
                    aria-hidden="true"
                />
                <h1
                    class="mt-4 text-2xl font-semibold tracking-normal text-slate-950"
                >
                    {{ t('pages.projectStory.missingTitle') }}
                </h1>
                <p
                    class="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600"
                >
                    {{ t('pages.projectStory.missingIntro') }}
                </p>
                <RouterLink
                    to="/projects"
                    class="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    <i class="pi pi-star text-base" aria-hidden="true" />
                    <span>{{ t('actions.backToProjects') }}</span>
                </RouterLink>
            </section>
        </div>
    </section>
</template>
