import dotenv from "dotenv";
import { env } from "process";

dotenv.config();

const PORT = env.PORT;
const CLOUDINARY_NAME = env.CLOUDINARY_NAME;
const CLOUDINARY_KEY = env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = env.CLOUDINARY_SECRET;
const MONGO_URI = env.MONGO_URI;
const JWT_COOKIE_EXPIRE = env.JWT_COOKIE_EXPIRE;
const JWT_SECRET = env.JWT_SECRET;
export {
  PORT,
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  MONGO_URI,
  JWT_COOKIE_EXPIRE,
  JWT_SECRET
};
