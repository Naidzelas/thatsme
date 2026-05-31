<script setup lang="ts">
import phpIconUrl from 'devicon/icons/php/php-original.svg';
import pythonIconUrl from 'devicon/icons/python/python-original.svg';
import typescriptIconUrl from 'devicon/icons/typescript/typescript-original.svg';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type { ProjectItem, ProjectStatus } from '@/data/portfolio';

const props = defineProps<{
    project: ProjectItem;
}>();

const emit = defineEmits<{
    'open-story': [project: ProjectItem];
}>();

const { t } = useI18n({ useScope: 'global' });

const technologyIconUrls: Record<string, string> = {
    PHP: phpIconUrl,
    Python: pythonIconUrl,
    TypeScript: typescriptIconUrl,
};

const statusSeverity: Record<ProjectStatus, string> = {
    active: 'success',
    experimental: 'info',
    'work-in-progress': 'warn',
    inactive: 'secondary',
    tool: 'contrast',
};

const technologyIconUrl = computed(() => {
    return technologyIconUrls[props.project.primaryTechnology];
});

const externalLinkIcon = computed(() => {
    return props.project.externalLink?.kind === 'github'
        ? 'pi pi-github'
        : 'pi pi-globe';
});

const externalLinkLabel = computed(() => {
    if (!props.project.externalLink?.url) {
        return t('actions.linkComingSoon');
    }

    return props.project.externalLink.kind === 'github'
        ? t('actions.openRepository')
        : t('actions.openWebsite');
});

const openExternalLink = () => {
    if (!props.project.externalLink?.url) {
        return;
    }

    window.open(
        props.project.externalLink.url,
        '_blank',
        'noopener,noreferrer',
    );
};
</script>

<template>
    <article
        class="flex h-full flex-col gap-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
        <div class="flex gap-4">
            <div
                class="grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-slate-200 bg-slate-50"
            >
                <img
                    v-if="project.logoUrl"
                    :src="project.logoUrl"
                    :alt="`${project.title} logo`"
                    class="h-10 w-10 object-contain"
                    loading="lazy"
                />
                <img
                    v-else-if="technologyIconUrl"
                    :src="technologyIconUrl"
                    :alt="`${project.primaryTechnology} icon`"
                    class="h-8 w-8 object-contain"
                    loading="lazy"
                />
                <i
                    v-else
                    class="pi pi-code text-3xl leading-none text-slate-500"
                    aria-hidden="true"
                />
            </div>

            <div class="flex min-w-0 flex-1 flex-col gap-2">
                <div class="flex items-start justify-between gap-3">
                    <h2
                        class="text-xl leading-tight font-semibold tracking-normal text-slate-950"
                    >
                        {{ project.title }}
                    </h2>
                    <Tag
                        :value="t(`statuses.${project.status}`)"
                        :severity="statusSeverity[project.status]"
                        rounded
                    />
                </div>
                <span class="text-sm leading-tight text-slate-500">
                    {{ project.category }}
                </span>
            </div>
        </div>

        <p class="flex-1 text-sm leading-6 text-slate-600">
            {{ project.summary }}
        </p>

        <div class="flex flex-wrap gap-2">
            <Tag
                v-for="technology in project.stack"
                :key="technology"
                :value="technology"
                severity="secondary"
                rounded
            />
        </div>

        <div class="flex gap-3 pt-2">
            <Button
                :label="t('actions.openStory')"
                icon="pi pi-book"
                class="flex-1 justify-center"
                severity="secondary"
                @click="emit('open-story', project)"
            />
            <Button
                :label="externalLinkLabel"
                :icon="externalLinkIcon"
                class="flex-1 justify-center"
                severity="primary"
                :disabled="!project.externalLink?.url"
                @click="openExternalLink"
            />
        </div>
    </article>
</template>
