import Follow from "../models/Follow.js";

export const getFollows = async (request, response) => {
    try {
        const follows = await Follow.find();
        response.json(follows);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const getFollow = async (request, response) => {
    try {
        const { id } = request.params;
        const follow = await Follow.findById(id)

        if (follow) {
            return response.json(follow);
        }

        response.status(404).json({ message: "Follow not found" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const createFollow = async (request, response) => {
    try{
    const follow = new Follow(request.body);
    await follow.save();
    response.status(201).json(follow);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const updateFollow = async (request, response) => {
    try {
        const { id } = request.params;
        const follow = await Follow.findByIdandUpdate(id, request.body);
        response.status(201).json(follow);
    }  catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteFollow = async (request, response) => {
    try {
        const { id } = request.params;
        const deleted = await Follow.findByIdAndDelete(id);

        if (deleted) {
            return response.status(200).send("Follow deleted!");
        }

        throw new Error("Follow not found!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
};