const express = require('express');
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 8080;
const database = require('./src/config/Database')
const userRouter = require("./src/routes/userRoute")

const app = express();
app.use(express.json())
app.use(cors({
    origin:"//*"
}))  
app.use("/user",userRouter)


app.get("/",(req,res)=>{
    res.send("Hello World!")
})

app.listen(PORT,()=>{
    try {
        database()
        console.log(`Server is running on PORT ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})

