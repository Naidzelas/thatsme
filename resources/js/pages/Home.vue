<script setup lang="ts">
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

import KeywordSphere from '@/components/KeywordSphere.vue';
import { usePortfolio } from '@/composables/usePortfolio';

const { t } = useI18n({ useScope: 'global' });
const { content } = usePortfolio();
</script>

<template>
    <section class="px-5 lg:px-12 py-12 lg:py-16">
        <div
            class="lg:items-center gap-10 grid lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.75fr)] mx-auto max-w-7xl"
        >
            <div>
                <p
                    class="font-semibold text-sky-700 text-sm uppercase tracking-normal"
                >
                    {{ t('pages.home.eyebrow') }}
                </p>
                <h1
                    class="mt-4 max-w-4xl font-semibold text-slate-950 text-4xl sm:text-5xl lg:text-6xl tracking-normal"
                >
                    {{ t('pages.home.title') }}
                </h1>
                <p class="mt-6 max-w-3xl text-slate-600 text-lg leading-8">
                    {{ t('pages.home.intro') }}
                </p>

                <div class="flex sm:flex-row flex-col gap-3 mt-8">
                    <Button
                        as="router-link"
                        to="/experience"
                        icon="pi pi-briefcase"
                        :label="t('actions.viewExperience')"
                    />
                    <Button
                        as="router-link"
                        to="/projects"
                        icon="pi pi-star"
                        :label="t('actions.viewProjects')"
                        severity="secondary"
                        outlined
                    />
                </div>
            </div>

            <section
                class="bg-white shadow-sm p-4 border border-slate-200 rounded-lg"
            >
                <h2 class="sr-only">{{ t('pages.home.sphereTitle') }}</h2>
                <KeywordSphere :keywords="content.home.keywords" />
            </section>
        </div>
    </section>

    <section class="bg-white px-5 lg:px-12 py-10 border-slate-200 border-y">
        <div class="gap-4 grid md:grid-cols-3 mx-auto max-w-7xl">
            <article
                v-for="card in content.home.focusCards"
                :key="card.label"
                class="p-5 border border-slate-200 rounded-lg"
            >
                <p class="font-semibold text-slate-500 text-sm">
                    {{ card.label }}
                </p>
                <h2
                    class="mt-2 font-semibold text-slate-950 text-xl tracking-normal"
                >
                    {{ card.value }}
                </h2>
                <p class="mt-3 text-slate-600 text-sm leading-6">
                    {{ card.detail }}
                </p>
            </article>
        </div>
    </section>

    <section class="px-5 lg:px-12 py-12">
        <div class="mx-auto max-w-7xl">
            <h2 class="font-semibold text-slate-950 text-2xl tracking-normal">
                {{ t('pages.home.skillsTitle') }}
            </h2>
            <div class="gap-4 grid md:grid-cols-3 mt-6">
                <article
                    v-for="group in content.home.skillGroups"
                    :key="group.title"
                    class="bg-white shadow-sm p-5 border border-slate-200 rounded-lg"
                >
                    <h3 class="font-semibold text-slate-950 text-base">
                        {{ group.title }}
                    </h3>
                    <div class="flex flex-wrap gap-2 mt-4">
                        <span
                            v-for="skill in group.items"
                            :key="skill"
                            class="bg-slate-50 px-3 py-1 border border-slate-200 rounded-full font-medium text-slate-700 text-sm"
                        >
                            {{ skill }}
                        </span>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>
