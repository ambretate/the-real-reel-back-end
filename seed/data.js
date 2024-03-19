import db from "../db/connection.js";
import User from "../models/User.js";
import usersData from "./users.json" assert { type: "json" };
import Follow from "../models/Follow.js";
import followsData from "./follows.json" assert { type: "json" };
import Movie from "../models/Movie.js";
import movieData from "./movies.json" assert { type: "json" };
import Review from "../models/Review.js";
import reviewData from "./reviews.json" assert { type: "json" };

import chalk from "chalk";

const insertData = async () => {
  await db.dropDatabase();

  await User.create(usersData);
  await Follow.create(followsData);
  await Movie.create(movieData);
  await Review.create(reviewData);

  console.log(chalk.cyanBright("stuff has created"));

  await db.close();
};

insertData();
