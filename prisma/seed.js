import dbClient from '../src/utils/dbClient.js'

async function seed() {
  // to run successfully npx prisma migrate reset
  // creating 10 questions assigned to catergory A with associated answer and options

  const categoryA = await dbClient.category.create({
    data: { text: 'A' },
  })

  await dbClient.delete

  for (let i = 1; i <= 10; i++) {
    await dbClient.question.create({
      data: {
        text: `Question ${i}`,
        categories: {
          connect: [{ id: categoryA.id }],
        },
      },
    })

    await dbClient.answer.create({
      data: {
        text: `Answer ${i}`,
        questionId: i,
      },
    })

    await dbClient.option.create({
      data: {
        text: `Q${i} option 1`,
        questionId: i,
      },
    })

    await dbClient.option.create({
      data: {
        text: `Q${i} option 2`,
        questionId: i,
      },
    })

    await dbClient.option.create({
      data: {
        text: `Q${i} option 3`,
        questionId: i,
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
    await dbClient.$disconnect()
  })
