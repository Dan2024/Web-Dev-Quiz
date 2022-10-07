import puppeteer from 'puppeteer';
//Puppeteer logic

export const getNodeQuestions = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		`https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/main/node.js/node.js-quiz.md`
	);

	let questions = await page.$$eval('h4', (result) => {
		return result.map((result) => result.innerText);
	});
	let snippets = await page.$$eval('code', (result) => {
		return result.map((result) => result.innerText);
	});
	questions[16] = questions[16] + '\n' + 'ó' + snippets[0];
	questions[23] = questions[23] + '\n' + 'ó' + snippets[5];
	questions[26] = questions[26] + '\n' + 'ó' + snippets[6];
	questions[31] = questions[31] + '\n' + 'ó' + snippets[7];
	questions[60] = questions[60] + '\n' + 'ó' + snippets[snippets.length - 10];

	questions[61] = questions[61] + '\n' + 'ó' + snippets[snippets.length - 5];

	questions = questions.map((question, i) => {
		if (i < 10) {
			question = question.slice(3, question.length);
		} else {
			question = question.slice(4, question.length);
		}
		return question;
	});

	let answers = [
		0, 1, 0, 0, 2, 0, 0, 1, 2, 1, 3, 2, 3, 1, 2, 1, 2, 0, 1, 3, 1, 1, 2, 3, 0,
		2, 0, 2, 1, 3, 0, 3, 0, 0, 2, 0, 3, 2, 1, 3, 2, 2, 0, 2, 1, 1, 2, 1, 2, 2,
		2, 0, 2, 2, 3, 3, 0, 1, 1, 3, 1, 3, 0, 3, 1, 0, 1, 3, 2, 0, 0, 0, 0, 2, 3,
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

	return { answersArr: answersArr, options: options, questions: questions };
};
