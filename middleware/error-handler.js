const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors/custom-error");
const { z, ZodError } = require('zod');


const errorHandleMiddleware = (err, req, res, next) => {
  
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong try again later',
  }

  if(err instanceof ZodError) {
    const errorMessage = err.errors.map((issue) => ({
      message: `${issue.path.join('.')} is ${issue.message}`,
    }))
    res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Invalid data', details:errorMessage
    })
  }

  if (err instanceof CustomAPIError) {
    customError.statusCode = err.statusCode;
    customError.msg = err.message;
  }
 
  if(err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
    customError.statusCode = 400
  }

  if(err.code === 11000){
    const key = Object.keys(err.keyValue)[0]
    customError.msg = `Please use another ${key}`
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandleMiddleware