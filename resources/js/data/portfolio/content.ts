import type { LocaleCode } from '@/i18n';

import { experienceEn } from './en/experience';
import { homeEn } from './en/home';
import { projectsEn } from './en/projects';
import { experienceLt } from './lt/experience';
import { homeLt } from './lt/home';
import { projectsLt } from './lt/projects';
import type { PortfolioContent } from './types';

export const portfolioContent: Record<LocaleCode, PortfolioContent> = {
    en: {
        home: homeEn,
        experience: experienceEn,
        projects: projectsEn,
    },
    lt: {
        home: homeLt,
        experience: experienceLt,
        projects: projectsLt,
    },
};
