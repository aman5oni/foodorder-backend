import { Food } from "../models/foodModel";
import fs from "fs";
import cloudinary from "cloudinary";
const foodController = {
  async createFood(req, res) {
    console.log(req.body)
    try {
      const { itemId, name, cooktime, price, favourite, origins, star, tags } =
        req.body;
      let secure_url = "";
      let public_id = "";
      if (req.files && req.files.image) {
        const profile = req.files.image.tempFilePath;
        const mycloud = await cloudinary.v2.uploader.upload(profile, {
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

      res.json({
        message: "created"
      })
    } catch (error) {
      console.log("ererer", error)
      res.json({
        message: error.message
      });
    }
  },
  async getData(req, res) {
    const foods = await Food.find();

    res.status(200).json({
      success: true,
      foods
    });
  }
};

export default foodController;
