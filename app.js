import express from "express";
import config from "config";
import { sequelize } from "./config/db.js";
import index from "./routes/index.js";

const PORT=config.get("port") ?? 4000

const app=express()
app.use(express.json())
app.use("/api",index)






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