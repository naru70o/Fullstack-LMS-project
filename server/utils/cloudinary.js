import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APISECRET
})

const uploadImage = async (imagePath) => {

    const options = {
        resource_type: 'auto',
        use_filename: true,
        unique_filename: false,
        overwrite: true
    }

    try {
        const result = await cloudinary.uploader.upload(imagePath, options)
        return result.public_id;
       } catch (error) {
        console.log("error uploading image from cloudinary")
        console.error(error)
    }
}

const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {resource_type:"vedio"})
        return result;
    } catch (error) {
        console.log("error deleting image from cloudinary")
        console.error(error)
    }
}

