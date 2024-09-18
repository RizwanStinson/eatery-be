import { Request, Response } from "express";
import User from "../../models/userModel/userModel";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "";

// Signup function (unchanged)
export async function signup(req: Request, res: Response) {
  const {
    firstName,
    lastName,
    organization,
    userType,
    email,
    phone,
    password,
  } = req.body;

  try {
    // Check if user with the same email already exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .send({ error: "409", message: "User already exists" });
    }

    if (!password) throw new Error("Password is required");

    // Hash the password before saving
    const hashedPassword = await hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      organization,
      userType,
      email,
      phone,
      password: hashedPassword,
    });

    return res
      .status(201)
      .send({ message: "User created successfully", newUser });
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(400).json({ error, message: "Could not create user" });
  }
}

// Login function with organization and usertype validation
export async function login(req: Request, res: Response) {
  const { email, password, organization, userType } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .send({ error: "401", message: "Email or password is incorrect." });
    }

    // Validate password
    const validatePass = await compare(password, user.password);
    if (!validatePass) {
      return res
        .status(401)
        .send({ error: "401", message: "Email or password is incorrect." });
    }

    // Validate organization and usertype
    if (user.organization !== organization) {
      return res
        .status(403)
        .send({ error: "403", message: "Invalid organization." });
    }

    if (user.userType !== userType) {
      return res
        .status(403)
        .send({ error: "403", message: "Invalid user type." });
    }

    // Generate JWT token with userId, email, organization, and usertype
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        organization: user.organization,
        usertype: user.userType,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return the token and a success message
    return res.status(200).send({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log("Error during login:", error);
    res
      .status(400)
      .send({ error: "400", message: "Error occurred during login" });
  }
}
