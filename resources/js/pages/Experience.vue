<script setup lang="ts">
import Tag from 'primevue/tag';
import { useI18n } from 'vue-i18n';

import { usePortfolio } from '@/composables/usePortfolio';

const { t } = useI18n({ useScope: 'global' });
const { content } = usePortfolio();
</script>

<template>
    <section class="px-5 py-12 lg:px-12 lg:py-16">
        <div class="mx-auto max-w-7xl">
            <p
                class="text-sm font-semibold tracking-normal text-sky-700 uppercase"
            >
                {{ t('pages.experience.eyebrow') }}
            </p>
            <h1
                class="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl"
            >
                {{ t('pages.experience.title') }}
            </h1>
            <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {{ t('pages.experience.intro') }}
            </p>
        </div>
    </section>

    <section class="px-5 pb-14 lg:px-12">
        <div class="mx-auto max-w-7xl space-y-5">
            <article
                v-for="item in content.experience"
                :key="`${item.company}-${item.role}-${item.period}`"
                class="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[18rem_minmax(0,1fr)]"
            >
                <div>
                    <div class="flex min-h-16 items-center gap-4">
                        <img
                            v-if="item.logoUrl"
                            :src="item.logoUrl"
                            :alt="`${item.company} logo`"
                            class="size-16 rounded-md border border-slate-200 object-contain"
                        />
                        <div>
                            <p class="text-lg font-semibold text-slate-950">
                                {{ item.company }}
                            </p>
                        </div>
                    </div>
                    <p class="mt-4 text-sm font-semibold text-sky-700">
                        {{ item.period }}
                    </p>
                    <h2
                        class="mt-2 text-2xl font-semibold tracking-normal text-slate-950"
                    >
                        {{ item.role }}
                    </h2>
                    <div class="mt-4 flex flex-wrap gap-2">
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
                    <p class="text-base leading-7 text-slate-700">
                        {{ item.summary }}
                    </p>
                    <ul class="mt-5 grid gap-3">
                        <li
                            v-for="highlight in item.highlights"
                            :key="highlight"
                            class="flex gap-3 text-sm leading-6 text-slate-600"
                        >
                            <i
                                class="pi-arrow-right pi mt-1 text-sky-600"
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
