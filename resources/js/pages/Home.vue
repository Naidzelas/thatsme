<script setup lang="ts">
import Button from 'primevue/button';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import KeywordSphere from '@/components/KeywordSphere.vue';
import { usePortfolio } from '@/composables/usePortfolio';
import { portfolioIdentity } from '@/data/portfolio';
import { normalizeTechnology } from '@/lib/utils';

interface SkillFilterPayload {
    label: string;
    filterCode?: string;
}

const { t } = useI18n({ useScope: 'global' });
const router = useRouter();
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
    <section class="border-b border-slate-200 bg-white pb-10">
        <div class="mx-auto max-w-7xl">
            <div class="px-5 pt-7 lg:px-12">
                <div class="relative">
                    <div
                        class="h-56 rounded-lg border border-slate-200 bg-slate-900 bg-cover bg-center sm:h-64 lg:h-72"
                        :style="{
                            backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.48), rgba(15, 23, 42, 0.08)), url(${portfolioIdentity.coverImageUrl})`,
                        }"
                    />
                    <div
                        class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                    >
                        <img
                            v-if="isAvatarImageVisible"
                            :src="portfolioIdentity.avatarUrl"
                            :alt="portfolioIdentity.fullName"
                            class="h-36 w-36 rounded-full border-[6px] border-white bg-white object-cover shadow-lg sm:h-40 sm:w-40"
                            @error="isAvatarImageVisible = false"
                        />
                        <span
                            v-else
                            class="grid h-36 w-36 place-items-center rounded-full border-[6px] border-white bg-slate-950 text-4xl font-semibold text-white shadow-lg sm:h-40 sm:w-40"
                            aria-hidden="true"
                        >
                            {{ avatarInitials }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="mt-20 flex flex-col items-center gap-5 px-5 lg:px-12">
                <div
                    class="flex w-full flex-col items-center gap-2 text-center"
                >
                    <h1
                        class="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl"
                    >
                        {{ portfolioIdentity.fullName }}
                    </h1>
                    <p class="text-base leading-7 text-slate-500">
                        {{ portfolioIdentity.city }}
                    </p>
                    <p class="max-w-3xl text-base leading-7 text-slate-600">
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
                    <KeywordSphere
                        :groups="content.home.keywordGroups"
                        @filter-skill="filterProjectsBySkill"
                    />
                </section>
            </div>
        </div>
    </section>
</template>
