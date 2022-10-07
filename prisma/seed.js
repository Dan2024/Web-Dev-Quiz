import dbClient from '../src/utils/dbClient.js';
import { getNodeQuestions } from '../src/puppeteer/getNodeJS_questions.js';

async function seed() {
	// to run successfully npx prisma migrate reset
	// creating 10 questions assigned to catergory A with associated answer and options
	const nodeJSObj = await getNodeQuestions();

	const categoryA = await dbClient.category.create({
		data: { text: 'Node.Js' },
	});

	for (let i = 1; i <= nodeJSObj.questions.length - 1; i++) {
		await dbClient.question.create({
			data: {
				text: nodeJSObj.questions[i],
				categories: {
					connect: [{ id: categoryA.id }],
				},
			},
		});

		await dbClient.answer.create({
			data: {
				text: nodeJSObj.answersArr[i],
				questionId: i,
			},
		});

		await dbClient.option.create({
			data: {
				text: nodeJSObj.options[i][0],
				questionId: i,
			},
		});

		await dbClient.option.create({
			data: {
				text: nodeJSObj.options[i][1],
				questionId: i,
			},
		});

		await dbClient.option.create({
			data: {
				text: nodeJSObj.options[i][2],
				questionId: i,
			},
		});
	}
}

seed()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(async () => {
		await dbClient.$disconnect();
	});
