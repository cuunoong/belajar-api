const { User } = require("../../../models");

// Get all users data
module.exports = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  return res.json(users);
};
