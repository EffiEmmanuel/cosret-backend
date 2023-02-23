// @ts-nocheck
import { jwtSign } from "../helpers/auth.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import AdminModel from "../models/Admin.models.js";

export const createAdmin = async (req, res) => {
  console.log("REQ.BODY:", req.body);
  // Get all fields from the request body
  const { email, username, password } = req.body;

  //   Validate field for empty strings / null values
  if (!email || !username || !password) {
    return req
      .status(409)
      .json({ message: "Please fill in the missing fields!" });
  }

  try {
    // Check if any admin with the provided email already exists
    let adminExistsWithEmail = await AdminModel.findOne({ username });
    if (adminExistsWithEmail) {
      return res.status(409).json({
        message: `An account with username (${username}) already exists`,
      });
    }

    // check if admin exists with the username provided
    const adminExistsWithUsername = await AdminModel.findOne({ username });
    if (adminExistsWithUsername) {
      return res.status(409).json({
        message: `An account with username (${username}) already exists`,
      });
    }

    // If the admin does not exist, hash the password
    const hashedPassword = hashPassword(password);
    console.log("After hash password:", hashedPassword);

    // Create a new admin
    const admin = new AdminModel({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await admin.save();

    // Return a success message with the new admin created
    return res.status(201).json({
      message: "Your admin account has been created successufully!",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};

export const getAdminAccounts = async (req, res) => {
  console.log("OVER HERE");
  try {
    // Query database for all admins
    const admins = await AdminModel.find();
    console.log("DOWN HERE");
    // Return success message with all admins
    res.status(200).json({ message: "Fetched all admins", data: admins });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const getAdminById = async (req, res) => {
  // Get admin id from request params
  const { adminId } = req.params;

  //   Validate field for empty strings / null values
  if (!adminId) {
    return req.status(409).json({
      message: "A admin id must be provided to perform this operation.",
    });
  }

  try {
    // Query database for all admins
    const admin = await AdminModel.findById(adminId);

    //   Validate field for empty strings / null values
    if (!admin) {
      return req.status(404).json({
        message: `admin with id (${adminId}) does not exist.`,
      });
    }

    // Return success message with all admins
    res.status(200).json({ message: "Fetched admin", data: admin });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const getAdminByUsername = async (req, res) => {
  // Get username from request params
  const { username } = req.params;

  //   Validate field for empty strings / null values
  if (!username) {
    return req.status(409).json({
      message: "A username must be provided to perform this operation.",
    });
  }

  try {
    // Query database for all admins
    const admin = await AdminModel.findOne({ username }).populate("projects");

    //   Validate field for empty strings / null values
    if (!admin) {
      return req.status(404).json({
        message: `Admin with username (${username}) does not exist.`,
      });
    }

    // Return success message with all admins
    res.status(200).json({ message: "Fetched admin", data: admin });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const updateAdminUsername = async (req, res) => {
  // Get admin id from the request params
  const { adminId } = req.params;

  //   Validate field for empty strings / null values
  if (!adminId) {
    return req.status(409).json({
      message: "A admin id must be provided to perform this operation.",
    });
  }

  try {
    // Check if any admin with the provided admin id exists
    let admin = await AdminModel.findOneAndUpdate(
      { _id: userId },
      { ...req.body }
    );
    if (!user) {
      return res.status(404).json({
        message: `Invalid operation. This user does not exist!`,
      });
    }

    let updatedAdmin = await AdminModel.findOne({ _id: adminId });

    // Return a success message with the new admin created
    res.status(201).json({
      message: "Your details have been updated successufully!",
      data: updatedAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const deleteAdminAccount = async (req, res) => {
  // Get admin id from the request params
  const { adminId } = req.params;

  //   Validate field for empty strings / null values
  if (!adminId) {
    return req.status(409).json({
      message: "A admin id must be provided to perform this operation.",
    });
  }

  try {
    // Check if any admin with the provided email already exists
    let admin = await AdminModel.findOneAndDelete({ _id: adminId });
    if (!admin) {
      return res.status(404).json({
        message: "Invalid admin id provided. This admin does not exist.",
      });
    }

    // Return a success message
    res.status(201).json({
      message: "Admin account deleted successufully!",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const loginAdmin = async (req, res) => {
  // Get login credentials
  const { username, password } = req.body;

  console.log("OVER HERE:", req.body);
  try {
    const adminExists = await AdminModel.findOne({ username });

    if (!adminExists) {
      return res
        .status(404)
        .json({ message: `No account with username (${username}) exists.` });
    }

    const isPasswordCorrect = comparePassword(password, adminExists.password);

    if (!isPasswordCorrect) {
      return res
        .status(409)
        .json({ message: "Invalid username or password provided." });
    }

    // TO-DO: Send OTP to admin email
    const token = await jwtSign({ adminExists });

    res.status(200).json({ message: "Log in successful!", data: token });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: error,
    });
  }
};
