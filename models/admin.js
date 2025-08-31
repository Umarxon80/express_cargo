import { sequelize } from "../config/db.js";
import {DataTypes} from "sequelize";

export const Admin=sequelize.define("admin",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    full_name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    user_name:{
        type:DataTypes.STRING(20)
    },
    password:{
        type:DataTypes.STRING(20)
    },
    phone_number:{
        type:DataTypes.STRING(20)
    },
    email:{
        type:DataTypes.STRING(20),
        unique:true
    },
    tg_link:{
        type:DataTypes.STRING(20)
    },
    token:{
        type:DataTypes.STRING(20)
    },
    is_creator:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    description:{
        type:DataTypes.TEXT
    }
})

