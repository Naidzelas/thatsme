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
        class="flex flex-col gap-6 bg-white shadow-sm p-4 border border-slate-200 rounded-lg h-full"
    >
        <div class="flex gap-4">
            <div
                class="place-items-center grid bg-slate-50 border border-slate-200 rounded-lg w-14 h-14 shrink-0"
            >
                <img
                    v-if="project.logoUrl"
                    :src="project.logoUrl"
                    :alt="`${project.title} logo`"
                    class="w-10 h-10 object-contain"
                    loading="lazy"
                />
                <img
                    v-else-if="technologyIconUrl"
                    :src="technologyIconUrl"
                    :alt="`${project.primaryTechnology} icon`"
                    class="w-8 h-8 object-contain"
                    loading="lazy"
                />
                <i
                    v-else
                    class="text-slate-500 text-3xl leading-none pi pi-code"
                    aria-hidden="true"
                />
            </div>

            <div class="flex flex-col flex-1 gap-2 min-w-0">
                <div class="flex justify-between items-start gap-3">
                    <h2
                        class="font-semibold text-slate-950 text-xl leading-tight tracking-normal"
                    >
                        {{ project.title }}
                    </h2>
                    <Tag
                        :value="t(`statuses.${project.status}`)"
                        :severity="statusSeverity[project.status]"
                        rounded
                    />
                </div>
                <span class="text-slate-500 text-sm leading-tight">
                    {{ project.category }}
                </span>
            </div>
        </div>

        <p class="flex-1 text-slate-600 text-sm leading-6">
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
