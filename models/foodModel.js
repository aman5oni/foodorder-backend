import { mongoose } from "mongoose";

const Schema = mongoose.Schema;


const foodSchema = new Schema(
  {
    itemId: { type: Number, required: true },
    name: { type: String, required: true },
    cooktime: { type: String, required: true },
    favourite: { type: Boolean, required: true },
    price: { type: Number, required: true },
    origins: { type: String, required: true },
    star: { type: Number, required: true },
    image: {
      public_id: String,
      url: String
    },
    tags: { type: Array,default:[], required: true }
  },
  { timestamps: true, toJSON: { getters: true }, id: false }
);

export const Food = mongoose.model("food", foodSchema);
