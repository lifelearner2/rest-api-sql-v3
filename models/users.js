//This file contains Sequelize models for the app

//Define Model Association & setting attributes
//adding a one-to-many association between the User and Course models using the hasMany() method.
'use strict';
const Sequelize = require('sequelize');

//allowNull set to false ensures that the fields below require an entry
module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: 'A name is required'
          },
          notEmpty: {
              msg: 'Please provide a name'
          }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'A name is required'
        },
        notEmpty: {
            msg: 'Please provide a name'
        }
    }
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            msg: 'The email you entered already exists'
        },
        validate: {
            notNull: {
                msg: 'An email is required'
            },
            isEmail: {
                msg: 'Please provide a valid email address'
            }
        }
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A password is required'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
      },
  }, { sequelize });

  User.associate = (models) => {
    // Adding associations - with one, or many, courses.
    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'class', // alias
            foreignKey: {
                fieldName: 'userId',
            },
        });
        };
        };

  return User;
};