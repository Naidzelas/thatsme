import type { ProjectFlowEdge, ProjectFlowNode } from '../types';
import { labelImgUrl, opencvUrl, roboflowUrl, yoloUrl } from '../shared';

export const computerVisionFlowNodesLt: ProjectFlowNode[] = [
    {
        id: 'camera',
        label: 'Kameros saltinis',
        text: 'IP Webcam telefono srautas arba lokali kamera',
        icon: 'pi-camera',
    },
    {
        id: 'collector',
        label: 'Kadru rinkimas',
        text: '`S` išsaugo train, `V` išsaugo validation',
        icon: 'pi-images',
        reference: 'scripts/collect_frames.py',
    },
    {
        id: 'images',
        label: 'Train / val nuotraukos',
        text: 'Įvairus apšvietimas, kampai ir atstumai',
        icon: 'pi-folder-open',
        reference: 'data/images',
    },
    {
        id: 'labels',
        label: 'YOLO anotacijos',
        text: 'Dvi klases: tub ir package',
        icon: 'pi-tags',
        href: labelImgUrl,
        reference: 'data/labels',
    },
    {
        id: 'dataset',
        label: 'dataset.yaml',
        text: 'Klasių pavadinimai ir mokymo keliai',
        icon: 'pi-sliders-h',
        reference: 'config/dataset.yaml',
    },
    {
        id: 'trainer',
        label: 'YOLOv8 mokymas',
        text: 'Konfigūruojami epoch, batch ir modelio dydis',
        icon: 'pi-cog',
        href: yoloUrl,
        reference: 'scripts/train.py',
    },
    {
        id: 'weights',
        label: 'models/best.pt',
        text: 'Geriausi svoriai perkeliami runtime naudojimui',
        icon: 'pi-box',
        reference: 'models/best.pt',
    },
    {
        id: 'detector',
        label: 'Gyvas detektorius',
        text: 'OpenCV kadrai keliauja per YOLO inference',
        icon: 'pi-eye',
        href: opencvUrl,
        reference: 'src/detector.py',
    },
    {
        id: 'counts',
        label: 'Skaičių perdanga',
        text: 'Bounding boxes atskiria indelius ir pakuotes',
        icon: 'pi-chart-line',
        reference: 'main.py',
    },
    {
        id: 'logs',
        label: 'CSV logas',
        text: 'Laiku žymėti skaičiai rašomi kas intervalą',
        icon: 'pi-file',
        reference: 'logs/counts.csv',
    },
];



export const computerVisionFlowEdgesLt: ProjectFlowEdge[] = [
    { from: 'camera', to: 'collector', label: 'fiksuoti' },
    { from: 'collector', to: 'images', label: 'saugoti' },
    { from: 'images', to: 'labels', label: 'anotuoti' },
    { from: 'labels', to: 'dataset', label: 'konfigūruoti' },
    { from: 'dataset', to: 'trainer', label: 'mokyti' },
    { from: 'trainer', to: 'weights', label: 'geriausi' },
    { from: 'weights', to: 'detector', label: 'užkrauti' },
    { from: 'detector', to: 'counts', label: 'atpažinti' },
    { from: 'counts', to: 'logs', label: 'rašyti' },
];


