import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { ffmpegUrl, ollamaUrl, openSubtitlesUrl } from '../shared';

export const suberFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'movie',
        label: 'Movie file',
        text: 'User picks local media from the browser UI',
        icon: 'pi-video',
    },
    {
        id: 'source',
        label: 'Subtitle source',
        text: 'Auto, OpenSubtitles, or Whisper',
        icon: 'pi-sliders-h',
    },
    {
        id: 'extract',
        label: 'ffprobe / ffmpeg',
        text: 'Embedded text streams are ranked and extracted',
        icon: 'pi-download',
        href: ffmpegUrl,
        reference: 'backend/services/ffmpeg_extract.py',
    },
    {
        id: 'opensubtitles',
        label: 'OpenSubtitles',
        text: 'Search and download when selected',
        icon: 'pi-cloud-download',
        href: openSubtitlesUrl,
        reference: 'backend/services/opensubtitles_service.py',
    },
    {
        id: 'parser',
        label: 'SRT parser',
        text: 'Cues become structured translation units',
        icon: 'pi-align-left',
        reference: 'backend/services/srt_parser.py',
    },
    {
        id: 'batches',
        label: 'Adaptive batches',
        text: 'Cue count and character budget stay bounded',
        icon: 'pi-clone',
        reference: 'backend/services/translation_service.py',
    },
    {
        id: 'ollama',
        label: 'Ollama translation',
        text: '`<<<index>>>` delimiters preserve alignment',
        icon: 'pi-bolt',
        href: ollamaUrl,
        reference: 'backend/services/translation_service.py',
    },
    {
        id: 'timing',
        label: 'Timing normalizer',
        text: 'Keeps 80 ms gaps and avoids timeline shifts',
        icon: 'pi-clock',
        reference: 'backend/services/timing_normalizer.py',
    },
    {
        id: 'stage-two',
        label: 'Optional stage 2',
        text: 'Tool-capable model can finalize the SRT',
        icon: 'pi-wrench',
        reference: 'backend/services/ollama_stage_two.py',
    },
    {
        id: 'output',
        label: 'Subbies output',
        text: 'SRT and metadata are written safely',
        icon: 'pi-save',
        reference: 'backend/services/output_writer.py',
    },
];



export const suberFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'movie', to: 'source', label: 'choose' },
    { from: 'source', to: 'extract', label: 'embedded' },
    { from: 'extract', to: 'opensubtitles', label: 'fallback' },
    { from: 'opensubtitles', to: 'parser', label: 'SRT' },
    { from: 'parser', to: 'batches', label: 'cues' },
    { from: 'batches', to: 'ollama', label: 'translate' },
    { from: 'ollama', to: 'timing', label: 'normalize' },
    { from: 'timing', to: 'stage-two', label: 'optional' },
    { from: 'stage-two', to: 'output', label: 'write' },
];


