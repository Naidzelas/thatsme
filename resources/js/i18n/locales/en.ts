export default {
    app: {
        name: 'Trimzales',
        openMenu: 'Open navigation',
        closeMenu: 'Close navigation',
        language: 'Language',
        contact: 'Contact',
        updatedAt: 'Updated at {date}',
    },
    nav: {
        home: 'Home',
        experience: 'Experience',
        projects: 'Projects',
    },
    actions: {
        viewExperience: 'View experience',
        viewProjects: 'View projects',
        previous: 'Previous',
        next: 'Next',
    },
    labels: {
        outcomes: 'Outcomes',
    },
    pages: {
        home: {
            eyebrow: 'Personal CV',
            title: 'Full-stack developer focused on useful web systems.',
            intro: 'I build practical products with Laravel, Vue, TypeScript, and AI-assisted workflows. This site is structured as a compact CV, project index, and place to keep the work current.',
            skillsTitle: 'Current stack',
            sphereTitle: 'Tools I reach for',
        },
        experience: {
            eyebrow: 'Work experience',
            title: 'Experience shaped around delivery, clarity, and maintainable systems.',
            intro: 'Use this page as the editable timeline for roles, responsibilities, technologies, and measurable outcomes.',
        },
        projects: {
            eyebrow: 'Projects',
            title: 'One project story at a time.',
            intro: 'Pick a project to see the explanation and a visual walkthrough of what is happening.',
        },
    },
} as const;
