const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const { ErrObject } = require('../middleWare/errorHandler');

const getAllUser = async (req) => {
   const users = await User.findAll();
   return users;
};

const getSingleUser = async (req) => {
   const userId = Number(req.params.id);
   const currentUser = await User.findOne({ where: { id: userId } });
   if (currentUser != null) return currentUser;
   return ErrObject(
      404,
      'Not Found',
      `User with id ${req.params.id} is not found`
   );
};

const updateUser = async (req) => {
   try {
      const userId = Number(req.params.id);
      const existUser = await User.findOne({ where: { id: userId } });
      if (existUser === null)
         return ErrObject(
            404,
            'Not Found',
            `User with id ${req.params.id} is not found`
         );
      const currentUser = req.body;
      const hashPassword = await bcrypt.hash(currentUser.password, 10);
      await User.update(
         {
            fullName: currentUser.fullName,
            email: currentUser.email,
            password: hashPassword,
            contactNumber: Number(currentUser.contactNumber),
         },
         {
            where: {
               id: userId,
            },
         }
      );
      const updatedUser = await User.findOne({ where: { id: userId } });
      return updatedUser;
   } catch (err) {
      return err;
   }
};

const deleteSingleUser = async (req) => {
   const userId = Number(req.params.id);
   const userExist = await User.findOne({ where: { id: userId } });
   if (userExist) {
      await User.destroy({ where: { id: userId } });
      return userExist;
   }
   return ErrObject(
      404,
      'Not Found',
      `User with id ${req.params.id} is not found`
   );
};

module.exports = {
   getSingleUser,
   getAllUser,
   updateUser,
   deleteSingleUser,
};
