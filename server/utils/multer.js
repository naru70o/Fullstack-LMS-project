import multer from "multer"

const storage = multer.memoryStorage();

// the file size should be less than 4mb
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 4 } // 4MB limit
});

export default upload;