const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const Jwt = require('jsonwebtoken');
const { ErrObject } = require('../middleWare/errorHandler');

const token_generator = async (user) => {
   const currentUser = await User.findOne({
      where: { email: user.email },
   });
   const isValidPassword = await bcrypt.compare(
      user.password,
      currentUser.password
   );
   if (currentUser && isValidPassword) {
      const token = Jwt.sign(
         {
            email: currentUser.email,
         },
         process.env.JWT_TOKEN,
         {
            expiresIn: '24h',
         }
      );
      return token;
   }
   return ErrObject(
      401,
      'Authentication Failed',
      `User with email ${user.email} is not found`
   );
};

const signUp = async (req) => {
   try {
      const currentUser = req.body;
      const hashPassword = await bcrypt.hash(currentUser.password, 10);
      await User.create({
         fullName: currentUser.fullName,
         email: currentUser.email,
         password: hashPassword,
         contactNumber: Number(currentUser.contactNumber),
      });
      return await token_generator(req.body);
   } catch (err) {
      return err;
   }
};

const signIn = async (req) => {
   return await token_generator(req.body);
};

module.exports = {
   signUp,
   signIn,
};
