export default {
    app: {
        name: 'Trimzales',
        openMenu: 'Atidaryti navigacija',
        closeMenu: 'Uzdaryti navigacija',
        language: 'Kalba',
        contact: 'Kontaktai',
        updatedAt: 'Atnaujinta {date}',
    },
    nav: {
        home: 'Pradzia',
        experience: 'Patirtis',
        projects: 'Projektai',
    },
    actions: {
        viewExperience: 'Perziureti patirti',
        viewProjects: 'Perziureti projektus',
        previous: 'Atgal',
        next: 'Toliau',
    },
    labels: {
        outcomes: 'Rezultatai',
    },
    pages: {
        home: {
            eyebrow: 'Asmeninis CV',
            title: 'Full-stack programuotojas, kuriantis naudingas web sistemas.',
            intro: 'Kuriu praktiskus produktus su Laravel, Vue, TypeScript ir AI paremtais darbo procesais. Sis puslapis veikia kaip glaustas CV, projektu rodykle ir vieta nuolat atnaujinti darbus.',
            skillsTitle: 'Dabartinis stackas',
            sphereTitle: 'Irakiai, kuriuos naudoju',
        },
        experience: {
            eyebrow: 'Darbo patirtis',
            title: 'Patirtis orientuota i rezultata, aiskuma ir palaikomas sistemas.',
            intro: 'Sis puslapis skirtas redaguojamai roliu, atsakomybiu, technologiju ir pamatuojamu rezultatu laiko juostai.',
        },
        projects: {
            eyebrow: 'Projektai',
            title: 'Vienu metu rodoma viena projekto istorija.',
            intro: 'Pasirink projekta ir matysi paaiskinima bei vizualia eiga, kas vyksta sistemoje.',
        },
    },
} as const;
