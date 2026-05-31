<script setup lang="ts">
import Button from 'primevue/button';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import KeywordSphere from '@/components/KeywordSphere.vue';
import { usePortfolio } from '@/composables/usePortfolio';
import { portfolioIdentity } from '@/data/portfolio';

const { t } = useI18n({ useScope: 'global' });
const { content } = usePortfolio();

const emailHref = `mailto:${portfolioIdentity.email}`;
const isAvatarImageVisible = ref(true);

const avatarInitials = computed(() =>
    portfolioIdentity.fullName
        .split(' ')
        .map((namePart) => namePart.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase(),
);
</script>

<template>
    <section class="bg-white pb-10 border-slate-200 border-b">
        <div class="mx-auto max-w-7xl">
            <div class="px-5 lg:px-12 pt-7">
                <div class="relative">
                    <div
                        class="bg-slate-900 bg-cover bg-center border border-slate-200 rounded-lg h-56 sm:h-64 lg:h-72"
                        :style="{
                            backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.48), rgba(15, 23, 42, 0.08)), url(${portfolioIdentity.coverImageUrl})`,
                        }"
                    />
                    <div
                        class="bottom-0 left-1/2 absolute -translate-x-1/2 translate-y-1/2"
                    >
                        <img
                            v-if="isAvatarImageVisible"
                            :src="portfolioIdentity.avatarUrl"
                            :alt="portfolioIdentity.fullName"
                            class="bg-white shadow-lg border-[6px] border-white rounded-full w-36 sm:w-40 h-36 sm:h-40 object-cover"
                            @error="isAvatarImageVisible = false"
                        />
                        <span
                            v-else
                            class="place-items-center grid bg-slate-950 shadow-lg border-[6px] border-white rounded-full w-36 sm:w-40 h-36 sm:h-40 font-semibold text-white text-4xl"
                            aria-hidden="true"
                        >
                            {{ avatarInitials }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center gap-5 mt-20 px-5 lg:px-12">
                <div
                    class="flex flex-col items-center gap-2 w-full text-center"
                >
                    <h1
                        class="font-semibold text-slate-950 text-3xl sm:text-4xl tracking-normal"
                    >
                        {{ portfolioIdentity.fullName }}
                    </h1>
                    <p class="text-slate-500 text-base leading-7">
                        {{ portfolioIdentity.city }}
                    </p>
                    <p class="max-w-3xl text-slate-600 text-base leading-7">
                        {{ t('pages.home.intro') }}
                    </p>
                </div>

                <div class="flex flex-wrap justify-center gap-3">
                    <Button
                        v-for="socialLink in portfolioIdentity.socialLinks"
                        :key="socialLink.url"
                        as="a"
                        :href="socialLink.url"
                        :icon="socialLink.icon"
                        :label="socialLink.label"
                        :aria-label="
                            t('actions.openSocial', {
                                platform: socialLink.label,
                            })
                        "
                        target="_blank"
                        rel="noopener noreferrer"
                        rounded
                        severity="secondary"
                        outlined
                    />
                    <Button
                        as="a"
                        :href="emailHref"
                        icon="pi pi-envelope"
                        :label="t('actions.sendEmail')"
                        rounded
                        severity="secondary"
                    />
                </div>

                <section class="w-full" aria-labelledby="home-sphere-title">
                    <h2 id="home-sphere-title" class="sr-only">
                        {{ t('pages.home.sphereTitle') }}
                    </h2>
                    <KeywordSphere :groups="content.home.keywordGroups" />
                </section>
            </div>
        </div>
    </section>
</template>
