import { publicAssetUrl } from './shared';
import type { PortfolioIdentity } from './types';

export const portfolioIdentity: PortfolioIdentity = {
    fullName: 'Naidželas Benetis',
    city: 'Klaipėda',
    email: 'naidzelas.benetis@gmail.com',
    avatarUrl: publicAssetUrl('images/DSC_1482.jpg'),
    portraitVideos: {
        idleUrl: publicAssetUrl('videos/idle.mp4'),
        talkingUrl: publicAssetUrl('videos/talking.mp4'),
    },
    coverImageUrl: publicAssetUrl('images/background-cliped.jpg'),
    socialLinks: [
        {
            label: 'GitHub',
            icon: 'pi pi-github',
            url: 'https://github.com/Naidzelas',
        },
        {
            label: 'LinkedIn',
            icon: 'pi pi-linkedin',
            url: 'https://www.linkedin.com/in/naidzelas-benetis/',
        },
    ],
};
