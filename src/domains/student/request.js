const Joi = require('joi');
const mongoose = require('mongoose');

const createSchema = Joi.object().keys({
  studentId: Joi.string().required(),
  sex: Joi.string().required(),
});

const updateSchema = Joi.object().keys({
  studentId: Joi.string().required(),
  sex: Joi.string().required(),
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
