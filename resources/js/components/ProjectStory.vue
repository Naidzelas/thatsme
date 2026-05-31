<script setup lang="ts">
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import ProjectStoryShowcase from '@/components/ProjectStoryShowcase.vue';
import { portfolioIdentity } from '@/data/portfolio';
import type { ProjectItem } from '@/data/portfolio';

const props = defineProps<{
    project: ProjectItem;
}>();

const { t } = useI18n({ useScope: 'global' });
const activeSlideIndex = ref(0);

const storySlides = computed(() => [
    {
        key: 'overview',
        signal: t('labels.storyOverviewSignal'),
        title: props.project.title,
    },
    ...props.project.steps.map((step, index) => ({
        key: `${index}-${step.title}`,
        signal: step.signal,
        title: step.title,
    })),
]);

const slideCount = computed(() => storySlides.value.length);
const isOverviewSlide = computed(() => activeSlideIndex.value === 0);
const activeStepIndex = computed(() => activeSlideIndex.value - 1);
const activeStep = computed(() => props.project.steps[activeStepIndex.value]);
const activeSlide = computed(() => storySlides.value[activeSlideIndex.value]);
const currentDialogText = computed(() => {
    if (isOverviewSlide.value) {
        return `${props.project.summary}\n\n${props.project.explanation}`;
    }

    return activeStep.value?.text ?? '';
});
const revealedDialogText = ref('');
const visibleDialogParagraphs = computed(() => {
    return revealedDialogText.value
        .split('\n\n')
        .filter((paragraph) => paragraph.length > 0);
});
type PortraitVideoMode = 'idle' | 'talking';

const portraitVideoMode = ref<PortraitVideoMode>('idle');
const idlePortraitVideoRef = ref<HTMLVideoElement | null>(null);
const talkingPortraitVideoRef = ref<HTMLVideoElement | null>(null);
const hasPortraitVideoError = ref(false);
let revealTimer: ReturnType<typeof window.setInterval> | undefined;
let portraitPlaybackRequest = 0;

const portraitVideos = computed(() => {
    return hasPortraitVideoError.value
        ? undefined
        : portfolioIdentity.portraitVideos;
});
const hasPortraitVideo = computed(() => Boolean(portraitVideos.value));
const isTalkingPortraitVisible = computed(
    () => portraitVideoMode.value === 'talking',
);

