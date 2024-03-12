"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelizee = new sequelize_1.Sequelize('postgres://fikayo:ET5XYQHDUdQp5lf7tfm5dZlZOzvNJdZm@dpg-cmoo4a6n7f5s73d94b8g-a.oregon-postgres.render.com/finy', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
    logging: false,
});
sequelizee
    .authenticate()
    .then(function () {
    console.log('Connection successful!');
})
    .catch(function (error) {
    console.log('Connection failed:', error);
});
exports.default = sequelizee;
