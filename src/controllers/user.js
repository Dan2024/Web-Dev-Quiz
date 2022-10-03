import getUserFromDb from '../domain/user.js';
// import dbClient from '../utils/dbClient.js';
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js';

export const getUser = async (req, res) => {
    const id = Number(req.user?.id);

    try {
        const user = await getUserFromDb(id);

        return sendDataResponse(res, 200, user);
    } catch (e) {
        return sendMessageResponse(res, 500, 'could not update user');
    }
};
