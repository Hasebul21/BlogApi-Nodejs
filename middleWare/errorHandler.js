const ErrObject = (statusCode, name, message) => {
   const err = {
      statusCode: statusCode,
      name: name,
      message: message,
   };
   return err;
};
const ErrorHandler = (err, req, res, next) => {
   console.log('Middleware Error Hadnling');
   if (res.headersSent) {
      next('There is a problem');
   } else {
      const errStatus = err.statusCode || 500;
      const errMsg = err.message || 'Something went wrong';
      const errname = err.name || 'Internal Server Error';
      res.status(errStatus).json({
         success: false,
         status: errStatus,
         name: errname,
         message: errMsg,
      });
   }
};

module.exports = { ErrObject, ErrorHandler };