const prefersReducedMotion = () => {
    return (
        typeof window === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
};

const playPortraitVideo = async (mode: PortraitVideoMode) => {
    if (!portraitVideos.value) {
        return;
    }

    const requestId = (portraitPlaybackRequest += 1);
    portraitVideoMode.value = mode;

    await nextTick();

    if (requestId !== portraitPlaybackRequest) {
        return;
    }

    idlePortraitVideoRef.value?.play().catch(() => undefined);

    const talkingVideo = talkingPortraitVideoRef.value;

    if (!talkingVideo) {
        return;
    }

    if (mode === 'idle') {
        talkingVideo.pause();

        return;
    }

    talkingVideo.pause();
    talkingVideo.currentTime = 0;
    talkingVideo.play().catch(() => undefined);
};

const pausePortraitVideo = () => {
    portraitPlaybackRequest += 1;
    idlePortraitVideoRef.value?.pause();
    talkingPortraitVideoRef.value?.pause();
};

const handlePortraitVideoEnded = (event: Event) => {
    if (
        portraitVideoMode.value !== 'talking' ||
        event.currentTarget !== talkingPortraitVideoRef.value
    ) {
        return;
    }

    playPortraitVideo('idle');
};

const handlePortraitVideoError = () => {
    hasPortraitVideoError.value = true;
    pausePortraitVideo();
};

const clearRevealTimer = () => {
    if (revealTimer === undefined) {
        return;
    }

    window.clearInterval(revealTimer);
    revealTimer = undefined;
};

const revealDialogText = (text: string) => {
    clearRevealTimer();

    if (!text || prefersReducedMotion()) {
        revealedDialogText.value = text;
        playPortraitVideo('idle');

        return;
    }

    revealedDialogText.value = '';
    playPortraitVideo('talking');
    let characterIndex = 0;

    revealTimer = window.setInterval(() => {
        characterIndex += 1;
        revealedDialogText.value = text.slice(0, characterIndex);

        if (characterIndex >= text.length) {
            clearRevealTimer();
        }
    }, 18);
};

const goToPreviousStep = () => {
    activeSlideIndex.value =
        activeSlideIndex.value === 0
            ? slideCount.value - 1
            : activeSlideIndex.value - 1;
};

const goToNextStep = () => {
    activeSlideIndex.value = (activeSlideIndex.value + 1) % slideCount.value;
};

watch(
    () => props.project.slug,
    () => {
        activeSlideIndex.value = 0;
    },
);

watch(currentDialogText, revealDialogText, { immediate: true });

onBeforeUnmount(() => {
    clearRevealTimer();
    pausePortraitVideo();
});
</script>

<template>
    <article class="gap-6 grid lg:grid-cols-2 project-story">
        <section
            class="bg-white shadow-sm p-5 sm:p-6 border border-slate-200 rounded-lg story-panel"
        >
            <div class="story-dialog">
                <div class="flex justify-between items-start gap-4 shrink-0">
                    <div class="min-w-0">
                        <p
                            class="font-semibold text-sky-700 text-sm uppercase tracking-normal story-dialog__signal"
                        >
                            {{ activeSlide?.signal }}
                        </p>
                        <h1
                            class="mt-2 font-semibold text-slate-950 text-3xl leading-tight tracking-normal story-dialog__title"
                        >
                            {{ activeSlide?.title }}
                        </h1>
                    </div>
                    <div
                        :key="`portrait-${activeSlideIndex}`"
                        class="story-portrait shrink-0"
                    >
                        <template v-if="hasPortraitVideo && portraitVideos">
                            <video
                                ref="idlePortraitVideoRef"
                                :src="portraitVideos.idleUrl"
                                :aria-label="portfolioIdentity.fullName"
                                class="rounded-full w-full h-full object-cover story-portrait__video"
                                autoplay
                                loop
                                muted
                                playsinline
                                preload="auto"
                                role="img"
                                @error="handlePortraitVideoError"
                            />
                            <video
                                ref="talkingPortraitVideoRef"
                                :src="portraitVideos.talkingUrl"
                                :class="[
                                    'story-portrait__video story-portrait__video--talking h-full w-full rounded-full object-cover',
                                    {
                                        'story-portrait__video--visible':
                                            isTalkingPortraitVisible,
                                    },
                                ]"
                                aria-hidden="true"
                                muted
                                playsinline
                                preload="auto"
                                @ended="handlePortraitVideoEnded"
                                @error="handlePortraitVideoError"
                            />
                        </template>
                        <img
                            v-else
                            :src="portfolioIdentity.avatarUrl"
                            :alt="portfolioIdentity.fullName"
                            class="rounded-full w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div class="mt-6 story-dialog__content">
                    <Transition name="story-copy" mode="out-in">
                        <div :key="activeSlideIndex">
                            <template v-if="isOverviewSlide">
                                <div class="flex flex-wrap gap-2">
                                    <Tag
                                        v-for="technology in project.stack"
                                        :key="technology"
                                        :value="technology"
                                        severity="info"
                                        rounded
                                    />
                                </div>

                                <div class="space-y-4 mt-5 story-dialog__copy">
                                    <p
                                        v-for="(
                                            paragraph, index
                                        ) in visibleDialogParagraphs"
                                        :key="`${activeSlideIndex}-${index}`"
                                        class="text-slate-700 text-base leading-7"
                                    >
                                        {{ paragraph }}
                                    </p>
                                </div>

                                <div
                                    class="mt-6 pt-5 border-slate-200 border-t"
                                >
                                    <h2
                                        class="font-semibold text-slate-500 text-sm uppercase tracking-normal"
                                    >
                                        {{ t('labels.outcomes') }}
                                    </h2>
                                    <ul class="space-y-3 mt-3">
                                        <li
                                            v-for="outcome in project.outcomes"
                                            :key="outcome"
                                            class="flex gap-3 text-slate-700 text-sm leading-6"
                                        >
                                            <i
                                                class="mt-1 text-emerald-600 pi pi-check-circle"
                                                aria-hidden="true"
                                            />
                                            <span>{{ outcome }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </template>

                            <template v-else>
                                <div class="space-y-4 story-dialog__copy">
                                    <p
                                        v-for="(
                                            paragraph, index
                                        ) in visibleDialogParagraphs"
                                        :key="`${activeSlideIndex}-${index}`"
                                        class="text-slate-700 text-lg leading-8"
                                    >
                                        {{ paragraph }}
                                    </p>
                                </div>
                            </template>
                        </div>
                    </Transition>
                </div>
            </div>

            <div
                class="flex justify-between items-center pt-5 border-slate-200 border-t story-controls"
            >
                <Button
                    :aria-label="t('actions.previous')"
                    :title="t('actions.previous')"
                    icon="pi pi-angle-left"
                    severity="secondary"
                    size="small"
                    rounded
                    text
                    @click="goToPreviousStep"
                />

                <button
                    type="button"
                    class="story-next-button"
                    :aria-label="t('actions.next')"
                    :title="t('actions.next')"
                    @click="goToNextStep"
                >
                    <i class="pi pi-sort-down" aria-hidden="true" />
                    <span class="sr-only">{{ t('actions.next') }}</span>
                </button>
            </div>
        </section>

        <ProjectStoryShowcase
            class="project-story__showcase"
            :is-overview="isOverviewSlide"
            :showcase="activeStep?.showcase"
            :fallback-title="activeStep?.title"
        />
    </article>
