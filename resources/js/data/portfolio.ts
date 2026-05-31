import type { LocaleCode } from '@/i18n';

export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    logoUrl?: string;
    summary: string;
    highlights: string[];
    stack: string[];
}

export interface ProjectStep {
    title: string;
    text: string;
    signal: string;
}

export type ProjectVisibility = 'public' | 'personal';

export type ProjectStatus =
    | 'active'
    | 'experimental'
    | 'work-in-progress'
    | 'inactive'
    | 'tool';

export type ProjectLinkKind = 'website' | 'github';

export interface ProjectExternalLink {
    kind: ProjectLinkKind;
    url?: string;
}

export interface ProjectItem {
    slug: string;
    title: string;
    summary: string;
    category: string;
    visibility: ProjectVisibility;
    status: ProjectStatus;
    logoUrl?: string;
    primaryTechnology: string;
    externalLink?: ProjectExternalLink;
    explanation: string;
    stack: string[];
    outcomes: string[];
    steps: ProjectStep[];
}

export interface PortfolioSocialLink {
    label: string;
    icon: string;
    url: string;
}

export interface PortfolioIdentity {
    fullName: string;
    city: string;
    email: string;
    avatarUrl: string;
    coverImageUrl: string;
    socialLinks: PortfolioSocialLink[];
}

export type KeywordGroupTone = 'software' | 'engineering';

export interface KeywordGroup {
    title: string;
    tone: KeywordGroupTone;
    items: string[];
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
        keywordGroups: KeywordGroup[];
    };
    experience: ExperienceItem[];
    projects: ProjectItem[];
}

export const lastUpdatedAt = '2026-05-31T00:00:00.000Z';

const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const softwareEngineeringSkills = [
    'Laravel',
    'VueJS',
    'TypeScript',
    'JavaScript',
    'MySQL',
    'MSSQL',
    'SQLite',
    'PHP',
    'JQuery',
    'Tailwind CSS',
    'Kubernetes',
    'Tekton',
    'Harbor',
    'Python',
    'Computer Vision',
    'HTML',
    'CSS',
    'Git',
    'REST API',
    'PrimeVue',
    'WordPress',
    'Canias ERP',
    'Proxmox',
    'TrueNAS Scale',
    'Ollama',
    'AI',
    'LLM',
    'CI/CD',
    'IIS',
    'NodeJS',
    'Redis',
    'DevOps',
];

const engineeringSkills = [
    'Applanix PosPac',
    'YellowScan CS',
    'CloudCompare',
    'TerraSolid',
    'LiDAR',
    'AutoCAD',
    'Photogrammetry',
    'Topography',
    'Point Cloud',
    'Land Surverying',
    'Construction Surverying',
    'Powerlines',
    'Wind farms',
];

