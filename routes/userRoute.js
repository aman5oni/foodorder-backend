import express from "express"
import  userController  from "../controller/userController"

const userRoutes = express.Router()


userRoutes.post("/register",userController.createUser)
userRoutes.post("/login",userController.loginUser)

export default userRoutes