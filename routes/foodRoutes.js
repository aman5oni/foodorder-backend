import express from "express"
import  foodController  from "../controller/foodController"

const foodRoutes = express.Router()


foodRoutes.post("/food/createnew",foodController.createFood)
foodRoutes.get("/food/getdata",foodController.getData)

export default foodRoutes