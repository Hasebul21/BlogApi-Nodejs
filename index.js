const express = require('express');
const db = require('./dbConfig');
const dotenv = require('dotenv');
const userRouter = require('./controller/userController');
const storyRouter = require('./controller/storyController');
const authRouter = require('./controller/authController');
const { ErrorHandler } = require('./middleWare/errorHandler');
const app = express();

app.use(express.json());
dotenv.config();

app.dbConnection = async () => {
   try {
      await db.sync({ force: false });
      console.log('Database conncetion successful');
   } catch (err) {
      console.log(`Database conncetion error : ${err}`);
   }
};

app.use('/', authRouter);
app.use('/signup', authRouter);
app.use('/users', userRouter);
app.use('/stories', storyRouter);
app.use(ErrorHandler);

app.listen(3000, () => {
   console.log('Server is listening');
});

app.dbConnection();
