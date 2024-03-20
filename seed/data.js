import db from "../db/connection.js"
import User from "../models/User.js"
import usersData from "./users.json" assert { type: "json" }
import Follow from "../models/Follow.js"
import followsData from "./follows.json" assert { type: "json" }
// import Reviews from "../models/Review.js"
// import reviewsData from "./reviews.json" assert { type: "json" }
import Movie from "../models/Movie.js"
import moviesData from "./movies.json" assert { type: "json" }
import chalk from "chalk"

const insertData = async () => {

    await db.dropDatabase()

    await User.create(usersData)
    await Follow.create(followsData)
    // await Review.create(reviewsData)
    await Movie.create(moviesData)

    console.log(chalk.cyanBright("stuff has created"))

    await db.close()
}

insertData()