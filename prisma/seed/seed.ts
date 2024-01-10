const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

interface TaskInterface {
    title: string
    description: string
}

async function seedData() {
    const tasksToCreate: TaskInterface[] = [
        {
            title: 'Comprar comida',
            description: 'Comprar comida para a semana',
        },
        {
            title: 'Estudar para a prova de matemática',
            description: 'Revisar Álgebra Linear e Geometria Analítica',
        },
        {
            title: 'Passear com o cachorro',
            description: 'Levar o cachorro para passear no parque',
        },
    ]

    for (const task of tasksToCreate) {
        await prisma.task.create({
            data: task,
        })
    }
}

seedData()
    .then(() => console.log('🚀 Data seeded successfully'))
    .catch(console.error)
    .finally(() => prisma.$disconnect())