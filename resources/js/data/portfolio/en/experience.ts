import { publicAssetUrl } from '../shared';
import type { ExperienceItem } from '../types';

export const experienceEn: ExperienceItem[] = [
    {
        company: 'AB Klaipėdos pienas',
        role: 'IT systems analyst',
        period: 'Current',
        logoUrl: publicAssetUrl('images/dione_logo.jpg'),
        summary:
            'Full-stack development, process optimization, and migration of Excel-based solutions into a web environment.',
        highlights: [
            'Building an application for hosting business-management tools using Laravel, Vue, Inertia, and TypeScript.',
            'Preparing database data structures, API integrations, and support for legacy logic.',
            'Handling DevOps responsibilities to optimize application development and maintenance workflows.',
        ],
        stack: [
            'Laravel',
            'Vue',
            'TypeScript',
            'PHP',
            'MSSQL',
            'CI/CD',
            'Bash',
            'REST API',
            'DevOps',
        ],
    },
    {
        company: 'UAB Vlantana',
        role: 'Programmer',
        period: 'Previous experience',
        logoUrl: publicAssetUrl('images/vlantana_logo.jpg'),
        summary:
            'Legacy system maintenance, planning-tool extensions, and ERP system extension and support.',
        highlights: [
            'Created and optimized SQL queries.',
            'Maintained and extended the Canias ERP system, synchronized data, and prepared reports.',
            'Migrated legacy project functionality to Laravel while preserving smooth data structure and process functionality.',
        ],
        stack: [
            'PHP',
            'JavaScript',
            'MySQL',
            'REST API',
            'Canias ERP',
            'jQuery',
            'Laravel',
            'Redis',
        ],
    },
    {
        company: 'UAB Geoparneris',
        role: 'Geodetic engineer',
        period: 'Earlier experience',
        summary:
            'Used advanced LiDAR technology for geodetic measurements of various sites and processed data for engineering and construction needs.',
        highlights: [
            'Performed measurements for wind-farm projects, power-line monitoring, and various construction projects.',
            'Piloted DJI Matrice 600 and DJI Phantom 4 unmanned aerial vehicles.',
            'Processed data with CloudCompare, AutoCAD, TerraSolid, and other tools to create accurate topographic maps, point clouds, and engineering drawings.',
        ],
        stack: [
            'LiDAR',
            'Point Cloud',
            'Topography',
            'AutoCAD',
            'Photogrammetry',
        ],
    },
];
