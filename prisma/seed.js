import dbClient from '../src/utils/dbClient.js'

async function seed() {
  const categoryA = await dbClient.category.create({
    data: { text: 'A' },
  })

  for (let i = 1; i <= 10; i++) {
    await dbClient.question.create({
      data: {
        text: `Question ${i}`,
        categories: {
          connect: [{ id: categoryA.id }],
        },
      },
    })

    await dbClient.option.create({
      data: {
        text: `Option ${i}`,
        categories: {
          connect: [{ id: categoryA.id }],
        },
      },
    })

    await dbClient.answer.create({
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
    await dbClient.$disconnect()
  })
