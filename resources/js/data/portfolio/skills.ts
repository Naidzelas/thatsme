import type { KeywordItem } from './types';

const softwareEngineeringSkillLabels = [
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
] as const;

const engineeringSkillLabels = [
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
] as const;

const softwareEngineeringSkillDescriptionsEn: Record<string, string> = {
    Laravel:
        'Backend framework work for web applications, APIs, queues, and maintainable domain logic.',
    VueJS: 'Reactive interface work for practical, component-driven user experiences.',
    TypeScript:
        'Typed JavaScript for safer frontend flows, tooling, and data-heavy application code.',
    JavaScript:
        'Browser and runtime scripting for interactive product behavior and integrations.',
    MySQL: 'Relational database design, queries, and operational data work in product systems.',
    MSSQL: 'Microsoft SQL Server work for business data, reporting, and legacy integrations.',
    SQLite: 'Lightweight relational storage for local tools, tests, and portable prototypes.',
    PHP: 'Server-side application code for Laravel projects, tools, and business workflows.',
    JQuery: 'Legacy interface support where existing systems still depend on jQuery patterns.',
    'Tailwind CSS':
        'Utility-first styling for responsive layouts and consistent interface systems.',
    Kubernetes:
        'Container orchestration experiments for repeatable deployments and service workflows.',
    Tekton: 'Pipeline automation for repeatable build, scrape, and deployment processes.',
    Harbor: 'Container registry experience around image storage and deployment support.',
    Python: 'Automation and data-processing work for scripts, AI experiments, and media workflows.',
    'Computer Vision':
        'Image-oriented processing experiments where software needs to inspect visual data.',
    HTML: 'Semantic page structure for accessible, durable web interfaces.',
    CSS: 'Responsive styling fundamentals behind polished and stable user interfaces.',
    Git: 'Version-control habits for clean collaboration, review, and project history.',
    'REST API':
        'HTTP API design and integration for connecting applications and services.',
    PrimeVue:
        'Vue component library work for practical forms, controls, and polished UI states.',
    WordPress:
        'Content site work and maintenance where WordPress remains the right fit.',
    'Canias ERP':
        'ERP extension and reporting experience inside business operations systems.',
    Proxmox:
        'Virtualization lab work for hosting, experiments, and infrastructure learning.',
    'TrueNAS Scale':
        'Storage and home-lab infrastructure experience for durable service setups.',
    Ollama: 'Local LLM runtime experiments for private AI-assisted workflows.',
    AI: 'Applied AI tooling focused on practical workflows rather than novelty alone.',
    LLM: 'Large-language-model integrations with structured prompts, local runtimes, and tool flows.',
    'CI/CD':
        'Delivery automation that keeps builds, checks, and deployments repeatable.',
    IIS: 'Windows web-server experience for hosted applications and legacy environments.',
    NodeJS: 'JavaScript runtime work for tooling, local services, and integration experiments.',
    Redis: 'Fast key-value storage for caching, queues, and application support systems.',
    DevOps: 'Operational ownership across environments, deployment flow, and maintainability.',
};

const softwareEngineeringSkillDescriptionsLt: Record<string, string> = {
    Laravel:
        'Backend karkasas web aplikacijoms, API, workeriams ir palaikomai domeno logikai.',
    VueJS: 'Reaktyvios sasajos darbas praktiskoms, komponentais paremtoms naudotojo patirtims.',
    TypeScript:
        'Tipizuotas JavaScript saugesniems frontend srautams, irankiams ir duomenu kodui.',
    JavaScript:
        'Naršykles ir runtime skriptai interaktyviam produkto elgesiui bei integracijoms.',
    MySQL: 'Reliacinių duomenų bazių struktūra, užklausos ir operaciniai produkto duomenys.',
    MSSQL: 'Microsoft SQL Server darbas verslo duomenims, ataskaitoms ir legacy integracijoms.',
    SQLite: 'Lengva reliacinė saugykla lokaliems įrankiams, testams ir prototipams.',
    PHP: 'Serverio aplikacijų kodas Laravel projektams, įrankiams ir verslo procesams.',
    JQuery: 'Legacy sąsajų palaikymas ten, kur sistemos vis dar remiasi jQuery principais.',
    'Tailwind CSS':
        'Utility-first stilius prisitaikantiems išdėstymams ir nuoseklioms sąsajoms.',
    Kubernetes:
        'Konteinerių orkestravimo eksperimentai atkuriamiems diegimams ir paslaugoms.',
    Tekton: 'Pipeline automatizavimas atkuriamiems build, scraping ir diegimo procesams.',
    Harbor: 'Konteinerių registro patirtis saugant image ir palaikant diegimus.',
    Python: 'Automatizavimas ir duomenų apdorojimas skriptams, AI eksperimentams ir medijai.',
    'Computer Vision':
        'Vaizdų apdorojimo eksperimentai, kai programai reikia suprasti vizualius duomenis.',
    HTML: 'Semantinė puslapio struktūra prieinamoms ir patvarioms web sąsajoms.',
    CSS: 'Prisitaikančio stiliaus pagrindai tvarkingoms ir stabilioms naudotojo sąsajoms.',
    Git: 'Versijavimo įpročiai tvarkingam bendradarbiavimui, peržiūrai ir istorijai.',
    'REST API':
        'HTTP API kūrimas ir integracijos aplikacijų bei paslaugų sujungimui.',
    PrimeVue:
        'Vue komponentų biblioteka praktiškoms formoms, valdikliams ir UI būsenoms.',
    WordPress:
        'Turinio svetainių darbas ir priežiūra, kai WordPress yra tinkamas pasirinkimas.',
    'Canias ERP':
        'ERP plėtros ir ataskaitų patirtis verslo operacijų sistemose.',
    Proxmox:
        'Virtualizacijos laboratorija hostinimui, eksperimentams ir infrastruktūros mokymuisi.',
    'TrueNAS Scale':
        'Saugyklos ir home-lab infrastruktūros patirtis patvarioms paslaugoms.',
    Ollama: 'Lokalaus LLM runtime eksperimentai privatiems AI padedamiems procesams.',
    AI: 'Praktiškai pritaikomi AI įrankiai, orientuoti į realius darbo srautus.',
    LLM: 'Kalbos modelių integracijos su struktūruotais promptais, lokaliais runtime ir tool srautais.',
    'CI/CD':
        'Pristatymo automatizavimas, kad build, patikros ir diegimai būtų atkuriami.',
    IIS: 'Windows web serverio patirtis hostintoms aplikacijoms ir legacy aplinkoms.',
    NodeJS: 'JavaScript runtime darbas įrankiams, lokalioms paslaugoms ir integracijoms.',
    Redis: 'Greita key-value saugykla cache, eilėms ir aplikacijų palaikymui.',
    DevOps: 'Operacinė atsakomybė už aplinkas, diegimo eigą ir palaikomumą.',
};

