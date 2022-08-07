//This file contains Sequelize models for the app

//Define Model Association
//adding a one-to-one association between the Course and User models using the belongsTo() method.

'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    title: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //userID - create in model associations w/foreignKey property and equal it to id from Users table
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
  }, { sequelize });


Course.associate = (models) => {
    // Adding associations - with one to one association between Course and User models using the belongsTo() method.
    //This is telling Sequelize that a course can be associated with only one user.
        Course.belongsTo(models.User, {
        foreignKey: {
         fieldName: 'userId',
         allowNull: false,
        },
        });
    };
  return Course;
};