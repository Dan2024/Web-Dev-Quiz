import dbClient from '../utils/dbClient.js';

export default async function getQuestions(category, numOfQuestions) {
	const questionsByCategory = await dbClient.question.findMany({
		where: { category: category },
		include: { answer: true },
	});

	const shuffledQuestions = questionsByCategory.sort(() => 0.5 - Math.random());
	const questions = shuffledQuestions.slice(0, numOfQuestions);

	return questions;
}
