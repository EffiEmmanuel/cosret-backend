// @ts-nocheck
import UserRequirementModel from "../models/UserRequirement.models.js";
import ProjectModel from "../models/Project.models.js";
import SystemRequirementModel from "../models/SystemRequirement.models.js";

export const createSystemRequirement = async (req, res) => {
  // Get all fields from the request body and request query
  const { engineerId, userRequirementId, projectId } = req.query;
  const { requirement } = req.body;

  //   Check if engineer id and project id were provided
  if (!engineerId || !userRequirementId || !projectId) {
    return res.status(409).json({
      message:
        "Both the engineer id, user requirement id and project id are needed to perform this operation.",
    });
  }

  //   Validate field for empty strings / null values
  if (!requirement) {
    return res
      .status(409)
      .json({ message: "Please fill in the missing fields!" });
  }

  try {
    // Check if project exists and belongs to the engineer
    let projectExists = await ProjectModel.findOne({
      _id: projectId,
      engineerAssigned: engineerId,
    });

    if (!projectExists) {
      return res.status(403).json({
        message: `Invalid action! This project does not exist or was not assigned to you!`,
      });
    }

    // check if requirement exists with the details provided
    const requirementExists = await SystemRequirementModel.findOne({
      requirement,
      engineer: engineerId,
      project: projectId,
      userRequirement: userRequirementId,
    });

    if (requirementExists) {
      return res.status(409).json({
        message: `This sustem requirement already exists unde rthe specified user requirement`,
      });
    }

    // Create a new user requirement
    const systemRequirement = new UserRequirementModel({
      requirement,
      user: engineerId,
      project: projectId,
      userRequirement: userRequirementId,
    });

    // Save the userRequirement to the database
    await systemRequirement.save();

    // TO-DO: Add requirement to project with the same id
    const addedSystemRequirementToProject = await ProjectModel.findOne({
      _id: projectId,
      engineerAssigned: engineerId,
    });

    if (!addedSystemRequirementToProject) {
      return res.status(403).json({
        message: `Invalid action! This project does not exist or was not assigned to you!`,
      });
    }

    addedSystemRequirementToProject?.systemRequirements?.push(
      systemRequirement._id
    );
    console.log(
      "PROJECTTTT=====:",
      addedSystemRequirementToProject?.systemRequirements
    );
    await addedSystemRequirementToProject.save();

    console.log("AFTER SAVING REQUIREMENT TO PROJECT");

    // Return a success message with the new user requirement created
    return res.status(201).json({
      message: "User requirement added successufully!",
      data: systemRequirement,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};

export const getSystemRequirements = async (req, res) => {
  try {
    // Query database for all system requirement
    const systemRequirements = await SystemRequirementModel.find()
      .populate("userRequirement")
      .populate("project");
    console.log("DOWN HERE");
    // Return success message with all user requirements
    res.status(200).json({
      message: "Fetched all system requirements",
      data: systemRequirements,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const getSystemRequirementById = async (req, res) => {
  // Get user id from request params
  const { systemRequirementId } = req.params;
  const { engineerId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!systemRequirementId) {
    return res.status(409).json({
      message:
        "A system requirement id must be provided in the request params to perform this operation.",
    });
  }
  //   Validate field for empty strings / null values
  if (!engineerId || !projectId) {
    return res.status(409).json({
      message:
        "Both the engineer id and project id must be provided in the request query to perform this operation.",
    });
  }

  try {
    // Query database for the user requirement
    const systemRequirement = await SystemRequirementModel.findOne({
      _id: systemRequirementId,
      project: projectId,
      engineer: engineerId,
    })
      .populate("userRequirement")
      .populate("project");

    //   Validate field for empty strings / null values
    if (!systemRequirement) {
      return req.status(404).json({
        message: `User requirement does not exist.`,
      });
    }

    // Return success message with all users
    res
      .status(200)
      .json({ message: "Fetched system requirement", data: systemRequirement });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const updateSystemRequirement = async (req, res) => {
  // Get user id from the request params
  const { systemRequirementId } = req.params;
  const { engineerId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!systemRequirementId) {
    return res.status(409).json({
      message:
        "A engineer requirement id must be provided in the request params to perform this operation.",
    });
  }
  //   Validate field for empty strings / null values
  if (!engineerId || !projectId) {
    return res.status(409).json({
      message:
        "Both the engineer id and project id must be provided in the request query to perform this operation.",
    });
  }

  try {
    // Check if any user with the provided user id exists
    let systemRequirement = await SystemRequirementModel.findOneAndUpdate(
      { _id: systemRequirementId, engineer: engineerId, project: projectId },
      { ...req.body }
    );
    if (!systemRequirement) {
      return res.status(404).json({
        message: `Invalid operation. This system requirement does not exist!`,
      });
    }

    let updatedSystemRequirement = await SystemRequirementModel.findOne({
      _id: systemRequirementId,
    });

    // Return a success message with the updated system requirement
    res.status(201).json({
      message: "Your system requirement has been updated!",
      data: updatedSystemRequirement,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};

export const deleteSystemRequirement = async (req, res) => {
  // Get user id from the request params
  const { systemRequirementId } = req.params;
  const { engineerId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!systemRequirementId) {
    return res.status(409).json({
      message:
        "A system requirement id must be provided in the request params to perform this operation.",
    });
  }
  //   Validate field for empty strings / null values
  if (!engineerId || !projectId) {
    return res.status(409).json({
      message:
        "Both the system id and project id must be provided in the request query to perform this operation.",
    });
  }

  try {
    // Check if any user with the provided email already exists
    let systemRequirement = await SystemRequirementModel.findOneAndDelete({
      _id: systemRequirementId,
      engineer: engineerId,
      project: projectId,
    });
    if (!systemRequirement) {
      return res.status(403).json({
        message: "Invalid action! This project does not belong to you.",
      });
    }

    // Return a success message
    res.status(201).json({
      message: "System requirement deleted successufully!",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};
