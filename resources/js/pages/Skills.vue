<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const KeywordSphere = defineAsyncComponent({
    loader: () => import('@/components/KeywordSphere.vue'),
    delay: 120,
    suspensible: true,
});

import { usePortfolio } from '@/composables/usePortfolio';
import { normalizeTechnology } from '@/lib/utils';

interface SkillFilterPayload {
    label: string;
    filterCode?: string;
}

const { t } = useI18n({ useScope: 'global' });
const router = useRouter();
const { content } = usePortfolio();

const filterProjectsBySkill = (skill: SkillFilterPayload) => {
    router.push({
        name: 'projects',
        query: {
            skill: normalizeTechnology(skill.filterCode ?? skill.label),
        },
    });
};
</script>

<template>
    <section class="px-5 lg:px-12 py-12">
        <div class="mx-auto max-w-7xl">
            <p class="font-semibold text-sky-700 text-sm uppercase tracking-normal">
                {{ t('pages.skills.eyebrow') }}
            </p>
            <h1 class="mt-4 max-w-4xl font-semibold text-slate-950 text-4xl sm:text-5xl tracking-normal">
                {{ t('pages.skills.title') }}
            </h1>
            <p class="mt-5 max-w-3xl text-slate-600 text-lg leading-8">
                {{ t('pages.skills.intro') }}
            </p>
        </div>
    </section>

    <section class="px-5 lg:px-12 pb-14">
        <div class="mx-auto max-w-7xl">
            <Suspense>
                <template #default>
                    <KeywordSphere
                        :groups="content.home.keywordGroups"
                        @filter-skill="filterProjectsBySkill"
                    />
                </template>

                <template #fallback>
                    <div
                        class="skill-skeleton"
                        role="status"
                        aria-live="polite"
                        aria-label="Loading skills"
                    >
                        <div class="skill-skeleton__world">
                            <span class="skill-skeleton__ring skill-skeleton__ring--outer" />
                            <span class="skill-skeleton__ring skill-skeleton__ring--inner" />
                            <span class="skill-skeleton__node skill-skeleton__node--one" />
                            <span class="skill-skeleton__node skill-skeleton__node--two" />
                            <span class="skill-skeleton__node skill-skeleton__node--three" />
                            <span class="skill-skeleton__node skill-skeleton__node--four" />
                        </div>
                        <p class="skill-skeleton__label">{{ t('labels.skillSphere') }}</p>
                    </div>
                </template>
            </Suspense>
        </div>
    </section>
</template>

<style scoped>
.skill-skeleton {
    display: grid;
    place-items: center;
    min-height: 36rem;
    gap: 1.25rem;
    padding: 3rem 0;
    color: #334155;
}

.skill-skeleton__world {
    position: relative;
    width: min(42rem, 100%);
    aspect-ratio: 1;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.12), transparent 42%),
        radial-gradient(circle at 70% 60%, rgba(99, 102, 241, 0.14), transparent 38%),
        rgba(15, 23, 42, 0.02);
    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.04), 0 20px 45px rgba(15, 23, 42, 0.08);
    animation: skill-skeleton-spin 4s linear infinite;
}

.skill-skeleton__ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(56, 189, 248, 0.35);
    opacity: 0.72;
}

.skill-skeleton__ring--outer {
    transform: rotate(12deg);
}

.skill-skeleton__ring--inner {
    inset: 20%;
    border-color: rgba(99, 102, 241, 0.35);
    transform: rotate(-20deg);
}

.skill-skeleton__node {
    position: absolute;
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 999px;
    background: linear-gradient(135deg, #38bdf8, #6366f1);
    box-shadow: 0 0 0 8px rgba(56, 189, 248, 0.06);
}

.skill-skeleton__node--one {
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
}

.skill-skeleton__node--two {
    top: 50%;
    left: 16%;
    transform: translateY(-50%);
}

.skill-skeleton__node--three {
    top: 75%;
    left: 70%;
    transform: translate(-50%, -50%);
}

.skill-skeleton__node--four {
    top: 32%;
    left: 78%;
    transform: translate(-50%, -50%);
}

.skill-skeleton__label {
    margin: 0;
    color: #475569;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.01em;
}

@keyframes skill-skeleton-spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
