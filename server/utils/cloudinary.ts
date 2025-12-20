import { v2 as cloudinary } from 'cloudinary'
// import Buffer from "buffer"
import dotenv from 'dotenv'
import type { UploadApiResponse, UploadApiOptions } from 'cloudinary'

dotenv.config()

cloudinary.config({
  cloud_name: process.env['CLOUDINARY_CLOUD_NAME'] || '',
  api_key: process.env['CLOUDINARY_APIKEY'] || '',
  api_secret: process.env['CLOUDINARY_APISECRET'] || '',
})

interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
}

export const uploadImage = async (
  file: string | Buffer,
): Promise<CloudinaryUploadResult | undefined> => {
  const options: UploadApiOptions = {
    resource_type: 'image' as const,
    overwrite: true,
  }

  try {
    // Checking if the file is a path (string) or a buffer
    let result: UploadApiResponse | undefined
    if (typeof file === 'string') {
      // Upload from file path
      result = await cloudinary.uploader.upload(file, options)
    } else if (file instanceof Buffer) {
      // Upload from buffer
      result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(options, (error, uploadResult) => {
            if (error) return reject(error)
            return resolve(uploadResult!)
          })
          .end(file)
      })
    } else {
      throw new Error('Invalid file input for Cloudinary upload')
    }
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    }
  } catch (error) {
    console.log('error uploading image from cloudinary')
    console.error(error)
    return undefined
  }
}

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    })
    console.log('-------------------')
    console.log(result)
    console.log('-------------------')
    return result
  } catch (error) {
    console.log('error deleting image from cloudinary')
    console.error(error)
  }
}

// video uploader
export async function videoUploader(video: string | Buffer) {
  const options = {
    resource_type: 'video' as const,
    timeout: 12000000,
  }
  try {
    let result: UploadApiResponse | undefined
    if (typeof video === 'string') {
      result = await cloudinary.uploader.upload(video, options)
    } else if (video instanceof Buffer) {
      result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(options, (error, uploadResult) => {
            if (error) return reject(error)
            return resolve(uploadResult!)
          })
          .end(video)
      })
    }
    return result
  } catch (error) {
    console.log('error uploading video from cloudinary')
    console.error(error)
    return undefined
  }
}

export const deleteVideo = async (publicId: string) => {
  const options = { resource_type: 'video' }
  try {
    const result = await cloudinary.uploader.destroy(publicId, options)
    console.log('-------------------')
    console.log(result)
    console.log('-------------------')
    if (result.result !== 'ok' && result.result !== 'not found') {
      console.warn(
        `Cloudinary video deletion may not have been successful for public_id: ${publicId}`,
        result,
      )
    }
    return result
  } catch (error) {
    console.error(`Error deleting video ${publicId} from Cloudinary:`, error)
    throw error // Re-throw to be handled by the calling pre-remove hook
  }
}

export const deleteMultipleVideos = async (publicIds: string[]) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds, {
      resource_type: 'video',
    })
    console.log('-------------------')
    console.log(result)
    console.log('-------------------')
    return result
  } catch (error) {
    console.error('Error deleting multiple videos:', error)
    throw error
  }
}
