const { Sequelize } = require('sequelize');

let sequelize;

try {

    sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres'
    });
} catch (e) {
    throw new Error(e)
}


module.exports = sequelize