import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Otp = sequelize.define("otp", {
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey: true,
  },
  otp: {
    type: DataTypes.STRING(10),
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  expiration_time:{
    type:DataTypes.DATE
  }
});
