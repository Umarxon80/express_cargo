import {sequelize } from "../config/db.js";
import {DataTypes} from "sequelize";
import { Client } from "./client.js";
import { Currency_type } from "./currency_type.js";

export const Order=sequelize.define("order",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    unique_id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
    },
    product_link:{
        type:DataTypes.STRING(2000),
    },
    quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    sum:{
        type:DataTypes.DECIMAL(15,2),
    },
    truck:{
        type:DataTypes.STRING(30),
    },
    desc:{
        type:DataTypes.TEXT,
    }
})

Client.hasMany(Order)
Order.belongsTo(Client)

Currency_type.hasMany(Order)
Order.belongsTo(Currency_type)