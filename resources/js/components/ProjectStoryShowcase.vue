<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { ProjectFlowNode, ProjectShowcase } from '@/data/portfolio';

const isPhoneViewport = ref(false);
const maxVisibleFlowNodes = computed(() => (isPhoneViewport.value ? 3 : 4));
let phoneViewportQuery: MediaQueryList | undefined;

const props = defineProps<{
    showcase?: ProjectShowcase;
    isOverview: boolean;
    fallbackTitle?: string;
}>();

const { t } = useI18n({ useScope: 'global' });

const updatePhoneViewport = () => {
    isPhoneViewport.value = Boolean(phoneViewportQuery?.matches);
};

onMounted(() => {
    phoneViewportQuery = window.matchMedia('(max-width: 767px)');
    updatePhoneViewport();
    phoneViewportQuery.addEventListener('change', updatePhoneViewport);
});

onBeforeUnmount(() => {
    phoneViewportQuery?.removeEventListener('change', updatePhoneViewport);
});

const overviewTeaserShowcase = computed<ProjectShowcase | undefined>(() => {
    if (!props.isOverview || !props.showcase) {
        return undefined;
    }

    const teaserTypes: ProjectShowcase['type'][] = ['image', 'gif', 'video'];

    if (teaserTypes.includes(props.showcase.type) && props.showcase.url) {
        return props.showcase;
    }

    return undefined;
});

const isOverviewTeaser = computed(() => Boolean(overviewTeaserShowcase.value));

const resolvedShowcase = computed<ProjectShowcase>(() => {
    if (props.isOverview && overviewTeaserShowcase.value) {
        return overviewTeaserShowcase.value;
    }

    if (props.isOverview) {
        return {
            type: 'placeholder',
            icon: 'pi pi-sparkles',
            text: t('labels.clickNextToViewStory'),
        };
    }

    return (
        props.showcase ?? {
            type: 'placeholder',
            icon: 'pi pi-images',
            title: props.fallbackTitle ?? t('labels.showcase'),
            text: t('labels.showcaseComingSoon'),
        }
    );
});

const showcaseKey = computed(() => {
    const showcase = resolvedShowcase.value;

    return [
        showcase.type,
        showcase.url ?? '',
        showcase.title ?? '',
        showcase.text ?? '',
    ].join(':');
});

const flowNodes = computed(() => resolvedShowcase.value.nodes ?? []);
const activeFlowNodeIds = computed(() => {
    return new Set(resolvedShowcase.value.activeNodeIds ?? []);
});

const flowNodeIndexById = computed(() => {
    return new Map(flowNodes.value.map((node, index) => [node.id, index]));
});

const activeFlowNodeIndexes = computed(() => {
    return flowNodes.value
        .map((node, index) =>
            activeFlowNodeIds.value.has(node.id) ? index : -1,
        )
        .filter((index) => index >= 0);
});

const firstActiveFlowNodeIndex = computed(() => {
    return activeFlowNodeIndexes.value.length
        ? Math.min(...activeFlowNodeIndexes.value)
        : 0;
});

const lastActiveFlowNodeIndex = computed(() => {
    return activeFlowNodeIndexes.value.length
        ? Math.max(...activeFlowNodeIndexes.value)
        : Math.min(flowNodes.value.length - 1, maxVisibleFlowNodes.value - 1);
});

const visibleFlowNodes = computed(() => {
    if (!flowNodes.value.length) {
        return [];
    }

    const endIndex = Math.max(0, lastActiveFlowNodeIndex.value) + 1;
    const startIndex = Math.max(0, endIndex - maxVisibleFlowNodes.value);

    return flowNodes.value.slice(startIndex, endIndex);
});

const edgeBetweenNodes = (
    currentNode: ProjectFlowNode,
    nextNode: ProjectFlowNode,
) => {
    return resolvedShowcase.value.edges?.find(
        (edge) => edge.from === currentNode.id && edge.to === nextNode.id,
    );
};

const isActiveFlowNode = (nodeId: string) => {
    return activeFlowNodeIds.value.has(nodeId);
};

const isPreviousFlowNode = (nodeId: string) => {
    const nodeIndex = flowNodeIndexById.value.get(nodeId);

    return (
        nodeIndex !== undefined &&
        nodeIndex < firstActiveFlowNodeIndex.value &&
        !isActiveFlowNode(nodeId)
    );
};

const hasFlowNodeReference = (node: ProjectFlowNode) => {
    return Boolean(node.href || node.reference);
};

const flowNodeReferenceTitle = (node: ProjectFlowNode) => {
    if (node.href && node.reference) {
        return `External link: ${node.href}. Reference: ${node.reference}`;
    }

    if (node.href) {
        return `External link: ${node.href}`;
    }

    return `Reference: ${node.reference}`;
};
</script>

