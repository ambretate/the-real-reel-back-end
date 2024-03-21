# The Real Reel Back End

## Overview

Movie Reviewer is a web platform dedicated to movie enthusiasts who want to share their thoughts, opinions, and reviews about their favorite (or least favorite) films. It provides a space for users to create personalized profiles, follow other users, and engage in discussions about movies.

## ERD

![Imgur](https://i.imgur.com/ygkbMdA.png)

## Schemas
### Movie Model
- `"title"`: Title of movie
- `"genre"`: Genre of movie
- `"image"`: Movie poster
- `"description"`: Brief description of movie
- `"releaseDate"`: Date released
- `"runtime"`: Runtime of movie in minutes
- `"budget"`: Budget for movie

### User Model
- `"username"`: User's username
- `"email"`: User's Email(must be in email format)
- `"password_digest"`: User's hashed password
- `"profilePicture"`: User's profile picture

### Review Model
- `"userID"`: ID of user writing the review
- `"movieID"`: ID of the movie the user is reviewing
- `"title"`: Summarization of review
- `"review"`: Review of movie
- `"hasSpolers"`: Lets reader know if the review contains spoilers(Boolean)

## Endpoints
### /movies

| HTTP Method | Route                      | Controller Function     |
|-------------|----------------------------|-------------------------|
| GET         | /                          | getMovies               |
| GET         | /:id                       | getMovie                |
| GET         | /title/:title              | getMoviesByTitle        |
| GET         | /genre/:genre              | getMoviesByGenre        |
| POST        | /                          | createMovie             |
| PUT         | /:id                       | updateMovie             |
| DELETE      | /:id                       | deleteMovie             |

### /review

| HTTP Method | Route                      | Controller Function  |
|-------------|----------------------------|----------------------|
| GET         | /:id                       | getReview            |
| POST        | /                          | createReview         |
| PUT         | /:id                       | updateReview         |
| DELETE      | /:id                       | deleteReview         |

### /user

| HTTP Method | Route                        | Controller Function   |
|-------------|------------------------------|-----------------------|
| POST        | /sign-up                     | signUp                |
| POST        | /sign-in                     | signIn                |
| GET         | /verify                      | verify                |
| GET         | /follows                     | getFollows            |
| GET         | /timeline                    | getUserTimeline       |
| PUT         | /follow/:followedUserId      | updateFollowings      |
| GET         | /                            | getUsers              |
| GET         | /email/:email                | getUserByEmail        |
| GET         | /username/:username          | getUserByUsername     |
| GET         | /:id                         | getUser               |
| PUT         | /:id                         | updateUser            |
| DELETE      | /:id                         | deleteUser            |

## How to use

If you want to use this API follow these instructions:

- Fork and clone repository
```
npm i
```
- This is to install all necessary dependencies

```
npm run db:seed
```
- This will run the seed file and create a local database

```
npm run dev
```
- This will run the server so you can see the information on the local host

```
http://localhost:3017/api/
```
- This will show you all of the data available in the API

## Authors

[semi](https://github.com/liliaji)

[ambre](https://github.com/ambretate)

[zack](https://github.com/zackcinal)

[jeremy](https://github.com/jwow1000)

[niles](https://github.com/nilestoomer)