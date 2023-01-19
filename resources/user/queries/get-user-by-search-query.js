const {
    User
  } = require("models");
  const { Op } = require("sequelize");
  const sequelize = require('sequelize');
  
  module.exports.GetUserBySearch = async ({ searchText, offset = 0, id }) => {
    return User.findAndCountAll({
      offset: offset,
      limit: 10,
      distinct: true,
      where: { 
        full_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('full_name')), 'LIKE', `%${searchText}%`),
        id: {
          [Op.ne]: id
        }
      },  
      order: [["createdAt", "DESC"]],
    });
  };
  