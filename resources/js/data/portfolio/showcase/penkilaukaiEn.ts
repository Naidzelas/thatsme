import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { filamentUrl, payseraDeliveryUrl } from '../shared';

export const penkilaukaiFlowNodesEn: ProjectFlowNode[] = [
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



export const penkilaukaiFlowEdgesEn: ProjectFlowEdge[] = [
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


