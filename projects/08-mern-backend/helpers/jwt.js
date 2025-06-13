import jwt from 'jsonwebtoken'

export const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          console.error('Error generating JWT:', err)
          reject(new Error('Error generating JWT'))
        }

        resolve(token)
      }
    )
  })
}
