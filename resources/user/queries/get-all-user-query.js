const {
    User
  } = require("models");
  const { Op } = require("sequelize");
  
  module.exports.GetAllUser = async ({ offset = 0, nolimit=false, id }) => {
    return User.findAndCountAll({
      ...(!nolimit && {offset: offset,
      limit: 10}),
      distinct: true,
      where: { 
        full_name: {
            [Op.ne]: null
        },
        id: {
          [Op.ne]: id
        },
      },  
      order: [["createdAt", "DESC"]],
    });
  };
  