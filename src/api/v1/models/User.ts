
import { DataTypes } from "sequelize"
import sequelizee from "../../../config/postgresConfig";

const Users = sequelizee.define('User', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    friendsIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    location: {
      type: DataTypes.STRING(255)
    },
    resettoken: {
      type: DataTypes.STRING(255),
    }
  }); 

  Users.sync().then(() => {
    console.log("User Model synced");
  });
 
  export default Users 