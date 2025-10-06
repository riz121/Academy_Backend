const Joi = require('joi');
const mongoose = require('mongoose');

const createSchema = Joi.object().keys({
  courseName: Joi.string().required(),
  courseCode: Joi.string().required(),
  status:Joi.boolean().required()
});

const updateSchema = Joi.object().keys({
  courseName: Joi.string().required(),
  courseCode: Joi.string().required(),
  status:Joi.boolean().required()
});

const idSchema = Joi.object().keys({
  _id: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'ObjectId validation')
    .required(),
});

module.exports = { createSchema, updateSchema, idSchema };
