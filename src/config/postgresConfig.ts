import { Sequelize } from 'sequelize';

const sequelizee = new Sequelize(
  'postgres://fikayo:ET5XYQHDUdQp5lf7tfm5dZlZOzvNJdZm@dpg-cmoo4a6n7f5s73d94b8g-a.oregon-postgres.render.com/finy',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    logging: false,
  },
)

sequelizee
  .authenticate()
  .then(() => {
    console.log('Connection successful!')
  })
  .catch((error) => {
    console.log('Connection failed:', error)
  })

export default sequelizee