const express = require('express');
const User = require('./model');
const db = require('./dbConfig');
const userRouter = require('./controller/userController');
const app = express();

app.use(express.json());

app.dbConnection = async () => {
   try {
      await db.sync({ force: false });
      console.log('Database conncetion successful');
   } catch (err) {
      console.log(`Database conncetion error : ${err}`);
   }
};

// app.post('/user', async (req, res, next) => {
//    try {
//       //console.log(req.body);
//       const currentUser = req.body;
//       //console.log(user.firstName);
//       const jane = await User.create({
//          fullName: currentUser.fullName,
//          email: currentUser.email,
//          password: currentUser.password,
//          contactNumber: Number(currentUser.contactNumber),
//       });
//       //console.log("Jane's auto-generated ID:", jane.id);
//       res.send(jane);
//    } catch (err) {
//       next(err);
//    }
//    //res.end();
// });

// app.get('/user', async (req, res) => {
//    const users = await User.findAll();
//    res.send(users);
// });

// app.get('/user/:id', async (req, res, next) => {
//    const userId = Number(req.params.id);
//    const currentUser = await User.findOne({ where: { id: userId } });
//    if (currentUser == null) {
//       next(`User with id ${userId} is not found`);
//    } else res.send(currentUser);
// });

// const ErrorMiddleware = (err, req, res, next) => {
//    const Error = {
//       errorName: err.name,
//       errorMessage: err.message,
//    };
//    res.send(Error);
// };

// app.use(ErrorMiddleware);
app.use('/user', userRouter);
app.listen(3000, () => {
   console.log('Server is listening');
});

app.dbConnection();
