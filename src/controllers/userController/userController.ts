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
      name: new RegExp(`^${organizationName}$`, "i"),
    });
    if (!org) {
      org = await Organization.create({ name: organizationName });
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
      organization: org._id,
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
    const user = await User.findOne({ email: email })
      .populate("organization")
      .exec();
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
    const org = await Organization.findById(user.organization);
    if (!org || org.name !== organizationName) {
      return res
        .status(403)
        .send({ error: "403", message: "Invalid organization." });
    }

    if (user.userType !== userType) {
      return res
        .status(403)
        .send({ error: "403", message: "Invalid user type." });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        organization: org._id,
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
