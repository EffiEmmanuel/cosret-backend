// @ts-nocheck
import ChatRoomModel from "../models/ChatRoom.models.js";
import MessageModel from "../models/Message.models.js";

export const createMessage = async (req, res) => {
  console.log("REQ.BODY:", req.body);
  // Get all fields from the request query and request body
  const { chatRoomId, sender, modelType } = req.query;
  const { text } = req.body;

  try {
    // Create a new messsage
    const message = new MessageModel({
      message: text,
      chatRoomId,
      sender,
      modelType,
    });

    // Save the user to the database
    await message.save();

    // Update messages in chatRoom model
    const chatRoom = await ChatRoomModel.findById(chatRoomId);
    if (!chatRoom) {
      return "This chat room does not exist!";
    }

    chatRoom?.messages?.push(message._id);
    // Save the user to the database
    await chatRoom.save();

    // Get the full message
    const populatedMessage = message.populate("sender");

    return populatedMessage;

    // Return a success message with the new message created
    // return res.status(201).json({
    //   message: "Your message was saved successufully!",
    //   data: message,
    // });
  } catch (error) {
    return {
      error,
      message:
        "An error occured while we processed your request, please try again",
    };
    // res.status(500).json({
    //   message:
    //     "An error occured while we processed your request, please try again",
    //   error: error,
    // });
  }
};

export const getChatRoomMessages = async (req, res) => {
  const { chatRoomId } = req.params;
  try {
    // Query database for all chat room messages
    const messages = await MessageModel.find({
      chatRoom: chatRoomId,
    }).populate({
      path: "sender",
    });

    const chatRoom = await ChatRoomModel.findById(chatRoomId);

    console.log("CRRRRRRRRR:", chatRoom);

    if (!messages) {
      return res
        .status(404)
        .json({ message: "This chat room does not exist!" });
    }

    // Return success message with all chatRooms
    res.status(200).json({
      message: `Fetched all messages from chat room with ID: ${chatRoomId}`,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An error occured while we processed your request, please try again",
      data: null,
    });
  }
};

// export const getAdminById = async (req, res) => {
//   // Get admin id from request params
//   const { adminId } = req.params;

//   //   Validate field for empty strings / null values
//   if (!adminId) {
//     return res.status(409).json({
//       message: "A admin id must be provided to perform this operation.",
//     });
//   }

//   try {
//     // Query database for all admins
//     const admin = await AdminModel.findById(adminId);

//     //   Validate field for empty strings / null values
//     if (!admin) {
//       return res.status(404).json({
//         message: `admin with id (${adminId}) does not exist.`,
//       });
//     }

//     // Return success message with all admins
//     res.status(200).json({ message: "Fetched admin", data: admin });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "An error occured while we processed your request, please try again",
//       data: null,
//     });
//   }
// };

// export const getAdminByUsername = async (req, res) => {
//   // Get username from request params
//   const { username } = req.params;

//   //   Validate field for empty strings / null values
//   if (!username) {
//     return res.status(409).json({
//       message: "A username must be provided to perform this operation.",
//     });
//   }

//   try {
//     // Query database for all admins
//     const admin = await AdminModel.findOne({ username });

//     //   Validate field for empty strings / null values
//     if (!admin) {
//       return res.status(404).json({
//         message: `Admin with username (${username}) does not exist.`,
//       });
//     }

//     // Return success message with all admins
//     res.status(200).json({ message: "Fetched admin", data: admin });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "An error occured while we processed your request, please try again",
//       data: null,
//     });
//   }
// };

// export const updateAdminUsername = async (req, res) => {
//   // Get admin id from the request params
//   const { adminId } = req.params;

//   //   Validate field for empty strings / null values
//   if (!adminId) {
//     return res.status(409).json({
//       message: "A admin id must be provided to perform this operation.",
//     });
//   }

//   try {
//     // Check if any admin with the provided admin id exists
//     let admin = await AdminModel.findOneAndUpdate(
//       { _id: adminId },
//       { ...req.body }
//     );
//     if (!admin) {
//       return res.status(404).json({
//         message: `Invalid operation. This admin does not exist!`,
//       });
//     }

//     let updatedAdmin = await AdminModel.findOne({ _id: adminId });

//     // Return a success message with the new admin created
//     res.status(201).json({
//       message: "Your details have been updated successufully!",
//       data: updatedAdmin,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "An error occured while we processed your request, please try again",
//       data: null,
//     });
//   }
// };

// export const deleteAdminAccount = async (req, res) => {
//   // Get admin id from the request params
//   const { adminId } = req.params;

//   //   Validate field for empty strings / null values
//   if (!adminId) {
//     return res.status(409).json({
//       message: "A admin id must be provided to perform this operation.",
//     });
//   }

