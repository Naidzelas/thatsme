import type { ProjectFlowEdge, ProjectFlowNode } from '../types';

export const tipoDietaFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'sources',
        label: 'Nutrition sources',
        text: 'Food and meal information from Barbora starts the pipeline',
        icon: 'pi-search',
    },
    {
        id: 'scraper',
        label: 'Scraping process',
        text: 'Scrapes source material from Barbora for later cleanup',
        icon: 'pi-download',
    },
    {
        id: 'cleanup',
        label: 'Nutrition data cleanup',
        text: 'Names, values, and units are normalized for consistent use',
        icon: 'pi-filter',
    },
    {
        id: 'pipeline',
        label: 'Weekly plan',
        text: 'Weekly meal templates are assembled from cleaned data',
        icon: 'pi-sitemap',
        reference: 'pipeline',
    },
    {
        id: 'cluster',
        label: 'Project hosted in k8s',
        text: 'A stable place to refine and re-run the workflow',
        icon: 'pi-server',
    },
    {
        id: 'decisions',
        label: 'Food decisions',
        text: 'Structured nutrition records support practical choices',
        icon: 'pi-chart-bar',
    },
];



export const tipoDietaFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'sources', to: 'scraper', label: 'collect' },
    { from: 'scraper', to: 'cleanup', label: 'plan' },
    { from: 'cleanup', to: 'pipeline', label: 'repeat' },
    { from: 'pipeline', to: 'cluster', label: 'run' },
    { from: 'cluster', to: 'decisions', label: 'use' },
];


