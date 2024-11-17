// models/users.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Credentials = require('./credentials');
const Notes = require('./notes');

const Users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    credentials_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'credentials',
            key: 'credentials_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    }
});

Users.belongsTo(Credentials, { as : 'credentials', foreignKey: 'credentials_id' })

Users.hasMany(Notes, { as: 'notes' , foreignKey: 'note_id' })

module.exports = Users;
