const Joi = require('joi');
const mongoose = require('mongoose');

const createSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const updateSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  // other properties
});

const idSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { createSchema, updateSchema, idSchema,loginSchema};
