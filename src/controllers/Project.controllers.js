// @ts-nocheck
import { slugify } from "../helpers/slugify.js";
import ProjectModel from "../models/Project.models.js";
import UserModel from "../models/user.models.js";

export const createProject = async (req, res) => {
  const { owner } = req.query;
  console.log("REQ.BODY:", req.body);
  // Get all fields from the request body
  const { name, description } = req.body;

  //   Validate for authorized action
  if (!owner) {
    return req.status(400).json({ message: "Invalid action!" });
  }

  //   Validate field for empty strings / null values
  if (!name || !description) {
    return req
      .status(409)
      .json({ message: "Please fill in the missing fields!" });
  }

  //   create slug for project
  const slug = slugify(name);

  try {
    //   Check if user with specified id exists
    const userExists = await UserModel.findById(owner);
    if (!userExists) {
      return req.status(400).json({
        message: "Cannot perform this operation! User does not exist!",
      });
    }
    // Check if any project with the provided project name already exists
    let projectExistsWithSlug = await ProjectModel.findOne({ slug });
    if (projectExistsWithSlug) {
      return res.status(409).json({
        message: `A project with name (${name}) already exists`,
      });
    }

    // Create a new user
    const project = new projectModel({
      name,
      description,
      slug,
    });

    // Save the project to the database
    await project.save();

    // Return a success message with the new project created
    return res.status(201).json({
      message: "Your project has been created successufully!",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      error: error,
    });
  }
};

export const getProjects = async (req, res) => {
  console.log("OVER HERE");
  try {
    // Query database for all projects
    const projects = await ProjectModel.find().populate("*");
    console.log("DOWN HERE");
    // Return success message with all projects
    res.status(200).json({ message: "Fetched all projects", data: projects });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const getProjectById = async (req, res) => {
  // Get project id from request params
  const { projectId } = req.params;

  //   Validate field for empty strings / null values
  if (!projectId) {
    return req.status(409).json({
      message: "A project id must be provided to perform this operation.",
    });
  }

  try {
    // Query database for all projects
    const project = await ProjectModel.findById(projectId).populate("*");

    //   Validate field for empty strings / null values
    if (!project) {
      return req.status(404).json({
        message: `Project with id (${projectId}) does not exist.`,
      });
    }

    // Return success message with all projects
    res.status(200).json({ message: "Fetched project", data: project });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const getProjectBySlug = async (req, res) => {
  // Get slug from request params
  const { slug } = req.params;

  //   Validate field for empty strings / null values
  if (!slug) {
    return req.status(409).json({
      message: "A slug must be provided to perform this operation.",
    });
  }

  try {
    // Query database for all project slugs
    const project = await ProjectModel.findOne({ slug }).populate("*");

    //   Validate field for empty strings / null values
    if (!project) {
      return req.status(404).json({
        message: `Project with slug (${slug}) does not exist.`,
      });
    }

    // Return success message with all users
    res.status(200).json({ message: "Fetched project", data: project });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const getUserProjects = async (req, res) => {
  // Get user id from the request query
  const { userId } = req.params;

  //   Validate field for empty strings / null values
  if (!userId) {
    return req.status(409).json({
      message: "A user id must be provided to perform this operation.",
    });
  }

  try {
    // Check if the project belongs to the provided user
    let userProjects = await UserModel.find({
      owner: userId,
    });

    // Return a success message with the new user created
    res.status(201).json({
      message: "Your Project details have been updated successufully!",
      data: userProjects,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const updateProject = async (req, res) => {
  // Get user id from the request params
  const { userId, projectId } = req.params;

  //   Validate field for empty strings / null values
  if (!userId || !projectId) {
    return req.status(409).json({
      message:
        "Both a user id and a project id must be provided to perform this operation.",
    });
  }

  try {
    // Check if the project belongs to the provided user
    let project = await UserModel.findOneAndUpdate(
      { owner: userId, _id: projectId },
      { ...req.body }
    );
    if (!project) {
      return res.status(404).json({
        message: `Invalid operation. This project does not exist, or does not belong to you!`,
      });
    }

    // Get updated project
    let updatedProject = await ProjectModel.findOne({
      owner: userId,
      _id: projectId,
    });

    // Return a success message with the new user created
    res.status(201).json({
      message: "Your Project details have been updated successufully!",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

export const deleteProject = async (req, res) => {
  // Get user id from the request params
  const { userId, projectId } = req.params;

  //   Validate field for empty strings / null values
  if (!userId || !projectId) {
    return req.status(409).json({
      message:
        "Both a user id and a project id must be provided to perform this operation.",
    });
  }

  try {
    // Check if the project belongs to the provided user
    let project = await UserModel.findOneAndDelete({
      owner: userId,
      _id: projectId,
    });
    if (!project) {
      return res.status(404).json({
        message: `Invalid operation. This project does not exist, or does not belong to you!`,
      });
    }

    // Return a success message
    res.status(201).json({
      message: "Project has been deleted successufully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};