</template>

<style scoped>
.project-story {
    --project-story-stage-height: clamp(34rem, calc(100vh - 11rem), 46rem);
    align-items: stretch;
}

.story-panel {
    display: flex;
    height: var(--project-story-stage-height);
    min-height: 0;
    flex-direction: column;
    overflow: hidden;
}

.story-dialog {
    display: flex;
    min-height: 0;
    flex: 1;
    flex-direction: column;
}

.story-dialog__content {
    min-height: 0;
    flex: 1;
    overflow-y: auto;
    padding-right: 0.25rem;
    scrollbar-gutter: stable;
}

.story-dialog__copy {
    white-space: pre-wrap;
}

.story-controls {
    margin-top: 1.25rem;
    flex-shrink: 0;
}

.story-portrait {
    position: relative;
    width: clamp(4.25rem, 18vw, 5.75rem);
    height: clamp(4.25rem, 18vw, 5.75rem);
    overflow: hidden;
    border-radius: 999px;
    border: 3px solid white;
    background: black;
    box-shadow:
        0 0 0 1px rgb(203, 213, 225),
        0 12px 28px rgba(15, 23, 42, 0.16);
    animation: portrait-talk 720ms ease;
}

.story-portrait__video {
    position: absolute;
    inset: 0;
    transform: translate(0.3rem, -0.3rem) scale(3);
    transform-origin: 42% 60%;
}

.story-portrait__video--talking {
    opacity: 0;
    pointer-events: none;
}

.story-portrait__video--visible {
    opacity: 1;
}

.story-next-button {
    display: grid;
    width: 3rem;
    height: 3rem;
    place-items: center;
    border: 1px solid rgb(125, 211, 252);
    border-radius: 999px;
    background: rgb(240, 249, 255);
    color: rgb(2, 132, 199);
    transition:
        background-color 160ms ease,
        color 160ms ease,
        transform 160ms ease;
}

.story-next-button:hover {
    background: rgb(14, 165, 233);
    color: white;
    transform: translateY(-0.08rem);
}

.story-next-button i {
    font-size: 1.35rem;
    animation: story-next-bounce 1.9s ease-in-out infinite;
}

.story-copy-enter-active,
.story-copy-leave-active {
    transition:
        opacity 220ms ease,
        transform 220ms ease;
}

.story-copy-enter-from,
.story-copy-leave-to {
    opacity: 0;
    transform: translateY(0.5rem);
}

@keyframes portrait-talk {
    0% {
        transform: scale(1);
    }

    35% {
        transform: scale(1.04) rotate(-1deg);
    }

    70% {
        transform: scale(0.99) rotate(1deg);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes story-next-bounce {
    0%,
    100% {
        transform: translateY(-0.08rem);
    }

    50% {
        transform: translateY(0.28rem);
    }
}

@media (max-width: 767px) {
    .project-story {
        --project-story-stage-height: auto;
        height: auto;
        grid-template-rows: minmax(0, 1fr) auto;
        gap: 0;
    }

    .project-story__showcase {
        order: 1;
        height: 100%;
        min-height: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .story-panel {
        order: 2;
        height: clamp(10rem, 25svh, 13.5rem);
        padding: 0.875rem;
        min-height: 18rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .story-dialog > .flex {
        gap: 0.75rem;
    }

    .story-dialog__signal {
        font-size: 0.72rem;
    }

    .story-dialog__title {
        margin-top: 0.25rem;
        font-size: clamp(1.1rem, 6vw, 1.55rem);
        line-height: 1.08;
    }

    .story-dialog__content {
        margin-top: 0.65rem;
        padding-right: 0.35rem;
    }

    .story-dialog__copy p,
    .story-dialog__copy .text-lg,
    .story-dialog__copy .text-base {
        font-size: clamp(0.9rem, 3.8vw, 1rem);
        line-height: 1.55;
    }

    .story-dialog__content :deep(.p-tag) {
        font-size: 0.68rem;
    }

    .story-portrait {
        width: clamp(3rem, 16vw, 4rem);
        height: clamp(3rem, 16vw, 4rem);
    }

    .story-controls {
        margin-top: 0.65rem;
        padding-top: 0.65rem;
    }

    .story-next-button {
        width: 2.75rem;
        height: 2.75rem;
    }
}
</style>
