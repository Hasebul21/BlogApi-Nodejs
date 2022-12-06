const express = require('express');
const AuthService = require('../service/authService');

const authRouter = express.Router();

authRouter.post('/', async (req, res, next) => {
   const token = await AuthService.signUp(req);
   if (typeof token === 'object') next(token);
   else res.status(201).send(token);
});

authRouter.post('/signin', async (req, res, next) => {
   const token = await AuthService.signIn(req);
   if (typeof token === 'object') next(token);
   else res.status(200).send(token);
});

module.exports = authRouter;
