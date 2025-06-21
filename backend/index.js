import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"

import route from "./routes/itemRoute.js"

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({limit:"10mb",extended:true}))
app.use(bodyParser.json({limit:"10mb"}))


const PORT = process.env.PORT || 7000
const MONGOURL=process.env.MONGO_DB_URL

app.use('/api',route)

mongoose.connect(MONGOURL).then(()=>{
    console.log("DB connected successfully")
    app.listen(PORT,()=>{
        console.log(`server is running on port no:${PORT}`)
    })
})
.catch((error)=>console.log(error))

