import dbClient from '../src/utils/dbClient.js';
import { getNodeQuestions } from '../src/puppeteer/getNodeJS_questions.js';
import { getJavascriptQuestions } from '../src/puppeteer/getJavascriptQuestions.js';

async function seed() {
	// to run successfully npx prisma migrate reset
	// creating 10 questions assigned to catergory A with associated answer and options
	const nodeJSObj = await getNodeQuestions();
	const javaScriptObj = await getJavascriptQuestions();

	const categoryA = await dbClient.category.create({
		data: { text: 'Node.Js' },
	});
	const categoryB = await dbClient.category.create({
		data: { text: 'Javascript' },
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

	for (let i = 1; i <= javaScriptObj.length - 1; i++) {
		const question = await dbClient.question.create({
			data: {
				text: javaScriptObj[i].question,
				categories: {
					connect: [{ id: categoryB.id }],
				},
			},
		});

		const questionId = question.id;

		await dbClient.answer.create({
			data: {
				text: javaScriptObj[i].answer,
				questionId,
			},
		});

		await dbClient.option.create({
			data: {
				text: javaScriptObj[i].options[0],
				questionId,
			},
		});

		await dbClient.option.create({
			data: {
				text: javaScriptObj[i].options[1],
				questionId,
			},
		});
		if (questionId === 142) {
			javaScriptObj[i].options[2] = `(function () {
				console.statusCode(lorem ipsum);
			})();`;
		}
		await dbClient.option.create({
			data: {
				text: javaScriptObj[i].options[2],
				questionId,
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
