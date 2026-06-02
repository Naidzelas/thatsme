import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { obsidianCopilotUrl, obsidianLocalRestApiUrl, obsidianUrl, ollamaUrl } from '../shared';

export const obsidianBridgeFlowNodesEn: ProjectFlowNode[] = [
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



export const obsidianBridgeFlowEdgesEn: ProjectFlowEdge[] = [
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


