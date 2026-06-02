import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { laravelUrl } from '../shared';

export const laravelTinkerFlowNodesLt: ProjectFlowNode[] = [
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



export const laravelTinkerFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'repo', to: 'scripts', label: 'rašymas' },
    { from: 'scripts', to: 'command', label: 'paleidimas' },
    { from: 'command', to: 'helper', label: 'paieška' },
    { from: 'helper', to: 'runtime', label: 'vykdymas' },
    { from: 'runtime', to: 'feedback', label: 'tikrinimas' },
];


