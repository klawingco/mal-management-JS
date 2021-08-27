import dotenv from 'dotenv'
import { generateAuthURL, generatePCKE } from '../src/authentication'
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID || ''
const test = async () => {
  console.log('CLIENT ID', CLIENT_ID)
  const challenge = await generatePCKE()
  console.log(challenge)

  const authURL = await generateAuthURL(CLIENT_ID)
  console.log(authURL)
}

test()
