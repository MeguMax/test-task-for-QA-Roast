import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    await prisma.question.deleteMany();
    await prisma.quiz.deleteMany();

    const quiz1 = await prisma.quiz.create({
        data: {
            title: 'JavaScript Basics Quiz',
            questions: {
                create: [
                    {
                        type: 'boolean',
                        text: 'JavaScript is a compiled language',
                        options: null,
                    },
                    {
                        type: 'input',
                        text: 'What does HTML stand for?',
                        options: null,
                    },
                    {
                        type: 'checkbox',
                        text: 'Which of these are JavaScript frameworks?',
                        options: JSON.stringify(['React', 'Angular', 'Python', 'Vue', 'Django']),
                    },
                    {
                        type: 'boolean',
                        text: 'TypeScript is a superset of JavaScript',
                        options: null,
                    },
                ],
            },
        },
    });

    const quiz2 = await prisma.quiz.create({
        data: {
            title: 'Web Development Fundamentals',
            questions: {
                create: [
                    {
                        type: 'checkbox',
                        text: 'Which of these are CSS frameworks?',
                        options: JSON.stringify(['Tailwind', 'Bootstrap', 'React', 'Bulma']),
                    },
                    {
                        type: 'input',
                        text: 'What does CSS stand for?',
                        options: null,
                    },
                    {
                        type: 'boolean',
                        text: 'HTTP is a stateless protocol',
                        options: null,
                    },
                ],
            },
        },
    });

    const quiz3 = await prisma.quiz.create({
        data: {
            title: 'Database Knowledge Test',
            questions: {
                create: [
                    {
                        type: 'checkbox',
                        text: 'Which of these are SQL databases?',
                        options: JSON.stringify(['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis']),
                    },
                    {
                        type: 'boolean',
                        text: 'NoSQL databases do not use tables',
                        options: null,
                    },
                    {
                        type: 'input',
                        text: 'What does ACID stand for in database terminology?',
                        options: null,
                    },
                ],
            },
        },
    });

    console.log('Created quiz 1:', quiz1.title);
    console.log('Created quiz 2:', quiz2.title);
    console.log('Created quiz 3:', quiz3.title);
    console.log('\nSeed completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error during seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
