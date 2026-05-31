import type { LocaleCode } from '@/i18n';

export interface ExperienceItem {
    role: string;
    period: string;
    summary: string;
    highlights: string[];
    stack: string[];
}

export interface ProjectStep {
    title: string;
    text: string;
    signal: string;
}

export interface ProjectItem {
    slug: string;
    title: string;
    summary: string;
    explanation: string;
    stack: string[];
    outcomes: string[];
    steps: ProjectStep[];
}

export interface PortfolioContent {
    home: {
        focusCards: Array<{
            label: string;
            value: string;
            detail: string;
        }>;
        skillGroups: Array<{
            title: string;
            items: string[];
        }>;
        keywords: string[];
    };
    experience: ExperienceItem[];
    projects: ProjectItem[];
}

export const lastUpdatedAt = '2026-05-31T00:00:00.000Z';

export const portfolioContent: Record<LocaleCode, PortfolioContent> = {
    en: {
        home: {
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
            keywords: [
                'AI',
                'Laravel',
                'PHP',
                'Vue',
                'TypeScript',
                'Python',
                'SQL',
                'APIs',
                'Tailwind',
                'PrimeVue',
                'GitHub',
                'Automation',
                'Testing',
                'Inertia',
                'Vite',
                'UX',
            ],
        },
        experience: [
            {
                role: 'Full-stack web developer',
                period: 'Current focus',
                summary:
                    'Building Laravel and Vue applications with practical automation, clean data flows, and maintainable interfaces.',
                highlights: [
                    'Shape application features from backend models through user-facing screens.',
                    'Turn repetitive operational work into clear workflows and reusable tools.',
                    'Use TypeScript and component structure to keep frontend behavior predictable.',
                ],
                stack: [
                    'Laravel',
                    'Vue',
                    'TypeScript',
                    'MySQL',
                    'Tailwind CSS',
                ],
            },
            {
                role: 'Automation and AI-assisted tooling',
                period: 'Ongoing',
                summary:
                    'Creating small systems that reduce manual steps, clarify decisions, and expose useful project context faster.',
                highlights: [
                    'Prototype data processing and assistant workflows with Python and APIs.',
                    'Connect tools through scripts, webhooks, and deployable static frontends.',
                    'Document repeatable patterns so projects are easier to extend later.',
                ],
                stack: ['Python', 'AI workflows', 'APIs', 'GitHub Actions'],
            },
        ],
        projects: [
            {
                slug: 'cv-spa',
                title: 'Static CV SPA',
                summary:
                    'A GitHub Pages-ready personal site with translated pages, project stories, and a PrimeVue shell.',
                explanation:
                    'The site separates portfolio content from the app shell, so copy, translations, and projects can evolve without touching the deployment path.',
                stack: [
                    'Vue',
                    'TypeScript',
                    'PrimeVue',
                    'vue-i18n',
                    'GitHub Pages',
                ],
                outcomes: [
                    'Clean slug routes for a static host.',
                    'Reusable project story component.',
                    'English and Lithuanian content structure.',
                ],
                steps: [
                    {
                        title: 'Route request',
                        text: 'The browser opens a slug such as /projects and GitHub Pages serves the static app fallback.',
                        signal: 'Slug',
                    },
                    {
                        title: 'Hydrate app',
                        text: 'Vue Router picks the page, vue-i18n resolves the active language, and the shared layout stays mounted.',
                        signal: 'SPA',
                    },
                    {
                        title: 'Show story',
                        text: 'The selected project feeds the explanation panel and the visual walkthrough on the right.',
                        signal: 'Story',
                    },
                ],
            },
            {
                slug: 'workflow-console',
                title: 'Workflow Console',
                summary:
                    'A project format for explaining technical systems as a sequence of visible decisions.',
                explanation:
                    'The component turns project notes into a guided narrative: what the user does, what the system changes, and what result appears next.',
                stack: ['Vue', 'State', 'Animation', 'UX writing'],
                outcomes: [
                    'One active project at a time.',
                    'Readable explanation beside visual progress.',
                    'Data-driven content for future projects.',
                ],
                steps: [
                    {
                        title: 'Choose context',
                        text: 'The visitor selects a project and the component resets to the first step.',
                        signal: 'Select',
                    },
                    {
                        title: 'Read action',
                        text: 'The left panel explains the project while the right panel advances through visual states.',
                        signal: 'Explain',
                    },
                    {
                        title: 'Compare outcome',
                        text: 'Outcomes stay visible so the story keeps a practical engineering shape.',
                        signal: 'Outcome',
                    },
                ],
            },
        ],
    },
    lt: {
        home: {
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
            keywords: [
                'AI',
                'Laravel',
                'PHP',
                'Vue',
                'TypeScript',
                'Python',
                'SQL',
                'API',
                'Tailwind',
                'PrimeVue',
                'GitHub',
                'Automatika',
                'Testai',
                'Inertia',
                'Vite',
                'UX',
            ],
        },
        experience: [
            {
                role: 'Full-stack web programuotojas',
                period: 'Dabartine kryptis',
                summary:
                    'Laravel ir Vue aplikaciju kurimas su praktiska automatika, aiskiais duomenu srautais ir palaikomomis sasajomis.',
                highlights: [
                    'Formuoju funkcijas nuo backend modeliu iki naudotojui matomu ekranu.',
                    'Pasikartojanti operacini darba paverciu aiskiais procesais ir pernaudojamais irankiais.',
                    'Naudoju TypeScript ir komponentu struktura, kad frontend elgsena butu prognozuojama.',
                ],
                stack: [
                    'Laravel',
                    'Vue',
                    'TypeScript',
                    'MySQL',
                    'Tailwind CSS',
                ],
            },
            {
                role: 'Automatika ir AI paremti irankiai',
                period: 'Nuolat',
                summary:
                    'Mazu sistemu kurimas, kurios mazina rankinius veiksmus, aiskina sprendimus ir greiciau parodo projekto konteksta.',
                highlights: [
                    'Prototipuoju duomenu apdorojima ir asistento srautus su Python bei API.',
                    'Jungiu irankius per scriptus, webhookus ir statinius frontendus.',
                    'Dokumentuoju kartojamus sablonus, kad projektus butu lengviau plesti.',
                ],
                stack: ['Python', 'AI procesai', 'API', 'GitHub Actions'],
            },
        ],
        projects: [
            {
                slug: 'cv-spa',
                title: 'Statinis CV SPA',
                summary:
                    'GitHub Pages pritaikytas asmeninis puslapis su vertimais, projektu istorijomis ir PrimeVue struktura.',
                explanation:
                    'Puslapis atskiria portfolio turini nuo aplikacijos karkaso, todel tekstai, vertimai ir projektai gali keistis nelieciant deployment kelio.',
                stack: [
                    'Vue',
                    'TypeScript',
                    'PrimeVue',
                    'vue-i18n',
                    'GitHub Pages',
                ],
                outcomes: [
                    'Svarus slug marsrutai statiniam hostingui.',
                    'Pernaudojamas projekto istorijos komponentas.',
                    'Anglu ir lietuviu turinio struktura.',
                ],
                steps: [
                    {
                        title: 'Marsruto uzklausa',
                        text: 'Narsykle atidaro sluga, pvz. /projects, o GitHub Pages grazina statines aplikacijos fallback faila.',
                        signal: 'Slug',
                    },
                    {
                        title: 'Aplikacijos ikelimas',
                        text: 'Vue Router parenka puslapi, vue-i18n nustato kalba, o bendras layout lieka uzkrautas.',
                        signal: 'SPA',
                    },
                    {
                        title: 'Istorijos rodymas',
                        text: 'Pasirinktas projektas uzpildo paaiskinimo dali ir vizualia eiga desineje.',
                        signal: 'Istorija',
                    },
                ],
            },
            {
                slug: 'workflow-console',
                title: 'Workflow Console',
                summary:
                    'Projekto formatas, kuris technines sistemas paaiskina kaip matomu sprendimu seka.',
                explanation:
                    'Komponentas projekto uzrasus pavercia vedama istorija: ka daro naudotojas, ka keicia sistema ir koks rezultatas matomas toliau.',
                stack: ['Vue', 'Busena', 'Animacija', 'UX tekstai'],
                outcomes: [
                    'Vienu metu aktyvus tik vienas projektas.',
                    'Skaitomas paaiskinimas salia vizualios eigos.',
                    'Duomenimis valdoma struktura busimiems projektams.',
                ],
                steps: [
                    {
                        title: 'Konteksto pasirinkimas',
                        text: 'Lankytojas pasirenka projekta, o komponentas grizta i pirma zingsni.',
                        signal: 'Pasirinkimas',
                    },
                    {
                        title: 'Veiksmo skaitymas',
                        text: 'Kaire dalis paaiskina projekta, o desine dalis pereina per vizualias busenas.',
                        signal: 'Paaiskinimas',
                    },
                    {
                        title: 'Rezultato palyginimas',
                        text: 'Rezultatai lieka matomi, todel istorija islaiko praktiska inzinerine forma.',
                        signal: 'Rezultatas',
                    },
                ],
            },
        ],
    },
};
