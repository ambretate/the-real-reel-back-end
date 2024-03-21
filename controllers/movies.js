import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

export const getMovies = async (request, response) => {
  try {
    const movies = await Movie.find();
    response.json(movies);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const getMovie = async (request, response) => {
  try {
    const { id } = request.params;
    const movie = await Movie.findById(id);
    const reviews = await Review.find({ movieID: id })

    if (movie) {
      return response.json({movie, reviews});
    }
    
    response.status(404).json({ message: "Movie not found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const getMoviesByTitle = async (request, response) => {
  try {
    const movies = await Movie.find({ title: request.params.title });
    if (movies) {
      return response.json(movies);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const getMoviesByGenre = async (request, response) => {
  try {
    const movies = await Movie.find({ genre: request.params.genre });
    if (movies) {
      return response.json(movies);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const createMovie = async (request, response) => {
  try {
    const movie = new Movie(request.body);
    await movie.save();
    response.status(201).json(movie);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const updateMovie = async (request, response) => {
  try {
    const { id } = request.params;
    const movie = await Movie.findByIdAndUpdate(id, request.body);
    response.status(201).json(movie);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const deleteMovie = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await Movie.findByIdAndDelete(id);

    if (deleted) {
      return response.status(200).send("Movie deleted");
    }
    throw new Error("Movie not found");
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};
