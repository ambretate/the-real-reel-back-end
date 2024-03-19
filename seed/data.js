import db from "../db/connection.js"
import User from "../models/User.js"
import usersData from "./users.json" assert { type: "json" }
import Follow from "../models/Follow.js"
import followsData from "./follows.json" assert { type: "json" }
import chalk from "chalk"

const insertData = async () => {

    await db.dropDatabase()

    await User.create(usersData)
    await Follow.create(followsData)

    console.log(chalk.cyanBright("stuff has created"))

    await db.close()
}

insertData()