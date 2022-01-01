# MAL Management JS

> Note: This repo is still in work on progress and code quality is for `MVP`.

At first with the roll out of new MAL v2 api, I just want to play around th api itself however I find it inconvenient to do different call to each of items I needed off the api. 

These is heavily inspired from contentful-management-js, and actually created because I want to manage my anime using a globally installed `CLI` . But in order to create a cli, A good wrapper is firstly needed hence this project is born.
# Usage

1. [Instantiating the Client](#instantiating-the-client)
2. [Getting Anime List](#getting-anime-list)
3. [Getting Anime Detail](#getting-anime-detail)

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

```javascript
  const animes = await client
    .getAnime({ q: 'Jujutsu Kaisen' })
```

Using Promise

```javascript
  const animes = client
    .getAnime({ q: 'Jujutsu Kaisen' }).then(animes => console.log(animes))
```
Both of approach mentioned can be chained with `.catch` for error busting and such.


## Getting Anime Detail

For example you just want to get the detail of the first result from `getAnime()`.
You could chain it like this

```javascript
  const animes = await client
    .getAnime({ q: 'Jujutsu Kaisen' })[0].getDetail()
```
You could also **configure** the fields you want to show using `field` options

```javascript
  const animes = await client
    .getAnime({ q: 'Jujutsu Kaisen' })[0].getDetail({fields: [...]})
```

**Alternatively** If you have the `id` of the anime, you could directly get the anime details using client


```javascript
const animeDetail = await client
.getAnimeDetail({
    id: 30276,
    fields: [AnimeFields.alternative_titles, AnimeFields.start_date],
})
```



## Gotchas
<hr/>

## About `fields` field

Fields are way to control what `fields` are going to be responsed by MAL API. 

At default `id, title, main_picture` will always be present regardless if you put it at `fields` or not.



## Future Plan
The aim of this is to be `Backend First`, while technically you can use this at Front end. The rationale was to create a wrapper tool to navigate and manage MyAnimeList via scripts and also ease the backend integration.

For example, if in `FUTURE` MAL officially release an api for a Anime's characters.

This wrapper could end with api of 

```javascript
client.getAnimeDetail({id: 30276}).getCharacters()
```


<br/>

## LICENSE
<hr/>
MIT

