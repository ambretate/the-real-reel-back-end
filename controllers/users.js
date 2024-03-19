import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

let SALT_ROUNDS = 11;
let TOKEN_KEY = "thisisagoodkeyright";

if (process.env.NODE_ENV === "production") {
    SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    TOKEN_KEY = process.env.TOKEN_KEY;
}

const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

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
    const user = await User.findById(id);

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
    const user = await User.findOne(username);

    if (user) {
      return response.json(user);
    }

    response.status(404).json({ message: "user not found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const getUserByEmail = async (request, response) => {
  try {
    const { email } = request.params;
    const user = await User.findOne(email);

    if (user) {
      return response.json(user);
    }

    response.status(404).json({ message: "user not found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
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
  } catch (error) {
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

export const signUp = async (request, response) => {
    try {
        const { username, email, password } = req.body;
        const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new User ({
            username,
            email,
            password_digest,
        });

        await user.save();

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
            exp: parseInt(exp.getTime() / 1000),
        }

        const token = jwt.sign(payload, TOKEN_KEY);
        response.status(201).json({ token });
    } catch (error) {
        console.log(error.message);
        response.status(400).json( {error: error.message });
    }
};

export const signIn = async (request, response)
