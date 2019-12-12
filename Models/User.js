const sequelize = require('sequelize');
const db = require('../config/database');


const User = db.define('user', {
    name:{
        type: sequelize.STRING,
        allowNull: false
    },
    surname:{
        type: sequelize.STRING,
        allowNull: false,
    },
    password:{
        type:sequelize.STRING,
        allowNull:false
    },
    email:{
        type:sequelize.STRING,
        allowNull:false
    },
    level:{
        type:sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},{
    freezeTableName: true,
});

module.exports = User;