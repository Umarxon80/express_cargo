import {sequelize } from "../config/db.js";
import {DataTypes} from "sequelize";

export const Currency_type=sequelize.define("currency_type",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.TEXT
    }
})