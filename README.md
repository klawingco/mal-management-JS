# MAL Management JS

> Note: This repo is still in work on progress and code quality is for `MVP`.

At first with the roll out of new MAL v2 api, I just want to play around th api itself however I find it inconvenient to do different call to each of items I needed off the api. 

These is heavily inspired from contentful-management-js, and actually created because I want to manage my anime using a globally installed `CLI` . But in order to create a cli, A good wrapper is firstly needed hence this project is born.

Current Features available
- Public Anime
- Public Manga
- Public Forum
- User Profile (Currently Authenticated) 

# Usage

1. [Instantiating the Client](#instantiating-the-client)
2. [Anime List](#getting-anime-list)
3. [Anime Detail](#getting-anime-detail)
4. [Anime Ranking List](#getting-anime-ranking-list)
5. [Seasonal Anime List ](#getting-seasonal-anime-list)
6. [Manga List](#getting-manga-list)
7. [Manga Detail](#getting-manga-detail)
8. [Manga Ranking List](#getting-manga-ranking-list)
9. [Forum Boards List](#getting-main-forum-boards)
10. [Forum Topics List](#getting-forum-topics)
11. [Forum Topic Detail](#getting-forum-topic-detail)
12. [User Profile](#getting-user-profile)

## Instantiating the Client

For accessing public data only
```javascript
import mal from 'mal-management-js'
...
const client = mal.createClient({
  clientId: CLIENT_ID
})
```

If you need to use authenticated api endpoints.
```javascript
import mal from 'mal-management-js'
...
const client = mal.createClient({
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

## Getting Main Forum Boards
This will return all of Main Forum Boards Categories

```typescript
const forumBoards: ForumBoardCategory[] = await client.getForumBoard();
```

> Note that at the moment MAL only return `Main Boards`. Hence reason that `Subboards` is not yet available.

<br/>

## Getting Forum Topics (or Board Topics)

This will query against all Board Topics
```typescript
const forumTopics = await client.getForumTopics({
  q: "love"
})
```
If you want to specify a board or a subboard

```typescript
const forumTopics = await client.getForumTopics({
  board_id: 2,
  subboard_id: 3,
  q: "love"
})
```
<details>
<summary>Full Configuration Options (ForumTopicOptions)</summary>
<p>

| Options  | Descriptions |
| ------------- | ------------- |
| board_id  | Id of the board topic you want to search against  |
| subboard_id  | Id of the subboard topic  you want to search against  |
| sort  | MAL only has `recent` available at the moment  |
| q  | Search String  |
| topic_user_name  | Use to filter using topic_user_name  |
| user_name  | Use to filter using user_name that participated |
| limit  | |
| offset  | |

</p>
</details>

<br/>

## Getting Forum Topic Detail
This gives details about all of posts, poll and title related to the topic 

Similar to Anime and Manga, you could also get a injected `getDetail()` to each of instances of Forum Topic

```typescript
const forumTopics = await client.getForumTopics({
  q: "love"
})
const oregairu = await forumTopics[0].getDetail()
```

Or if you have the `topic id`

```typescript
  const forumDetail = await client.getForumTopicDetail({
    id: 614681, //topic id
    limit: 10,
  })
  console.log('OreGairu ', forumDetail)  
```
<details>
<summary>Full Configuration Options (ForumTopicDetailOptions)</summary>

<p>

| Options  | Descriptions |
| ------------- | ------------- |
| id  | Id of the topic.  |
| limit  | Pagination |
| offset  | Pagination |

</p>
</details>
<br/>

## Getting User Profile 

> **AUTHENTICATION NEEDED !**  Client must be instantiated with `accessToken` option.

This will get the user's profile. 
```typescript
const userProfile = await client.getUserProfile()
```
Or if you want to specify additional user fields

```typescript
const userProfile = await client.getUserProfile({
  // Using TS enums
  fields: [UserFields.anime_statistics, UserFields.is_supporter, UserFields.time_zone]
  // Works also using string
  // fields: ['anime_statistics', 'is_supporter', 'time_zone']
})
```
> Note: Only the current Authenticated user are allowed to get profile. No official endpoint yet are available for public profile.

<br/>

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
client.getAnimeDetail({id: 30276}).getCharacters()
```


<br/>

## LICENSE
MIT

