import getUsersFromDb from '../domain/users.js';
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersFromDb();

        return sendDataResponse(res, 200, users);
    } catch (e) {
        return sendMessageResponse(res, 500, 'could not get users');
    }
};
