import { User } from "../models/userModel";
import {
  getErrorResponse,
  getSuccessResponse,
  internalServerError
} from "../services/constant";
import { getToken } from "../services/getToken";
const userController = {
  async createUser(req, res) {
    try {
      const { id, firstName, lastName, email, password } = req.body;
      const newUser = new User({
        id,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email,
        password
      });
      await newUser.save();
      getSuccessResponse(res, newUser, 200, "User Created");
    } catch (error) {
      internalServerError(res, error, 500);
    }
  },
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email
      })
        .select("+password")
        .select("-__v")
        .sort({ updatedAt: -1 });

      if (!user) {
        return getErrorResponse(res, null, 404, "User dosen't exists");
      } else {
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          return getErrorResponse(res, null, 401, "Password MisMatched");
        }

        getToken(res, user, 200, "Token Generated SucessFully");
      }
    } catch (error) {
      return internalServerError(res, error, error.message || "");
    }
  }
};

export default userController;
