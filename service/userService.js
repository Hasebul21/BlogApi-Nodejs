const User = require('../model');

const getAllUser = async (req) => {
   const users = await User.findAll();
   return users;
};

const getSingleUser = async (req) => {
   const userId = Number(req.params.id);
   const currentUser = await User.findOne({ where: { id: userId } });
   return currentUser;
};

const deleteSingleUser = async (req) => {
   const userId = Number(req.params.id);
   const currentUser = await User.destroy({ where: { id: userId } });
};

module.exports = { getSingleUser, getAllUser, deleteSingleUser };
