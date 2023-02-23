import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloudinary = async (filePath) => {
    console.log('Before cloudinary.upload()')
    const cloudinaryUploadDetails = await cloudinary.uploader.upload(filePath)
    return cloudinaryUploadDetails
}