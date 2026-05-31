<script setup lang="ts">
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

import { usePortfolio } from '@/composables/usePortfolio';

const { t } = useI18n({ useScope: 'global' });
const { content } = usePortfolio();
</script>

<template>
    <section class="px-5 lg:px-12 py-12 lg:py-16">
        <div class="mx-auto max-w-7xl">
            <p
                class="font-semibold text-sky-700 text-sm uppercase tracking-normal"
            >
                {{ t('pages.experience.eyebrow') }}
            </p>
            <h1
                class="mt-4 max-w-4xl font-semibold text-slate-950 text-4xl sm:text-5xl tracking-normal"
            >
                {{ t('pages.experience.title') }}
            </h1>
            <p class="mt-5 max-w-3xl text-slate-600 text-lg leading-8">
                {{ t('pages.experience.intro') }}
            </p>
        </div>
    </section>

    <section class="px-5 lg:px-12 pb-14">
        <div class="space-y-5 mx-auto max-w-7xl">
            <article
                v-for="item in content.experience"
                :key="`${item.role}-${item.period}`"
                class="gap-6 grid lg:grid-cols-[16rem_minmax(0,1fr)] bg-white shadow-sm p-6 border border-slate-200 rounded-lg"
            >
                <div>
                    <p class="font-semibold text-sky-700 text-sm">
                        {{ item.period }}
                    </p>
                    <h2
                        class="mt-2 font-semibold text-slate-950 text-2xl tracking-normal"
                    >
                        {{ item.role }}
                    </h2>
                    <div class="flex flex-wrap gap-2 mt-4">
                        <Tag
                            v-for="technology in item.stack"
                            :key="technology"
                            :value="technology"
                            severity="secondary"
                            rounded
                        />
                    </div>
                </div>

                <div>
                    <p class="text-slate-700 text-base leading-7">
                        {{ item.summary }}
                    </p>
                    <ul class="gap-3 grid mt-5">
                        <li
                            v-for="highlight in item.highlights"
                            :key="highlight"
                            class="flex gap-3 text-slate-600 text-sm leading-6"
                        >
                            <i
                                class="pi-arrow-right mt-1 text-sky-600 pi"
                                aria-hidden="true"
                            />
                            <span>{{ highlight }}</span>
                        </li>
                    </ul>
                </div>
            </article>
        </div>
    </section>
</template>
