const express = require('express');
const logger = require('../../libraries/log/logger');
const { AppError } = require('../../libraries/error-handling/AppError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  create,
  search,
  getByEmail,
  updateById,
  deleteById,
} = require('./service');

const { createSchema, updateSchema, idSchema,loginSchema} = require('./request');
const { validateRequest } = require('../../middlewares/request-validate');
const { logRequest } = require('../../middlewares/log');

const model = 'Customer';

// CRUD for entity
const routes = () => {
  const router = express.Router();
  logger.info(`Setting up routes for ${model}`);

  router.get('/', logRequest({}), async (req, res, next) => {
    try {
      // TODO: Add pagination and filtering
      const items = await search(req.query);
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/',
    logRequest({}),
    validateRequest({ schema: createSchema }),
    async (req, res, next) => {
      try {
           const user = await getByEmail(req.body.email);
        if (!user) {
                const item = await create(req.body);
                res.status(201).json(item);
        }
        else{
          res.status(401).json({
            code:401,
            message:"User already exist"
          });
        }


      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/login',
    logRequest({}),
    validateRequest({ schema: loginSchema, isParam: false }),
    async (req, res, next) => {
      const { email, password } = req.body;
      try {
          const user = await getByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', code :200 ,token });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:id',
    logRequest({}),
    validateRequest({ schema: idSchema, isParam: true }),
    validateRequest({ schema: updateSchema }),
    async (req, res, next) => {
      try {
        const item = await updateById(req.params.id, req.body);
        if (!item) {
          throw new AppError(`${model} not found`, `${model} not found`, 404);
        }
        res.status(200).json(item);
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:id',
    logRequest({}),
    validateRequest({ schema: idSchema, isParam: true }),
    async (req, res, next) => {
      try {
        await deleteById(req.params.id);
        res.status(204).json({ message: `${model} is deleted` });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

module.exports = { routes };
