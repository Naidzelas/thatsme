import { publicAssetUrl } from '../shared';
import type { ExperienceItem } from '../types';

export const experienceLt: ExperienceItem[] = [
    {
        company: 'AB Klaipėdos pienas',
        role: 'IT sistemų analitikas',
        period: 'Dabar',
        logoUrl: publicAssetUrl('images/dione_logo.jpg'),
        summary:
            'Full-stack programavimas, procesų optimizavimas, Excel sprendimų migracija į web aplinką.',
        highlights: [
            'Kuriu aplikaciją verslo valdymo įrankiams talpinti. Pasitelkiant Laravel, Vue, Inertia, ir TypeScript.',
            'Ruošiu duombazės duomenų struktūras, API integracijas ir legacy logikos palaikymą.',
            'Atlieku DevOps funkcijas, kad optimizuočiau aplikacijos kūrimo ir priežiūros procesus.',
        ],
        stack: [
            'Laravel',
            'Vue',
            'TypeScript',
            'PHP',
            'MSSQL',
            'CI/CD',
            'Bash',
            'REST API',
            'DevOps',
        ],
    },
    {
        company: 'UAB Vlantana',
        role: 'Programuotojas',
        period: 'Ankstesne patirtis',
        logoUrl: publicAssetUrl('images/vlantana_logo.jpg'),
        summary:
            'Legacy sistemų palaikymas, planavimo įrankių praplėtimas, ERP sistemos praplėtimas ir palaikymas.',
        highlights: [
            'SQL užklausų kūrimas ir optimizavimas.',
            'Canias ERP sistemos palaikymas, praplėtimas, duomenų sinchronizavimas, ataskaitų rengimas.',
            'Legacy projekto funkcionalumų migracija į Laravel išlaikant sklandų duomenų struktūrą ir procesų funkcionalumą.',
        ],
        stack: [
            'PHP',
            'JavaScript',
            'MySQL',
            'REST API',
            'Canias ERP',
            'jQuery',
            'Laravel',
            'Redis',
        ],
    },
    {
        company: 'UAB Geoparneris',
        role: 'Geodezijos inžinierius',
        period: 'Ankstesne patirtis',
        summary:
            'Naudota pažangiausia LiDAR technologija atliekant įvairių objektų geodezinius matavimus, duomenų apdorojimas inžineriniams ir statybos poreikiams.',
        highlights: [
            'Vykdžiau matavimus vėjų jėgainių projektuose, elektros linijų monitoringe ir įvairiuose statybų projektuose.',
            'Pilotavau DJI Matrice 600 ir DJI Phantom 4 bepiločius orlaivius.',
            'Apdorojau duomenis naudodamas CloudCompare, AutoCAD, TerraSolid ir kitus įrankius, kad sukurtų tikslius topografinius žemėlapius, taškų debesis ir inžinerinius brėžinius.',
        ],
        stack: [
            'LiDAR',
            'Point Cloud',
            'Topography',
            'AutoCAD',
            'Photogrammetry',
            'UAV'
        ],
    },
];
