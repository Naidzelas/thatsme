import type { LocaleCode } from '@/i18n';
import {
    ffmpegUrl,
    filamentUrl,
    labelImgUrl,
    laravelUrl,
    obsidianCopilotUrl,
    obsidianLocalRestApiUrl,
    obsidianUrl,
    ollamaUrl,
    opencvUrl,
    openSubtitlesUrl,
    payseraDeliveryUrl,
    roboflowUrl,
    yoloUrl,
} from './shared';
import type {
    ProjectFlowEdge,
    ProjectFlowNode,
    ProjectShowcase,
    ProjectShowcaseLink,
} from './types';

const obsidianBridgeFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'copilot',
        label: 'Obsidian Copilot',
        text: 'Chat client inside the vault',
        icon: 'pi-comments',
        href: obsidianCopilotUrl,
    },
    {
        id: 'endpoint',
        label: 'POST /v1/chat/completions',
        text: 'OpenAI-compatible bridge route',
        icon: 'pi-send',
        reference: 'src/server.ts',
    },
    {
        id: 'parser',
        label: 'parseChatCompletionRequest()',
        text: 'Zod validates and normalizes content',
        icon: 'pi-filter',
        reference: 'src/providers/openaiCompat.ts',
    },
    {
        id: 'agent',
        label: 'BridgeAgent.respond()',
        text: 'Orchestrates confirmation and planning',
        icon: 'pi-sitemap',
        reference: 'src/agent.ts',
    },
    {
        id: 'confirmation',
        label: 'apply / reject gate',
        text: 'Direct confirmations skip the model',
        icon: 'pi-check-circle',
        reference: 'src/agent.ts',
    },
    {
        id: 'ollama',
        label: 'Ollama JSON planning',
        text: 'Local model returns tool intent',
        icon: 'pi-bolt',
        href: ollamaUrl,
        reference: 'src/providers/ollama.ts',
    },
    {
        id: 'registry',
        label: 'ToolRegistry.execute()',
        text: 'Runs read/propose/apply actions',
        icon: 'pi-cog',
        reference: 'src/tools/registry.ts',
    },
    {
        id: 'rest',
        label: 'Obsidian Local REST API',
        text: 'Reads and writes vault notes',
        icon: 'pi-server',
        href: obsidianLocalRestApiUrl,
        reference: 'src/tools/obsidianRest.ts',
    },
    {
        id: 'vault',
        label: 'Obsidian vault',
        text: 'Markdown notes remain preview-first',
        icon: 'pi-book',
        href: obsidianUrl,
    },
    {
        id: 'response',
        label: 'Copilot response',
        text: 'Plain JSON or SSE chunks return',
        icon: 'pi-reply',
        reference: 'src/providers/openaiCompat.ts',
    },
];

const obsidianBridgeFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'copilot',
        label: 'Obsidian Copilot',
        text: 'Chat klientas vault viduje',
        icon: 'pi-comments',
        href: obsidianCopilotUrl,
    },
    {
        id: 'endpoint',
        label: 'POST /v1/chat/completions',
        text: 'OpenAI suderinamas bridge kelias',
        icon: 'pi-send',
        reference: 'src/server.ts',
    },
    {
        id: 'parser',
        label: 'parseChatCompletionRequest()',
        text: 'Zod patikrina ir normalizuoja turinį',
        icon: 'pi-filter',
        reference: 'src/providers/openaiCompat.ts',
    },
    {
        id: 'agent',
        label: 'BridgeAgent.respond()',
        text: 'Valdo patvirtinimus ir planavimą',
        icon: 'pi-sitemap',
        reference: 'src/agent.ts',
    },
    {
        id: 'confirmation',
        label: 'apply / reject vartai',
        text: 'Tiesioginiai patvirtinimai praleidžia modelį',
        icon: 'pi-check-circle',
        reference: 'src/agent.ts',
    },
    {
        id: 'ollama',
        label: 'Ollama JSON planavimas',
        text: 'Vietinis modelis grąžina tool ketinimą',
        icon: 'pi-bolt',
        href: ollamaUrl,
        reference: 'src/providers/ollama.ts',
    },
    {
        id: 'registry',
        label: 'ToolRegistry.execute()',
        text: 'Vykdo read/propose/apply veiksmus',
        icon: 'pi-cog',
        reference: 'src/tools/registry.ts',
    },
    {
        id: 'rest',
        label: 'Obsidian Local REST API',
        text: 'Skaito ir rašo vault užrašus',
        icon: 'pi-server',
        href: obsidianLocalRestApiUrl,
        reference: 'src/tools/obsidianRest.ts',
    },
    {
        id: 'vault',
        label: 'Obsidian vault',
        text: 'Markdown užrašai lieka preview-first',
        icon: 'pi-book',
        href: obsidianUrl,
    },
    {
        id: 'response',
        label: 'Copilot atsakymas',
        text: 'Grąžinamas JSON arba SSE srautas',
        icon: 'pi-reply',
        reference: 'src/providers/openaiCompat.ts',
    },
];

const obsidianBridgeFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'copilot', to: 'endpoint', label: 'POST' },
    { from: 'endpoint', to: 'parser', label: 'validate' },
    { from: 'parser', to: 'agent', label: 'messages' },
    { from: 'agent', to: 'confirmation', label: 'check' },
    { from: 'confirmation', to: 'ollama', label: 'otherwise' },
    { from: 'ollama', to: 'registry', label: 'tool/action' },
    { from: 'registry', to: 'rest', label: 'REST' },
    { from: 'rest', to: 'vault', label: 'note I/O' },
    { from: 'vault', to: 'response', label: 'result' },
];

const obsidianBridgeFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'copilot', to: 'endpoint', label: 'POST' },
    { from: 'endpoint', to: 'parser', label: 'validacija' },
    { from: 'parser', to: 'agent', label: 'žinutės' },
    { from: 'agent', to: 'confirmation', label: 'tikrinimas' },
    { from: 'confirmation', to: 'ollama', label: 'kitu atveju' },
    { from: 'ollama', to: 'registry', label: 'įrankis/veiksmas' },
    { from: 'registry', to: 'rest', label: 'REST' },
    { from: 'rest', to: 'vault', label: 'užrašai' },
    { from: 'vault', to: 'response', label: 'rezultatas' },
];

export const createObsidianBridgeShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase => ({
    type: 'flowchart',
    title,
    text,
    nodes:
        locale === 'lt' ? obsidianBridgeFlowNodesLt : obsidianBridgeFlowNodesEn,
    edges:
        locale === 'lt' ? obsidianBridgeFlowEdgesLt : obsidianBridgeFlowEdgesEn,
    activeNodeIds,
    direction: 'vertical',
    links: [
        {
            label: 'Obsidian',
            url: obsidianUrl,
            icon: 'pi-book',
            kind: 'external',
        },
        {
            label: 'Ollama',
            url: ollamaUrl,
            icon: 'pi-bolt',
            kind: 'external',
        },
    ],
});

const createFlowShowcase = (
    title: string,
    text: string,
    nodes: ProjectFlowNode[],
    edges: ProjectFlowEdge[],
    activeNodeIds: string[],
    links: ProjectShowcaseLink[] = [],
): ProjectShowcase => ({
    type: 'flowchart',
    title,
    text,
    nodes,
    edges,
    activeNodeIds,
    direction: 'vertical',
    ...(links.length ? { links } : {}),
});

const penkilaukaiFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'visitor',
        label: 'Store visitor',
        text: 'Starts from the public storefront',
        icon: 'pi-user',
        href: 'https://penkilaukai.lt',
    },
    {
        id: 'catalog',
        label: 'Product API',
        text: 'Loads active products and pricing',
        icon: 'pi-list',
        reference: 'resources/store/src/services/api.ts',
    },
    {
        id: 'media',
        label: 'Product media',
        text: 'Optimized gallery images and detail views',
        icon: 'pi-images',
        reference: 'resources/store/src/pages/ShopItemOverview.vue',
    },
    {
        id: 'consent',
        label: 'Cookie consent',
        text: 'Granular GDPR preferences stay accessible',
        icon: 'pi-shield',
        reference: 'cookie_consent_gdpr_implementation.md',
    },
    {
        id: 'cart',
        label: 'Pinia cart',
        text: 'Cookie persistence with quantity controls',
        icon: 'pi-shopping-cart',
        reference: 'resources/store/src/stores/useCartStore.ts',
    },
    {
        id: 'checkout',
        label: 'Checkout form',
        text: 'Customer, cart, and delivery data meet',
        icon: 'pi-credit-card',
        reference: 'resources/store/src/pages/ShopCheckout.vue',
    },
    {
        id: 'delivery',
        label: 'Paysera delivery',
        text: 'Parcel machines and real-time prices',
        icon: 'pi-truck',
        href: payseraDeliveryUrl,
        reference: 'app/Services/Payments/PayseraDeliveryService.php',
    },
    {
        id: 'order',
        label: 'Order validation',
        text: 'Stock, prices, and totals are checked',
        icon: 'pi-verified',
        reference: 'app/Http/Controllers/Api/OrderController.php',
    },
    {
        id: 'invoice',
        label: 'PDF invoice + email',
        text: 'Confirmation package for the customer',
        icon: 'pi-file-pdf',
        reference: 'pdf_invoice_generation.md',
    },
    {
        id: 'admin',
        label: 'Filament admin',
        text: 'Product, inventory, and order operations',
        icon: 'pi-table',
        href: filamentUrl,
        reference: 'app/Providers/Filament/AdminPanelProvider.php',
    },
    {
        id: 'mfa',
        label: 'Required MFA',
        text: 'TOTP and recovery codes protect admin access',
        icon: 'pi-lock',
        reference: 'filament_mfa_implementation.md',
    },
];

const penkilaukaiFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'visitor',
        label: 'Parduotuvės lankytojas',
        text: 'Pradeda nuo viešos parduotuvės',
        icon: 'pi-user',
        href: 'https://penkilaukai.lt',
    },
    {
        id: 'catalog',
        label: 'Produktų API',
        text: 'Įkrauna aktyvius produktus ir kainas',
        icon: 'pi-list',
        reference: 'resources/store/src/services/api.ts',
    },
    {
        id: 'media',
        label: 'Produktų media',
        text: 'Optimizuotos galerijos ir detalių peržiūros',
        icon: 'pi-images',
        reference: 'resources/store/src/pages/ShopItemOverview.vue',
    },
    {
        id: 'consent',
        label: 'Cookie sutikimai',
        text: 'GDPR pasirinkimai išlieka pasiekiami',
        icon: 'pi-shield',
        reference: 'cookie_consent_gdpr_implementation.md',
    },
    {
        id: 'cart',
        label: 'Pinia krepšelis',
        text: 'Cookie saugojimas ir kiekio valdymas',
        icon: 'pi-shopping-cart',
        reference: 'resources/store/src/stores/useCartStore.ts',
    },
    {
        id: 'checkout',
        label: 'Apmokėjimo forma',
        text: 'Kliento, krepšelio ir pristatymo duomenys',
        icon: 'pi-credit-card',
        reference: 'resources/store/src/pages/ShopCheckout.vue',
    },
    {
        id: 'delivery',
        label: 'Paysera API',
        text: 'Paysera atsiskaitymo langas su apmokėjimo būdais',
        icon: 'pi-truck',
        href: payseraDeliveryUrl,
        reference: 'app/Services/Payments/PayseraDeliveryService.php',
    },
    {
        id: 'order',
        label: 'Užsakymo validacija',
        text: 'Tikrinamas atsiskaymo rezultatas, kuriamas užsakymas',
        icon: 'pi-verified',
        reference: 'app/Http/Controllers/Api/OrderController.php',
    },
    {
        id: 'invoice',
        label: 'PDF sąskaita + el. laiškas',
        text: 'Patvirtinimo paketas klientui',
        icon: 'pi-file-pdf',
        reference: 'pdf_invoice_generation.md',
    },
    {
        id: 'admin',
        label: 'Filament administravimas',
        text: 'Produktų, likučių ir užsakymų operacijos',
        icon: 'pi-table',
        href: filamentUrl,
        reference: 'app/Providers/Filament/AdminPanelProvider.php',
    },
    {
        id: 'mfa',
        label: 'Privalomas MFA',
        text: 'TOTP ir atkūrimo kodai saugo admin prieiga',
        icon: 'pi-lock',
        reference: 'filament_mfa_implementation.md',
    },
];

const penkilaukaiFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'visitor', to: 'catalog', label: 'browse' },
    { from: 'catalog', to: 'media', label: 'detail' },
    { from: 'media', to: 'consent', label: 'preferences' },
    { from: 'consent', to: 'cart', label: 'persist' },
    { from: 'cart', to: 'checkout', label: 'submit' },
    { from: 'checkout', to: 'delivery', label: 'price' },
    { from: 'delivery', to: 'order', label: 'validate' },
    { from: 'order', to: 'invoice', label: 'confirm' },
    { from: 'invoice', to: 'admin', label: 'operate' },
    { from: 'admin', to: 'mfa', label: 'secure' },
];

const penkilaukaiFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'visitor', to: 'catalog', label: 'peržiūra' },
    { from: 'catalog', to: 'media', label: 'detalės' },
    { from: 'media', to: 'consent', label: 'nustatymai' },
    { from: 'consent', to: 'cart', label: 'saugojimas' },
    { from: 'cart', to: 'checkout', label: 'pateikimas' },
    { from: 'checkout', to: 'delivery', label: 'pateikimas' },
    { from: 'delivery', to: 'order', label: 'validacija' },
    { from: 'order', to: 'invoice', label: 'patvirtinimas' },
    { from: 'invoice', to: 'admin', label: 'valdymas' },
    { from: 'admin', to: 'mfa', label: 'apsauga' },
];

export const createPenkilaukaiShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? penkilaukaiFlowNodesLt : penkilaukaiFlowNodesEn,
        locale === 'lt' ? penkilaukaiFlowEdgesLt : penkilaukaiFlowEdgesEn,
        activeNodeIds,
        [
            {
                label: 'Penkilaukai',
                url: 'https://penkilaukai.lt',
                icon: 'pi-globe',
                kind: 'website',
            },
            {
                label: 'Paysera Delivery',
                url: payseraDeliveryUrl,
                icon: 'pi-truck',
                kind: 'external',
            },
        ],
    );

const suberFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'movie',
        label: 'Movie file',
        text: 'User picks local media from the browser UI',
        icon: 'pi-video',
    },
    {
        id: 'source',
        label: 'Subtitle source',
        text: 'Auto, OpenSubtitles, or Whisper',
        icon: 'pi-sliders-h',
    },
    {
        id: 'extract',
        label: 'ffprobe / ffmpeg',
        text: 'Embedded text streams are ranked and extracted',
        icon: 'pi-download',
        href: ffmpegUrl,
        reference: 'backend/services/ffmpeg_extract.py',
    },
    {
        id: 'opensubtitles',
        label: 'OpenSubtitles',
        text: 'Search and download when selected',
        icon: 'pi-cloud-download',
        href: openSubtitlesUrl,
        reference: 'backend/services/opensubtitles_service.py',
    },
    {
        id: 'parser',
        label: 'SRT parser',
        text: 'Cues become structured translation units',
        icon: 'pi-align-left',
        reference: 'backend/services/srt_parser.py',
    },
    {
        id: 'batches',
        label: 'Adaptive batches',
        text: 'Cue count and character budget stay bounded',
        icon: 'pi-clone',
        reference: 'backend/services/translation_service.py',
    },
    {
        id: 'ollama',
        label: 'Ollama translation',
        text: '`<<<index>>>` delimiters preserve alignment',
        icon: 'pi-bolt',
        href: ollamaUrl,
        reference: 'backend/services/translation_service.py',
    },
    {
        id: 'timing',
        label: 'Timing normalizer',
        text: 'Keeps 80 ms gaps and avoids timeline shifts',
        icon: 'pi-clock',
        reference: 'backend/services/timing_normalizer.py',
    },
    {
        id: 'stage-two',
        label: 'Optional stage 2',
        text: 'Tool-capable model can finalize the SRT',
        icon: 'pi-wrench',
        reference: 'backend/services/ollama_stage_two.py',
    },
    {
        id: 'output',
        label: 'Subbies output',
        text: 'SRT and metadata are written safely',
        icon: 'pi-save',
        reference: 'backend/services/output_writer.py',
    },
];

const suberFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'movie',
        label: 'Filmo failas',
        text: 'Naudotojas pasirenka lokalią mediją UI lange',
        icon: 'pi-video',
    },
    {
        id: 'source',
        label: 'Subtitru saltinis',
        text: 'Auto, OpenSubtitles arba Whisper',
        icon: 'pi-sliders-h',
    },
    {
        id: 'extract',
        label: 'ffprobe / ffmpeg',
        text: 'Tekstiniai subtitrai surikiuojami ir ištraukiami',
        icon: 'pi-download',
        href: ffmpegUrl,
        reference: 'backend/services/ffmpeg_extract.py',
    },
    {
        id: 'opensubtitles',
        label: 'OpenSubtitles',
        text: 'Paieška ir atsisiuntimas pasirinkus šaltinį',
        icon: 'pi-cloud-download',
        href: openSubtitlesUrl,
        reference: 'backend/services/opensubtitles_service.py',
    },
    {
        id: 'parser',
        label: 'SRT parseris',
        text: 'Cue paverčiami vertimo vienetais',
        icon: 'pi-align-left',
        reference: 'backend/services/srt_parser.py',
    },
    {
        id: 'batches',
        label: 'Adaptuojami batchai',
        text: 'Ribojamas cue kiekis ir simbolių biudžetas',
        icon: 'pi-clone',
        reference: 'backend/services/translation_service.py',
    },
    {
        id: 'ollama',
        label: 'Ollama vertimas',
        text: '`<<<index>>>` delimiteriai saugo sulygiavimą',
        icon: 'pi-bolt',
        href: ollamaUrl,
        reference: 'backend/services/translation_service.py',
    },
    {
        id: 'timing',
        label: 'Laiko normalizavimas',
        text: 'Saugo 80 ms tarpus ir nekeičia laiko juostos',
        icon: 'pi-clock',
        reference: 'backend/services/timing_normalizer.py',
    },
    {
        id: 'stage-two',
        label: 'Pasirenkamas 2 etapas',
        text: 'Tool palaikantis modelis gali užbaigti SRT',
        icon: 'pi-wrench',
        reference: 'backend/services/ollama_stage_two.py',
    },
    {
        id: 'output',
        label: 'Subbies rezultatas',
        text: 'SRT ir metaduomenys saugiai įrašomi',
        icon: 'pi-save',
        reference: 'backend/services/output_writer.py',
    },
];

const suberFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'movie', to: 'source', label: 'choose' },
    { from: 'source', to: 'extract', label: 'embedded' },
    { from: 'extract', to: 'opensubtitles', label: 'fallback' },
    { from: 'opensubtitles', to: 'parser', label: 'SRT' },
    { from: 'parser', to: 'batches', label: 'cues' },
    { from: 'batches', to: 'ollama', label: 'translate' },
    { from: 'ollama', to: 'timing', label: 'normalize' },
    { from: 'timing', to: 'stage-two', label: 'optional' },
    { from: 'stage-two', to: 'output', label: 'write' },
];

const suberFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'movie', to: 'source', label: 'pasirinkimas' },
    { from: 'source', to: 'extract', label: 'embedded' },
    { from: 'extract', to: 'opensubtitles', label: 'atsarginis' },
    { from: 'opensubtitles', to: 'parser', label: 'SRT' },
    { from: 'parser', to: 'batches', label: 'cue' },
    { from: 'batches', to: 'ollama', label: 'vertimas' },
    { from: 'ollama', to: 'timing', label: 'laikas' },
    { from: 'timing', to: 'stage-two', label: 'pasirinktinai' },
    { from: 'stage-two', to: 'output', label: 'įrašymas' },
];

export const createSuberShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? suberFlowNodesLt : suberFlowNodesEn,
        locale === 'lt' ? suberFlowEdgesLt : suberFlowEdgesEn,
        activeNodeIds,
        [
            {
                label: 'FFmpeg',
                url: ffmpegUrl,
                icon: 'pi-video',
                kind: 'external',
            },
            {
                label: 'Ollama',
                url: ollamaUrl,
                icon: 'pi-bolt',
                kind: 'external',
            },
        ],
    );

const tipoDietaFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'sources',
        label: 'Nutrition sources',
        text: 'Public food and meal data starts the pipeline',
        icon: 'pi-search',
    },
    {
        id: 'scraper',
        label: 'Scraping workflow',
        text: 'Collects source material for cleanup',
        icon: 'pi-download',
    },
    {
        id: 'records',
        label: 'Raw records',
        text: 'Unstable source data is kept inspectable',
        icon: 'pi-database',
    },
    {
        id: 'types',
        label: 'Typed model',
        text: 'TypeScript makes meal data explicit',
        icon: 'pi-code',
    },
    {
        id: 'cleanup',
        label: 'Normalize fields',
        text: 'Names, nutrition values, and units are shaped',
        icon: 'pi-filter',
    },
    {
        id: 'pipeline',
        label: 'Tekton pipeline',
        text: 'Repeatable runs keep collection practical',
        icon: 'pi-sitemap',
        reference: 'pipeline',
    },
    {
        id: 'cluster',
        label: 'Kubernetes runtime',
        text: 'A stable place to refine the workflow',
        icon: 'pi-server',
    },
    {
        id: 'decisions',
        label: 'Food decisions',
        text: 'Structured data can support practical choices',
        icon: 'pi-chart-bar',
    },
];

const tipoDietaFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'sources',
        label: 'Mitybos saltiniai',
        text: 'Maisto ir patiekalu duomenys pradeda pipeline',
        icon: 'pi-search',
    },
    {
        id: 'scraper',
        label: 'Scraping procesas',
        text: 'Surenka saltiniu medziaga valymui',
        icon: 'pi-download',
    },
    {
        id: 'records',
        label: 'Pradiniai irasai',
        text: 'Nestabilus saltiniu duomenys lieka patikrinami',
        icon: 'pi-database',
    },
    {
        id: 'types',
        label: 'Tipizuotas modelis',
        text: 'TypeScript padaro patiekalu duomenis aiskiais',
        icon: 'pi-code',
    },
    {
        id: 'cleanup',
        label: 'Lauku normalizavimas',
        text: 'Formuojami pavadinimai, vertes ir vienetai',
        icon: 'pi-filter',
    },
    {
        id: 'pipeline',
        label: 'Tekton pipeline',
        text: 'Atkuriami paleidimai palaiko rinkima',
        icon: 'pi-sitemap',
        reference: 'pipeline',
    },
    {
        id: 'cluster',
        label: 'Kubernetes runtime',
        text: 'Stabili vieta procesui tobulinti',
        icon: 'pi-server',
    },
    {
        id: 'decisions',
        label: 'Maisto sprendimai',
        text: 'Strukturuoti duomenys padeda rinktis praktiskai',
        icon: 'pi-chart-bar',
    },
];

const tipoDietaFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'sources', to: 'scraper', label: 'collect' },
    { from: 'scraper', to: 'records', label: 'raw' },
    { from: 'records', to: 'types', label: 'shape' },
    { from: 'types', to: 'cleanup', label: 'normalize' },
    { from: 'cleanup', to: 'pipeline', label: 'repeat' },
    { from: 'pipeline', to: 'cluster', label: 'run' },
    { from: 'cluster', to: 'decisions', label: 'use' },
];

const tipoDietaFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'sources', to: 'scraper', label: 'rinkimas' },
    { from: 'scraper', to: 'records', label: 'raw' },
    { from: 'records', to: 'types', label: 'forma' },
    { from: 'types', to: 'cleanup', label: 'valymas' },
    { from: 'cleanup', to: 'pipeline', label: 'kartojimas' },
    { from: 'pipeline', to: 'cluster', label: 'paleidimas' },
    { from: 'cluster', to: 'decisions', label: 'naudojimas' },
];

export const createTipoDietaShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? tipoDietaFlowNodesLt : tipoDietaFlowNodesEn,
        locale === 'lt' ? tipoDietaFlowEdgesLt : tipoDietaFlowEdgesEn,
        activeNodeIds,
    );

const laravelTinkerFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'repo',
        label: 'Laravel project',
        text: 'Developer starts inside an app repository',
        icon: 'pi-folder',
        href: 'https://github.com/Naidzelas/Laravel-Tinker',
    },
    {
        id: 'scripts',
        label: 'TinkerScripts',
        text: 'Small repeatable scripts live by filename',
        icon: 'pi-file-edit',
        reference: 'TinkerScripts',
    },
    {
        id: 'command',
        label: 'helper:tinker',
        text: '`php artisan helper:tinker {filename}`',
        icon: 'pi-terminal',
        reference: 'Console/Commands',
    },
    {
        id: 'helper',
        label: 'Helper loader',
        text: 'Resolves and loads the requested script',
        icon: 'pi-cog',
        reference: 'Helpers',
    },
    {
        id: 'runtime',
        label: 'Laravel runtime',
        text: 'Models and services are available in context',
        icon: 'pi-bolt',
        href: laravelUrl,
    },
    {
        id: 'feedback',
        label: 'Immediate output',
        text: 'Inspect framework behavior without setup churn',
        icon: 'pi-check-circle',
    },
];

const laravelTinkerFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'repo',
        label: 'Laravel projektas',
        text: 'Programuotojas pradeda aplikacijos repositorijoje',
        icon: 'pi-folder',
        href: 'https://github.com/Naidzelas/Laravel-Tinker',
    },
    {
        id: 'scripts',
        label: 'TinkerScripts',
        text: 'Maži kartojami skriptai laikomi pagal failą',
        icon: 'pi-file-edit',
        reference: 'TinkerScripts',
    },
    {
        id: 'command',
        label: 'helper:tinker',
        text: '`php artisan helper:tinker {filename}`',
        icon: 'pi-terminal',
        reference: 'Console/Commands',
    },
    {
        id: 'helper',
        label: 'Helper loaderis',
        text: 'Suranda ir užkrauna pasirinktą skriptą',
        icon: 'pi-cog',
        reference: 'Helpers',
    },
    {
        id: 'runtime',
        label: 'Laravel runtime',
        text: 'Modeliai ir servisai pasiekiami kontekste',
        icon: 'pi-bolt',
        href: laravelUrl,
    },
    {
        id: 'feedback',
        label: 'Greitas rezultatas',
        text: 'Framework elgesys tikrinamas be pasiruošimo triukšmo',
        icon: 'pi-check-circle',
    },
];

const laravelTinkerFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'repo', to: 'scripts', label: 'write' },
    { from: 'scripts', to: 'command', label: 'run' },
    { from: 'command', to: 'helper', label: 'resolve' },
    { from: 'helper', to: 'runtime', label: 'execute' },
    { from: 'runtime', to: 'feedback', label: 'inspect' },
];

const laravelTinkerFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'repo', to: 'scripts', label: 'rašymas' },
    { from: 'scripts', to: 'command', label: 'paleidimas' },
    { from: 'command', to: 'helper', label: 'paieška' },
    { from: 'helper', to: 'runtime', label: 'vykdymas' },
    { from: 'runtime', to: 'feedback', label: 'tikrinimas' },
];

export const createLaravelTinkerShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? laravelTinkerFlowNodesLt : laravelTinkerFlowNodesEn,
        locale === 'lt' ? laravelTinkerFlowEdgesLt : laravelTinkerFlowEdgesEn,
        activeNodeIds,
        [
            {
                label: 'GitHub',
                url: 'https://github.com/Naidzelas/Laravel-Tinker',
                icon: 'pi-github',
                kind: 'github',
            },
            {
                label: 'Laravel',
                url: laravelUrl,
                icon: 'pi-bolt',
                kind: 'external',
            },
        ],
    );

const computerVisionFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'camera',
        label: 'Camera source',
        text: 'IP Webcam phone stream or local webcam',
        icon: 'pi-camera',
    },
    {
        id: 'collector',
        label: 'Frame collector',
        text: '`S` saves train frames, `V` saves validation',
        icon: 'pi-images',
        reference: 'scripts/collect_frames.py',
    },
    {
        id: 'images',
        label: 'Train / val images',
        text: 'Varied lighting, angles, and distances',
        icon: 'pi-folder-open',
        reference: 'data/images',
    },
    {
        id: 'labels',
        label: 'YOLO labels',
        text: 'Two classes: tub and package',
        icon: 'pi-tags',
        href: labelImgUrl,
        reference: 'data/labels',
    },
    {
        id: 'dataset',
        label: 'dataset.yaml',
        text: 'Class names and training paths',
        icon: 'pi-sliders-h',
        reference: 'config/dataset.yaml',
    },
    {
        id: 'trainer',
        label: 'YOLOv8 trainer',
        text: 'Configurable epochs, batch, and model size',
        icon: 'pi-cog',
        href: yoloUrl,
        reference: 'scripts/train.py',
    },
    {
        id: 'weights',
        label: 'models/best.pt',
        text: 'Best training weights are copied for runtime',
        icon: 'pi-box',
        reference: 'models/best.pt',
    },
    {
        id: 'detector',
        label: 'Live detector',
        text: 'OpenCV frames run through YOLO inference',
        icon: 'pi-eye',
        href: opencvUrl,
        reference: 'src/detector.py',
    },
    {
        id: 'counts',
        label: 'Count overlay',
        text: 'Bounding boxes separate tubs and packages',
        icon: 'pi-chart-line',
        reference: 'main.py',
    },
    {
        id: 'logs',
        label: 'CSV log',
        text: 'Timestamped counts saved every interval',
        icon: 'pi-file',
        reference: 'logs/counts.csv',
    },
];

const computerVisionFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'camera',
        label: 'Kameros saltinis',
        text: 'IP Webcam telefono srautas arba lokali kamera',
        icon: 'pi-camera',
    },
    {
        id: 'collector',
        label: 'Kadru rinkimas',
        text: '`S` išsaugo train, `V` išsaugo validation',
        icon: 'pi-images',
        reference: 'scripts/collect_frames.py',
    },
    {
        id: 'images',
        label: 'Train / val nuotraukos',
        text: 'Įvairus apšvietimas, kampai ir atstumai',
        icon: 'pi-folder-open',
        reference: 'data/images',
    },
    {
        id: 'labels',
        label: 'YOLO anotacijos',
        text: 'Dvi klases: tub ir package',
        icon: 'pi-tags',
        href: labelImgUrl,
        reference: 'data/labels',
    },
    {
        id: 'dataset',
        label: 'dataset.yaml',
        text: 'Klasių pavadinimai ir mokymo keliai',
        icon: 'pi-sliders-h',
        reference: 'config/dataset.yaml',
    },
    {
        id: 'trainer',
        label: 'YOLOv8 mokymas',
        text: 'Konfigūruojami epoch, batch ir modelio dydis',
        icon: 'pi-cog',
        href: yoloUrl,
        reference: 'scripts/train.py',
    },
    {
        id: 'weights',
        label: 'models/best.pt',
        text: 'Geriausi svoriai perkeliami runtime naudojimui',
        icon: 'pi-box',
        reference: 'models/best.pt',
    },
    {
        id: 'detector',
        label: 'Gyvas detektorius',
        text: 'OpenCV kadrai keliauja per YOLO inference',
        icon: 'pi-eye',
        href: opencvUrl,
        reference: 'src/detector.py',
    },
    {
        id: 'counts',
        label: 'Skaičių perdanga',
        text: 'Bounding boxes atskiria indelius ir pakuotes',
        icon: 'pi-chart-line',
        reference: 'main.py',
    },
    {
        id: 'logs',
        label: 'CSV logas',
        text: 'Laiku žymėti skaičiai rašomi kas intervalą',
        icon: 'pi-file',
        reference: 'logs/counts.csv',
    },
];

const computerVisionFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'camera', to: 'collector', label: 'capture' },
    { from: 'collector', to: 'images', label: 'save' },
    { from: 'images', to: 'labels', label: 'annotate' },
    { from: 'labels', to: 'dataset', label: 'configure' },
    { from: 'dataset', to: 'trainer', label: 'train' },
    { from: 'trainer', to: 'weights', label: 'best' },
    { from: 'weights', to: 'detector', label: 'load' },
    { from: 'detector', to: 'counts', label: 'infer' },
    { from: 'counts', to: 'logs', label: 'record' },
];

const computerVisionFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'camera', to: 'collector', label: 'fiksuoti' },
    { from: 'collector', to: 'images', label: 'saugoti' },
    { from: 'images', to: 'labels', label: 'anotuoti' },
    { from: 'labels', to: 'dataset', label: 'konfigūruoti' },
    { from: 'dataset', to: 'trainer', label: 'mokyti' },
    { from: 'trainer', to: 'weights', label: 'geriausi' },
    { from: 'weights', to: 'detector', label: 'užkrauti' },
    { from: 'detector', to: 'counts', label: 'atpažinti' },
    { from: 'counts', to: 'logs', label: 'rašyti' },
];

export const createComputerVisionShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? computerVisionFlowNodesLt : computerVisionFlowNodesEn,
        locale === 'lt' ? computerVisionFlowEdgesLt : computerVisionFlowEdgesEn,
        activeNodeIds,
        [
            {
                label: 'OpenCV',
                url: opencvUrl,
                icon: 'pi-eye',
                kind: 'external',
            },
            {
                label: 'YOLOv8',
                url: yoloUrl,
                icon: 'pi-sparkles',
                kind: 'external',
            },
            {
                label: 'Roboflow',
                url: roboflowUrl,
                icon: 'pi-tags',
                kind: 'external',
            },
        ],
    );
