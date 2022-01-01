import axios from 'axios'
import crypto from 'crypto'
import { MAL_AUTH_URL } from '../../constants'
import { queryfyObj } from '../../util/index'
import {
  ResponseType,
  CodeChallengeMethod,
  GrantType,
} from '../../types/oauth2'

const generatePCKE = () =>
  new Promise<string>((resolve, reject) =>
    crypto.randomBytes(64, (err, buffer) => {
      if (buffer) {
        resolve(buffer.toString('hex'))
      } else if (err) {
        reject('Can`t generate PCKE')
      }
    })
  )

const generateAuthURL = async (
  clientId: string,
  codeChallenge?: string
): Promise<string> =>
  `${MAL_AUTH_URL}?${queryfyObj({
    client_id: clientId,
    response_type: ResponseType.Code,
    code_challenge: codeChallenge ? codeChallenge : await generatePCKE(),
    code_challenge_method: CodeChallengeMethod.Plain,
  })}`

const authorize = async (
  clientId: string,
  clientSecret: string,
  codeChallenge: string,
  callbackAuthcode: string
) =>
  axios.get(MAL_AUTH_URL, {
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      code_verifie: codeChallenge,
      code: callbackAuthcode,
      grant_type: GrantType.AuthorizationCode,
    },
  })

export { generatePCKE, generateAuthURL, authorize }
export default { generatePCKE, generateAuthURL, authorize }
