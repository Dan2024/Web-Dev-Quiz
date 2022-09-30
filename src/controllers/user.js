import getUserFromDb from '../domain/user.js'
// import dbClient from '../utils/dbClient.js';
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

export const getUser = async (req, res) => {
  const id = Number(req.user?.id)

  try {
    const user = await getUserFromDb(id)
    // const updateduser = await dbClient.user.findUnique({
    // 	where: { id },
    // });

    // const user = {
    // 	id: updateduser.id,
    // 	googleId: updateduser.googleId,
    // 	email: updateduser.email,
    // 	name: updateduser.name,
    // 	img: updateduser.img,
    // 	score: updateduser.score,
    // 	wins: updateduser.wins,
    // 	correctAns: updateduser.correctAns,
    // 	wrongAns: updateduser.wrongAns,
    // };

    return sendDataResponse(res, 200, user)
  } catch (e) {
    return sendMessageResponse(res, 500, 'could not update user')
  }
}
