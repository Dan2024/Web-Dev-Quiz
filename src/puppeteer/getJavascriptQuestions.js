import puppeteer from 'puppeteer';
//Puppeteer logic

export const getJavascriptQuestions = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		`https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/main/javascript/javascript-quiz.md`
	);

	let questions = await page.$$eval('h4', (result) => {
		return result.map((result) => result.innerText);
	});

	let answers2 = await page.$$eval('.task-list-item', (result) => {
		return result
			.map((result, i) => {
				if (result.innerHTML.includes('checked')) {
					return result.innerText;
				}
			})
			.filter((answer) => answer);
	});

	let options = await page.$$eval('.contains-task-list', (result) => {
		return result.map((result) => result.innerText);
	});
	let questionsArr = [];
	let optionsCounter = 0;
	let answerCounter = 0;
	for (let i = 0; i < questions.length; i++) {
		if (i === 7 || i === 9) {
			optionsCounter += 4;
			continue;
		} else if (i === 81) {
			optionsCounter += 3;
			continue;
		} else if (i === 114) {
			optionsCounter += 4;
			answerCounter += 1;
			continue;
		}
		const obj = {};
		obj.question = questions[i];
		obj.answer = answers2[i + answerCounter];
		obj.options = options[optionsCounter].split('\n').filter((option) => {
			if (option === answers2[i + answerCounter]) {
				return false;
			} else return option;
		});
		optionsCounter++;
		questionsArr.push(obj);
	}

	let snippets = await page.$$eval('pre', (result) => {
		return result.map((result) => result.innerText);
	});

	const snippetsArr = [
		2, 5, 6, 8, 10, 11, 12, 14, 17, 19, 21, 30, 31, 35, 37, 42, 43, 46, 47, 48,
		49, 50, 52, 66, 67, 73, 74, 75, 76, 77, 78, 79, 80, 82, 85, 86, 87, 88, 89,
		90, 91, 93, 95, 96, 99, 101, 102, 106, 108, 109, 111, 112, 114, 115, 116,
		117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 137,
	];

	let snippetCounter = 0;
	for (let i = 0; i < 66; i++) {
		questionsArr[snippetsArr[i]].question =
			questionsArr[snippetsArr[i]].question +
			'\n' +
			'ó' +
			snippets[snippetCounter];
		if (i === 2) {
			snippetCounter += 10;
		} else if (i === 30) {
			snippetCounter += 5;
		} else if (i === 80) {
			snippetCounter += 4;
		} else snippetCounter++;
	}

	for (let i = 21; i > 0; i--) {
		questionsArr[questionsArr.length - (i + 9)].question =
			questionsArr[questionsArr.length - (i + 9)].question +
			'\n' +
			'ó' +
			snippets[snippets.length - (i + 9)];
	}

	console.log(questionsArr.slice(0, 90));

	return questionsArr.slice(0, 90);
};
