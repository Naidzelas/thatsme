import { createI18n } from 'vue-i18n';

import en from './locales/en';
import lt from './locales/lt';

export type LocaleCode = 'en' | 'lt';

export const supportedLocales: Array<{
    code: LocaleCode;
    label: string;
    name: string;
}> = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'lt', label: 'LT', name: 'Lietuviu' },
];

const messages = {
    en,
    lt,
};

const isSupportedLocale = (locale: string | null): locale is LocaleCode => {
    return supportedLocales.some(
        (supportedLocale) => supportedLocale.code === locale,
    );
};

const resolveInitialLocale = (): LocaleCode => {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const storedLocale = window.localStorage.getItem('thatsme-locale');

    if (isSupportedLocale(storedLocale)) {
        return storedLocale;
    }

    const browserLocale = window.navigator.language.split('-')[0];

    if (isSupportedLocale(browserLocale)) {
        return browserLocale;
    }

    return 'en';
};

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: resolveInitialLocale(),
    fallbackLocale: 'en',
    messages,
});

export const setLocale = (locale: LocaleCode) => {
    i18n.global.locale.value = locale;

    if (typeof window !== 'undefined') {
        window.localStorage.setItem('thatsme-locale', locale);
        document.documentElement.lang = locale;
    }
};

if (typeof document !== 'undefined') {
    document.documentElement.lang = i18n.global.locale.value;
}
