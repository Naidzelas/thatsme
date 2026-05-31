import { engineeringSkillsEn, softwareEngineeringSkillsEn } from '../skills';
import type { PortfolioContent } from '../types';

export const homeEn: PortfolioContent['home'] = {
    focusCards: [
        {
            label: 'Focus',
            value: 'Product engineering',
            detail: 'From idea and data shape to reliable frontend flows.',
        },
        {
            label: 'Backend',
            value: 'Laravel and APIs',
            detail: 'Clear domain logic, integrations, queues, and admin workflows.',
        },
        {
            label: 'Frontend',
            value: 'Vue and TypeScript',
            detail: 'Responsive interfaces that stay calm under real content.',
        },
    ],
    skillGroups: [
        {
            title: 'Application',
            items: ['Laravel', 'PHP', 'REST APIs', 'Queues', 'Auth'],
        },
        {
            title: 'Interface',
            items: ['Vue', 'TypeScript', 'Tailwind CSS', 'PrimeVue'],
        },
        {
            title: 'Workflow',
            items: ['AI tooling', 'Python', 'SQL', 'GitHub Actions'],
        },
    ],
    keywordGroups: [
        {
            title: 'Software engineering',
            tone: 'software',
            items: softwareEngineeringSkillsEn,
        },
        {
            title: 'Engineering',
            tone: 'engineering',
            items: engineeringSkillsEn,
        },
    ],
};
