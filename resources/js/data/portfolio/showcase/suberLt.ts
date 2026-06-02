import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { ffmpegUrl, ollamaUrl, openSubtitlesUrl } from '../shared';

export const suberFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'movie',
        label: 'Filmo failas',
        text: 'Naudotojas pasirenka lokalią mediją UI lange',
        icon: 'pi-video',
    },
    {
        id: 'source',
        label: 'Subtitru saltinis',
        text: 'Auto, OpenSubtitles arba Whisper',
        icon: 'pi-sliders-h',
    },
    {
        id: 'extract',
        label: 'ffprobe / ffmpeg',
        text: 'Tekstiniai subtitrai surikiuojami ir ištraukiami',
        icon: 'pi-download',
        href: ffmpegUrl,
        reference: 'backend/services/ffmpeg_extract.py',
    },
    {
        id: 'opensubtitles',
        label: 'OpenSubtitles',
        text: 'Paieška ir atsisiuntimas pasirinkus šaltinį',
        icon: 'pi-cloud-download',
        href: openSubtitlesUrl,
        reference: 'backend/services/opensubtitles_service.py',
    },
    {
        id: 'parser',
        label: 'SRT parseris',
        text: 'Cue paverčiami vertimo vienetais',
        icon: 'pi-align-left',
        reference: 'backend/services/srt_parser.py',
    },
    {
        id: 'batches',
        label: 'Adaptuojami batchai',
        text: 'Ribojamas cue kiekis ir simbolių biudžetas',
        icon: 'pi-clone',
        reference: 'backend/services/translation_service.py',
    },
    {
        id: 'ollama',
        label: 'Ollama vertimas',
        text: '`<<<index>>>` delimiteriai saugo sulygiavimą',
        icon: 'pi-bolt',
        href: ollamaUrl,
        reference: 'backend/services/translation_service.py',
    },
    {
        id: 'timing',
        label: 'Laiko normalizavimas',
        text: 'Saugo 80 ms tarpus ir nekeičia laiko juostos',
        icon: 'pi-clock',
        reference: 'backend/services/timing_normalizer.py',
    },
    {
        id: 'stage-two',
        label: 'Pasirenkamas 2 etapas',
        text: 'Tool palaikantis modelis gali užbaigti SRT',
        icon: 'pi-wrench',
        reference: 'backend/services/ollama_stage_two.py',
    },
    {
        id: 'output',
        label: 'Subbies rezultatas',
        text: 'SRT ir metaduomenys saugiai įrašomi',
        icon: 'pi-save',
        reference: 'backend/services/output_writer.py',
    },
];



export const suberFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'movie', to: 'source', label: 'pasirinkimas' },
    { from: 'source', to: 'extract', label: 'embedded' },
    { from: 'extract', to: 'opensubtitles', label: 'atsarginis' },
    { from: 'opensubtitles', to: 'parser', label: 'SRT' },
    { from: 'parser', to: 'batches', label: 'cue' },
    { from: 'batches', to: 'ollama', label: 'vertimas' },
    { from: 'ollama', to: 'timing', label: 'laikas' },
    { from: 'timing', to: 'stage-two', label: 'pasirinktinai' },
    { from: 'stage-two', to: 'output', label: 'įrašymas' },
];