//   try {
//     // Check if any admin with the provided email already exists
//     let admin = await AdminModel.findOneAndDelete({ _id: adminId });
//     // if (!admin) {
//     //   return res.status(404).json({
//     //     message: "Invalid admin id provided. This admin does not exist.",
//     //   });
//     // }

//     // Return a success message
//     res.status(201).json({
//       message: "Admin account deleted successufully!",
//       data: admin,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message:
//         "An error occured while we processed your request, please try again",
//       error: error,
//     });
//   }
// };

// export const loginAdmin = async (req, res) => {
//   // Get login credentials
//   const { username, password } = req.body;

//   //   Validate field for empty strings / null values
//   if (!username || !password) {
//     return res.status(409).json({
//       message: "Please fill in the missing fields.",
//     });
//   }

//   console.log("OVER HERE:", req.body);
//   try {
//     const adminExists = await AdminModel.findOne({ username });

//     if (!adminExists) {
//       return res
//         .status(404)
//         .json({ message: `No account with username (${username}) exists.` });
//     }

//     const isPasswordCorrect = comparePassword(password, adminExists.password);

//     if (!isPasswordCorrect) {
//       return res
//         .status(409)
//         .json({ message: "Invalid username or password provided." });
//     }

//     // TO-DO: Send OTP to admin email
//     const token = await jwtSign({ adminExists });

//     res.status(200).json({ message: "Log in successful!", data: token });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "An error occured while we processed your request, please try again",
//       error: error,
//     });
//   }
// };

// export const verifyToken = async (req, res) => {
//   const { token } = req.body;
//   if (!token) {
//     return res.status(409).json({ message: "A token must be provided." });
//   }

//   const isValid = jwtVerify(token);
//   console.log("ISVALID:", isValid);
//   if (Math.floor(new Date().getTime() / 1000) >= isValid.exp * 100) {
//     return res.status(403).json({ message: "Session expired! Please log in." });
//   } else {
//     return res
//       .status(200)
//       .json({ message: "Token still valid.", data: isValid.adminExists });
//   }
// };

// export const getStatistics = async (req, res) => {
//   try {
//     const users = await UserModel.find().count();
//     const engineers = await EngineerModel.find().count();
//     const projects = await ProjectModel.find().count();

//     const data = {
//       users,
//       engineers,
//       projects,
//     };

//     return res
//       .status(200)
//       .json({ message: "Statistics fetched successufully!", data });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "An error occured while we processed your request, please tryed again",
//       error: error,
//     });
//   }
// };

// export const getProjectsWithoutAnEngineer = async (req, res) => {
//   try {
//     const projects = await ProjectModel.find({
//       engineerAssigned: null,
//     }).populate("owner");
//     console.log("Projects without an engineer:", projects);

//     return res.status(200).json({
//       message: "Projects pending assignment fetched successufully!",
//       projects,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "An error occured while we processed your request, please tryed again",
//       error: error,
//     });
//   }
// };

// export const assignEngineerToProject = async (req, res) => {
//   // Get engineer and project IDs from the request params
//   const { engineerId, projectId, ownerId } = req.params;

//   //   Validate fields for missing input
//   if (!engineerId || !projectId || !ownerId) {
//     return res.status(409).json({
//       message: "Please fill in the missing fields.",
//     });
//   }

//   try {
//     const project = await ProjectModel.findOneAndUpdate(
//       { _id: projectId, owner: ownerId },
//       { engineerAssigned: engineerId }
//     )
//       .populate("owner")
//       .populate("engineerAssigned");

//     // Assigning engineer and user to a chat room
//     // Create chat room
//     const chatRoom = await ChatRoomModel.find({
//       roomName: `${project.owner.username}-${project.engineerAssigned.email}`,
//     });
//     if (chatRoom) {
//       return res.status(409).json({
//         message: "Chat room already exists.",
//       });
//     }
//     const newChatRoom = new ChatRoomModel({
//       roomName: `${project.owner.username}-${project.engineerAssigned.email}`,
//       members: [project.owner._id, project.engineerAssigned._id],
//     });
//     // save chat room to database
//     await newChatRoom.save();

//     // Update engineer model to include the chat room
//     const engineer = await EngineerModel.findOne({ _id: engineerId });
//     engineer.chatRooms.push(newChatRoom?._id);
//     await engineer.save();

//     // Update user model to include the chat room
//     const user = await UserModel.findOne({ _id: ownerId });
//     user.chatRooms.push(newChatRoom?._id);
//     await user.save();

//     // return success message
//     return res.status(201).json({
//       message: "Engineer successfully assigned to project!",
//       project,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "An error occured while we processed your request, please tryed again",
//       error: error.message,
//     });
//   }
// };
