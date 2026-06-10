/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/js/**/*.{vue,ts}',
        './resources/views/**/*.blade.php',
        './storage/framework/views/*.php',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Space Mono',
                    'JetBrains Mono',
                    'ui-monospace',
                    'SFMono-Regular',
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    'Liberation Mono',
                    'Courier New',
                    'monospace',
                ],
                mono: [
                    'JetBrains Mono',
                    'Space Mono',
                    'ui-monospace',
                    'SFMono-Regular',
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    'Liberation Mono',
                    'Courier New',
                    'monospace',
                ],
            },
        },
    },
    plugins: [],
};
