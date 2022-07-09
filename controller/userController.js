import { User } from "../models/userModel";

const userController = {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    
      const newUser = new User({
        name,
        email,
        password
      });
      await newUser.save().then(res.json({
        message:"User Created"
      }))
    

  },
  async loginUser(req, res) {
    res.send("Login");
  }
};

export default userController;
