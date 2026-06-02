import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { labelImgUrl, opencvUrl, roboflowUrl, yoloUrl } from '../shared';

export const computerVisionFlowNodesEn: ProjectFlowNode[] = [
    {
        id: 'camera',
        label: 'Camera source',
        text: 'IP Webcam phone stream or local webcam',
        icon: 'pi-camera',
    },
    {
        id: 'collector',
        label: 'Frame collector',
        text: '`S` saves train frames, `V` saves validation',
        icon: 'pi-images',
        reference: 'scripts/collect_frames.py',
    },
    {
        id: 'images',
        label: 'Train / val images',
        text: 'Varied lighting, angles, and distances',
        icon: 'pi-folder-open',
        reference: 'data/images',
    },
    {
        id: 'labels',
        label: 'YOLO labels',
        text: 'Two classes: tub and package',
        icon: 'pi-tags',
        href: labelImgUrl,
        reference: 'data/labels',
    },
    {
        id: 'dataset',
        label: 'dataset.yaml',
        text: 'Class names and training paths',
        icon: 'pi-sliders-h',
        reference: 'config/dataset.yaml',
    },
    {
        id: 'trainer',
        label: 'YOLOv8 trainer',
        text: 'Configurable epochs, batch, and model size',
        icon: 'pi-cog',
        href: yoloUrl,
        reference: 'scripts/train.py',
    },
    {
        id: 'weights',
        label: 'models/best.pt',
        text: 'Best training weights are copied for runtime',
        icon: 'pi-box',
        reference: 'models/best.pt',
    },
    {
        id: 'detector',
        label: 'Live detector',
        text: 'OpenCV frames run through YOLO inference',
        icon: 'pi-eye',
        href: opencvUrl,
        reference: 'src/detector.py',
    },
    {
        id: 'counts',
        label: 'Count overlay',
        text: 'Bounding boxes separate tubs and packages',
        icon: 'pi-chart-line',
        reference: 'main.py',
    },
    {
        id: 'logs',
        label: 'CSV log',
        text: 'Timestamped counts saved every interval',
        icon: 'pi-file',
        reference: 'logs/counts.csv',
    },
];



export const computerVisionFlowEdgesEn: ProjectFlowEdge[] = [
    { from: 'camera', to: 'collector', label: 'capture' },
    { from: 'collector', to: 'images', label: 'save' },
    { from: 'images', to: 'labels', label: 'annotate' },
    { from: 'labels', to: 'dataset', label: 'configure' },
    { from: 'dataset', to: 'trainer', label: 'train' },
    { from: 'trainer', to: 'weights', label: 'best' },
    { from: 'weights', to: 'detector', label: 'load' },
    { from: 'detector', to: 'counts', label: 'infer' },
    { from: 'counts', to: 'logs', label: 'record' },
];


