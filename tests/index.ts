import dotenv from 'dotenv'
import mal from '../src/'
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID || ''
const CLIENT_SECRET = process.env.CLIENT_SECRET || ''

const test = async () => {
  const challenge = await mal.generatePCKE()
  console.log('CHALLENGE KEY', challenge)

  const authURL = await mal.generateAuthURL(CLIENT_ID, challenge)
  console.log('CALLBACK URL', authURL)

  // const response = await authorize(
  //   CLIENT_ID,
  //   CLIENT_SECRET,
  //   challenge,
  //   inputCcode
  // )
  // console.log('AUTH ACCESS', response)

  const client = mal.createClient({ clientId: CLIENT_ID })

  const animes = await client
    .getAnime({ q: 'Jujutsu Kaisen' })
    .catch((err) => console.log(err))

  console.log('RESULT', animes && animes?.data)
}

const testObj = {
  name: 'KL',
  funcTest: () => console.log('hey'),
}

console.log(testObj)
console.log(JSON.stringify(testObj))

console.log('HEYYY', mal)
test()
