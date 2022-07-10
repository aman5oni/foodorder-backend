import {
  getSuccessResponse,
  getErrorResponse,
  internalServerError
} from "../services/constant";
import { Food } from "../models/foodModel";
import fs from "fs";
import cloudinary from "cloudinary";
const foodController = {
  async createFood(req, res) {
    try {
      const { itemId, name, cooktime, price, favourite, origins, star, tags } =
        req.body;
      try {
        let secure_url = "";
        let public_id = "";
        if (req.files && req.files.image) {
          const image = req.files.image.tempFilePath;
          const mycloud = await cloudinary.v2.uploader.upload(image, {
            folder: "foods"
          });
          fs.rmSync("./tmp", { recursive: true });
          secure_url = mycloud.secure_url;
          public_id = mycloud.public_id;
        }
        const newFood = await new Food({
          itemId,
          name,
          cooktime,
          price,
          favourite,
          origins,
          star,
          image: {
            public_id: public_id,
            url: secure_url
          },
          tags
        });
        newFood.save();
        getSuccessResponse(res, newFood, 200, "Data Created");
      } catch (error) {
        getErrorResponse(res, error, 400, "Data Is'nt Found");
      }
    } catch (error) {
      internalServerError(res, error, 500, "Internal Server Error");
    }
  },
  async getData(req, res) {
    try {
      const foods = await Food.find();
      getSuccessResponse(res, foods, 200, "SucessFully Fetched");
    } catch (error) {
      internalServerError(res, error, 500);
    }
  }
};

export default foodController;
