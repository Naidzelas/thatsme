import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { obsidianCopilotUrl, obsidianLocalRestApiUrl, obsidianUrl, ollamaUrl } from '../shared';

export const obsidianBridgeFlowNodesLt: ProjectFlowNode[] = [
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



export const obsidianBridgeFlowEdgesLt: ProjectFlowEdge[] = [
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