export const portfolioIdentity: PortfolioIdentity = {
    fullName: 'Naidželas Benetis',
    city: 'Klaipėda',
    email: 'naidzelas.benetis@gmail.com',
    avatarUrl: publicAssetUrl('images/DSC_1482.jpg'),
    coverImageUrl: publicAssetUrl('images/background-cliped.jpg'),
    socialLinks: [
        {
            label: 'GitHub',
            icon: 'pi pi-github',
            url: 'https://github.com/Naidzelas',
        },
        {
            label: 'LinkedIn',
            icon: 'pi pi-linkedin',
            url: 'https://www.linkedin.com/in/naidzelas-benetis/',
        },
    ],
};

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
            keywordGroups: [
                {
                    title: 'Software engineering',
                    tone: 'software',
                    items: softwareEngineeringSkills,
                },
                {
                    title: 'Engineering',
                    tone: 'engineering',
                    items: engineeringSkills,
                },
            ],
        },
        experience: [
            {
                company: 'AB Klaipėdos pienas',
                role: 'IT systems analyst',
                period: 'Current',
                logoUrl: publicAssetUrl('images/dione_logo.jpg'),
                summary:
                    'Full-stack development, process optimization, and migration of Excel-based solutions into a web environment.',
                highlights: [
                    'Building an application for hosting business-management tools using Laravel, Vue, Inertia, and TypeScript.',
                    'Preparing database data structures, API integrations, and support for legacy logic.',
                    'Handling DevOps responsibilities to optimize application development and maintenance workflows.',
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
                role: 'Programmer',
                period: 'Previous experience',
                logoUrl: publicAssetUrl('images/vlantana_logo.jpg'),
                summary:
                    'Legacy system maintenance, planning-tool extensions, and ERP system extension and support.',
                highlights: [
                    'Created and optimized SQL queries.',
                    'Maintained and extended the Canias ERP system, synchronized data, and prepared reports.',
                    'Migrated legacy project functionality to Laravel while preserving smooth data structure and process functionality.',
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
                role: 'Geodetic engineer',
                period: 'Earlier experience',
                summary:
                    'Used advanced LiDAR technology for geodetic measurements of various sites and processed data for engineering and construction needs.',
                highlights: [
                    'Performed measurements for wind-farm projects, power-line monitoring, and various construction projects.',
                    'Piloted DJI Matrice 600 and DJI Phantom 4 unmanned aerial vehicles.',
                    'Processed data with CloudCompare, AutoCAD, TerraSolid, and other tools to create accurate topographic maps, point clouds, and engineering drawings.',
                ],
                stack: [
                    'LiDAR',
                    'Point Cloud',
                    'Topography',
                    'AutoCAD',
                    'Photogrammetry',
                ],
            },
        ],
        projects: [
            {
                slug: 'penkilaukai',
                title: 'Penkilaukai',
                summary:
                    'A public e-commerce project for presenting products and supporting a practical online storefront.',
                category: 'E-commerce project',
                visibility: 'public',
                status: 'active',
                logoUrl: publicAssetUrl('images/Penki-laukai-Logo-Black.svg'),
                primaryTechnology: 'PHP',
                externalLink: {
                    kind: 'website',
                    url: 'https://penkilaukai.lt',
                },
                explanation:
                    'The story for this project will focus on the commerce flow, admin operations, and the Laravel/Vue stack behind the public site.',
                stack: [
                    'PHP',
                    'Laravel',
                    'Inertia',
                    'VueJS',
                    'TypeScript',
                    'PHPFilament',
                ],
                outcomes: [
                    'Public website available for visitors.',
                    'Laravel application structure for product and content management.',
                    'Vue and TypeScript interface for a smoother customer experience.',
                ],
                steps: [
                    {
                        title: 'Public storefront',
                        text: 'Visitors land on the public website, browse the business offering, and continue through the e-commerce experience.',
                        signal: 'Store',
                    },
                    {
                        title: 'Application layer',
                        text: 'Laravel, Inertia, VueJS, and TypeScript keep the server-driven product flow connected to a responsive frontend.',
                        signal: 'Stack',
                    },
                    {
                        title: 'Operations',
                        text: 'Filament-based administration supports product and store management behind the public experience.',
                        signal: 'Admin',
                    },
                ],
            },
            {
                slug: 'llm-obsidian-bridge',
                title: 'LLM Obsidian Bridge',
                summary:
                    'A personal AI project for connecting local language-model workflows with an Obsidian knowledge base.',
                category: 'AI project',
                visibility: 'personal',
                status: 'experimental',
                primaryTechnology: 'TypeScript',
                externalLink: {
                    kind: 'github',
                },
                explanation:
                    'The story will describe how notes, prompts, and local model calls can move through a reproducible automation pipeline.',
                stack: ['TypeScript', 'Kubernetes', 'Tekton', 'Ollama'],
                outcomes: [
                    'Bridge concept for Obsidian-centered AI workflows.',
                    'Local model experimentation with Ollama.',
                    'Pipeline-first thinking using Kubernetes and Tekton.',
                ],
                steps: [
                    {
                        title: 'Collect notes',
                        text: 'Obsidian content becomes the working context for prompts and automation tasks.',
                        signal: 'Vault',
                    },
                    {
                        title: 'Run model task',
                        text: 'TypeScript services coordinate local LLM calls through Ollama and prepare structured responses.',
                        signal: 'LLM',
                    },
                    {
                        title: 'Automate pipeline',
                        text: 'Kubernetes and Tekton keep the experimental workflow reproducible as it grows.',
                        signal: 'Flow',
                    },
                ],
            },
            {
                slug: 'tipodieta',
                title: 'TipoDieta',
                summary:
                    'A personal nutrition project exploring typed meal data, scraping, and repeatable deployment workflows.',
                category: 'Nutrition project',
                visibility: 'personal',
                status: 'work-in-progress',
                primaryTechnology: 'TypeScript',
                externalLink: {
                    kind: 'github',
                },
                explanation:
                    'The story will cover the path from scraped nutrition sources to structured data that can support practical food decisions.',
                stack: ['TypeScript', 'Kubernetes', 'Tekton', 'Web Scraping'],
                outcomes: [
                    'Typed data model for nutrition information.',
                    'Scraping workflow for collecting source data.',
                    'Deployment experiments using Kubernetes and Tekton.',
                ],
                steps: [
                    {
                        title: 'Gather data',
                        text: 'Web scraping collects nutrition-oriented source material for later cleanup and structure.',
                        signal: 'Scrape',
                    },
                    {
                        title: 'Shape records',
                        text: 'TypeScript keeps the nutrition data model explicit while the project is still evolving.',
                        signal: 'Types',
                    },
                    {
                        title: 'Deploy workflow',
                        text: 'Kubernetes and Tekton provide a repeatable place to run and refine the pipeline.',
                        signal: 'Deploy',
                    },
                ],
            },
            {
                slug: 'suber',
                title: 'Suber',
                summary:
                    'A personal AI movie translator experiment combining Python processing with a lightweight JavaScript interface.',
                category: 'AI movie translator',
                visibility: 'personal',
                status: 'experimental',
                primaryTechnology: 'Python',
                externalLink: {
                    kind: 'github',
                },
                explanation:
                    'The story will explain the translation workflow, where Python handles the heavy processing and JavaScript supports the user-facing pieces.',
                stack: ['Python', 'JavaScript'],
                outcomes: [
                    'Experiment focused on movie translation workflows.',
                    'Python processing layer for language tasks.',
                    'JavaScript interface layer for interaction and review.',
                ],
                steps: [
                    {
                        title: 'Load media context',
                        text: 'The project starts from movie subtitle or language material that needs translation support.',
                        signal: 'Input',
                    },
                    {
                        title: 'Process translation',
                        text: 'Python coordinates the translation-oriented processing and prepares output for review.',
                        signal: 'Python',
                    },
                    {
                        title: 'Review result',
                        text: 'JavaScript can support a lightweight layer for checking and refining translated content.',
                        signal: 'Review',
                    },
                ],
            },
            {
                slug: 'laravel-tinker',
                title: 'Laravel-Tinker',
                summary:
                    'A personal PHP tool for making Laravel Tinker workflows easier to reach from a repository.',
                category: 'Developer tool',
                visibility: 'personal',
                status: 'tool',
                primaryTechnology: 'PHP',
                externalLink: {
                    kind: 'github',
                    url: 'https://github.com/Naidzelas/Laravel-Tinker',
                },
                explanation:
                    'The story will describe the small-tool workflow and why quick access to Laravel Tinker can help during development and debugging.',
                stack: ['PHP'],
                outcomes: [
                    'Public GitHub repository for the tool.',
                    'Focused PHP utility for Laravel development workflows.',
                    'Small scope that is easy to revisit and improve.',
                ],
                steps: [
                    {
                        title: 'Open project',
                        text: 'A Laravel developer starts from a repository where quick Tinker access would save repeated setup time.',
                        signal: 'Start',
                    },
                    {
                        title: 'Run utility',
                        text: 'The PHP tool keeps the interaction focused on the Laravel runtime and the commands being explored.',
                        signal: 'Tinker',
                    },
                    {
                        title: 'Inspect result',
                        text: 'The workflow supports fast feedback while testing models, services, or framework behavior.',
                        signal: 'Result',
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
            keywordGroups: [
                {
                    title: 'Programavimas',
                    tone: 'software',
                    items: softwareEngineeringSkills,
                },
                {
                    title: 'Inzinerija',
                    tone: 'engineering',
                    items: engineeringSkills,
                },
            ],
        },
        experience: [
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
                ],
            },
        ],
        projects: [
            {
                slug: 'penkilaukai',
                title: 'Penkilaukai',
                summary:
                    'Viešas e. komercijos projektas produktų pristatymui ir praktinei internetinei prekybai.',
                category: 'E. komercijos projektas',
                visibility: 'public',
                status: 'active',
                logoUrl: publicAssetUrl('images/Penki-laukai-Logo-Black.svg'),
                primaryTechnology: 'PHP',
                externalLink: {
                    kind: 'website',
                    url: 'https://penkilaukai.lt',
                },
                explanation:
                    'Šio projekto istorija vėliau apims prekybos srautą, administravimo procesus ir Laravel/Vue stacką už viešo puslapio.',
                stack: [
                    'PHP',
                    'Laravel',
                    'Inertia',
                    'VueJS',
                    'TypeScript',
                    'PHPFilament',
                ],
                outcomes: [
                    'Viešas puslapis pasiekiamas lankytojams.',
                    'Laravel aplikacijos struktūra produktų ir turinio valdymui.',
                    'Vue ir TypeScript sąsaja sklandesnei kliento patirčiai.',
                ],
                steps: [
                    {
                        title: 'Vieša parduotuvė',
                        text: 'Lankytojai patenka į viešą puslapį, peržiūri pasiūlą ir juda per e. komercijos patirtį.',
                        signal: 'Store',
                    },
                    {
                        title: 'Aplikacijos sluoksnis',
                        text: 'Laravel, Inertia, VueJS ir TypeScript sujungia serverio valdomą srautą su prisitaikančiu frontendu.',
                        signal: 'Stack',
                    },
                    {
                        title: 'Operacijos',
                        text: 'Filament administravimas palaiko produktų ir parduotuvės valdymą už viešos patirties.',
                        signal: 'Admin',
                    },
                ],
            },
            {
                slug: 'llm-obsidian-bridge',
                title: 'LLM Obsidian Bridge',
                summary:
                    'Asmeninis AI projektas, jungiantis vietinius kalbos modelių procesus su Obsidian žinių baze.',
                category: 'AI projektas',
                visibility: 'personal',
                status: 'experimental',
                primaryTechnology: 'TypeScript',
                externalLink: {
                    kind: 'github',
                },
                explanation:
                    'Istorija aprašys, kaip užrašai, promptai ir vietinio modelio kvietimai gali judėti per atkuriamą automatizavimo procesą.',
                stack: ['TypeScript', 'Kubernetes', 'Tekton', 'Ollama'],
                outcomes: [
                    'Obsidian orientuotų AI procesų tilto koncepcija.',
                    'Vietinio modelio eksperimentai su Ollama.',
                    'Pipeline principu paremtas darbas su Kubernetes ir Tekton.',
                ],
                steps: [
                    {
                        title: 'Surinkti užrašus',
                        text: 'Obsidian turinys tampa darbiniu kontekstu promptams ir automatizavimo užduotims.',
                        signal: 'Vault',
                    },
                    {
                        title: 'Paleisti modelio užduotį',
                        text: 'TypeScript servisai koordinuoja vietinius LLM kvietimus per Ollama ir ruošia struktūruotus atsakymus.',
                        signal: 'LLM',
                    },
                    {
                        title: 'Automatizuoti eigą',
                        text: 'Kubernetes ir Tekton palaiko atkuriamą eksperimentinį procesą jam augant.',
                        signal: 'Flow',
                    },
                ],
            },
            {
                slug: 'tipodieta',
                title: 'TipoDieta',
                summary:
                    'Asmeninis mitybos projektas, tiriantis tipizuotus valgio duomenis, scrapingą ir atkuriamus diegimo procesus.',
                category: 'Mitybos projektas',
                visibility: 'personal',
                status: 'work-in-progress',
                primaryTechnology: 'TypeScript',
                externalLink: {
                    kind: 'github',
                },
                explanation:
                    'Istorija apims kelią nuo surinktų mitybos šaltinių iki struktūruotų duomenų, kurie gali padėti priimti praktinius maisto sprendimus.',
                stack: ['TypeScript', 'Kubernetes', 'Tekton', 'Web Scraping'],
                outcomes: [
                    'Tipizuotas mitybos informacijos duomenų modelis.',
                    'Scraping procesas šaltinių duomenims rinkti.',
                    'Diegimo eksperimentai su Kubernetes ir Tekton.',
                ],
                steps: [
                    {
                        title: 'Rinkti duomenis',
                        text: 'Web scraping surenka su mityba susijusią šaltinių medžiagą vėlesniam valymui ir struktūravimui.',
                        signal: 'Scrape',
                    },
                    {
                        title: 'Formuoti įrašus',
                        text: 'TypeScript išlaiko aiškų mitybos duomenų modelį, kol projektas dar vystomas.',
                        signal: 'Types',
                    },
                    {
                        title: 'Diegti procesą',
                        text: 'Kubernetes ir Tekton suteikia atkuriamą vietą pipeline paleidimui ir tobulinimui.',
                        signal: 'Deploy',
                    },
                ],
            },
            {
                slug: 'suber',
                title: 'Suber',
                summary:
                    'Asmeninis AI filmų vertėjo eksperimentas, jungiantis Python apdorojimą su lengva JavaScript sąsaja.',
                category: 'AI filmų vertėjas',
                visibility: 'personal',
                status: 'experimental',
                primaryTechnology: 'Python',
                externalLink: {
                    kind: 'github',
                },
                explanation:
                    'Istorija paaiškins vertimo eigą, kur Python atlieka sunkesnį apdorojimą, o JavaScript palaiko naudotojo sąsajos dalis.',
                stack: ['Python', 'JavaScript'],
                outcomes: [
                    'Eksperimentas, orientuotas į filmų vertimo eigą.',
                    'Python apdorojimo sluoksnis kalbos užduotims.',
                    'JavaScript sąsajos sluoksnis sąveikai ir peržiūrai.',
                ],
                steps: [
                    {
                        title: 'Įkelti medijos kontekstą',
                        text: 'Projektas prasideda nuo filmo subtitrų ar kalbinės medžiagos, kuriai reikia vertimo pagalbos.',
                        signal: 'Input',
                    },
                    {
                        title: 'Apdoroti vertimą',
                        text: 'Python koordinuoja į vertimą orientuotą apdorojimą ir paruošia rezultatą peržiūrai.',
                        signal: 'Python',
                    },
                    {
                        title: 'Peržiūrėti rezultatą',
                        text: 'JavaScript gali palaikyti lengvą sluoksnį išversto turinio tikrinimui ir tikslinimui.',
                        signal: 'Review',
                    },
                ],
            },
            {
                slug: 'laravel-tinker',
                title: 'Laravel-Tinker',
                summary:
                    'Asmeninis PHP įrankis, palengvinantis Laravel Tinker procesus tiesiai iš repositorijos.',
                category: 'Programuotojo įrankis',
                visibility: 'personal',
                status: 'tool',
                primaryTechnology: 'PHP',
                externalLink: {
                    kind: 'github',
                    url: 'https://github.com/Naidzelas/Laravel-Tinker',
                },
                explanation:
                    'Istorija aprašys mažo įrankio eigą ir kodėl greita prieiga prie Laravel Tinker padeda kuriant ir derinant aplikacijas.',
                stack: ['PHP'],
                outcomes: [
                    'Vieša GitHub repositorija įrankiui.',
                    'Koncentruota PHP pagalba Laravel kūrimo procesams.',
                    'Maža apimtis, kurią lengva peržiūrėti ir tobulinti.',
                ],
                steps: [
                    {
                        title: 'Atidaryti projektą',
                        text: 'Laravel programuotojas pradeda nuo repositorijos, kur greita Tinker prieiga sumažina pasikartojantį pasiruošimą.',
                        signal: 'Start',
                    },
                    {
                        title: 'Paleisti įrankį',
                        text: 'PHP įrankis išlaiko dėmesį Laravel runtime aplinkai ir tiriamoms komandoms.',
                        signal: 'Tinker',
                    },
                    {
                        title: 'Patikrinti rezultatą',
                        text: 'Procesas palaiko greitą grįžtamąjį ryšį testuojant modelius, servisus ar framework elgseną.',
                        signal: 'Result',
                    },
                ],
            },
        ],
    },
};
