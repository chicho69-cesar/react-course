import jwt from 'jsonwebtoken'

export class JWT {
  static generateJWT(uid) {
    return new Promise((resolve, reject) => {
      const payload = { uid }

      jwt.sign(
        payload,
        process.env.JWT_KEY,
        {
          expiresIn: '31d'
        },
        (error, token) => {
          if (error) {
            console.error(error)
            reject('Error generating JWT')
          } else {
            resolve(token)
          }
        }
      )
    })
  }

  static verifyJWT(token) {
    try {
      const { uid } = jwt.verify(token, process.env.JWT_KEY)
      return [true, uid]
    } catch (error) {
      console.error(error)
      return [false, null]
    }
  }
}
