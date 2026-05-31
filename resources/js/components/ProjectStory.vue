<script setup lang="ts">
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type { ProjectItem } from '@/data/portfolio';

const props = defineProps<{
    project: ProjectItem;
}>();

const { t } = useI18n({ useScope: 'global' });
const activeStepIndex = ref(0);

const activeStep = computed(() => props.project.steps[activeStepIndex.value]);
const stepCount = computed(() => props.project.steps.length);

const selectStep = (index: number) => {
    activeStepIndex.value = index;
};

const goToPreviousStep = () => {
    activeStepIndex.value =
        activeStepIndex.value === 0
            ? stepCount.value - 1
            : activeStepIndex.value - 1;
};

const goToNextStep = () => {
    activeStepIndex.value = (activeStepIndex.value + 1) % stepCount.value;
};

watch(
    () => props.project.slug,
    () => {
        activeStepIndex.value = 0;
    },
);
</script>

<template>
    <article
        class="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
        <section
            class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div class="mb-5 flex flex-wrap gap-2">
                <Tag
                    v-for="technology in project.stack"
                    :key="technology"
                    :value="technology"
                    severity="info"
                    rounded
                />
            </div>

            <h2 class="text-2xl font-semibold tracking-normal text-slate-950">
                {{ project.title }}
            </h2>
            <p class="mt-3 text-base leading-7 text-slate-600">
                {{ project.summary }}
            </p>
            <p class="mt-5 text-base leading-7 text-slate-700">
                {{ project.explanation }}
            </p>

            <div class="mt-6 border-t border-slate-200 pt-5">
                <h3
                    class="text-sm font-semibold tracking-normal text-slate-500 uppercase"
                >
                    {{ t('labels.outcomes') }}
                </h3>
                <ul class="mt-3 space-y-3">
                    <li
                        v-for="outcome in project.outcomes"
                        :key="outcome"
                        class="flex gap-3 text-sm leading-6 text-slate-700"
                    >
                        <i
                            class="pi pi-check-circle mt-1 text-emerald-600"
                            aria-hidden="true"
                        />
                        <span>{{ outcome }}</span>
                    </li>
                </ul>
            </div>
        </section>

        <section
            class="overflow-hidden rounded-lg border border-slate-800 bg-slate-950 text-white shadow-xl shadow-slate-950/15"
        >
            <div class="border-b border-slate-800 px-5 py-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-sm font-medium text-slate-400">
                            {{ activeStep?.signal }}
                        </p>
                        <h3 class="mt-1 text-xl font-semibold tracking-normal">
                            {{ activeStep?.title }}
                        </h3>
                    </div>
                    <div class="flex gap-2">
                        <Button
                            :aria-label="t('actions.previous')"
                            icon="pi pi-angle-left"
                            severity="secondary"
                            size="small"
                            rounded
                            text
                            @click="goToPreviousStep"
                        />
                        <Button
                            :aria-label="t('actions.next')"
                            icon="pi pi-angle-right"
                            severity="secondary"
                            size="small"
                            rounded
                            text
                            @click="goToNextStep"
                        />
                    </div>
                </div>
            </div>

            <div class="project-stage p-5 sm:p-7">
                <div class="project-stage__screen">
                    <div class="project-stage__nodes" aria-hidden="true">
                        <span
                            v-for="stepIndex in stepCount"
                            :key="stepIndex"
                            :class="[
                                'project-stage__node',
                                stepIndex - 1 <= activeStepIndex
                                    ? 'project-stage__node--active'
                                    : '',
                            ]"
                        />
                    </div>
                    <p class="max-w-xl text-base leading-7 text-slate-200">
                        {{ activeStep?.text }}
                    </p>
                    <div class="mt-8 grid gap-3 sm:grid-cols-3">
                        <button
                            v-for="(step, index) in project.steps"
                            :key="step.title"
                            type="button"
                            :class="[
                                'rounded-lg border px-3 py-3 text-left text-sm transition',
                                index === activeStepIndex
                                    ? 'border-sky-400 bg-sky-400/15 text-white'
                                    : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-500 hover:text-white',
                            ]"
                            @click="selectStep(index)"
                        >
                            <span
                                class="block text-xs font-semibold tracking-normal uppercase"
                            >
                                {{ step.signal }}
                            </span>
                            <span class="mt-1 block font-medium">{{
                                step.title
                            }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>

<style scoped>
.project-stage {
    background:
        linear-gradient(135deg, rgba(14, 165, 233, 0.14), transparent 38%),
        linear-gradient(315deg, rgba(16, 185, 129, 0.12), transparent 34%),
        #020617;
}

.project-stage__screen {
    min-height: 25rem;
}

.project-stage__nodes {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    margin-bottom: 2rem;
}

.project-stage__node {
    height: 0.5rem;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.25);
    transition:
        background-color 200ms ease,
        transform 200ms ease;
}

.project-stage__node--active {
    background: rgb(56, 189, 248);
    transform: scaleY(1.35);
}
</style>
