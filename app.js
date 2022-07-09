import express from "express";
import userRoutes from "./routes/userRoute";
import foodRoutes from "./routes/foodRoutes";
import { dbConnection } from "./config/database";
import { initCloudinary } from "./config/cloudinary";
import fileUpload from "express-fileupload";

const app = express();
initCloudinary();
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true
  })
);
dbConnection();
app.use(userRoutes);
app.use(foodRoutes);

export default app;
