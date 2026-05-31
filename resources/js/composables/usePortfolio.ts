import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { portfolioContent } from '@/data/portfolio';
import type { LocaleCode } from '@/i18n';

const resolveLocale = (locale: string): LocaleCode => {
    const baseLocale = locale.split('-')[0];

    if (Object.prototype.hasOwnProperty.call(portfolioContent, baseLocale)) {
        return baseLocale as LocaleCode;
    }

    return 'en';
};

export const usePortfolio = () => {
    const { locale } = useI18n({ useScope: 'global' });

    const content = computed(
        () => portfolioContent[resolveLocale(locale.value)],
    );

    return {
        content,
        locale,
    };
};
