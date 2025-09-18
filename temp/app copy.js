import express from "express";
import config from "config";
import dotenv from "dotenv";
import { sequelize } from "../config/db.js";
import index from "../routes/index.js";
import cookieParser from "cookie-parser";
import errorHandling from "../middlewares/errors/error.handling.js";
const PORT=config.get("port") ?? 4000

dotenv.config({path:`.env.${process.env.NODE_env}` })

console.log(process.env.NODE_env);
console.log(process.env.secret);
console.log(config.get("secret"));


process.on("uncaughtException", (exeption)=>{
    console.log("uncaughtException:",exeption.message);
    
})

process.on("unhandledRejection", (reject)=>{
    console.log("unhandledRejection:",reject);
})

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use("/api",index)
app.use(errorHandling)

const start = async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter:true})
       app.listen(PORT,(()=>{
    console.log(`server is on http://localhost:${PORT}`);
    })) 
    } catch (error) {
        console.log(error); 
    }
}

start()