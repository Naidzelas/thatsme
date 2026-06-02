import type { ProjectFlowEdge, ProjectFlowNode } from '../types';

export const tipoDietaFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'sources',
        label: 'Mitybos šaltiniai',
        text: 'Maisto ir patiekalų duomenys pradeda pipeline',
        icon: 'pi-search',
    },
    {
        id: 'scraper',
        label: 'Scraping procesas',
        text: 'Surenka šaltinių medžiagą saugojimui ir tolesniam apdorojimui',
        icon: 'pi-download',
    },
    {
        id: 'cleanup',
        label: 'Mitybos duomenų valymas',
        text: 'Valdomi pavadinimai, vertes ir vienetai',
        icon: 'pi-filter',
    },
    {
        id: 'pipeline',
        label: 'Savaitinis planas',
        text: 'Dienos mitybos šablonai yra susidėliojami savaitės lygyje.',
        icon: 'pi-sitemap',
        reference: 'pipeline',
    },
    {
        id: 'cluster',
        label: 'Projektas patalpintas k8s',
        text: 'Stabili vieta procesui tobulinti',
        icon: 'pi-server',
    },
    {
        id: 'decisions',
        label: 'Maisto sprendimai',
        text: 'Struktūruoti duomenys padeda rinktis praktiškai',
        icon: 'pi-chart-bar',
    },
];



export const tipoDietaFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'sources', to: 'scraper', label: 'rinkimas' },
    { from: 'scraper', to: 'cleanup', label: 'planavimas' },
    { from: 'cleanup', to: 'pipeline', label: 'kartojimas' },
    { from: 'pipeline', to: 'cluster', label: 'paleidimas' },
    { from: 'cluster', to: 'decisions', label: 'naudojimas' },
];


