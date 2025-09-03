import {sequelize } from "../config/db.js";
import {DataTypes} from "sequelize";
import { Admin } from "./admin.js";
import { Order } from "./order.js";

export const Operation=sequelize.define("operation",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    operation_date:{
        type:DataTypes.DATEONLY,
    },
    desc:{
        type:DataTypes.TEXT,
    }
})
Admin.belongsToMany(Order,{through:Operation})
Order.belongsToMany(Admin,{through:Operation})

Operation.belongsTo(Admin)
Operation.belongsTo(Order)