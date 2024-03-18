import db from "../db/connection.js"
import Team from "../models/Team.js"
import teamsData from "./teams.json" assert { type: "json" }
import chalk from "chalk"

const insertData = async () => {

    await db.dropDatabase()

    await Team.create(teamsData)

    console.log(chalk.cyanBright("stuff has created"))

    await db.close()
}

insertData()