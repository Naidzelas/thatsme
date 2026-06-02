import type { ProjectFlowEdge, ProjectFlowNode, ProjectShowcase, ProjectShowcaseLink } from '../types';

export const createFlowShowcase = (
    title: string,
    text: string,
    nodes: ProjectFlowNode[],
    edges: ProjectFlowEdge[],
    activeNodeIds: string[],
    links: ProjectShowcaseLink[] = [],
): ProjectShowcase => ({
    type: 'flowchart',
    title,
    text,
    nodes,
    edges,
    activeNodeIds,
    direction: 'vertical',
    ...(links.length ? { links } : {}),
});
