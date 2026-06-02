import type { LocaleCode } from '@/i18n';
import { createFlowShowcase } from './showcase/createFlowShowcase';
import { ffmpegUrl, filamentUrl, labelImgUrl, laravelUrl, obsidianCopilotUrl, obsidianLocalRestApiUrl, obsidianUrl, ollamaUrl, opencvUrl, openSubtitlesUrl, payseraDeliveryUrl, roboflowUrl, yoloUrl } from './shared';
import type { ProjectShowcase } from './types';
import { obsidianBridgeFlowNodesEn, obsidianBridgeFlowEdgesEn } from './showcase/obsidianBridgeEn';
import { obsidianBridgeFlowNodesLt, obsidianBridgeFlowEdgesLt } from './showcase/obsidianBridgeLt';
import { penkilaukaiFlowNodesEn, penkilaukaiFlowEdgesEn } from './showcase/penkilaukaiEn';
import { penkilaukaiFlowNodesLt, penkilaukaiFlowEdgesLt } from './showcase/penkilaukaiLt';
import { suberFlowNodesEn, suberFlowEdgesEn } from './showcase/suberEn';
import { suberFlowNodesLt, suberFlowEdgesLt } from './showcase/suberLt';
import { tipoDietaFlowNodesEn, tipoDietaFlowEdgesEn } from './showcase/tipoDietaEn';
import { tipoDietaFlowNodesLt, tipoDietaFlowEdgesLt } from './showcase/tipoDietaLt';
import { laravelTinkerFlowNodesEn, laravelTinkerFlowEdgesEn } from './showcase/laravelTinkerEn';
import { laravelTinkerFlowNodesLt, laravelTinkerFlowEdgesLt } from './showcase/laravelTinkerLt';
import { computerVisionFlowNodesEn, computerVisionFlowEdgesEn } from './showcase/computerVisionEn';
import { computerVisionFlowNodesLt, computerVisionFlowEdgesLt } from './showcase/computerVisionLt';

// Central showcase factories that choose the appropriate locale-specific flow data.

export const createObsidianBridgeShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase => ({
    type: 'flowchart',
    title,
    text,
    nodes:
        locale === 'lt' ? obsidianBridgeFlowNodesLt : obsidianBridgeFlowNodesEn,
    edges:
        locale === 'lt' ? obsidianBridgeFlowEdgesLt : obsidianBridgeFlowEdgesEn,
    activeNodeIds,
    direction: 'vertical',
    links: [
        {
            label: 'Obsidian',
            url: obsidianUrl,
            icon: 'pi-book',
            kind: 'external',
        },
        {
            label: 'Ollama',
            url: ollamaUrl,
            icon: 'pi-bolt',
            kind: 'external',
        },
    ],
});


export const createPenkilaukaiShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? penkilaukaiFlowNodesLt : penkilaukaiFlowNodesEn,
        locale === 'lt' ? penkilaukaiFlowEdgesLt : penkilaukaiFlowEdgesEn,
        activeNodeIds,
        [
            {
                label: 'Penkilaukai',
                url: 'https://penkilaukai.lt',
                icon: 'pi-globe',
                kind: 'website',
            },
            {
                label: 'Paysera Delivery',
                url: payseraDeliveryUrl,
                icon: 'pi-truck',
                kind: 'external',
            },
        ],
    );


export const createSuberShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? suberFlowNodesLt : suberFlowNodesEn,
        locale === 'lt' ? suberFlowEdgesLt : suberFlowEdgesEn,
        activeNodeIds,
        [
            {
                label: 'FFmpeg',
                url: ffmpegUrl,
                icon: 'pi-video',
                kind: 'external',
            },
            {
                label: 'Ollama',
                url: ollamaUrl,
                icon: 'pi-bolt',
                kind: 'external',
            },
        ],
    );


export const createTipoDietaShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? tipoDietaFlowNodesLt : tipoDietaFlowNodesEn,
        locale === 'lt' ? tipoDietaFlowEdgesLt : tipoDietaFlowEdgesEn,
        activeNodeIds,
    );


export const createLaravelTinkerShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? laravelTinkerFlowNodesLt : laravelTinkerFlowNodesEn,
        locale === 'lt' ? laravelTinkerFlowEdgesLt : laravelTinkerFlowEdgesEn,
        activeNodeIds,
        [
            {
                label: 'GitHub',
                url: 'https://github.com/Naidzelas/Laravel-Tinker',
                icon: 'pi-github',
                kind: 'github',
            },
            {
                label: 'Laravel',
                url: laravelUrl,
                icon: 'pi-bolt',
                kind: 'external',
            },
        ],
    );




export const createComputerVisionShowcase = (
    locale: LocaleCode,
    title: string,
    text: string,
    activeNodeIds: string[],
): ProjectShowcase =>
    createFlowShowcase(
        title,
        text,
        locale === 'lt' ? computerVisionFlowNodesLt : computerVisionFlowNodesEn,
        locale === 'lt' ? computerVisionFlowEdgesLt : computerVisionFlowEdgesEn,
        activeNodeIds,
        [
            {
                label: 'OpenCV',
                url: opencvUrl,
                icon: 'pi-eye',
                kind: 'external',
            },
            {
                label: 'YOLOv8',
                url: yoloUrl,
                icon: 'pi-sparkles',
                kind: 'external',
            },
            {
                label: 'Roboflow',
                url: roboflowUrl,
                icon: 'pi-tags',
                kind: 'external',
            },
        ],
    );
