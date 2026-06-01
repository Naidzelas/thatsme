import { engineeringSkillsLt, softwareEngineeringSkillsLt } from '../skills';
import type { PortfolioContent } from '../types';

export const homeLt: PortfolioContent['home'] = {
    focusCards: [
        {
            label: 'Kryptis',
            value: 'Produktu kurimas',
            detail: 'Nuo idėjos ir duomenų struktūros iki patikimų frontend procesų.',
        },
        {
            label: 'Backend',
            value: 'Laravel ir API',
            detail: 'Aiški domeno logika, integracijos, eilės ir administravimo srautai.',
        },
        {
            label: 'Frontend',
            value: 'Vue ir TypeScript',
            detail: 'Prisitaikančios sąsajos, kurios išlieka tvarkingos su realiu turiniu.',
        },
    ],
    skillGroups: [
        {
            title: 'Aplikacijos',
            items: ['Laravel', 'PHP', 'REST API', 'Eilės', 'Auth'],
        },
        {
            title: 'Sąsaja',
            items: ['Vue', 'TypeScript', 'Tailwind CSS', 'PrimeVue'],
        },
        {
            title: 'Procesai',
            items: ['AI įrankiai', 'Python', 'SQL', 'GitHub Actions'],
        },
    ],
    keywordGroups: [
        {
            title: 'Programavimas',
            tone: 'software',
            items: softwareEngineeringSkillsLt,
        },
        {
            title: 'Inžinerija',
            tone: 'engineering',
            items: engineeringSkillsLt,
        },
    ],
};
