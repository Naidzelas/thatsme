import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { laravelUrl } from '../shared';

export const laravelTinkerFlowNodesEn: ProjectFlowNode[] = [
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



export const laravelTinkerFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'repo', to: 'scripts', label: 'write' },
    { from: 'scripts', to: 'command', label: 'run' },
    { from: 'command', to: 'helper', label: 'resolve' },
    { from: 'helper', to: 'runtime', label: 'execute' },
    { from: 'runtime', to: 'feedback', label: 'inspect' },
];


