import getQuestions from '../domain/question.js';
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js';

export const getQuestionsByCategory = async (req, res) => {
	const category = req.params.category;
	const numOfQuestions = req.query.numOfQuestions || 10;

	try {
		const questions = await getQuestions(category, numOfQuestions);

		return sendDataResponse(res, 200, questions);
	} catch (e) {
		return sendMessageResponse(res, 500, 'Unable to get questions');
	}
};
