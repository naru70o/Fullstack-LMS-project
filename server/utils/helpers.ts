import { deleteMultipleVideos, deleteVideo } from './cloudinary.ts'
import AppError from './error.ts'

export async function deleteLectureVideo({ publicId }: { publicId?: string }) {
  try {
    // Collect all publicIds for video deletion
    if (!publicId) {
      return { status: 'failed', message: 'no public id found' }
    }

    // delete the lecture video
    await deleteVideo(publicId)
    return { status: 'success', message: 'lecture video deleted successfully' }
  } catch (error) {
    throw new AppError(
      `Failed to delete lecture video: ${error instanceof Error ? error.message : 'unknown error'}`,
      500,
    )
  }
}

export async function deleteMultipleLectureVideos({
  publicIds,
}: {
  publicIds?: string[]
}) {
  try {
    if (!publicIds || publicIds.length === 0) {
      return { status: 'failed', message: 'no public ids found' }
    }

    // delete the lecture videos
    await deleteMultipleVideos(publicIds)
    return { status: 'success', message: 'lecture videos deleted successfully' }
  } catch (error) {
    throw new AppError(
      `Failed to delete lecture videos: ${error instanceof Error ? error.message : 'unknown error'}`,
      500,
    )
  }
}
