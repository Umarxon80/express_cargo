import express from "express";
import config from "config";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import index from "./routes/index.js";
import cookieParser from "cookie-parser";
import errorHandling from "./middlewares/errors/error.handling.js";
import exHbs from "express-handlebars";
import ViewRouter from "./routes/views.routes.js";
const PORT=config.get("port") ?? 4000


// process.on("uncaughtException", (exeption)=>{
//     console.log("uncaughtException:",exeption.message);
    
// })

// process.on("unhandledRejection", (reject)=>{
//     console.log("unhandledRejection:",reject);
// })

const app=express()
app.use(express.json())
app.use(cookieParser())
const hbs=exHbs.create({
    defaultLayout:"main",
    extname:"hbs"
})
app.engine("hbs",hbs.engine)
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static("views"))

app.use("/",ViewRouter)
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