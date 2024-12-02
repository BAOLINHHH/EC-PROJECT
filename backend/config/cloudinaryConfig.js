// import { v2 as cloudinary } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
cloudinary.config({ 
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUNDINARY_API_KEY, 
    api_secret: process.env.CLOUNDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
const storage = new CloudinaryStorage({ 
    cloudinary,
    allowedFormats: ['jpg', 'png','mp3','*'],
  params: {
    folder: "upload"
  }
});
const uploadCloud = multer ({storage})
export default uploadCloud