<template>
    <section
        class="bg-slate-950 shadow-slate-950/15 shadow-xl border border-slate-800 rounded-lg overflow-hidden text-white project-showcase"
    >
        <Transition name="showcase-fade" mode="out-in">
            <div :key="showcaseKey" class="project-showcase__frame">
                <template v-if="isOverviewTeaser">
                    <div class="project-showcase__content project-showcase__overview">
                        <div class="project-showcase__overview-header">
                            <p
                                v-if="resolvedShowcase.title"
                                class="font-semibold text-sky-300 text-sm uppercase tracking-normal"
                            >
                                {{ resolvedShowcase.title }}
                            </p>
                        </div>

                        <div class="project-showcase__overview-teaser">
                            <img
                                v-if="
                                    (resolvedShowcase.type === 'image' ||
                                        resolvedShowcase.type === 'gif') &&
                                    resolvedShowcase.url
                                "
                                :src="resolvedShowcase.url"
                                :alt="
                                    resolvedShowcase.alt ?? resolvedShowcase.title ?? ''
                                "
                                class="project-showcase__overview-media"
                                loading="lazy"
                            />

                            <video
                                v-else-if="resolvedShowcase.type === 'video' && resolvedShowcase.url"
                                class="project-showcase__overview-media"
                                :poster="resolvedShowcase.posterUrl"
                                controls
                                playsinline
                            >
                                <source :src="resolvedShowcase.url" />
                            </video>
                        </div>

                        <p class="project-showcase__overview-note">
                            {{ t('labels.clickNextToViewStory') }}
                        </p>
                    </div>
                </template>

                <template
                    v-else-if="
                        (resolvedShowcase.type === 'image' ||
                            resolvedShowcase.type === 'gif') &&
                        resolvedShowcase.url
                    "
                >
                    <img
                        :src="resolvedShowcase.url"
                        :alt="
                            resolvedShowcase.alt ?? resolvedShowcase.title ?? ''
                        "
                        class="w-full h-full object-cover"
                        loading="lazy"
                    />
                </template>

                <template
                    v-else-if="
                        resolvedShowcase.type === 'video' &&
                        resolvedShowcase.url
                    "
                >
                    <video
                        class="w-full h-full object-cover"
                        :poster="resolvedShowcase.posterUrl"
                        controls
                        playsinline
                    >
                        <source :src="resolvedShowcase.url" />
                    </video>
                </template>

                <template
                    v-else-if="
                        resolvedShowcase.type === 'embed' &&
                        resolvedShowcase.url
                    "
                >
                    <iframe
                        class="border-0 w-full h-full"
                        :src="resolvedShowcase.url"
                        :title="resolvedShowcase.title ?? t('labels.showcase')"
                        loading="lazy"
                        allowfullscreen
                    />
                </template>

                <template
                    v-else-if="
                        resolvedShowcase.type === 'links' &&
                        resolvedShowcase.links?.length
                    "
                >
                    <div class="project-showcase__content">
                        <p
                            v-if="resolvedShowcase.title"
                            class="font-semibold text-sky-300 text-sm uppercase tracking-normal"
                        >
                            {{ resolvedShowcase.title }}
                        </p>
                        <p
                            v-if="resolvedShowcase.text"
                            class="max-w-xl text-slate-300 text-base leading-7"
                        >
                            {{ resolvedShowcase.text }}
                        </p>
                        <div class="gap-3 grid sm:grid-cols-2 w-full">
                            <a
                                v-for="link in resolvedShowcase.links"
                                :key="link.url"
                                :href="link.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center gap-3 bg-slate-900/70 px-4 py-3 border border-slate-700 hover:border-sky-400 rounded-lg font-semibold text-slate-100 hover:text-white text-sm transition"
                            >
                                <i
                                    :class="[
                                        'pi text-base text-sky-300',
                                        link.icon ?? 'pi-external-link',
                                    ]"
                                    aria-hidden="true"
                                />
                                <span>{{ link.label }}</span>
                            </a>
                        </div>
                    </div>
                </template>

                <template
                    v-else-if="
                        resolvedShowcase.type === 'flowchart' &&
                        visibleFlowNodes.length
                    "
                >
                    <div class="project-showcase__flowchart">
                        <div class="project-showcase__flow-header">
                            <p
                                v-if="resolvedShowcase.title"
                                class="font-semibold text-sky-300 text-sm uppercase tracking-normal"
                            >
                                {{ resolvedShowcase.title }}
                            </p>
                            <p
                                v-if="resolvedShowcase.text"
                                class="mt-2 text-slate-300 text-sm leading-6"
                            >
                                {{ resolvedShowcase.text }}
                            </p>
                        </div>

                        <ol class="project-flow" aria-label="Project flow">
                            <li
                                v-for="(node, index) in visibleFlowNodes"
                                :key="node.id"
                                class="project-flow__item"
                            >
                                <a
                                    v-if="node.href"
                                    :href="node.href"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    :class="[
                                        'project-flow__node project-flow__node--link',
                                        isActiveFlowNode(node.id)
                                            ? 'project-flow__node--active'
                                            : '',
                                        isPreviousFlowNode(node.id)
                                            ? 'project-flow__node--previous'
                                            : '',
                                    ]"
                                >
                                    <i
                                        :class="[
                                            'pi project-flow__icon',
                                            node.icon ?? 'pi-circle',
                                        ]"
                                        aria-hidden="true"
                                    />
                                    <span class="project-flow__copy">
                                        <span class="project-flow__label">{{
                                            node.label
                                        }}</span>
                                        <span
                                            v-if="node.text"
                                            class="project-flow__text"
                                            >{{ node.text }}</span
                                        >
                                    </span>
                                    <span
                                        v-if="hasFlowNodeReference(node)"
                                        class="project-flow__reference"
                                        :title="flowNodeReferenceTitle(node)"
                                    >
                                        <i
                                            :class="[
                                                'pi',
                                                node.href
                                                    ? 'pi-external-link'
                                                    : 'pi-bookmark',
                                            ]"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </a>

                                <div
                                    v-else
                                    :class="[
                                        'project-flow__node',
                                        isActiveFlowNode(node.id)
                                            ? 'project-flow__node--active'
                                            : '',
                                        isPreviousFlowNode(node.id)
                                            ? 'project-flow__node--previous'
                                            : '',
                                    ]"
                                >
                                    <i
                                        :class="[
                                            'pi project-flow__icon',
                                            node.icon ?? 'pi-circle',
                                        ]"
                                        aria-hidden="true"
                                    />
                                    <span class="project-flow__copy">
                                        <span class="project-flow__label">{{
                                            node.label
                                        }}</span>
                                        <span
                                            v-if="node.text"
                                            class="project-flow__text"
                                            >{{ node.text }}</span
                                        >
                                    </span>
                                    <span
                                        v-if="hasFlowNodeReference(node)"
                                        class="project-flow__reference"
                                        :title="flowNodeReferenceTitle(node)"
                                    >
                                        <i
                                            class="pi pi-bookmark"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>

                                <div
                                    v-if="index < visibleFlowNodes.length - 1"
                                    class="project-flow__edge"
                                    aria-hidden="true"
                                >
                                    <span class="project-flow__line" />
                                    <span
                                        v-if="
                                            edgeBetweenNodes(
                                                node,
                                                visibleFlowNodes[index + 1],
                                            )?.label
                                        "
                                        class="project-flow__edge-label"
                                    >
                                        {{
                                            edgeBetweenNodes(
                                                node,
                                                visibleFlowNodes[index + 1],
                                            )?.label
                                        }}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </div>
                </template>

                <div v-else class="text-center project-showcase__content">
                    <i
                        :class="[
                            resolvedShowcase.icon ?? 'pi pi-images',
                            'text-5xl text-sky-300',
                        ]"
                        aria-hidden="true"
                    />
                    <p
                        v-if="resolvedShowcase.title"
                        class="font-semibold text-slate-400 text-sm uppercase tracking-normal"
                    >
                        {{ resolvedShowcase.title }}
                    </p>
                    <p class="max-w-md text-slate-200 text-base leading-7">
                        {{ resolvedShowcase.text }}
                    </p>
                </div>
            </div>
        </Transition>
    </section>
