// @ts-nocheck
import { jwtSign } from "../helpers/auth.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import EngineerModel from "../models/Engineer.models.js";

export const createEngineer = async (req, res) => {
  // Get all fields from the request body
  const { firstName, lastName, email, password } = req.body;

  //   Validate field for empty strings / null values
  if (!firstName || !lastName || !email || !password) {
    return req
      .status(409)
      .json({ message: "Please fill in the missing fields!" });
  }

  try {
    // Check if any engineer with the provided email already exists
    let engineerExistsWithEmail = await EngineerModel.findOne({ email });
    if (engineerExistsWithEmail) {
      return res.status(409).json({
        message: `An account with email (${email}) already exists`,
      });
    }

    // If the engineer does not exist, hash the password
    const hashedPassword = hashPassword(password);

    // Create a new engineer
    const engineer = new EngineerModel({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await engineer.save();

    // Return a success message with the new engineer created
    return res.status(201).json({
      message: "Your account has been created successufully!",
      data: engineer,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};

export const getEngineers = async (req, res) => {
  try {
    // Query database for all engineers
    const engineers = await EngineerModel.find().populate("projects");
    // Return success message with all engineers
    res.status(200).json({ message: "Fetched all engineers", data: engineers });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const getEngineerById = async (req, res) => {
  // Get engineer id from request params
  const { engineerId } = req.params;

  //   Validate field for empty strings / null values
  if (!engineerId) {
    return req.status(409).json({
      message: "A engineer id must be provided to perform this operation.",
    });
  }

  try {
    // Query database for all engineers
    const engineer = await EngineerModel.findById(engineerId).populate(
      "projects"
    );

    //   Validate field for empty strings / null values
    if (!engineer) {
      return req.status(404).json({
        message: `Engineer with id (${engineerId}) does not exist.`,
      });
    }

    // Return success message with all engineers
    res.status(200).json({ message: "Fetched engineer", data: engineer });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const getEngineerByEmail = async (req, res) => {
  // Get engineer email from request params
  const { engineerEmail } = req.params;

  //   Validate field for empty strings / null values
  if (!engineerEmail) {
    return req.status(409).json({
      message: "A engineer email must be provided to perform this operation.",
    });
  }

  try {
    // Query database for all engineers
    const engineer = await EngineerModel.findOne({
      email: engineerEmail,
    }).populate("projectsAssignedTo");

    //   Validate field for empty strings / null values
    if (!engineer) {
      return req.status(404).json({
        message: `Engineer with email (${engineerEmail}) does not exist.`,
      });
    }

    // Return success message with all engineers
    res.status(200).json({ message: "Fetched engineer", data: engineer });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const updateEngineer = async (req, res) => {
  // Get engineer id from the request params
  const { engineerId } = req.params;

  //   Validate field for empty strings / null values
  if (!engineerId) {
    return req.status(409).json({
      message: "A engineer id must be provided to perform this operation.",
    });
  }

  try {
    // Check if any engineer with the provided engineer id exists
    let engineer = await EngineerModel.findOneAndUpdate(
      { _id: engineerId },
      { ...req.body }
    );
    if (!engineer) {
      return res.status(404).json({
        message: `Invalid operation. This engineer does not exist!`,
      });
    }

    let updatedEngineer = await EngineerModel.findOne({ _id: engineerId });

    // Return a success message with the new engineer created
    res.status(201).json({
      message: "Your details have been updated successufully!",
      data: updatedEngineer,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const deleteEngineer = async (req, res) => {
  // Get engineer id from the request params
  const { engineerId } = req.params;

  //   Validate field for empty strings / null values
  if (!engineerId) {
    return req.status(409).json({
      message: "A engineer id must be provided to perform this operation.",
    });
  }

  try {
    // Check if any engineer with the provided email already exists
    let engineer = await EngineerModel.findOneAndDelete({ _id: engineerId });
    if (!engineer) {
      return res.status(404).json({
        message: "Invalid engineer id provided. This engineer does not exist.",
      });
    }

    // Return a success message
    res.status(201).json({
      message: "Engineer account deleted successufully!",
      data: engineer,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const loginEngineer = async (req, res) => {
  // Get login credentials
  const { email, password } = req.body;

  try {
    const engineerExists = await EngineerModel.findOne({ email });
    if (!engineerExists) {
      return res
        .status(404)
        .json({ message: `No account with email (${email}) exists.` });
    }

    const isPasswordCorrect = comparePassword(
      password,
      engineerExists.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(409)
        .json({ message: "Invalid email or password provided." });
    }

    // TO-DO: Send OTP to email
    const token = await jwtSign({ engineerExists });

    res.status(200).json({ message: "Log in successful!", data: token });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: error,
    });
  }
};
