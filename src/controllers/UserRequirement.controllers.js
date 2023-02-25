// @ts-nocheck
import UserRequirementModel from "../models/UserRequirement.models.js";
import ProjectModel from "../models/Project.models.js";

export const createUserRequirement = async (req, res) => {
  // Get all fields from the request body and request query
  const { userId, projectId } = req.query;
  const { requirement, source } = req.body;

  //   Check if user id and project id were provided
  if (!userId || !projectId) {
    return res.status(409).json({
      message:
        "Both the user id and project id are needed to perform this operation.",
    });
  }

  //   Validate field for empty strings / null values
  if (!requirement || !source) {
    return res
      .status(409)
      .json({ message: "Please fill in the missing fields!" });
  }

  try {
    // Check if project exists and belongs to the user
    let projectExists = await ProjectModel.findOne({
      _id: projectId,
      owner: userId,
    });
    if (!projectExists) {
      return res.status(403).json({
        message: `Invalid action! This project does not exist or does not belong to you!`,
      });
    }

    // check if requirement exists with the details provided
    const requirementExists = await UserRequirementModel.findOne({
      requirement,
      user: userId,
      project: projectId,
    });

    if (requirementExists) {
      return res.status(409).json({
        message: `This user requirement already exists`,
      });
    }

    // Create a new user requirement
    const userRequirement = new UserRequirementModel({
      requirement,
      source,
      user: userId,
      project: projectId,
    });

    console.log("After create userRequirement:", userRequirement);

    // Save the userRequirement to the database
    await userRequirement.save();

    // TO-DO: Add requirement to project with the same id
    const addedUserRequirementToProject = await ProjectModel.findOne({
      _id: projectId,
      owner: userId,
    });

    if (!addedUserRequirementToProject) {
      return res.status(403).json({
        message: `Invalid action! This project does not exist or does not belong to you!`,
      });
    }

    addedUserRequirementToProject?.userRequirements?.push(userRequirement._id);
    console.log(
      "PROJECTTTT=====:",
      addedUserRequirementToProject?.userRequirements
    );
    await addedUserRequirementToProject.save();

    console.log("AFTER SAVING REQUIREMENT TO PROJECT");

    // Return a success message with the new user requirement created
    return res.status(201).json({
      message: "User requirement added successufully!",
      data: userRequirement,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};

export const getUserRequirements = async (req, res) => {
  try {
    // Query database for all user requirement
    const userRequirements = await UserRequirementModel.find().populate(
      "systemRequirements"
    );
    console.log("DOWN HERE");
    // Return success message with all user requirements
    res.status(200).json({
      message: "Fetched all user requirements",
      data: userRequirements,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error?.message,
    });
  }
};

export const getUserRequirementById = async (req, res) => {
  // Get user id from request params
  const { userRequirementId } = req.params;
  const { userId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!userRequirementId) {
    return res.status(409).json({
      message:
        "A user requirement id must be provided in the request params to perform this operation.",
    });
  }
  //   Validate field for empty strings / null values
  if (!userId || !projectId) {
    return res.status(409).json({
      message:
        "Both the user id and project id must be provided in the request query to perform this operation.",
    });
  }

  try {
    // Query database for the user requirement
    const userRequirement = await UserRequirementModel.findOne({
      _id: userRequirementId,
      project: projectId,
      user: userId,
    }).populate("systemRequirements");

    //   Validate field for empty strings / null values
    if (!userRequirement) {
      return req.status(404).json({
        message: `User requirement does not exist.`,
      });
    }

    // Return success message with all users
    res
      .status(200)
      .json({ message: "Fetched user requirement", data: userRequirement });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const updateUserRequirement = async (req, res) => {
  // Get user id from the request params
  const { userRequirementId } = req.params;
  const { userId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!userRequirementId) {
    return res.status(409).json({
      message:
        "A user requirement id must be provided in the request params to perform this operation.",
    });
  }
  //   Validate field for empty strings / null values
  if (!userId || !projectId) {
    return res.status(409).json({
      message:
        "Both the user id and project id must be provided in the request query to perform this operation.",
    });
  }

  try {
    // Check if any user with the provided user id exists
    let userRequirement = await UserRequirementModel.findOneAndUpdate(
      { _id: userRequirementId, user: userId, project: projectId },
      { ...req.body }
    );
    if (!userRequirement) {
      return res.status(404).json({
        message: `Invalid operation. This user does not exist!`,
      });
    }

    let updatedUserRequirement = await UserRequirementModel.findOne({
      _id: userRequirementId,
    });

    // Return a success message with the new user created
    res.status(201).json({
      message: "Your user requirement has been updated!",
      data: updatedUserRequirement,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};

export const deleteUserRequirement = async (req, res) => {
  // Get user id from the request params
  const { userRequirementId } = req.params;
  const { userId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!userRequirementId) {
    return res.status(409).json({
      message:
        "A user requirement id must be provided in the request params to perform this operation.",
    });
  }
  //   Validate field for empty strings / null values
  if (!userId || !projectId) {
    return res.status(409).json({
      message:
        "Both the user id and project id must be provided in the request query to perform this operation.",
    });
  }

  try {
    // Check if any user with the provided email already exists
    let userRequirement = await UserRequirementModel.findOneAndDelete({
      _id: userRequirementId,
      user: userId,
      project: projectId,
    });
    if (!userRequirement) {
      return res.status(403).json({
        message: "Invalid action! This project does not belong to you.",
      });
    }

    // Return a success message
    res.status(201).json({
      message: "User requirement deleted successufully!",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};