</template>

<style scoped>
.project-showcase {
    height: var(--project-story-stage-height, 34rem);
    min-height: 0;
}

.project-showcase__frame {
    height: 100%;
    overflow: hidden;
    background:
        linear-gradient(135deg, rgba(14, 165, 233, 0.16), transparent 34%),
        linear-gradient(315deg, rgba(16, 185, 129, 0.13), transparent 32%),
        #020617;
}

.project-showcase__content {
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    padding: 2rem;
    overflow: hidden;
}

.project-showcase__flowchart {
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.25rem;
    overflow: hidden;
}

.project-showcase__overview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 100%;
    min-height: 0;
    padding: 2rem;
    overflow: hidden;
}

.project-showcase__overview-header {
    width: 100%;
    max-width: 48rem;
}

.project-showcase__overview-teaser {
    width: 100%;
    max-width: 48rem;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid rgba(71, 85, 105, 0.95);
    background: rgba(15, 23, 42, 0.75);
}

.project-showcase__overview-media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.project-showcase__overview-note {
    max-width: 48rem;
    color: rgb(226, 232, 240);
    font-size: 0.95rem;
    line-height: 1.75;
    text-align: center;
}

.project-showcase__flow-header {
    flex-shrink: 0;
}

.project-flow {
    display: flex;
    min-height: 0;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    padding-right: 0.25rem;
}