const engineeringSkillDescriptionsEn: Record<string, string> = {
    'Applanix PosPac':
        'Trajectory and positioning processing for precise geospatial measurement work.',
    'YellowScan CS':
        'LiDAR capture workflow experience with YellowScan control software.',
    CloudCompare:
        'Point-cloud inspection and processing for measurement and engineering deliverables.',
    TerraSolid:
        'Geospatial data processing for LiDAR, terrain, and engineering outputs.',
    LiDAR: 'Laser-scanning measurement experience for terrain, structures, and infrastructure sites.',
    AutoCAD:
        'Engineering drawing and map preparation for practical field and construction outputs.',
    Photogrammetry:
        'Image-based measurement workflows for mapping and 3D reconstruction context.',
    Topography:
        'Surveying work focused on terrain shape, site detail, and practical measurements.',
    'Point Cloud':
        'Dense spatial data processing for maps, models, and engineering inspection.',
    'Land Surverying':
        'Land surveying field and processing work for site and boundary context.',
    'Construction Surverying':
        'Construction surveying support for layout, control, and measurement checks.',
    Powerlines:
        'Measurement and monitoring context for power-line infrastructure projects.',
    'Wind farms':
        'Surveying and measurement experience around wind-farm construction environments.',
};

const engineeringSkillDescriptionsLt: Record<string, string> = {
    'Applanix PosPac':
        'Trajektorijos ir pozicionavimo apdorojimas tiksliems geodeziniams matavimams.',
    'YellowScan CS':
        'LiDAR matavimo srautų patirtis su YellowScan valdymo programine įranga.',
    CloudCompare:
        'Taškų debesų tikrinimas ir apdorojimas matavimo bei inžineriniams rezultatams.',
    TerraSolid:
        'Geoduomenų apdorojimas LiDAR, reljefo ir inžineriniams rezultatams.',
    LiDAR: 'Lazerinio skenavimo matavimai reljefui, statiniams ir infrastruktūros objektams.',
    AutoCAD:
        'Inžinerinių brėžinių ir žemėlapių rengimas praktiniams lauko bei statybos rezultatams.',
    Photogrammetry:
        'Vaizdais paremti matavimo procesai kartografavimui ir 3D rekonstrukcijai.',
    Topography:
        'Geodezinis darbas su reljefu, vietovės detalėmis ir praktiniais matavimais.',
    'Point Cloud':
        'Tankių erdvinių duomenų apdorojimas žemėlapiams, modeliams ir patikroms.',
    'Land Surverying':
        'Žemės matavimų lauko ir apdorojimo darbas vietovės bei ribų kontekstui.',
    'Construction Surverying':
        'Statybų geodezijos pagalba išdėstymui, kontrolei ir matavimo patikroms.',
    Powerlines:
        'Matavimų ir monitoringo kontekstas elektros linijų infrastruktūros projektams.',
    'Wind farms':
        'Geodezinių matavimų patirtis vėjo jėgainių statybos aplinkose.',
};

const keywordFilterCodes: Record<string, string> = {
    'Tailwind CSS': 'vuejs',
    'REST API': 'typescript',
    VueJS: 'vuejs',
    PrimeVue: 'vuejs',
    JQuery: 'jquery',
    AI: 'ollama',
    LLM: 'ollama',
    'CI/CD': 'kubernetes',
    NodeJS: 'javascript',
    DevOps: 'kubernetes',
};

const createKeywordItems = (
    labels: readonly string[],
    descriptions: Record<string, string>,
) =>
    labels.map<KeywordItem>((label) => ({
        label,
        description: descriptions[label],
        ...(keywordFilterCodes[label]
            ? { filterCode: keywordFilterCodes[label] }
            : {}),
    }));

export const softwareEngineeringSkillsEn = createKeywordItems(
    softwareEngineeringSkillLabels,
    softwareEngineeringSkillDescriptionsEn,
);

export const softwareEngineeringSkillsLt = createKeywordItems(
    softwareEngineeringSkillLabels,
    softwareEngineeringSkillDescriptionsLt,
);

export const engineeringSkillsEn = createKeywordItems(
    engineeringSkillLabels,
    engineeringSkillDescriptionsEn,
);

export const engineeringSkillsLt = createKeywordItems(
    engineeringSkillLabels,
    engineeringSkillDescriptionsLt,
);
