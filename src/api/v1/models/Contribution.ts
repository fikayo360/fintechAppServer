import { DataTypes } from "sequelize";
import sequelizee from "../../../config/postgresConfig";
import Campaign from './Campaign';

const Contribution = sequelizee.define('Contribution',{
    campaignId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model:Campaign,
            key: 'campaignId'
        }
      },

    contributionId:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      
      amount:{
        type:DataTypes.DECIMAL(18,2),
        allowNull:false,
        defaultValue: 0.00,
      }
})

Contribution.sync().then(() => {
    console.log('contribution model synced successfully')
})

export default Contribution