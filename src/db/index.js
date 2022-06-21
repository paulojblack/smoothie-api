const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log
});

const Smoothie = sequelize.define('Smoothie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingredients: {
        // Not JSONB because we aren't (currently) supporting operations on the field other than full replace
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    indexes: [{
        unique: true,
        fields: ["userId", "name"]
    }]
})

// No fields needed (yet) other than a unique user ID
const User = sequelize.define('User', {})

Smoothie.User = Smoothie.belongsTo(User, { foreignKey: { name: 'userId', field: 'userId', allowNull: false } });

// Old fashioned IIFE because I can't figure out these darn top level awaits!
(async () => {
    await sequelize.sync()
})();

module.exports = {
    sequelize,
    User,
    Smoothie
}