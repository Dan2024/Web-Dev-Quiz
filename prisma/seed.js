import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function seed() {
  const categoryA = await prisma.category.create({
    data: { text: 'A' },
  })

  for (let i = 1; i <= 10; i++) {
    await prisma.question.create({
      data: {
        text: `Question ${i}`,
        categories: {
          connect: [{ id: categoryA.id }],
        },
      },
    })

    await prisma.option.create({
      data: {
        text: `Option ${i}`,
        categories: {
          connect: [{ id: categoryA.id }],
        },
      },
    })

    await prisma.answer.create({
      data: {
        text: `Answer ${i}`,
        questionId: i,
        optionId: i,
      },
    })
  }
}

seed()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
