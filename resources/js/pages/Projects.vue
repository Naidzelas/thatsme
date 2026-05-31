<script setup lang="ts">
import Chip from 'primevue/chip';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import ProjectCard from '@/components/ProjectCard.vue';
import { usePortfolio } from '@/composables/usePortfolio';
import type { ProjectItem } from '@/data/portfolio';
import {
    areStringArraysEqual,
    getNormalizedQueryValues,
    normalizeTechnology,
} from '@/lib/utils';

interface TechnologyOption {
    name: string;
    code: string;
}

const { t } = useI18n({ useScope: 'global' });
const route = useRoute();
const router = useRouter();
const { content } = usePortfolio();
const selectedTechnologies = ref<TechnologyOption[]>([]);

const formatFallbackTechnologyName = (code: string) =>
    code
        .split('-')
        .filter(Boolean)
        .map((part) => (part.length <= 3 ? part.toUpperCase() : part))
        .join(' ');

const technologyOptions = computed(() => {
    const optionsByCode = new Map<string, TechnologyOption>();

    const addOption = (technology: string) => {
        const code = normalizeTechnology(technology);

        if (!optionsByCode.has(code)) {
            optionsByCode.set(code, {
                name: technology,
                code,
            });
        }
    };

    content.value.projects.forEach((project) => {
        project.stack.forEach((technology) => {
            addOption(technology);
        });
    });

    content.value.home.skillGroups.forEach((group) => {
        group.items.forEach((technology) => {
            addOption(technology);
        });
    });

    content.value.home.keywordGroups.forEach((group) => {
        group.items.forEach((skill) => {
            addOption(skill.label);
        });
    });

    return Array.from(optionsByCode.values()).sort((first, second) =>
        first.name.localeCompare(second.name),
    );
});

const technologyOptionsByCode = computed(
    () =>
        new Map(
            technologyOptions.value.map((technology) => [
                technology.code,
                technology,
            ]),
        ),
);

const getSelectedTechnologyCodes = () =>
    selectedTechnologies.value.map((technology) => technology.code);

const resolveTechnologySelections = (codes: string[]) =>
    codes.map((code) => {
        return (
            technologyOptionsByCode.value.get(code) ?? {
                name: formatFallbackTechnologyName(code),
                code,
            }
        );
    });

const selectedTechnologyCodes = computed(() => {
    return new Set(getSelectedTechnologyCodes());
});

const validSelectedTechnologyCodes = computed(() => {
    return new Set(
        getSelectedTechnologyCodes().filter((code) =>
            technologyOptionsByCode.value.has(code),
        ),
    );
});

const selectedTechnologyNames = computed(() =>
    selectedTechnologies.value.map((technology) => technology.name).join(', '),
);

const matchedProjects = computed(() => {
    if (validSelectedTechnologyCodes.value.size === 0) {
        return [];
    }

    return content.value.projects.filter((project) =>
        project.stack.some((technology) =>
            validSelectedTechnologyCodes.value.has(
                normalizeTechnology(technology),
            ),
        ),
    );
});

const hasMissingSelectedTechnologyFilters = computed(() => {
    return (
        selectedTechnologyCodes.value.size > 0 &&
        selectedTechnologyCodes.value.size !==
            validSelectedTechnologyCodes.value.size
    );
});

const shouldShowAllProjectsForFilter = computed(() => {
    if (!hasSelections.value) {
        return false;
    }

    return (
        hasMissingSelectedTechnologyFilters.value ||
        validSelectedTechnologyCodes.value.size === 0 ||
        matchedProjects.value.length === 0
    );
});

const filterNoticeMessage = computed(() => {
    if (!shouldShowAllProjectsForFilter.value) {
        return '';
    }

    return t('labels.noSpecificProjectForSkill', {
        skill: selectedTechnologyNames.value,
    });
});

const filteredProjects = computed(() => {
    if (selectedTechnologyCodes.value.size === 0) {
        return content.value.projects;
    }

    if (shouldShowAllProjectsForFilter.value) {
        return content.value.projects;
    }

    return matchedProjects.value;
});

const publicProjects = computed(() =>
    filteredProjects.value.filter((project) => project.visibility === 'public'),
);

