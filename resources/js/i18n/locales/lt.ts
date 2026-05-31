export default {
    app: {
        name: 'Naidželas Benetis',
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
        sendEmail: 'El. pastas',
        openSocial: 'Atidaryti {platform}',
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
            intro: 'Kuriu praktiškus produktus su Laravel, Vue, TypeScript, AI ir kitomis technologijomis.',
            skillsTitle: 'Dabartinis stackas',
            sphereTitle: 'Irakiai, kuriuos naudoju',
        },
        experience: {
            eyebrow: 'Darbo patirtis',
            title: 'Patirtis orientuota į rezultatą, aiškumą ir palaikomas sistemas.',
            intro: 'Lengvai prisitaikau prie naujų technologijų ir atsakomybių, todėl mano patirtis apima įvairias roles, technologijas ir atsakomybes.',
        },
        projects: {
            eyebrow: 'Projektai',
            title: 'Vienu metu rodoma viena projekto istorija.',
            intro: 'Pasirink projektą ir matysi paaiškinimą bei vizualią eigą, kas vyksta sistemoje.',
        },
    },
} as const;