.project-flow__item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.project-flow__node {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
    border: 1px solid rgba(71, 85, 105, 0.95);
    border-radius: 0.5rem;
    background: rgba(15, 23, 42, 0.72);
    padding: 0.875rem;
    color: rgb(226, 232, 240);
    transition:
        border-color 180ms ease,
        background-color 180ms ease,
        transform 180ms ease;
}

.project-flow__node--previous {
    opacity: 0.48;
}

.project-flow__node--link:hover {
    border-color: rgb(56, 189, 248);
    background: rgba(15, 23, 42, 0.96);
    color: white;
    transform: translateY(-0.08rem);
}

.project-flow__node--active {
    border-color: rgb(56, 189, 248);
    background: rgba(14, 165, 233, 0.16);
    box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.25);
}

.project-flow__icon {
    margin-top: 0.15rem;
    color: rgb(125, 211, 252);
    font-size: 1rem;
}

.project-flow__copy {
    min-width: 0;
    flex: 1;
}

.project-flow__label {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.35;
}

.project-flow__text {
    display: block;
    margin-top: 0.25rem;
    color: rgb(148, 163, 184);
    font-size: 0.78rem;
    line-height: 1.45;
}

.project-flow__reference {
    display: grid;
    width: 1.5rem;
    height: 1.5rem;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid rgba(125, 211, 252, 0.38);
    border-radius: 999px;
    color: rgb(125, 211, 252);
    font-size: 0.7rem;
}

.project-flow__edge {
    position: relative;
    display: flex;
    min-height: 2rem;
    align-items: center;
    justify-content: center;
}

.project-flow__line {
    position: relative;
    width: 2px;
    height: 1.75rem;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(56, 189, 248, 0.25);
}

.project-flow__line::after {
    content: '';
    position: absolute;
    inset: -100% 0 0;
    background: linear-gradient(
        180deg,
        transparent,
        rgb(56, 189, 248),
        transparent
    );
    animation: flow-arrow 1.65s linear infinite;
}

.project-flow__edge::after {
    content: '';
    position: absolute;
    bottom: 0.1rem;
    left: 50%;
    width: 0.45rem;
    height: 0.45rem;
    border-right: 2px solid rgb(56, 189, 248);
    border-bottom: 2px solid rgb(56, 189, 248);
    transform: translateX(-50%) rotate(45deg);
}

.project-flow__edge-label {
    position: absolute;
    left: calc(50% + 0.75rem);
    max-width: 45%;
    color: rgb(125, 211, 252);
    font-size: 0.68rem;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
}

.showcase-fade-enter-active,
.showcase-fade-leave-active {
    transition:
        opacity 220ms ease,
        transform 220ms ease;
}

.showcase-fade-enter-from,
.showcase-fade-leave-to {
    opacity: 0;
    transform: translateY(0.75rem);
}

@keyframes flow-arrow {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(100%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .project-flow__line::after {
        animation: none;
    }

    .showcase-fade-enter-active,
    .showcase-fade-leave-active {
        transition: none;
    }
}

@media (max-width: 767px) {
    .project-showcase__content {
        gap: 0.875rem;
        padding: 1rem;
    }

    .project-showcase__flowchart {
        gap: 0.75rem;
        padding: 0.875rem;
    }

    .project-showcase__flow-header p {
        font-size: 0.78rem;
        line-height: 1.45;
    }

    .project-showcase__flow-header p:first-child {
        font-size: 0.8rem;
        line-height: 1.25;
    }

    .project-flow {
        justify-content: center;
        padding-right: 0;
    }

    .project-flow__node {
        gap: 0.625rem;
        padding: 0.65rem;
    }

    .project-flow__icon {
        font-size: 0.9rem;
    }

    .project-flow__label {
        font-size: 0.82rem;
        line-height: 1.25;
    }

    .project-flow__text {
        margin-top: 0.15rem;
        font-size: 0.72rem;
        line-height: 1.3;
    }

    .project-flow__reference {
        width: 1.35rem;
        height: 1.35rem;
        font-size: 0.64rem;
    }

    .project-flow__edge {
        min-height: 1.35rem;
    }

    .project-flow__line {
        height: 1.1rem;
    }

    .project-flow__edge-label {
        font-size: 0.6rem;
    }
}
</style>
