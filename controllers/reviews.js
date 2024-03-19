import Review from "../models/Review.js";

export const getReviews = async (request, response) => {
    try {
        const reviews = await Review.find();
        response.json(reviews);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const getReview = async (request, response) => {
    try {
        const { id } = request.params;
        const review = await Review.findById(id)

        if (review) {
            return response.json(review);
        }

        response.status(404).json({ message: "review not found" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const createReview = async (request, response) => {
    try{
    const review = new Review(request.body);
    await review.save();
    response.status(201).json(review);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const updateReview = async (request, response) => {
    try {
        const { id } = request.params;
        const review = await Review.findByIdandUpdate(id, request.body);
        response.status(201).json(review);
    }  catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteReview = async (request, response) => {
    try {
        const { id } = request.params;
        const deleted = await Review.findByIdAndDelete(id);

        if (deleted) {
            return response.status(200).send("Review deleted!");
        }

        throw new Error("Review not found!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
};