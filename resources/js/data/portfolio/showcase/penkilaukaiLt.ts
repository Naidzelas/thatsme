import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { filamentUrl, payseraDeliveryUrl } from '../shared';

export const penkilaukaiFlowNodesLt: ProjectFlowNode[] = [
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



export const penkilaukaiFlowEdgesLt: ProjectFlowEdge[] = [
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


