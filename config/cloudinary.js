import cloudinary from "cloudinary";

import {
  CLOUDINARY_NAME,
CLOUDINARY_KEY,
CLOUDINARY_SECRET
} from "./appConfig";

export const initCloudinary = async () => {
  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
  });
};
