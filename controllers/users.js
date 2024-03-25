import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Review from "../models/Review.js";

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
    const user = await User.findOne({ username });

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
    const user = await User.findOne({ email });

    if (user) {
      return response.json(user);
    }

    response.status(404).json({ message: "user not found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

// Make sure to check token first
export const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { username, password, passwordConfirmation } = request.body;

    let user;

    if (password) {
      const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
      request.body = `"password_digest": ${password_digest}`;
      user = await User.findByIdAndUpdate(id, request.body).select(
        "username email password_digest"
      );
    } else {
      user = await User.findByIdAndUpdate(id, request.body).select(
        "username email password_digest"
      );
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000),
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    response.status(201).json({ token });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

// Make sure to check token first
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
    const { username, email, password, profilePicture } = request.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      username,
      email,
      password_digest,
      profilePicture, 
      following: [],
      followers: [],
    });

    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      exp: parseInt(exp.getTime() / 1000),
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    response.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ error: error.message });
  }
};


export const signIn = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email }).select(
      "username email password_digest"
    );

    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
      };

      const token = jwt.sign(payload, TOKEN_KEY);
      response.status(201).json({ token });
    } else {
      response.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: error.message });
  }
};

export const verify = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    console.log(payload);
    if (payload) {
      response.json(payload);
    }
  } catch (error) {
    console.log(error.message);
    response.status(401).send("Not Authorized");
  }
};

export const getFollows = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);

    if (payload) {
      const follows = await User.findById(payload.id)
        .select("followers following")
        .populate("followers following");
      response.json(follows);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const getUserTimeline = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);

    if (payload) {
      const user = await User.findById(payload.id).select("following");
      console.log(user);

      const timelinePromises = user.following.map((followedUser) => {
        return Review.findOne({ userID: followedUser._id })
          .sort({ createdAt: -1 })
          .populate("userID movieID");
      });

      const timeline = await Promise.all(timelinePromises);

      const filteredTimeline = timeline.filter((review) => review != null);

      response.json(filteredTimeline);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};

export const updateFollowings = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);

    if (payload) {
      const currentUserId = payload.id;
      const { followedUserId } = request.params;

      await User.findByIdAndUpdate(currentUserId, {
        $addToSet: { following: followedUserId },
      });
      await User.findByIdAndUpdate(followedUserId, {
        $addToSet: { followers: currentUserId },
      });

      response.json({ message: "Followed Successfully" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: error.message });
  }
};
