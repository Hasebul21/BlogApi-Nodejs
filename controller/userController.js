const express = require('express');
const User = require('../model/userModel');
const UserService = require('../service/userService');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
   const users = await UserService.getAllUser();
   res.staus(200).send(users);
});

userRouter.get('/:id', async (req, res, next) => {
   const currentUser = await UserService.getSingleUser(req);
   if (currentUser instanceof User === false) next(currentUser);
   else res.staus(200).send(currentUser);
});

userRouter.put('/:id', async (req, res, next) => {
   const currentUser = await UserService.updateUser(req);
   if (currentUser instanceof User === false) next(currentUser);
   else res.staus(204).send(currentUser);
});

userRouter.delete('/:id', async (req, res, next) => {
   const currentUser = await UserService.deleteSingleUser(req);
   if (currentUser instanceof User === false) next(currentUser);
   else res.staus(204).send(currentUser);
});

module.exports = userRouter;
