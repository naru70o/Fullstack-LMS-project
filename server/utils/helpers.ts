import { deleteVideo } from './cloudinary.ts'
import AppError from './error.ts'

export async function deleteLectureVideo({ publicId }: { publicId?: string }) {
  try {
    // Collect all publicIds for video deletion
    if (!publicId) {
      return { status: 'failed', message: 'no public id found' }
    }

    // delete the lacture vedeo
    await deleteVideo(publicId)
    return { status: 'success', message: 'lecture vedio deleted successfully' }
  } catch (error) {
    throw new AppError(`Failed to delete lacture vedio: ${error.message}`, 500)
  }
}
