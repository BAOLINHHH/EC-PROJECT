// import { v2 as cloudinary } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
});
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png','mp3','*'],
  params: {
    folder: "upload"
  }
})  ;
const uploadCloud = multer ({storage})
export default uploadCloud
