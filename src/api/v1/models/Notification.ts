import { DataTypes } from "sequelize";
import sequelizee from "../../../config/postgresConfig";
import Users from "./User";

const Notification = sequelizee.define('Notification',{
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model:Users,
            key: 'userId'
        }
      },

    notificationId:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      
      message:{
        type:DataTypes.STRING(255),
        allowNull:false
      },

      category:{
        type:DataTypes.STRING(255),
        allowNull:false
      }
})

Notification.sync().then(() => {
    console.log('notification model synced successfully')
})

export default Notification