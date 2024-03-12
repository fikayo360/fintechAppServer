import { DataTypes, Sequelize } from "sequelize";
import sequelizee from "../../../config/postgresConfig";
import Users from "./User";

const Wallet = sequelizee.define('Wallet', {
    walletId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(18,2),
      defaultValue: 0.00,
    },
    userId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        references: {
            model: Users,
            key: 'userId'
        }
      },
  }); 
 
  Wallet.sync().then(() => {
    console.log("wallet Model synced");
  })

  export default Wallet