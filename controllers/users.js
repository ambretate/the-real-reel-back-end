import { response } from "express";
import User from "../models/User.js";

export const getUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.json(users);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const getUser = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id)

        if (user) {
            return response.json(user);
        }

        response.status(404).json({ message: "user not found" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const getUserByUsername = async (request, response) => {
    try {
    const { username } = request.params;
    const user = await User.findOne(username)

    if (user) {
        return response.json(user)
    }

    response.status(404).json({ message: "user not found"});
} catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
}
};

export const getUserByEmail = async (request, response) => {
    try {
    const { email } = request.params;
    const user = await User.findOne(email)

    if (user) {
        return response.json(user)
    }

    response.status(404).json({ message: "user not found"});
} catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message })
}
};

export const createUser = async (request, response) => {
    try {
    const user = new User(request.body);
    await user.save();
    response.status(201).json(user);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const updateUser = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findByIdandUpdate(id, request.body);
        response.status(201).json(user);
    }  catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (request, response) => {
    try {
        const { id } = request.params;
        const deleted = await User.findByIdAndDelete(id);

        if (deleted) {
            return response.status(200).send("User deleted!");
        }

        throw new Error("User not found!");
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
      }
};