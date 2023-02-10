const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Users extends Model { }

Users.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        }
    },
    {
        // hooks: {
        //     beforeCreate: async (newUserData) => {
        //         newUserData.password = await bcrypt.hash(newUserData.password, 10);
        //         return newUserData;
        //     }
        // },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'users',
    }
)

module.exports = Users;