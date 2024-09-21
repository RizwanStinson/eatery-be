import { Request, Response } from "express";
import User from "../../models/userModel/userModel";
import Organization from "../../models/organizations/organizationModel";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "";

export async function signup(req: Request, res: Response) {
  const {
    firstName,
    lastName,
    organizationName,
    userType,
    email,
    phone,
    password,
  } = req.body;

  try {
    let org = await Organization.findOne({
      organizationName: organizationName,
    });
    if (!org) {
      org = await Organization.create({ organizationName: organizationName });
      console.log(`Created new organization: ${organizationName}`);
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .send({ error: "409", message: "User already exists" });
    }

    if (!password) throw new Error("Password is required");
    const hashedPassword = await hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      organizationName,
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
    res.status(400).json({ error: "400", message: "Could not create user" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password, organizationName, userType } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .send({ error: "401", message: "Email or password is incorrect." });
    }

    const validatePass = await compare(password, user.password);
    if (!validatePass) {
      return res
        .status(401)
        .send({ error: "401", message: "Email or password is incorrect." });
    }

    // Validate organization name
    if (user.organizationName !== organizationName) {
      return res
        .status(403)
        .send({ error: "403", message: "Invalid organization." });
    }

    // Validate user type
    if (user.userType !== userType) {
      return res
        .status(403)
        .send({ error: "403", message: "Invalid user type." });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        organizationName: user.organizationName, // Changed to string
        userType: user.userType,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

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
