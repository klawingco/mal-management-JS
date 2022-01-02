import dotenv from 'dotenv'
import mal from '../src/'
import { AnimeFields, AnimeRankingType } from '../src/types'
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID || ''
const CLIENT_SECRET = process.env.CLIENT_SECRET || ''
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || ''

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

  const client = mal.createClient({
    clientId: CLIENT_ID,
    accessToken: ACCESS_TOKEN,
  })

  const animes = await client
    .getAnime({ q: 'Jujutsu Kaisen', fields: [AnimeFields.start_date] })
    .catch((err) => console.log(err))

  console.log('RESULT', animes && animes)
  if(animes){
    const firstResult = animes[0]
    const animeDetail = await firstResult?.getDetail({fields: [AnimeFields.alternative_titles]})
    .catch(err => console.log(err))
    console.log('ANIME DETAIL', animeDetail)
  }


  console.log("Individual anime detail")
  const animeDetail = await client
    .getAnimeDetail({
      id: 30276,
      fields: [AnimeFields.alternative_titles, AnimeFields.start_date],
    })
    .catch((err) => console.log(err))
  console.log('One punch man', animeDetail)

  console.log('Airing Anime')
  const animeRanking = await client
    .getAnimeRanking({
      ranking_type: AnimeRankingType.airing,
      fields: [AnimeFields.alternative_titles, AnimeFields.start_date],
    })
    .catch((err) => console.log(err))
  console.log('Airing', animeRanking)  
}

// const testObj = {
//   name: 'KL',
//   funcTest: () => console.log('hey'),
// }

// console.log(testObj)
// console.log(JSON.stringify(testObj))

// console.log('HEYYY', mal)
test()
