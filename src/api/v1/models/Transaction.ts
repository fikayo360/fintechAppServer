import { DataTypes } from "sequelize";
import sequelizee from "../../../config/postgresConfig";
import Users from "./User";
const Transaction = sequelizee.define('Transaction',{
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'userId'
        }
      },
    transactionId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      transactionType:{
        type:DataTypes.STRING(255),
        allowNull: false
      },
      senderId:{
        type:DataTypes.STRING(255),
      },
      receiverId:{
        type:DataTypes.STRING(255),
      },
      amountSent:{
        type:DataTypes.DECIMAL(18,2),
        allowNull:false
      }
})

Transaction.sync().then(() => {
    console.log('transaction model synced successfully')
})

export default Transaction