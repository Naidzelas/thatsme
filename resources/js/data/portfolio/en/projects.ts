import { publicAssetUrl } from '../shared';
import {
    createComputerVisionShowcase,
    createLaravelTinkerShowcase,
    createObsidianBridgeShowcase,
    createPenkilaukaiShowcase,
    createSuberShowcase,
    createTipoDietaShowcase,
} from '../showcases';
import type { ProjectItem } from '../types';

export const projectsEn: ProjectItem[] = [
    {
        slug: 'penkilaukai',
        title: 'Penkilaukai',
        summary:
            'A production e-commerce storefront with product browsing, persistent cart state, delivery selection, order validation, invoices, and secured admin operations.',
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
            'The frontend uses TypeScript, VueJS, PrimeVue, and Tailwind CSS, while the backend is built with Laravel and Filament. Orders are processed through Paysera payment and delivery integration, with backend validation of availability, prices, delivery details, and payment records to ensure data integrity.',
        stack: [
            'PHP',
            'Laravel',
            'Inertia',
            'VueJS',
            'TypeScript',
            'Filament',
            'Paysera',
            'GDPR',
        ],
        outcomes: [
            'Public storefront available for real visitors and product discovery.',
            'Persistent cart and cookie consent flows designed around customer sessions.',
            'Checkout path with delivery provider integration, validation, invoices, and email confirmation.',
            'Filament administration protected with required multi-factor authentication.',
        ],
        steps: [
            {
                title: 'Product discovery',
                text: 'Visitors start on the public storefront, where the Vue interface loads product data, optimized media, pricing, and detail pages from the Laravel API without turning the site into a static brochure.',
                signal: 'Browse',
                showcase: createPenkilaukaiShowcase(
                    'en',
                    'Public storefront flow',
                    'Product discovery starts with API-backed catalog data and media-rich detail views.',
                    ['visitor', 'catalog', 'media'],
                ),
            },
            {
                title: 'Consent and cart state',
                text: 'The frontend keeps cookie consent visible and explicit, while the Pinia cart stores quantities and survives refreshes through a cookie fallback so shopping intent is not lost between pages.',
                signal: 'State',
                showcase: createPenkilaukaiShowcase(
                    'en',
                    'Consent before persistence',
                    'The cart and GDPR preferences stay separate, inspectable, and recoverable across the buying session.',
                    ['consent', 'cart'],
                ),
            },
            {
                title: 'Checkout and delivery',
                text: 'At checkout, customer information, selected cart lines, and delivery choices come together. The Paysera Delivery API resolves parcel-machine options and pricing, and the order is created after payment confirmation so delivery details and invoice data can be validated. The customer is returned to the storefront with order status, while email updates cover acceptance, processing, and delivery.',
                signal: 'Deliver',
                showcase: createPenkilaukaiShowcase(
                    'en',
                    'Delivery-aware checkout',
                    'Checkout is the handoff between frontend state, delivery-provider data, and backend order rules.',
                    ['cart', 'checkout', 'delivery'],
                ),
            },
            {
                title: 'Order validation',
                text: 'After payment, Laravel validates the Paysera result and then creates the order, checking product availability, prices, delivery details, and payment records so the backend remains the source of truth.',
                signal: 'Validate',
                showcase: createPenkilaukaiShowcase(
                    'en',
                    'Server-side guardrails',
                    'The API checks the cart and delivery payload before an order becomes operational data.',
                    ['checkout', 'delivery', 'order'],
                ),
            },
            {
                title: 'Invoice and confirmation',
                text: 'After the order is accepted, the system prepares confirmation details, generates a PDF invoice, and sends the customer an email trail that matches the submitted cart and delivery context.',
                signal: 'Confirm',
                showcase: createPenkilaukaiShowcase(
                    'en',
                    'Customer confirmation package',
                    'Accepted orders move into invoice generation and email communication.',
                    ['order', 'invoice'],
                ),
            },
            {
                title: 'Admin operations',
                text: 'Filament gives administrators the operational surface for products, inventory, orders, and content. Required MFA keeps that privileged surface protected beyond a simple password login.',
                signal: 'Admin',
                showcase: createPenkilaukaiShowcase(
                    'en',
                    'Protected back office',
                    'The public purchase flow ends in an admin workflow that is intentionally secured.',
                    ['admin', 'mfa'],
                ),
            },
        ],
    },
    {
        slug: 'llm-obsidian-bridge',
        title: 'LLM Obsidian Bridge',
        summary:
            'A local HTTP bridge that lets Obsidian Copilot talk to Ollama through an OpenAI-compatible chat endpoint.',
        category: 'AI project',
        visibility: 'personal',
        status: 'experimental',
        primaryTechnology: 'TypeScript',
        externalLink: {
            kind: 'github',
        },
        explanation:
            'The bridge receives Copilot chat messages, validates them, routes planning through Ollama, and executes preview-first vault actions through the Obsidian Local REST API.',
        stack: ['TypeScript', 'Kubernetes', 'Tekton', 'Ollama'],
        outcomes: [
            'OpenAI-compatible `/v1/chat/completions` surface for Obsidian Copilot.',
            'Preview-first note mutations through the Obsidian Local REST API.',
            'Strict JSON planning loop with Ollama and a typed tool registry.',
        ],
        steps: [
            {
                title: 'Copilot request',
                text: 'Obsidian Copilot starts the flow by sending `POST /v1/chat/completions` with `{ model, messages, stream }`. The bridge presents itself like an OpenAI-compatible provider, but it keeps the whole workflow local.',
                signal: 'POST',
                showcase: createObsidianBridgeShowcase(
                    'en',
                    'Copilot enters the bridge',
                    'The request begins in Obsidian and lands on the local OpenAI-compatible route.',
                    ['copilot', 'endpoint'],
                ),
            },
            {
                title: 'Request parsing',
                text: '`parseChatCompletionRequest()` validates the body with Zod. The content can be a string, null, or multiple content parts, so the bridge normalizes text before the agent sees it.',
                signal: 'Parse',
                showcase: createObsidianBridgeShowcase(
                    'en',
                    'Normalize the payload',
                    'The bridge turns Copilot input into a predictable message shape before orchestration starts.',
                    ['endpoint', 'parser'],
                ),
            },
            {
                title: 'Agent entry',
                text: '`BridgeAgent.respond(messages)` receives the normalized chat history. From here, the project decides whether this is a direct confirmation or a request that needs model planning.',
                signal: 'Agent',
                showcase: createObsidianBridgeShowcase(
                    'en',
                    'Agent takes control',
                    'The agent is the orchestration layer between the request parser, confirmation gate, model planner, and tool registry.',
                    ['parser', 'agent'],
                ),
            },
            {
                title: 'Confirmation shortcut',
                text: 'Before invoking Ollama, the agent checks whether the last user message is a direct `apply` or `reject`. If it is, the bridge applies or rejects the latest proposal immediately.',
                signal: 'Apply',
                showcase: createObsidianBridgeShowcase(
                    'en',
                    'Skip the model when possible',
                    'Confirmation commands are handled locally so approved note changes do not wait for another LLM round trip.',
                    ['agent', 'confirmation'],
                ),
            },
            {
                title: 'Ollama planning',
                text: 'For normal requests, `OllamaClient.plan(messages)` sends the history plus the bridge system prompt to Ollama in strict JSON mode. Ollama responds with a tool/action plan instead of free-form prose.',
                signal: 'LLM',
                showcase: createObsidianBridgeShowcase(
                    'en',
                    'Ask Ollama for intent',
                    'The local model produces structured tool intent, which keeps the bridge predictable and inspectable.',
                    ['confirmation', 'ollama', 'registry'],
                ),
            },
            {
                title: 'Vault result',
                text: '`ToolRegistry.execute(action)` runs the selected read, propose, apply, or reject path. Vault reads and writes go through the Obsidian Local REST API, then the bridge returns the result to Copilot as JSON or SSE chunks.',
                signal: 'Vault',
                showcase: createObsidianBridgeShowcase(
                    'en',
                    'Return a preview-first result',
                    'The final leg executes against the vault through the REST API and sends the outcome back to the Copilot chat.',
                    ['registry', 'rest', 'vault', 'response'],
                ),
            },
        ],
    },
    {
        slug: 'tipodieta',
        title: 'TipoDieta',
        summary:
            'A personal nutrition data project that turns scraped food information into typed, normalized records and repeatable pipeline runs.',
        category: 'Nutrition project',
        visibility: 'personal',
        status: 'work-in-progress',
        primaryTechnology: 'TypeScript',
        externalLink: {
            kind: 'github',
        },
        explanation:
            'TipoDieta treats nutrition information as a data-engineering problem: collect source material, keep messy records visible, model the useful fields in TypeScript, normalize them, and run the workflow in a repeatable Kubernetes/Tekton environment.',
        stack: ['TypeScript', 'Kubernetes', 'Tekton', 'Web Scraping'],
        outcomes: [
            'Typed model for nutrition and meal information instead of ad hoc records.',
            'Collection and cleanup process that keeps source data reviewable.',
            'Repeatable pipeline experiments using Kubernetes and Tekton.',
            'Structured data foundation for practical food and meal decisions.',
        ],
        steps: [
            {
                title: 'Start from source material',
                text: 'The project begins with nutrition-oriented source material that is useful but inconsistent. Scraping gives the workflow a way to collect that material without manually copying every food item.',
                signal: 'Scrape',
                showcase: createTipoDietaShowcase(
                    'en',
                    'Collect nutrition material',
                    'The pipeline starts by gathering food and meal data that can later be inspected and shaped.',
                    ['sources', 'scraper'],
                ),
            },
            {
                title: 'Keep raw records inspectable',
                text: 'Collected data is treated as raw material first. Keeping that stage visible makes it easier to spot missing values, source quirks, duplicate foods, or units that need cleanup.',
                signal: 'Raw',
                showcase: createTipoDietaShowcase(
                    'en',
                    'Preserve the messy layer',
                    'Raw records are not skipped; they are the audit trail for later normalization.',
                    ['scraper', 'records'],
                ),
            },
            {
                title: 'Model and normalize',
                text: 'TypeScript gives the nutrition model a clear shape while cleanup rules normalize names, nutrient values, and units into records the application can use consistently.',
                signal: 'Types',
                showcase: createTipoDietaShowcase(
                    'en',
                    'Typed nutrition records',
                    'Types and cleanup rules turn scraped material into data the rest of the project can trust.',
                    ['records', 'types', 'cleanup'],
                ),
            },
            {
                title: 'Run repeatable pipelines',
                text: 'Kubernetes and Tekton give the project a practical place to rerun scraping, cleanup, and deployment experiments as the data shape changes.',
                signal: 'Pipeline',
                showcase: createTipoDietaShowcase(
                    'en',
                    'Repeat the data workflow',
                    'A pipeline-oriented setup keeps data refreshes and deployment experiments reproducible.',
                    ['cleanup', 'pipeline', 'cluster'],
                ),
            },
            {
                title: 'Support food decisions',
                text: 'Once the records are consistent, the project can move from raw scraping toward useful comparisons and decisions about meals, nutrition values, and practical food choices.',
                signal: 'Decide',
                showcase: createTipoDietaShowcase(
                    'en',
                    'From records to choices',
                    'The target is not scraping for its own sake; it is usable nutrition data that supports everyday decisions.',
                    ['cluster', 'decisions'],
                ),
            },
        ],
    },
    {
        slug: 'suber',
        title: 'Suber',
        summary:
            'A local subtitle translation pipeline that extracts, downloads, parses, translates, normalizes, and writes SRT files with Python and Ollama.',
        category: 'AI movie translator',
        visibility: 'personal',
        status: 'experimental',
        primaryTechnology: 'Python',
        externalLink: {
            kind: 'github',
        },
        explanation:
            'Suber is built around a practical movie-subtitle workflow: select local media, choose the best subtitle source, parse cues safely, translate in bounded batches through Ollama, preserve timing, optionally run a second finalization stage, and write reviewable output.',
        stack: [
            'Python',
            'JavaScript',
            'FastAPI',
            'Ollama',
            'FFmpeg',
            'OpenSubtitles',
            'Whisper',
        ],
        outcomes: [
            'Local-first subtitle translation workflow for movie files.',
            'Multiple subtitle acquisition paths: embedded streams, OpenSubtitles, and Whisper fallback experiments.',
            'Adaptive Ollama translation batches with cue alignment markers.',
            'Timing normalization and optional finalizer stage before SRT output.',
        ],
        steps: [
            {
                title: 'Choose media and source',
                text: 'The user picks a local movie file and selects how subtitles should be obtained: automatically, from embedded streams, through OpenSubtitles, or from a speech-to-text fallback path.',
                signal: 'Input',
                showcase: createSuberShowcase(
                    'en',
                    'Select the translation source',
                    'Suber starts with a media file and an explicit subtitle acquisition strategy.',
                    ['movie', 'source'],
                ),
            },
            {
                title: 'Extract or download subtitles',
                text: 'FFmpeg and ffprobe inspect embedded streams, while OpenSubtitles can supply external SRT files when the selected workflow needs a downloadable source.',
                signal: 'Acquire',
                showcase: createSuberShowcase(
                    'en',
                    'Acquire subtitle text',
                    'Embedded and remote subtitle paths feed the same downstream parser.',
                    ['source', 'extract', 'opensubtitles'],
                ),
            },
            {
                title: 'Parse SRT cues',
                text: 'The SRT parser converts subtitle text into structured cues so translation can preserve cue order, timestamps, and the relationship between original and translated lines.',
                signal: 'Parse',
                showcase: createSuberShowcase(
                    'en',
                    'Turn subtitles into cue units',
                    'The parser creates the stable data structure needed before translation begins.',
                    ['opensubtitles', 'parser'],
                ),
            },
            {
                title: 'Translate in aligned batches',
                text: 'Python splits cues into adaptive batches and sends them to Ollama with `<<<index>>>` markers, keeping model output aligned with the source subtitles instead of trusting free-form paragraphs.',
                signal: 'Translate',
                showcase: createSuberShowcase(
                    'en',
                    'Bounded Ollama translation',
                    'Batching and index markers keep local-model translation predictable enough for SRT reconstruction.',
                    ['parser', 'batches', 'ollama'],
                ),
            },
            {
                title: 'Normalize and finalize',
                text: 'After translation, timing rules maintain small gaps and avoid cue drift. A second model stage can optionally finalize the file when a tool-capable model is available.',
                signal: 'Timing',
                showcase: createSuberShowcase(
                    'en',
                    'Protect subtitle timing',
                    'Translation is only useful if the resulting subtitles still match the movie timeline.',
                    ['ollama', 'timing', 'stage-two'],
                ),
            },
            {
                title: 'Write the translated SRT',
                text: 'The output writer saves the finished subtitle file and metadata in the Subbies output area, making the result easy to review, replay, or rerun with a different model.',
                signal: 'Output',
                showcase: createSuberShowcase(
                    'en',
                    'Write reviewable output',
                    'The pipeline ends with an SRT artifact rather than an opaque chat response.',
                    ['timing', 'stage-two', 'output'],
                ),
            },
        ],
    },
    {
        slug: 'laravel-tinker',
        title: 'Laravel-Tinker',
        summary:
            'A small Laravel command helper that runs named scripts from a `TinkerScripts` folder through `php artisan helper:tinker {filename}`.',
        category: 'Developer tool',
        visibility: 'personal',
        status: 'tool',
        primaryTechnology: 'PHP',
        externalLink: {
            kind: 'github',
            url: 'https://github.com/Naidzelas/Laravel-Tinker',
        },
        explanation:
            'Laravel-Tinker keeps quick experiments close to the project. Instead of repeatedly pasting snippets into an interactive shell, the developer writes a small script, runs a Laravel command, and inspects the output inside the application runtime.',
        stack: ['PHP', 'Laravel'],
        outcomes: [
            'Public GitHub repository for a focused Laravel development utility.',
            'Repeatable script files stored in a repository-friendly `TinkerScripts` folder.',
            'Simple Artisan command entry point for fast runtime checks.',
        ],
        steps: [
            {
                title: 'Keep scripts with the project',
                text: 'The developer places small exploratory scripts in `TinkerScripts`, keeping one-off model checks or service calls easy to rerun and review with the rest of the repository.',
                signal: 'Script',
                showcase: createLaravelTinkerShowcase(
                    'en',
                    'Repository-friendly experiments',
                    'Small Tinker scripts become named files instead of disposable shell history.',
                    ['repo', 'scripts'],
                ),
            },
            {
                title: 'Run the Artisan helper',
                text: 'From the terminal, `php artisan helper:tinker {filename}` names the script to run and keeps the command short enough to use during everyday debugging.',
                signal: 'Command',
                showcase: createLaravelTinkerShowcase(
                    'en',
                    'One command entry point',
                    'The Artisan command is the small interface between the developer and the saved script.',
                    ['scripts', 'command'],
                ),
            },
            {
                title: 'Load Laravel context',
                text: 'The helper resolves the requested file and executes it inside Laravel, where models, configuration, services, and application bootstrapping are already available.',
                signal: 'Runtime',
                showcase: createLaravelTinkerShowcase(
                    'en',
                    'Run inside Laravel',
                    'The point is not a generic PHP script; it is quick feedback inside the framework runtime.',
                    ['command', 'helper', 'runtime'],
                ),
            },
            {
                title: 'Inspect and iterate',
                text: 'The developer reads the output, adjusts the script, and reruns the same command when testing models, services, seed data, or framework behavior.',
                signal: 'Inspect',
                showcase: createLaravelTinkerShowcase(
                    'en',
                    'Fast feedback loop',
                    'The final output is meant to shorten the cycle between a question and a framework-level answer.',
                    ['runtime', 'feedback'],
                ),
            },
        ],
    },
    {
        slug: 'computer-vision',
        title: 'Computer Vision Experiment',
        summary:
            'A Python computer-vision project for counting ice cream tubs and packages from a live camera stream using OpenCV and YOLOv8.',
        category: 'Computer vision project',
        visibility: 'personal',
        status: 'experimental',
        primaryTechnology: 'Python',
        explanation:
            'The project walks through a complete small-object detection loop: connect a phone or webcam source, collect frames, label train/validation images in YOLO format, train YOLOv8, copy the best weights into runtime, run live detection, draw boxes, count classes, and log timestamped counts to CSV.',
        stack: ['Python', 'Computer Vision', 'OpenCV', 'YOLOv8', 'IP Webcam'],
        outcomes: [
            'Camera input supports both IP Webcam streams and local webcams.',
            'Frame collection workflow creates train and validation images for the dataset.',
            'YOLO-format annotations and dataset config support repeatable model training.',
            'Live detector counts tubs and packages while writing CSV logs for later review.',
        ],
        steps: [
            {
                title: 'Choose a camera source',
                text: 'The workflow can start from a phone running IP Webcam or from a local webcam. That makes data collection possible in the same environment where the detector will later run.',
                signal: 'Camera',
                showcase: createComputerVisionShowcase(
                    'en',
                    'Camera-driven dataset',
                    'The project starts with an accessible live video source rather than a prebuilt dataset.',
                    ['camera'],
                ),
            },
            {
                title: 'Collect training frames',
                text: 'A capture script saves frames into training or validation folders with keyboard controls, making it practical to gather examples under different lighting, angles, and shelf positions.',
                signal: 'Frames',
                showcase: createComputerVisionShowcase(
                    'en',
                    'Build the image set',
                    'Captured frames become the raw material for training and validation.',
                    ['camera', 'collector', 'images'],
                ),
            },
            {
                title: 'Label objects for YOLO',
                text: 'Images are annotated with bounding boxes for the two target classes, then paired with a dataset configuration that tells YOLOv8 where images, labels, and class names live.',
                signal: 'Labels',
                showcase: createComputerVisionShowcase(
                    'en',
                    'Create YOLO training data',
                    'Annotations and dataset configuration turn casual camera frames into model-ready data.',
                    ['images', 'labels', 'dataset'],
                ),
            },
            {
                title: 'Train and keep best weights',
                text: 'YOLOv8 training runs against the configured dataset. After training, the best weights are copied to `models/best.pt` so the live detector can load a stable model path.',
                signal: 'Train',
                showcase: createComputerVisionShowcase(
                    'en',
                    'Train YOLOv8',
                    'The training step converts labeled examples into a reusable detector artifact.',
                    ['dataset', 'trainer', 'weights'],
                ),
            },
            {
                title: 'Detect and count live items',
                text: 'The runtime opens the camera stream with OpenCV, sends frames through the YOLO model, draws bounding boxes, and keeps separate counts for tubs and packages.',
                signal: 'Detect',
                showcase: createComputerVisionShowcase(
                    'en',
                    'Live detection loop',
                    'The trained weights move back into the camera stream for real-time counting.',
                    ['weights', 'detector', 'counts'],
                ),
            },
            {
                title: 'Log count history',
                text: 'Detected counts can be written to `logs/counts.csv` with timestamps, turning a live visual demo into data that can be reviewed after the camera session ends.',
                signal: 'Logs',
                showcase: createComputerVisionShowcase(
                    'en',
                    'Keep count evidence',
                    'CSV output gives the experiment a simple audit trail beyond the live overlay.',
                    ['counts', 'logs'],
                ),
            },
        ],
    },
];
