
import { DataTypes } from "sequelize"
import sequelizee from "../../../config/postgresConfig";
import Users from "./User";

const Campaign = sequelizee.define('Campaign', {
    campaignId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
     
      userId:{
          type: DataTypes.UUID,
          allowNull: false,
          references: {
              model: Users,
              key: 'userId'
          }
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull:false
        },

        image:{
            type:DataTypes.STRING(255)
        },

        description:{
            type:DataTypes.STRING(255),
            allowNull:false
        },

        goal:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false
        },

        amountRaised:{
            type:DataTypes.DECIMAL(10,2),
            defaultValue: 0.00
        },

        campaignEnds:{
            type:DataTypes.DATE
        }
  }); 

  Campaign.sync().then(() => {
    console.log("campaign Model synced");
  });
 
  export default Campaign 