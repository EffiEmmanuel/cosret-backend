// @ts-nocheck
import UserRequirementModel from "../models/UserRequirement.models.js";
import ProjectModel from "../models/Project.models.js";
import NonFunctionalRequirementModel from "../models/NonFunctionalRequirement.model.js";

export const createNonFunctionalRequirement = async (req, res) => {
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
    const requirementExists = await NonFunctionalRequirementModel.findOne({
      requirement,
      engineer: engineerId,
      project: projectId,
      userRequirement: userRequirementId,
    });

    if (requirementExists) {
      return res.status(409).json({
        message: `This non functional requirement already exists unde rthe specified user requirement`,
      });
    }

    // Create a new NFR
    const nonFunctionalRequirement = new NonFunctionalRequirementModel({
      requirement,
      engineer: engineerId,
      project: projectId,
      userRequirement: userRequirementId,
    });

    // Save the NFR to the database
    await nonFunctionalRequirement.save();

    // TO-DO: Add requirement to project with the same id
    const userRequirement =
      await UserRequirementModel.findOne({
        _id: userRequirementId,
        // project: projectId,
      });

    if (!userRequirement) {
      return res.status(403).json({
        message: `Invalid action! This project does not exist or was not assigned to you!`,
      });
    }

    userRequirement?.nonFunctionalRequirements?.push(
      nonFunctionalRequirement._id
    );

    await userRequirement.save();

    // Return a success message with the new NFR created
    return res.status(201).json({
      message: "Non-functional requirement added successufully!",
      data: nonFunctionalRequirement,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error.message,
    });
  }
};

export const getNonFunctionalRequirements = async (req, res) => {
  try {
    // Query database for all system requirement
    const nonFunctionalRequirement = await NonFunctionalRequirementModel.find()
      .populate("userRequirement")
      .populate("project");
    // Return success message with all user requirements
    res.status(200).json({
      message: "Fetched all system requirements",
      data: nonFunctionalRequirement,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error.message,
    });
  }
};

export const getNonFunctionalRequirementById = async (req, res) => {
  // Get user id from request params
  const { nonFunctionalRequirementId } = req.params;
  const { engineerId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!nonFunctionalRequirementId) {
    return res.status(409).json({
      message:
        "A non functional requirement id must be provided in the request params to perform this operation.",
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
    const nonFunctionalRequirement = await NonFunctionalRequirementModel.findOne({
      _id: nonFunctionalRequirementId,
      project: projectId,
      engineer: engineerId,
    })
      .populate("userRequirement")
      .populate("project");

    //   Validate field for empty strings / null values
    if (!nonFunctionalRequirement) {
      return req.status(404).json({
        message: `Non functional requirement does not exist.`,
      });
    }

    // Return success message with all NFRs
    res
      .status(200)
      .json({ message: "Fetched non-functional requirement", data: nonFunctionalRequirement });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const updateNonFunctionalRequirement = async (req, res) => {
  // Get user id from the request params
  const { nonFunctionalRequirementId } = req.params;
  const { engineerId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!nonFunctionalRequirementId) {
    return res.status(409).json({
      message:
        "A non-functional requirement id must be provided in the request params to perform this operation.",
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
    let nonFunctionalRequirement =
      await NonFunctionalRequirementModel.findOneAndUpdate(
        {
          _id: nonFunctionalRequirementId,
          engineer: engineerId,
          project: projectId,
        },
        { ...req.body }
      );
    if (!nonFunctionalRequirement) {
      return res.status(404).json({
        message: `Invalid operation. This system requirement does not exist!`,
      });
    }

    let updatedFunctionalRequirement =
      await NonFunctionalRequirementModel.findOne({
        _id: nonFunctionalRequirementId,
      });

    // Return a success message with the updated system requirement
    res.status(201).json({
      message: "Your non-functional requirement has been updated!",
      data: updatedFunctionalRequirement,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};

export const deleteNonFunctionalRequirement = async (req, res) => {
  // Get user id from the request params
  const { nonFunctionalRequirementId } = req.params;
  const { engineerId, projectId } = req.query;

  //   Validate field for empty strings / null values
  if (!nonFunctionalRequirementId) {
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
    let nonFunctionalRequirement =
      await NonFunctionalRequirementModel.findOneAndDelete({
        _id: nonFunctionalRequirementId,
        engineer: engineerId,
        project: projectId,
      });
    if (!nonFunctionalRequirement) {
      return res.status(403).json({
        message: "Invalid action! This project does not belong to you.",
      });
    }

    // Return a success message
    res.status(201).json({
      message: "Non-Functional requirement deleted successufully!",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};
