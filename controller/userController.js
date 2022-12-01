const express = require('express');
const User = require('../model');
const err = require('../middleWare/errorHandler');
const UserService = require('../service/userService');

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
   try {
      //console.log(req.body);
      const currentUser = req.body;
      //console.log(user.firstName);
      const jane = await User.create({
         fullName: currentUser.fullName,
         email: currentUser.email,
         password: currentUser.password,
         contactNumber: Number(currentUser.contactNumber),
      });
      //console.log("Jane's auto-generated ID:", jane.id);
      res.send(jane);
   } catch (Error) {
      err.errorStatus = 400;
      err.errorName = Error.name;
      err.errorMessage = Error.message;
      next(err);
   }
   //res.end();
});

userRouter.get('/', async (req, res) => {
   const users = await UserService.getAllUser();
   res.send(users);
});

userRouter.get('/:id', async (req, res, next) => {
   const currentUser = await UserService.getSingleUser(req);
   if (currentUser == null) {
      err.errorStatus = 404;
      err.errorName = 'Not Found';
      err.errorMessage = `User with id ${userId} is not found`;
      next(err);
   } else res.send(currentUser);
});

const errorMiddleware = (error, req, res, next) => {
   res.send(error);
};

userRouter.use(errorMiddleware);
module.exports = userRouter;
