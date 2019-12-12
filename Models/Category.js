const sequelize = require('sequelize');
const db = require('../config/database');


const Category = db.define('category', {
    name:{
        type: sequelize.STRING,
        allowNull: false
    },
    categoryDescription:{
        type: sequelize.TEXT,
    },
},{
    freezeTableName: true,
});

module.exports = Category;