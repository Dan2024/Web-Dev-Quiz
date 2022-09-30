import dbClient from '../utils/dbClient.js'

export default async function getUserFromDb(id) {
  const updateduser = await dbClient.user.findUnique({
    where: { id },
  })

  const user = {
    id: updateduser.id,
    googleId: updateduser.googleId,
    email: updateduser.email,
    name: updateduser.name,
    img: updateduser.img,
    score: updateduser.score,
    wins: updateduser.wins,
    correctAns: updateduser.correctAns,
    wrongAns: updateduser.wrongAns,
  }
  return user
}
