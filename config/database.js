import mongoose from "mongoose";

import { MONGO_URI } from "./appConfig";

export const dbConnection = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);
    console.log(
      `Database connected for ${connection.name} : ${connection.host}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
