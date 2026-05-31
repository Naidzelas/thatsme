<script setup lang="ts">
import Button from 'primevue/button';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import ProjectStory from '@/components/ProjectStory.vue';
import { usePortfolio } from '@/composables/usePortfolio';

const { t } = useI18n({ useScope: 'global' });
const { content } = usePortfolio();
const activeProjectSlug = ref(content.value.projects[0]?.slug ?? '');

const activeProject = computed(() => {
    return (
        content.value.projects.find(
            (project) => project.slug === activeProjectSlug.value,
        ) ?? content.value.projects[0]
    );
});

watch(
    () => content.value.projects,
    (projects) => {
        if (
            !projects.some(
                (project) => project.slug === activeProjectSlug.value,
            )
        ) {
            activeProjectSlug.value = projects[0]?.slug ?? '';
        }
    },
);
</script>

<template>
    <section class="px-5 lg:px-12 py-12 lg:py-16">
        <div class="mx-auto max-w-7xl">
            <p
                class="font-semibold text-sky-700 text-sm uppercase tracking-normal"
            >
                {{ t('pages.projects.eyebrow') }}
            </p>
            <h1
                class="mt-4 max-w-4xl font-semibold text-slate-950 text-4xl sm:text-5xl tracking-normal"
            >
                {{ t('pages.projects.title') }}
            </h1>
            <p class="mt-5 max-w-3xl text-slate-600 text-lg leading-8">
                {{ t('pages.projects.intro') }}
            </p>
        </div>
    </section>

    <section class="px-5 lg:px-12 pb-14">
        <div class="mx-auto max-w-7xl">
            <div class="flex flex-wrap gap-3 mb-6">
                <Button
                    v-for="project in content.projects"
                    :key="project.slug"
                    :label="project.title"
                    :icon="
                        activeProjectSlug === project.slug
                            ? 'pi pi-check'
                            : 'pi pi-folder'
                    "
                    :severity="
                        activeProjectSlug === project.slug
                            ? 'primary'
                            : 'secondary'
                    "
                    :outlined="activeProjectSlug !== project.slug"
                    @click="activeProjectSlug = project.slug"
                />
            </div>

            <ProjectStory v-if="activeProject" :project="activeProject" />
        </div>
    </section>
</template>
