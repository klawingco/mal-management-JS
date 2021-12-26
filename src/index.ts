import Auth from './authentication'
import { IAuthorization } from './types'

interface IMAL extends IAuthorization {
  generatePCKE: () => Promise<string>
  generateAuthURL: (
    clientId: string,
    codeChallenge?: string | undefined
  ) => Promise<string>
  createClient: () => void
}

const mal = {
  ...Auth,
  createClient: () => console.log('hey'),
} as IMAL
export default mal
