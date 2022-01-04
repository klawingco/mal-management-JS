// This is not a formal tests atmo
import dotenv from 'dotenv'
import mal from '../src/'
import { AnimeFields, MangaFields } from '../src/types'
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID || ''
const CLIENT_SECRET = process.env.CLIENT_SECRET || ''
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || ''

const testAnime = async () =>{
  const client = mal.createClient({
    clientId: CLIENT_ID,
    accessToken: ACCESS_TOKEN,
  })

  const animes = await client
    .getAnime({ q: 'Jujutsu Kaisen', fields: [] })
    .catch((err) => console.log(err))

  console.log('RESULT', animes && animes)
  if (animes) {
    const firstResult = animes[0]
    const animeDetail = await firstResult
      ?.getDetail({ fields: [AnimeFields.alternative_titles] })
      .catch((err) => console.log(err))
    console.log('ANIME DETAIL', animeDetail)
  }

  console.log('Individual anime detail')
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
      ranking_type: 'airing',
      fields: [AnimeFields.alternative_titles, AnimeFields.start_date],
    })
    .catch((err) => console.log(err))
  console.log('Airing', animeRanking)

  console.log('Seasonal Anime')
  const animeSeasonal = await client
    .getAnimeSeasonal({
      year: 2020,
      season: 'fall',
      sort: 'anime_score',
      fields: [AnimeFields.alternative_titles, AnimeFields.start_date],
    })
    .catch((err) => console.log(err))
  console.log('Seasonal', animeSeasonal)  
}

const testManga = async () =>{

  const client = mal.createClient({
    clientId: CLIENT_ID,
    accessToken: ACCESS_TOKEN,
  })

  const manga = await client
    .getManga({ q: 'Jujutsu Kaisen', fields: [] })
    .catch((err) => console.log(err))

  console.log('RESULT', manga && manga)

  const mangaDetailInner = await client
    .getManga({ q: 'Jujutsu Kaisen', fields: [] })

    console.log('HEYY', await mangaDetailInner[0].getDetail())
  
  console.log('Individual manga detail')
  const mangaDetail = await client
    .getMangaDetail({
      id: 2,
      fields: [
        MangaFields.mean,
        MangaFields.num_chapters,
        MangaFields.media_type,
        MangaFields['authors{first_name,last_name}'],
      ],
    })
    .catch((err) => console.log(err))
  console.log('Berserk', mangaDetail)  


  const mangaRanking = await client
    .getMangaRanking({
      ranking_type: 'manga',
      fields: [MangaFields['authors{first_name,last_name}']],
    })
    .catch((err) => console.log(err))
  console.log('Manga ranking', mangaRanking)
  
  
}
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

  // await testAnime()
  await testManga()



}

test()
