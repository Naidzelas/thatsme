export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    logoUrl?: string;
    summary: string;
    highlights: string[];
    stack: string[];
}

export interface ProjectStep {
    title: string;
    text: string;
    signal: string;
    showcase?: ProjectShowcase;
}

export type ProjectShowcaseType =
    | 'placeholder'
    | 'image'
    | 'gif'
    | 'video'
    | 'embed'
    | 'links'
    | 'flowchart';

export interface ProjectFlowNode {
    id: string;
    label: string;
    text?: string;
    icon?: string;
    href?: string;
    reference?: string;
}

export interface ProjectFlowEdge {
    from: string;
    to: string;
    label?: string;
}

export interface ProjectShowcaseLink {
    label: string;
    url: string;
    icon?: string;
    kind?: ProjectLinkKind | 'demo' | 'docs' | 'external';
}

export interface ProjectShowcase {
    type: ProjectShowcaseType;
    title?: string;
    text?: string;
    url?: string;
    posterUrl?: string;
    alt?: string;
    links?: ProjectShowcaseLink[];
    icon?: string;
    nodes?: ProjectFlowNode[];
    edges?: ProjectFlowEdge[];
    activeNodeIds?: string[];
    direction?: 'vertical' | 'horizontal';
}

export type ProjectVisibility = 'public' | 'personal';

export type ProjectStatus =
    | 'active'
    | 'experimental'
    | 'work-in-progress'
    | 'inactive'
    | 'tool';

export type ProjectLinkKind = 'website' | 'github';

export interface ProjectExternalLink {
    kind: ProjectLinkKind;
    url?: string;
}

export interface ProjectItem {
    slug: string;
    title: string;
    summary: string;
    category: string;
    visibility: ProjectVisibility;
    status: ProjectStatus;
    logoUrl?: string;
    primaryTechnology: string;
    externalLink?: ProjectExternalLink;
    explanation: string;
    stack: string[];
    outcomes: string[];
    steps: ProjectStep[];
}

export interface PortfolioSocialLink {
    label: string;
    icon: string;
    url: string;
}

export interface PortfolioPortraitVideos {
    idleUrl: string;
    talkingUrl: string;
}

export interface PortfolioIdentity {
    fullName: string;
    city: string;
    email: string;
    avatarUrl: string;
    portraitVideos?: PortfolioPortraitVideos;
    coverImageUrl: string;
    socialLinks: PortfolioSocialLink[];
}

export type KeywordGroupTone = 'software' | 'engineering';

export interface KeywordItem {
    label: string;
    description: string;
    filterCode?: string;
}

export interface KeywordGroup {
    title: string;
    tone: KeywordGroupTone;
    items: KeywordItem[];
}

export interface PortfolioContent {
    home: {
        focusCards: Array<{
            label: string;
            value: string;
            detail: string;
        }>;
        skillGroups: Array<{
            title: string;
            items: string[];
        }>;
        keywordGroups: KeywordGroup[];
    };
    experience: ExperienceItem[];
    projects: ProjectItem[];
}