const personalProjects = computed(() =>
    filteredProjects.value.filter(
        (project) => project.visibility === 'personal',
    ),
);

const hasSelections = computed(() => selectedTechnologies.value.length > 0);

const removeTechnology = (technology: TechnologyOption) => {
    selectedTechnologies.value = selectedTechnologies.value.filter(
        (selectedTechnology) => selectedTechnology.code !== technology.code,
    );
};

const openProjectStory = (project: ProjectItem) => {
    router.push({
        name: 'project-story',
        params: {
            slug: project.slug,
        },
    });
};

watch(
    [() => route.query.skill, technologyOptions],
    () => {
        const routeSkillCodes = getNormalizedQueryValues(route.query.skill);

        if (
            areStringArraysEqual(getSelectedTechnologyCodes(), routeSkillCodes)
        ) {
            return;
        }

        selectedTechnologies.value =
            resolveTechnologySelections(routeSkillCodes);
    },
    { immediate: true },
);

watch(
    selectedTechnologies,
    () => {
        const selectedCodes = getSelectedTechnologyCodes();
        const routeSkillCodes = getNormalizedQueryValues(route.query.skill);

        if (areStringArraysEqual(selectedCodes, routeSkillCodes)) {
            return;
        }

        const query = { ...route.query };

        if (selectedCodes.length > 0) {
            query.skill =
                selectedCodes.length === 1 ? selectedCodes[0] : selectedCodes;
        } else {
            delete query.skill;
        }

        router.replace({
            name: 'projects',
            query,
        });
    },
    { deep: true },
);
</script>

<template>
    <section class="px-5 py-12 lg:px-12 lg:py-16">
        <div class="mx-auto max-w-7xl">
            <p
                class="text-sm font-semibold tracking-normal text-sky-700 uppercase"
            >
                {{ t('pages.projects.eyebrow') }}
            </p>
            <h1
                class="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl"
            >
                {{ t('pages.projects.title') }}
            </h1>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {{ t('pages.projects.intro') }}
            </p>
        </div>
    </section>

    <section class="px-5 pb-14 lg:px-12">
        <div class="mx-auto max-w-7xl space-y-10">
            <div
                class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
                <div class="border-b border-slate-200 bg-slate-50 p-4">
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
                    <p v-else class="text-sm leading-6 text-slate-500">
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

                <Message
                    v-if="filterNoticeMessage"
                    class="mx-4 mb-4"
                    severity="secondary"
                    :closable="false"
                >
                    {{ filterNoticeMessage }}
                </Message>
            </div>

            <section class="space-y-5">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-wrap items-center gap-4">
                        <h2
                            class="text-xl leading-tight font-semibold tracking-normal text-slate-950"
                        >
                            {{ t('labels.publicProjects') }}
                        </h2>
                        <span class="text-base leading-tight text-slate-500">
                            {{
                                t('labels.projectCount', {
                                    count: publicProjects.length,
                                })
                            }}
                        </span>
                    </div>
                    <div class="border-b border-slate-200" />
                </div>

                <div
                    v-if="publicProjects.length"
                    class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    <ProjectCard
                        v-for="project in publicProjects"
                        :key="project.slug"
                        :project="project"
                        @open-story="openProjectStory"
                    />
                </div>
                <p v-else class="text-sm leading-6 text-slate-500">
                    {{ t('labels.noMatchingProjects') }}
                </p>
            </section>

            <section class="space-y-5">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-wrap items-center gap-4">
                        <h2
                            class="text-xl leading-tight font-semibold tracking-normal text-slate-950"
                        >
                            {{ t('labels.personalProjects') }}
                        </h2>
                        <span class="text-base leading-tight text-slate-500">
                            {{
                                t('labels.projectCount', {
                                    count: personalProjects.length,
                                })
                            }}
                        </span>
                    </div>
                    <div class="border-b border-slate-200" />
                </div>

                <div
                    v-if="personalProjects.length"
                    class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    <ProjectCard
                        v-for="project in personalProjects"
                        :key="project.slug"
                        :project="project"
                        @open-story="openProjectStory"
                    />
                </div>
                <p v-else class="text-sm leading-6 text-slate-500">
                    {{ t('labels.noMatchingProjects') }}
                </p>
            </section>
        </div>
    </section>
</template>
