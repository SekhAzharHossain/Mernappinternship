import express from "express"
import {create, deleteItem, getAllItems, getItemById} from "../controller/itemController.js"

const route = express.Router()
route.post("/item",create)
route.get("/items",getAllItems)
route.get("/item/:id",getItemById)
route.delete("/delete/item/:id",deleteItem)

export default route