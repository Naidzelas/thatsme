import { engineeringSkillsLt, softwareEngineeringSkillsLt } from '../skills';
import type { PortfolioContent } from '../types';

export const homeLt: PortfolioContent['home'] = {
    focusCards: [
        {
            label: 'Kryptis',
            value: 'Produktu kurimas',
            detail: 'Nuo idejos ir duomenu strukturos iki patikimu frontend procesu.',
        },
        {
            label: 'Backend',
            value: 'Laravel ir API',
            detail: 'Aiski domeno logika, integracijos, eiles ir administravimo srautai.',
        },
        {
            label: 'Frontend',
            value: 'Vue ir TypeScript',
            detail: 'Prisitaikancios sasajos, kurios islieka tvarkingos su realiu turiniu.',
        },
    ],
    skillGroups: [
        {
            title: 'Aplikacijos',
            items: ['Laravel', 'PHP', 'REST API', 'Eiles', 'Auth'],
        },
        {
            title: 'Sasaja',
            items: ['Vue', 'TypeScript', 'Tailwind CSS', 'PrimeVue'],
        },
        {
            title: 'Procesai',
            items: ['AI irankiai', 'Python', 'SQL', 'GitHub Actions'],
        },
    ],
    keywordGroups: [
        {
            title: 'Programavimas',
            tone: 'software',
            items: softwareEngineeringSkillsLt,
        },
        {
            title: 'Inzinerija',
            tone: 'engineering',
            items: engineeringSkillsLt,
        },
    ],
};
