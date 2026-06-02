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

export const projectsLt: ProjectItem[] = [
    {
        slug: 'penkilaukai',
        title: 'Penki laukai',
        summary:
            'E. komercijos parduotuvė su produktu peržiūra, išsaugomu krepšeliu, pristatymo pasirinkimu, užsakymo validacija, sąskaitomis ir saugiu administravimu.',
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
            "Projeto frontend naudoja TypeScript, VueJS ir PrimeVue su Tailwind CSS. Backendas sukurtas su Laravel ir Filament. Administravimo UI sukurtas su Filament, o saugumas užtikrinamas privalomu daugiafaktoriniu autentifikavimu. Klientų užsakymai apdorojami per Paysera integraciją, o pristatymo pasirinkimas yra Paysera Delivery API. Užsakymo validacija vyksta backend'e, kur Laravel tikrina produktų prieinamumą, kainas, pristatymo detales ir mokėjimo įrašus, kad užtikrintų duomenų vientisumą. Visa sistema sukurta taip, kad būtų lanksti, patikima ir pritaikyta realiam turiniui bei klientų poreikiams.",
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
            'Vieša parduotuvė pasiekiama lankytojams ir produktų peržiūrai.',
            'Krepšelio bei cookie sutikimų srautai pritaikyti realiai kliento sesijai.',
            'Apmokėjimo kelias su pristatymo integracija, validacija, sąskaitomis ir el. laiškais.',
            'Filament administravimas apsaugotas daugiafaktoriniu autentifikavimu.',
        ],
        steps: [
            {
                title: 'Produktu atradimas',
                text: 'Lankytojai pradeda nuo viešos parduotuvės, kur Vue sąsaja per Laravel API įkrauna produktų duomenis, media, kainas ir detalius puslapius.',
                signal: 'Peržiūra',
                showcase: createPenkilaukaiShowcase(
                    'lt',
                    'Viešos parduotuvės srautas',
                    'Produktu atradimas prasideda nuo API palaikomo katalogo ir media peržiūrų.',
                    ['visitor', 'catalog', 'media'],
                ),
            },
            {
                title: 'Sutikimai ir krepšelio būsena',
                text: 'Frontend dalis išlaiko cookie sutikimus aiškiai matomus, o Pinia krepšelis saugo kiekius ir atkuria juos po puslapio perkrovimo per cookie fallback.',
                signal: 'Būsena',
                showcase: createPenkilaukaiShowcase(
                    'lt',
                    'Sutikimas prieš išsaugojimą',
                    'Krepšelis ir GDPR pasirinkimai lieka atskiri, patikrinami ir atkuriami pirkimo sesijoje.',
                    ['consent', 'cart'],
                ),
            },
            {
                title: 'Apmokėjimas ir pristatymas',
                text: 'Checkouto etape klientai pateikia pristatymo duomenis, pasirenkia pristatymo būdą per Paysera Delivery API ir klientui paspaudus atsiskaityti, sistema sukuria užsakymą po Paysera apmokėjimo proceso, kad būtų galima patikrinti pristatymo duomenis ir sukurti sąskaitą. Vartotojas grąžinamas į parduotuvę su užsakymo būsena, o el. laiškų seka informuoja apie užsakymo priėmimą, apdorojimą ir pristatymą.',
                signal: 'Pristatymas',
                showcase: createPenkilaukaiShowcase(
                    'lt',
                    'Pristatymo konteksto checkout',
                    'Checkout yra riba tarp frontend būsenos, pristatymo tiekėjo duomenų ir backend užsakymo taisyklių.',
                    ['cart', 'checkout', 'delivery'],
                ),
            },
            {
                title: 'Užsakymo validacija',
                text: 'Po apmokėjimo backend patikrina Paysera sėkmingą apmokėjimą, tada sukuriamas užsakymas kurį valdo per Filament.',
                signal: 'Validacija',
                showcase: createPenkilaukaiShowcase(
                    'lt',
                    'Serverio apsaugos taisyklės',
                    'API patikrina krepšelį ir pristatymo duomenis prieš užsakymui tampant operaciniu įrašu.',
                    ['checkout', 'delivery', 'order'],
                ),
            },
            {
                title: 'Sąskaita ir patvirtinimas',
                text: 'Priėmus užsakymą sistema paruošia patvirtinimo duomenis, sugeneruoja PDF sąskaitą ir išsiunčia klientui el. laiško seką pagal jo krepšelį ir pristatymą.',
                signal: 'Patvirtinti',
                showcase: createPenkilaukaiShowcase(
                    'lt',
                    'Kliento patvirtinimo paketas',
                    'Priimti užsakymai pereina į sąskaitos generavimą ir el. pašto komunikaciją.',
                    ['order', 'invoice'],
                ),
            },
            {
                title: 'Administravimo operacijos',
                text: 'Filament suteikia administratoriui produktų, likučių, užsakymų ir turinio valdymo UI. Privalomas MFA saugo šį privilegijuotą darbą.',
                signal: 'Admin',
                showcase: createPenkilaukaiShowcase(
                    'lt',
                    'Apsaugotas administravimas',
                    'Filament UI su MFA apsauga užtikrina, kad tik patvirtinti vartotojai gali valdyti produktus ir užsakymus.',
                    ['admin', 'mfa'],
                ),
            },
        ],
    },
    {
        slug: 'llm-obsidian-bridge',
        title: 'LLM Obsidian Bridge',
        summary:
            'Vietinis HTTP bridge, leidžiantis Obsidian Copilot kalbėti su Ollama per OpenAI suderinamą chat endpointą.',
        category: 'AI projektas',
        visibility: 'personal',
        status: 'experimental',
        primaryTechnology: 'TypeScript',
        externalLink: {
            kind: 'github',
        },
        explanation:
            'Bridge priima Copilot chat žinutes, jas validuoja, planavimą perduoda Ollama ir preview-first principu vykdo vault veiksmus per Obsidian Local REST API.',
        stack: ['TypeScript', 'Kubernetes', 'Tekton', 'Ollama'],
        outcomes: [
            'OpenAI suderinamas su Obsidian Copilot integracijai.',
            'Preview-first užrašų keitimai per Obsidian Local REST API.',
            'Griežtas JSON planavimo ciklas su Ollama ir statinio tipavimo įrankių registru.',
        ],
        steps: [
            {
                title: 'Copilot užklausa',
                text: 'Obsidian Copilot pradeda srautą siųsdamas `POST /v1/chat/completions` su `{ model, messages, stream }`. Bridge elgiasi kaip OpenAI suderinamas tiekėjas, bet visas procesas lieka vietinis.',
                signal: 'POST',
                showcase: createObsidianBridgeShowcase(
                    'lt',
                    'Copilot patenka į bridge',
                    'Užklausa prasideda Obsidian aplinkoje ir pasiekia vietinį OpenAI suderinamą kelią.',
                    ['copilot', 'endpoint'],
                ),
            },
            {
                title: 'Užklausos paruošimas',
                text: '`parseChatCompletionRequest()` validuoja body su Zod. Turinys gali būti string, null arba kelių content dalių masyvas, todėl bridge normalizuoja tekstą prieš perduodamas jį agentui.',
                signal: 'Parse',
                showcase: createObsidianBridgeShowcase(
                    'lt',
                    'Normalizuoti payload',
                    'Bridge paverčia Copilot įvestį į nuspėjamą message formą prieš pradedant orkestravimą.',
                    ['endpoint', 'parser'],
                ),
            },
            {
                title: 'Agentas perima eigą',
                text: '`BridgeAgent.respond(messages)` gauna normalizuotą chat istoriją. Nuo čia projektas nusprendžia, ar tai tiesioginis patvirtinimas, ar užklausa, kuriai reikia modelio plano.',
                signal: 'Agent',
                showcase: createObsidianBridgeShowcase(
                    'lt',
                    'Agentas valdo srautą',
                    'Agentas jungia užklausos parserį, patvirtinimo vartus, modelio planavimą ir tool registry.',
                    ['parser', 'agent'],
                ),
            },
            {
                title: 'Patvirtinimo trumpinys',
                text: 'Prieš kviesdamas Ollama, agentas patikrina, ar paskutinė naudotojo žinutė yra tiesioginis `apply` arba `reject`. Jei taip, bridge iškart pritaiko arba atmeta naujausią proposal.',
                signal: 'Apply',
                showcase: createObsidianBridgeShowcase(
                    'lt',
                    'Praleisti modelį, kai galima',
                    'Patvirtinimo komandos apdorojamos vietoje, todėl patvirtinti užrašų keitimai nelaukia dar vieno LLM rato.',
                    ['agent', 'confirmation'],
                ),
            },
            {
                title: 'Ollama planavimas',
                text: 'Įprastoms užklausoms `OllamaClient.plan(messages)` siunčia istoriją ir bridge system promptą į Ollama strict JSON režimu. Ollama grąžina tool/action planą, o ne laisvą tekstą.',
                signal: 'LLM',
                showcase: createObsidianBridgeShowcase(
                    'lt',
                    'Paprašyti Ollama ketinimo',
                    'Vietinis modelis pateikia struktūruotą tool ketinimą, todėl bridge išlieka nuspėjamas ir patikrinamas.',
                    ['confirmation', 'ollama', 'registry'],
                ),
            },
            {
                title: 'Vault rezultatas',
                text: '`ToolRegistry.execute(action)` paleidžia pasirinktą read, propose, apply arba reject kelią. Vault skaitymai ir rašymai vyksta per Obsidian Local REST API, tada bridge grąžina rezultatą Copilot kaip JSON arba SSE srautą.',
                signal: 'Vault',
                showcase: createObsidianBridgeShowcase(
                    'lt',
                    'Grąžinti preview-first rezultatą',
                    'Paskutinė dalis vykdoma prieš vault per REST API, o rezultatas grįžta į Copilot chat.',
                    ['registry', 'rest', 'vault', 'response'],
                ),
            },
        ],
    },
    {
        slug: 'tipodieta',
        title: 'TipoDieta',
        summary:
            'Asmeninis mitybos duomenų projektas, kuris scrapina informacija iš Barboros tinklapio ir saugo į SQLite duomenų bazę.',
        category: 'Mitybos projektas',
        visibility: 'personal',
        status: 'work-in-progress',
        primaryTechnology: 'TypeScript',
        externalLink: {
            kind: 'github',
            url: 'https://github.com/Naidzelas/nutrition-budget-tra'
        },
        explanation:
            'Pradėtas kurti testuojant Github Spark. TipoDieta yra asmeniniam naudojimui ir plėtojamas pagal asmeninius poreikius. Duomenys yra scrapinami iš Barboros, kad iš jų būtų galima susidaryti mitybos šablonus, bei stebėti kainą.',
        stack: ['TypeScript', 'Kubernetes', 'Tekton', 'Web Scraping'],
        outcomes: [
            'Kaupiani duomenys apie kainos pokyčius.',
            'Šablonai greitai modeliuotis ir keisti mitybos planą.',
            'Aiškus išlaidų planas',
        ],
        steps: [
            {
                title: 'Pradėti nuo šaltinių medžiagos',
                text: 'Projektas prasideda nuo mitybos šaltinių, kurie naudingi, bet nevienodi. Scraping leidžia surinkti medžiagą be rankinio kiekvieno produkto kopijavimo.',
                signal: 'Scrape',
                showcase: createTipoDietaShowcase(
                    'lt',
                    'Surinkti mitybos medžiagą',
                    'Scraping leidžia surinkti duomenis apie produktus, kainas ir maistinę vertę tiesiai iš Barboros tinklapio, todėl galima pradėti nuo realios medžiagos, o ne tuščio lapo.',
                    ['sources', 'scraper'],
                ),
            },
            {
                title: 'UI duomenų valymui',
                text: 'Duomenys naudojami kurti šablonus, skaičiuoti kainas ir stebėti pokyčius. Esant poreikiui praplėsti funkcionalumą kuris atitikų realų poreikį. Žinant aiškią mitybos kainą galima priimti geresnius sprendimus apie tai, ką pirkti ir valgyti.',
                signal: 'Pipeline',
                showcase: createTipoDietaShowcase(
                    'lt',
                    'Šablonų kūrimas ir duomenų valymas',
                    'Duomenys nėra tobuli, todėl UI leidžia juos valyti, modeliuoti šablonus ir gauti naudingų įžvalgų apie mitybą bei išlaidas.',
                    ['cleanup', 'pipeline', 'cluster'],
                ),
            },
            {
                title: 'Palaikyti maisto sprendimus',
                text: 'Kai įrašai tampa nuoseklus, projektas gali judėti nuo scraping link naudingų palyginimų apie patiekalus, maistines vertes ir praktinius pasirinkimus. Visa tai leidžia sistemingai reaguoti į maisto kainų augimą ir planuotis biudžetą tikslingiau.',
                signal: 'Sprendimai',
                showcase: createTipoDietaShowcase(
                    'lt',
                    'Nuo įrašų iki pasirinkimų',
                    'Tikslas nėra scraping pats savaime; tikslas yra naudingi mitybos duomenys kasdieniams sprendimams.',
                    ['cluster', 'decisions'],
                ),
            },
        ],
    },
    {
        slug: 'suber',
        title: 'Suber',
        summary:
            'Lokali subtitrų vertimo pipeline, kuri ištraukia, atsisiunčia, parsina, verčia, normalizuoja ir įrašo SRT failus su Python ir Ollama.',
        category: 'AI filmų vertėjas',
        visibility: 'personal',
        status: 'experimental',
        primaryTechnology: 'Python',
        externalLink: {
            kind: 'github',
        },
        explanation:
            'Suber kuriamas lokalizuoti filmus, kad angliškai nesuprantantiems būtų lengviau juos žiūrėti. Ilgalaikėje perspektyvoje vertimas būtų ne subtitrų pavidalu, bet dubliuotas norima kalba.',
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
            'Local-first subtitrų vertimo procesas filmų failams.',
            'Keli subtitrų gavimo keliai: embedded srautai, OpenSubtitles ir Whisper fallback eksperimentai.',
            'Adaptuojami Ollama vertimo batchai su cue sulygiavimo markeriais.',
            'Laiko normalizavimas ir pasirenkamas finalizavimo etapas prieš SRT išvedimą.',
        ],
        steps: [
            {
                title: 'Pasirinkti mediją ir šaltinį',
                text: 'Naudotojas pasirenka lokalią filmo failą ir nurodo, kaip gauti subtitrus: automatiškai, iš embedded srautų, per OpenSubtitles arba iš speech-to-text fallback kelio.',
                signal: 'Input',
                showcase: createSuberShowcase(
                    'lt',
                    'Pasirinkti vertimo šaltinį',
                    'Suber prasideda nuo medijos failo ir aiškaus subtitrų gavimo būdo.',
                    ['movie', 'source'],
                ),
            },
            {
                title: 'Ištraukti arba atsisiųsti subtitrus',
                text: 'FFmpeg ir ffprobe tikrina embedded srautus, o OpenSubtitles gali pateikti išorinį SRT failą, kai pasirinktam procesui reikia atsisiunčiamo šaltinio.',
                signal: 'Gauti',
                showcase: createSuberShowcase(
                    'lt',
                    'Gauti subtitrų tekstą',
                    'Embedded ir nuotoliniai subtitrų keliai maitina tą patį vėlesnį parserį.',
                    ['source', 'extract', 'opensubtitles'],
                ),
            },
            {
                title: 'Parsinti SRT cue',
                text: 'SRT parseris paverčia subtitrų tekstą struktūruotais cue, kad vertimas išlaikytų eilę, laiko žymes ir ryšį tarp originalo bei vertimo.',
                signal: 'Parse',
                showcase: createSuberShowcase(
                    'lt',
                    'Paversti subtitrus cue vienetais',
                    'Parseris sukuria stabilia struktūra, kurios reikia prieš vertimą.',
                    ['opensubtitles', 'parser'],
                ),
            },
            {
                title: 'Versti sulygiuotais batchais',
                text: 'Python dalina cue į adaptuojamus batchus ir siunčia juos į Ollama su `<<<index>>>` markeriais, kad modelio atsakymas liktų sulygiuotas su pradiniais subtitrais.',
                signal: 'Vertimas',
                showcase: createSuberShowcase(
                    'lt',
                    'Ribotas Ollama vertimas',
                    'Batchai ir indeksu markeriai padeda lokalaus modelio vertimą paversti prognozuojamu SRT atkurimui.',
                    ['parser', 'batches', 'ollama'],
                ),
            },
            {
                title: 'Normalizuoti ir užbaigti',
                text: 'Po vertimo laiko taisykles palaiko mažus tarpus ir neleidžia cue slinkti. Antras modelio etapas gali pasirinktinai užbaigti failą, jei modelis palaiko tools.',
                signal: 'Laikas',
                showcase: createSuberShowcase(
                    'lt',
                    'Apsaugoti subtitrų laiką',
                    'Vertimas naudingas tik tada, kai subtitrai vis dar sutampa su filmo laiko juosta.',
                    ['ollama', 'timing', 'stage-two'],
                ),
            },
            {
                title: 'Įrašyti išverstą SRT',
                text: 'Output writer išsaugo baigtą subtitrų failą ir metaduomenis Subbies rezultatų vietoje, kad rezultatą būtų lengva peržiūrėti, paleisti ar kartoti su kitu modeliu.',
                signal: 'Rezultatas',
                showcase: createSuberShowcase(
                    'lt',
                    'Įrašyti peržiūrimą rezultatą',
                    'Pipeline baigiasi SRT artefaktu, o ne neaiškiu chat atsakymu.',
                    ['timing', 'stage-two', 'output'],
                ),
            },
        ],
    },
    {
        slug: 'laravel-tinker',
        title: 'Laravel-Tinker',
        summary:
            'Mažas Laravel komandos pagalbininkas, paleidžiantis pavadintus skriptus iš `TinkerScripts` aplanko per `php artisan helper:tinker {filename}`.',
        category: 'Programuotojo įrankis',
        visibility: 'personal',
        status: 'tool',
        primaryTechnology: 'PHP',
        externalLink: {
            kind: 'github',
            url: 'https://github.com/Naidzelas/Laravel-Tinker',
        },
        explanation:
            'Laravel-Tinker leidžia greitus eksperimentus šalia projekto. Vietoje nuolatinio snippet kopijavimo į interaktyvų shell, programuotojas parašo mažą skriptą, paleidžia Laravel komandą ir mato rezultatą aplikacijos runtime kontekste.',
        stack: ['PHP', 'Laravel'],
        outcomes: [
            'Vieša GitHub repositorija fokusuotam Laravel kūrimo įrankiui.',
            'Kartojami skriptų failai laikomi repositorijai draugiškame `TinkerScripts` aplanke.',
            'Paprastas Artisan komandos įėjimo taškas greitiems runtime patikrinimams.',
        ],
        steps: [
            {
                title: 'Laikyti skriptus projekte',
                text: 'Programuotojas deda mažus tyrimo skriptus į `TinkerScripts`, todėl modelių ar servisų patikros tampa lengvai kartojamos ir peržiūrimos kartu su repositorija.',
                signal: 'Script',
                showcase: createLaravelTinkerShowcase(
                    'lt',
                    'Repositorioje laikomi eksperimentai',
                    'Maži Tinker skriptai tampa pavadintais failais, o ne laikina shell istorija.',
                    ['repo', 'scripts'],
                ),
            },
            {
                title: 'Paleisti Artisan pagalbininką',
                text: 'Terminale `php artisan helper:tinker {filename}` nurodo paleidžiamą skriptą ir išlieka pakankamai trumpa komanda kasdieniam naudojimui.',
                signal: 'Komanda',
                showcase: createLaravelTinkerShowcase(
                    'lt',
                    'Viena komanda',
                    'Leidžia paleisti bet kurį skriptą su vienu komandos įėjimu, todėl greiti patikrinimai tampa mažiau kliūtimi.',
                    ['scripts', 'command'],
                ),
            },
            {
                title: 'Įkrauti Laravel kontekstą',
                text: 'Pagalbininkas suranda pasirinktą failą ir įvykdo jį Laravel viduje, kur jau pasiekiami modeliai, konfiguracija, servisai ir aplikacijos bootstrapping.',
                signal: 'Runtime',
                showcase: createLaravelTinkerShowcase(
                    'lt',
                    'Paleisti Laravel viduje',
                    'Esmė nėra bendras PHP skriptas; esmė yra greitas atsakymas framework runtime aplinkoje.',
                    ['command', 'helper', 'runtime'],
                ),
            },
            {
                title: 'Tikrinti ir kartoti',
                text: 'Programuotojas perskaito rezultatą, pataiso skriptą ir kartoja tą pačią komandą testuodamas modelius, servisus, seed duomenis ar framework elgseną.',
                signal: 'Tikrinimas',
                showcase: createLaravelTinkerShowcase(
                    'lt',
                    'Greitas grįžtamasis ryšys',
                    'Galutinis output trumpina kelią tarp klausimo ir framework lygio atsakymo.',
                    ['runtime', 'feedback'],
                ),
            },
        ],
    },
    {
        slug: 'computer-vision',
        title: 'Computer Vision Experimentas',
        summary:
            'Python computer-vision projektas, skaičiuojantis ledų indelius ir pakuotes iš gyvo kameros srauto naudojant OpenCV ir YOLOv8.',
        category: 'Computer vision projektas',
        visibility: 'personal',
        status: 'experimental',
        primaryTechnology: 'Python',
        externalLink: {
            kind: 'github',
            url: 'https://github.com/Naidzelas/ComputerVision',
        },
        explanation:
            'Projektas pereina visa mazo objekto detekcijos cikla: prijungti telefono arba webcam saltini, surinkti kadrus, suzymeti train/validation vaizdus YOLO formatu, apmokyti YOLOv8, nukopijuoti geriausius svorius runtime naudojimui, paleisti gyva detekcija, piesti bounding boxes, skaiciuoti klases ir loginti rezultatus i CSV.',
        stack: ['Python', 'Computer Vision', 'OpenCV', 'YOLOv8', 'IP Webcam'],
        overviewShowcase: {
            type: 'gif',
            url: '/videos/compvision.gif',
            title: 'Rezultatas',
            text: 'Trumpas peržiūros vaizdas',
        },
        outcomes: [
            'Kameros įvestis palaiko IP Webcam srautus ir lokalias web kameras.',
            'Kadrų rinkimo procesas sukuria train ir validation nuotraukas datasetui.',
            'YOLO formato anotacijos ir dataset config leidžia kartoti modelio mokymą.',
            'Gyvas detektorius skaičiuoja indelius ir pakuotes, o rezultatus rašo į CSV logus.',
        ],
        steps: [
            {
                title: 'Pasirinkti kameros šaltinį',
                text: 'Procesas gali prasidėti nuo telefono su IP Webcam arba nuo lokalios web kameros. Tai leidžia rinkti duomenis toje pačioje aplinkoje, kur detektorius vėliau veiks.',
                signal: 'Kamera',
                showcase: createComputerVisionShowcase(
                    'lt',
                    'Kamera paremtas datasetas',
                    'Projektas prasideda nuo lengvai pasiekiamo gyvo video šaltinio, o ne nuo paruošto dataseto.',
                    ['camera'],
                ),
            },
            {
                title: 'Rinkti mokymo kadrus',
                text: 'Capture skriptas su klaviatūros valdymu saugo kadrus į training arba validation aplankus, todėl patogu rinkti pavyzdžius skirtingame apšvietime, kampuose ir lentynos pozicijose.',
                signal: 'Kadrai',
                showcase: createComputerVisionShowcase(
                    'lt',
                    'Sukurti vaizdų rinkinį',
                    'Surinkti kadrai tampa mokymo ir validacijos žaliava.',
                    ['camera', 'collector', 'images'],
                ),
            },
            {
                title: 'Žymėti objektus YOLO formatui',
                text: 'Nuotraukos anotuojamos bounding boxais dviem tikslinėm klasėm, tada sujungiamos su dataset konfiguracija, kuri YOLOv8 nurodo nuotraukų, labelių ir klasių vietas.',
                signal: 'Labels',
                showcase: createComputerVisionShowcase(
                    'lt',
                    'Paruošti YOLO mokymo duomenis',
                    'Anotacijos ir dataset konfiguracija paverčia kameros kadrus modelio mokymo duomenimis.',
                    ['images', 'labels', 'dataset'],
                ),
            },
            {
                title: 'Mokyti ir išsaugoti geriausius svorius',
                text: 'YOLOv8 mokymas vyksta pagal sukonfiguruotą datasetą. Po mokymo geriausi svoriai kopijuojami į `models/best.pt`, kad gyvas detektorius turėtų stabilų modelio kelią.',
                signal: 'Mokymas',
                showcase: createComputerVisionShowcase(
                    'lt',
                    'Mokyti YOLOv8',
                    'Mokymo etapas paverčia suzymetus pavyzdzius pakartotinai naudojamu detektoriaus artefaktu.',
                    ['dataset', 'trainer', 'weights'],
                ),
            },
            {
                title: 'Aptikti ir skaičiuoti gyvai',
                text: 'Runtime atidaro kameros srautą su OpenCV, perduoda kadrus YOLO modeliui, piešia bounding boxes ir atskirai skaičiuoja indelius bei pakuotes.',
                signal: 'Detekcija',
                showcase: createComputerVisionShowcase(
                    'lt',
                    'Gyvos detekcijos ciklas',
                    'Apmokyti svoriai grįžta į kameros srautą realaus laiko skaičiavimui.',
                    ['weights', 'detector', 'counts'],
                ),
            },
            {
                title: 'Loginti skaičių istoriją',
                text: 'Aptikti skaičiai gali būti rašomi į `logs/counts.csv` su laiko žymomis, todėl gyvas vizualus demo tampa duomenimis, kuriuos galima peržiūrėti pasibaigus kameros sesijai.',
                signal: 'Logai',
                showcase: createComputerVisionShowcase(
                    'lt',
                    'Išsaugoti skaičių pėdsaką',
                    'CSV rezultatas suteikia eksperimentui paprastą audito kelią už gyvos perdangos ribų.',
                    ['counts', 'logs'],
                ),
            },
        ],
    },
];
