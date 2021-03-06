import { mongoose } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_COOKIE_EXPIRE } from "../config/appConfig";


const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
      id: { type: Number, required: true },
      firstName: { type: String, required: true},
      lastName: { type: String, required: true},
      fullName: { type: String, required: true},
      email: { type: String, required: true, unique: true },
      password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
      },
    },
    { timestamps: true, toJSON: { getters: true }, id: false }
  );
  
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, JWT_SECRET, {
      expiresIn: JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    });
  };

  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  

  export const User = mongoose.model("users", userSchema);