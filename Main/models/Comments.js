const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Posts = require('./Posts');
const Users = require('./Users');


class Comments extends Model { }

Comments.init(
    {
      id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Posts,
                key: 'id',
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id'
            }
        }
    }, 
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    }
)

module.exports = Comments;
