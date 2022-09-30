import dbClient from '../utils/dbClient.js'

export default async function getUsersFromDb() {
  const usersFromDb = await dbClient.user.findMany({})

  const formattedUsers = usersFromDb.map((user) => {
    const formattedUser = {
      id: user.id,
      googleId: user.googleId,
      email: user.email,
      name: user.name,
      img: user.img,
      score: user.score,
      wins: user.wins,
      correctAns: user.correctAns,
      wrongAns: user.wrongAns,
    }
    return formattedUser
  })

  return formattedUsers
}
