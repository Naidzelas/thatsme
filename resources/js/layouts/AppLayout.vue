<script setup lang="ts">
import Button from 'primevue/button';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, RouterView, useRoute } from 'vue-router';

import { lastUpdatedAt, portfolioIdentity } from '@/data/portfolio';
import { setLocale, supportedLocales } from '@/i18n';
import type { LocaleCode } from '@/i18n';

const route = useRoute();
const { locale, t } = useI18n({ useScope: 'global' });
const isMenuOpen = ref(false);
const emailHref = `mailto:${portfolioIdentity.email}`;

const navItems = computed(() => [
    {
        label: t('nav.home'),
        icon: 'pi-home',
        to: '/',
    },
    {
        label: t('nav.experience'),
        icon: 'pi-briefcase',
        to: '/experience',
    },
    {
        label: t('nav.projects'),
        icon: 'pi-star',
        to: '/projects',
    },
]);

const formattedUpdatedAt = computed(() => {
    return new Intl.DateTimeFormat(locale.value === 'lt' ? 'lt-LT' : 'en-US', {
        dateStyle: 'long',
        timeZone: 'UTC',
    }).format(new Date(lastUpdatedAt));
});

const changeLocale = (nextLocale: LocaleCode) => {
    setLocale(nextLocale);
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

const isActivePath = (path: string) => {
    return route.path === path;
};
</script>

<template>
    <div class="flex min-h-screen flex-col bg-slate-50 text-slate-950">
        <header
            class="sticky top-0 z-40 border-b border-slate-800 bg-slate-950 px-5 py-4 shadow-lg shadow-slate-950/10 lg:px-12"
        >
            <div
                class="mx-auto flex min-h-17 max-w-7xl items-center justify-between gap-6"
            >
                <RouterLink
                    class="flex items-center gap-4"
                    to="/"
                    @click="closeMenu"
                >
                    <span
                        class="grid h-10 w-10 place-items-center rounded-lg bg-white text-slate-950 shadow-sm"
                        aria-hidden="true"
                    >
                        <i class="pi pi-bolt text-lg" />
                    </span>
                    <span class="text-lg font-semibold text-white">{{
                        t('app.name')
                    }}</span>
                </RouterLink>

                <button
                    type="button"
                    class="grid h-11 w-11 place-items-center rounded-lg border border-slate-700 text-slate-300 transition hover:border-slate-500 hover:text-white lg:hidden"
                    :aria-label="
                        isMenuOpen ? t('app.closeMenu') : t('app.openMenu')
                    "
                    :aria-expanded="isMenuOpen"
                    @click="isMenuOpen = !isMenuOpen"
                >
                    <i
                        :class="[
                            'pi text-xl',
                            isMenuOpen ? 'pi-times' : 'pi-bars',
                        ]"
                    />
                </button>

                <div
                    :class="[
                        'absolute top-full left-0 w-full border-b border-slate-800 bg-slate-950 px-5 py-5 shadow-xl shadow-slate-950/20 lg:static lg:flex lg:w-auto lg:flex-1 lg:items-center lg:justify-between lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none',
                        isMenuOpen ? 'block' : 'hidden',
                    ]"
                >
                    <nav
                        class="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center"
                    >
                        <RouterLink
                            v-for="item in navItems"
                            :key="item.to"
                            :to="item.to"
                            :class="[
                                'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                                isActivePath(item.to)
                                    ? 'border-slate-700 bg-slate-800 text-white'
                                    : 'border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-white',
                            ]"
                            @click="closeMenu"
                        >
                            <i :class="['pi text-base', item.icon]" />
                            <span>{{ item.label }}</span>
                        </RouterLink>
                    </nav>

                    <div
                        class="mt-5 flex items-center justify-between gap-3 border-t border-slate-800 pt-5 lg:mt-0 lg:border-0 lg:pt-0"
                    >
                        <span class="sr-only">{{ t('app.language') }}</span>
                        <div
                            class="flex rounded-lg border border-slate-700 bg-slate-900 p-1"
                        >
                            <button
                                v-for="supportedLocale in supportedLocales"
                                :key="supportedLocale.code"
                                type="button"
                                :class="[
                                    'rounded-md px-3 py-2 text-sm font-semibold transition',
                                    locale === supportedLocale.code
                                        ? 'bg-white text-slate-950'
                                        : 'text-slate-400 hover:text-white',
                                ]"
                                :aria-label="supportedLocale.name"
                                @click="changeLocale(supportedLocale.code)"
                            >
                                {{ supportedLocale.label }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <main class="min-h-0 flex-1">
            <RouterView />
        </main>

        <footer
            class="shrink-0 border-t border-slate-200 bg-white px-5 py-6 lg:px-12"
        >
            <div
                class="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between"
            >
                <span class="font-semibold text-slate-900">{{
                    t('app.name')
                }}</span>
                <span>{{
                    t('app.updatedAt', { date: formattedUpdatedAt })
                }}</span>
                <Button
                    as="a"
                    :href="emailHref"
                    icon="pi pi-envelope"
                    :label="t('app.contact')"
                    severity="secondary"
                    size="small"
                    outlined
                />
            </div>
        </footer>
    </div>
</template>
