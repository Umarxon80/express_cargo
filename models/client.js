import {sequelize } from "../config/db.js";
import {DataTypes} from "sequelize";

export const Client=sequelize.define("client",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    full_name:{
        type:DataTypes.STRING(50),
        // allowNull:false
    },
    phone_number:{
        type:DataTypes.STRING(15),
        // validate:{
        //     is:/^\d{2}-^\d{3}-^\d{2}-^\d{2}$/,
        // }
    },
    email:{
        type:DataTypes.STRING(30),
        unique:true
    },
    address:{
        type:DataTypes.STRING,
    },
    location:{
        type:DataTypes.STRING(30),
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
})