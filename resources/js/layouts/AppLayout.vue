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
    return (
        route.path === path ||
        (path !== '/' && route.path.startsWith(`${path}/`))
    );
};
</script>

<template>
    <div class="flex flex-col bg-slate-50 min-h-screen text-slate-950">
        <header
            class="top-0 z-40 sticky bg-slate-950 shadow-lg shadow-slate-950/10 px-5 lg:px-12 py-4 border-slate-800 border-b"
        >
            <div
                class="flex justify-between items-center gap-6 mx-auto max-w-7xl min-h-17"
            >
                <RouterLink
                    class="flex items-center gap-4"
                    to="/"
                    @click="closeMenu"
                >
                    <span
                        class="flex items-center bg-white shadow-sm pl-3 rounded-lg w-14 h-14 text-slate-950"
                        aria-hidden="true"
                    >
                        <img
                            src="/images/brand-logo-no-bg.png"
                            :alt="t('app.name')"
                            class="w-10 max-w-10 h-10 object-contain"
                        />
                    </span>
                    <span class="font-semibold text-white text-lg">{{
                        t('app.name')
                    }}</span>
                </RouterLink>

                <button
                    type="button"
                    class="lg:hidden place-items-center grid border border-slate-700 hover:border-slate-500 rounded-lg w-11 h-11 text-slate-300 hover:text-white transition"
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
                        class="flex lg:flex-row flex-col lg:justify-center lg:items-center gap-2"
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
                        class="flex justify-between items-center gap-3 mt-5 lg:mt-0 pt-5 lg:pt-0 border-slate-800 lg:border-0 border-t"
                    >
                        <span class="sr-only">{{ t('app.language') }}</span>
                        <div
                            class="flex bg-slate-900 p-1 border border-slate-700 rounded-lg"
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

        <main class="flex-1 min-h-0">
            <RouterView />
        </main>

        <footer
            class="bg-white px-5 lg:px-12 py-6 border-slate-200 border-t shrink-0"
        >
            <div
                class="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 mx-auto max-w-7xl text-slate-600 text-sm"
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
