import dbClient from '../src/utils/dbClient.js';
import puppeteer from 'puppeteer';
//Puppeteer logic

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(
	`https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/main/node.js/node.js-quiz.md`
);
await page.screenshot({ path: 'questions.png' });

let questions = await page.$$eval('h4', (result) => {
	return result.map((result) => result.innerText);
});

questions = questions.map((question, i) => {
	if (i < 10) {
		question = question.slice(3, question.length);
	} else {
		question = question.slice(4, question.length);
	}
	return question;
});

let answers = [
	0, 1, 0, 0, 2, 0, 0, 1, 2, 1, 3, 2, 3, 1, 2, 1, 2, 0, 1, 3, 1, 1, 2, 3, 0, 2,
	0, 2, 1, 3, 0, 3, 0, 0, 2, 0, 3, 2, 1, 3, 2, 2, 0, 2, 1, 1, 2, 1, 2, 2, 2, 0,
	2, 2, 3, 3, 0, 1, 1, 3, 1, 3, 0, 3, 1, 0, 1, 3, 2, 0, 0, 0, 0, 2, 3,
];

let options = await page.$$eval('.contains-task-list', (result) => {
	return result.map((result) => result.innerText);
});

let answersArr = [];
options = options.map((optionSet, i) => {
	let optionsArr = optionSet.split(/\r?\n/);
	answersArr.push(optionsArr[answers[i]]);
	let spliced = optionsArr.splice(answers[i], 1);
	return optionsArr;
});

async function seed() {
	// to run successfully npx prisma migrate reset
	// creating 10 questions assigned to catergory A with associated answer and options

	const categoryA = await dbClient.category.create({
		data: { text: 'Node.Js' },
	});

	for (let i = 1; i <= questions.length - 1; i++) {
		await dbClient.question.create({
			data: {
				text: questions[i],
				categories: {
					connect: [{ id: categoryA.id }],
				},
			},
		});

		await dbClient.answer.create({
			data: {
				text: answersArr[i],
				questionId: i,
			},
		});

		await dbClient.option.create({
			data: {
				text: options[i][0],
				questionId: i,
			},
		});

		await dbClient.option.create({
			data: {
				text: options[i][1],
				questionId: i,
			},
		});

		await dbClient.option.create({
			data: {
				text: options[i][2],
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
