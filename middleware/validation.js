const { Request, Response, NextFunction } = require('express');
const { z, ZodError } = require('zod');
const { StatusCodes } = require('http-status-codes');

function validateData(schema){
  return (req, res, next) => {
      schema.parse(req.body);
      next();
  };
}

module.exports = validateData