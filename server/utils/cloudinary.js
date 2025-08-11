import { v2 as cloudinary } from "cloudinary"
// import Buffer from "buffer"
import dotenv from "dotenv"

dotenv.config()

console.log("here are your api keys", process.env.CLOUDINARY_APIKEY)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
})

export const uploadImage = async (file) => {

    const options = {
        resource_type: 'image',
        overwrite: true
    }

    try {
        // Checking if the file is a path (string) or a buffer
        let result;
        if (typeof file === 'string') {
            // Upload from file path
            result = await cloudinary.uploader.upload(file, options);
        } else if (file instanceof Buffer) {
            // Upload from buffer
            result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(options, (error, uploadResult) => {
                    if (error) return reject(error);
                    return resolve(uploadResult);
                }).end(file);
            });
        } else {
            throw new Error("Invalid file input for Cloudinary upload");
        }
        return {
            public_id: result.public_id,
            secure_url: result.secure_url
        };
    } catch (error) {
        console.log("error uploading image from cloudinary")
        console.error(error)
    }
}

export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" })
        console.log("-------------------")
        console.log(result)
        console.log("-------------------")
        return result;
    } catch (error) {
        console.log("error deleting image from cloudinary")
        console.error(error)
    }
}

// vedio uploader
export async function vedeoUploader(vedeo) {
    const options = {
        resource_type: "video",
        timeout:12000000,
    }
    try {
        let result;
        if (typeof vedeo === 'string') {
            result = await cloudinary.uploader.upload(vedeo, options)
        } else if (vedeo instanceof Buffer) {
            result = new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(options, (error, uploadResult) => {
                    if (error) return reject(error)
                    return resolve(uploadResult)
                }).end(vedeo)
            })
        }
        return result
    } catch (error) {
        console.log("error uploading vedio from cloudinary")
        console.error(error)
    }
}


export const deleteVideo = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
        console.log("-------------------")
        console.log(result)
        console.log("-------------------")
        if (result.result !== 'ok' && result.result !== 'not found') {
            console.warn(`Cloudinary video deletion may not have been successful for public_id: ${publicId}`, result);
        }
        return result;
    } catch (error) {
        console.error(`Error deleting video ${publicId} from Cloudinary:`, error);
        throw error; // Re-throw to be handled by the calling pre-remove hook
    }
};

export const deleteMultipleVideos = async (publicIds) => {
    try {
        const result = await cloudinary.api.delete_resources(publicIds, { resource_type: "video" })
        console.log("-------------------")
        console.log(result)
        console.log("-------------------")
        return result;
    } catch (error) {
        console.error("Error deleting multiple videos:", error);
        throw error;
    }
};