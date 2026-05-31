<script setup lang="ts">
import Chip from 'primevue/chip';
import MultiSelect from 'primevue/multiselect';
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import ProjectCard from '@/components/ProjectCard.vue';
import ProjectStory from '@/components/ProjectStory.vue';
import { usePortfolio } from '@/composables/usePortfolio';
import type { ProjectItem } from '@/data/portfolio';

interface TechnologyOption {
    name: string;
    code: string;
}

const { t } = useI18n({ useScope: 'global' });
const { content } = usePortfolio();
const activeProjectSlug = ref<string | null>(null);
const selectedTechnologies = ref<TechnologyOption[]>([]);
const storySection = ref<HTMLElement | null>(null);

const normalizeTechnology = (technology: string) =>
    technology
        .toLocaleLowerCase('en-US')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

const technologyOptions = computed(() => {
    const optionsByCode = new Map<string, TechnologyOption>();

    content.value.projects.forEach((project) => {
        project.stack.forEach((technology) => {
            const code = normalizeTechnology(technology);

            if (!optionsByCode.has(code)) {
                optionsByCode.set(code, {
                    name: technology,
                    code,
                });
            }
        });
    });

    return Array.from(optionsByCode.values()).sort((first, second) =>
        first.name.localeCompare(second.name),
    );
});

const selectedTechnologyCodes = computed(() => {
    return new Set(
        selectedTechnologies.value.map((technology) => technology.code),
    );
});

const filteredProjects = computed(() => {
    if (selectedTechnologyCodes.value.size === 0) {
        return content.value.projects;
    }

    return content.value.projects.filter((project) =>
        project.stack.some((technology) =>
            selectedTechnologyCodes.value.has(normalizeTechnology(technology)),
        ),
    );
});

const publicProjects = computed(() =>
    filteredProjects.value.filter((project) => project.visibility === 'public'),
);

const personalProjects = computed(() =>
    filteredProjects.value.filter(
        (project) => project.visibility === 'personal',
    ),
);

const activeProject = computed(() => {
    return content.value.projects.find(
        (project) => project.slug === activeProjectSlug.value,
    );
});

const hasSelections = computed(() => selectedTechnologies.value.length > 0);

const removeTechnology = (technology: TechnologyOption) => {
    selectedTechnologies.value = selectedTechnologies.value.filter(
        (selectedTechnology) => selectedTechnology.code !== technology.code,
    );
};

const openProjectStory = async (project: ProjectItem) => {
    activeProjectSlug.value = project.slug;

    await nextTick();

    storySection.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};

watch(
    () => content.value.projects,
    (projects) => {
        if (
            activeProjectSlug.value &&
            !projects.some(
                (project) => project.slug === activeProjectSlug.value,
            )
        ) {
            activeProjectSlug.value = null;
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
        <div class="space-y-10 mx-auto max-w-7xl">
            <div
                class="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden"
            >
                <div class="bg-slate-50 p-4 border-slate-200 border-b">
                    <div
                        v-if="hasSelections"
                        class="flex flex-wrap items-start gap-3"
                    >
                        <Chip
                            v-for="technology in selectedTechnologies"
                            :key="technology.code"
                            :label="technology.name"
                            removable
                            @remove="removeTechnology(technology)"
                        />
                    </div>
                    <p v-else class="text-slate-500 text-sm leading-6">
                        {{ t('labels.selectTechnologiesToFilter') }}
                    </p>
                </div>

                <div class="p-4">
                    <MultiSelect
                        v-model="selectedTechnologies"
                        :options="technologyOptions"
                        option-label="name"
                        data-key="code"
                        :placeholder="t('labels.technologies')"
                        class="w-full md:w-72"
                    />
                </div>
            </div>

            <section class="space-y-5">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-wrap items-center gap-4">
                        <h2
                            class="font-semibold text-slate-950 text-xl leading-tight tracking-normal"
                        >
                            {{ t('labels.publicProjects') }}
                        </h2>
                        <span class="text-slate-500 text-base leading-tight">
                            {{
                                t('labels.projectCount', {
                                    count: publicProjects.length,
                                })
                            }}
                        </span>
                    </div>
                    <div class="border-slate-200 border-b" />
                </div>

                <div
                    v-if="publicProjects.length"
                    class="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                >
                    <ProjectCard
                        v-for="project in publicProjects"
                        :key="project.slug"
                        :project="project"
                        @open-story="openProjectStory"
                    />
                </div>
                <p v-else class="text-slate-500 text-sm leading-6">
                    {{ t('labels.noMatchingProjects') }}
                </p>
            </section>

            <section class="space-y-5">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-wrap items-center gap-4">
                        <h2
                            class="font-semibold text-slate-950 text-xl leading-tight tracking-normal"
                        >
                            {{ t('labels.personalProjects') }}
                        </h2>
                        <span class="text-slate-500 text-base leading-tight">
                            {{
                                t('labels.projectCount', {
                                    count: personalProjects.length,
                                })
                            }}
                        </span>
                    </div>
                    <div class="border-slate-200 border-b" />
                </div>

                <div
                    v-if="personalProjects.length"
                    class="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                >
                    <ProjectCard
                        v-for="project in personalProjects"
                        :key="project.slug"
                        :project="project"
                        @open-story="openProjectStory"
                    />
                </div>
                <p v-else class="text-slate-500 text-sm leading-6">
                    {{ t('labels.noMatchingProjects') }}
                </p>
            </section>

            <section
                v-if="activeProject"
                ref="storySection"
                class="pt-2 scroll-mt-24"
            >
                <ProjectStory :project="activeProject" />
            </section>
        </div>
    </section>
</template>
