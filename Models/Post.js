const sequelize = require('sequelize');
const db = require('../config/database');


const Post = db.define('post', {
    name:{
        type: sequelize.STRING,
        allowNull: false
    },
    postDescription:{
        type: sequelize.TEXT,
        allowNull: false
    },
    categoryId:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    userId:{
        type: sequelize.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true,
});

module.exports = Post;