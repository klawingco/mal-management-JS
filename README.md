# MAL Management JS

> Note: This repo is still in work on progress and code quality is for `MVP`.

At first with the roll out of new MAL v2 api, I just want to play around th api itself however I find it inconvenient to do different call to each of items I needed off the api. 

These is heavily inspired from contentful-management-js, and actually created because I want to manage my anime using a globally installed `CLI` . But in order to create a cli, A good wrapper is firstly needed hence this project is born.

Current Features available
- Public Anime
- Public Manga

# Usage

1. [Instantiating the Client](#instantiating-the-client)
2. [Anime List](#getting-anime-list)
3. [Anime Detail](#getting-anime-detail)
4. [Anime Ranking List](#getting-anime-ranking-list)
5. [Seasonal Anime List ](#getting-seasonal-anime-list)
6. [Manga List](#getting-manga-list)
7. [Manga Detail](#getting-manga-detail)
8. [Manga Ranking List](#getting-manga-ranking-list)


## Instantiating the Client

For accessing public data only
```javascript
  import mal from 'mal-management-js'
  ...
  const client = mal.createClient({
    clientId: CLIENT_ID
  })
```

If you need to use interactable api
```javascript
  import mal from 'mal-management-js'
  ...
  const client = mal.createClient({
    clientId: CLIENT_ID,
    accessToken: ACCESS_TOKEN,
  })
```


## Getting Anime List

Using async await

```typescript
  const animes: Anime[] = await client
    .getAnime({ q: 'Jujutsu Kaisen', fields:[...] })
```

Using Promise

```javascript
  client
    .getAnime({ q: 'Jujutsu Kaisen' }).then(animes => console.log(animes))
```
Both of approach mentioned can be chained with `.catch` for error busting and such.


## Getting Anime Detail

For example you just want to get the detail of the first result from `getAnime()`.
You could chain it like this

```javascript
  const animes = await client
    .getAnime({ q: 'Jujutsu Kaisen' })
  const anime = await animes[0].getDetail({fields: [...]})    
```
You could also **configure** the fields you want to show using `fields` options

```javascript
  const animes = await client
    .getAnime({ q: 'Jujutsu Kaisen' })
  const anime = await animes[0].getDetail({fields: [...]})
```

**Alternatively** If you have the `id` of the anime, you could directly get the anime details using client


```javascript
const animeDetail = await client
.getAnimeDetail({
    id: 30276,
    // Using TS Enums
    fields: [AnimeFields.alternative_titles, AnimeFields.start_date], 
    // Or using string
    // fields:  ['alternative_titles', 'start_date']
})
```

## Getting Anime Ranking List

```javascript
  const animeRanking = await client
    .getAnimeRanking({
      ranking_type: 'airing', 
      fields: [AnimeFields.alternative_titles, AnimeFields.start_date],
    })
```
**Pro-tip:** If you are on typescript 
There's a exposed Typescript `Type` called `AnimeRankingType`
```typescript
type AnimeRankingType = 'all' | 'airing' |'upcoming' |'tv' |'ova' |'movie' | 'special' |'bypopularity' |'favorite'
```


## Getting Seasonal Anime List

```javascript
  const animeSeasonal = await client
    .getAnimeSeasonal({
      year: 2020,
      season: 'fall',
      sort: 'anime_score',
      fields: [AnimeFields.alternative_titles, AnimeFields.start_date],
    })
```
**Pro-tip:** If you are on typescript 
There's a exposed Typescript `Type` called `AnimeSeason` and `AnimeSortType`
```typescript
type AnimeSeason = 'winter' | 'spring' | 'summer' | 'fall'

type AnimeSortType = 'anime_score' | 'anime_num_list_users'
```

## Getting Manga List

Using async await

```typescript
  const mangas: Manga[] = await client
    .getManga({ q: 'Jujutsu Kaisen' })
```

Using Promise

```javascript
  client.getManga({ q: 'Jujutsu Kaisen' }).then(mangas => console.log(mangas))
```
Both of approach mentioned can be chained with `.catch` for error busting and such.
Specifiying `Fields` are also available.

## Getting Manga Detail

For example you just want to get the detail of the first result from `getManga()`.
You could chain it like this

```javascript
  const mangas = await client
    .getManga({ q: 'Jujutsu Kaisen' })
  const manga = mangas[0].getDetail()
```
You could also **configure** the fields you want to show using `fields` options

```javascript
  const mangas = await client
    .getManga({ q: 'Jujutsu Kaisen' })
  const manga =  mangas[0].getDetail({fields: [...]})
```

**Alternatively** If you have the `id` of the anime, you could directly get the anime details using client


```javascript
const mangaDetail = await client
.getMangaDetail({
    id: 30276,
    // Using TS Enums
    fields: [MangaFields.mean,
        MangaFields.num_chapters,
        MangaFields.media_type], 
    // Or using string
    // fields:  ['alternative_titles', 'start_date']
})

```


## Getting Manga Ranking List

```javascript
  const mangaRanking = await client
    .getMangaRanking({
      ranking_type: 'all', 
      fields: [...],
    })
```
**Pro-tip:** If you are on typescript 
There's a exposed Typescript `Type` called `MangaRankingType`
```typescript
export type MangaRankingType = 'all' | 'manga' | 'novels' | 'oneshots' |'doujin' | 'manhwa' | 'manhua' | 'bypopularity'| 'favorite'
```

## Gotchas

### About `fields` field

> Fields are way to control what `fields` are going to be responsed by MAL API. 

At default `id, title, main_picture` will always be present regardless if you put it at `fields` or not.


Another thing is some of the `field options` are only available to `details` endpoint
examples of such are
- picture
- background
- related_anime
- related_manga
- recommendations
- statistics

**User Fields**

There are also default Fields for User Profile that will always be present irregardless if you added it at `fields` options, namely.
- id
- name
- picture
- gender
- birthday
- joined_at
- location


### Future Plan
The aim of this is to be `Backend First`, while technically you can use this at Front end. The rationale was to create a wrapper tool to navigate and manage MyAnimeList via scripts and also ease the backend integration.

For example, if in `FUTURE` MAL officially release an api for a Anime's characters.

This wrapper could end with api of 

```javascript
client.getAnimeDetail({id: 30276}).characters()
```


<br/>

## LICENSE
MIT

