import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#FBE6D7',
            100: '#F6C9A8',
            200: '#F0A06A',
            300: '#E3733F',
            400: '#D75A21',
            500: '#C44A00',
            600: '#B33E00',
            700: '#8B3A00',
            800: '#6F3000',
            900: '#4F2300',
            950: '#2F1400',
        },
    },
});

export default MyPreset;
