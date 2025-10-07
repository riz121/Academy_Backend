const express = require('express');
const logger = require('../../libraries/log/logger');
const { AppError } = require('../../libraries/error-handling/AppError');

const Courses= require('../course/service');

const { createSchema, updateSchema, idSchema } = require('./request');
const { validateRequest } = require('../../middlewares/request-validate');
const { logRequest } = require('../../middlewares/log');

const {
  create,
} = require('./service');
const model = 'Schedule';

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
    '/create',
    logRequest({}),
    //validateRequest({ schema: createSchema }),
    async (req, res, next) => {
      try {
        const { courseId, weekNumber, startDate,endDate,teachers = [], scheduleSlots = [] } = req.body;

    const course = await Courses.getById(courseId)
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Always include homeroom teacher
    const allTeachers = [ ...teachers];
    const uniqueTeachers = [...new Set(allTeachers.map(String))];

    const schedule = {
      course: courseId,
      weekNumber: weekNumber,
      startDate:startDate,
      endDate: endDate,
      teachers: uniqueTeachers,
      scheduleSlots
    }
        const item = await create(schedule);
        res.status(201).json(item);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:_id',
    logRequest({}),
    validateRequest({ schema: idSchema, isParam: true }),
    async (req, res, next) => {
      try {
        const item = await getById(req.params._id);
        if (!item) {
          throw new AppError(`${model} not found`, `${model} not found`, 404);
        }
        res.status(200).json(item);
      } catch (error) {
        next(error);
      }
    }
  );

   router.get(
    '/getAll',
    logRequest({}),
    async (req, res, next) => {
      try {
        const item = await getALl();
        if (!item) {
          throw new AppError(`${model} not found`, `${model} not found`, 404);
        }
        res.status(200).json(item);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:_id',
    logRequest({}),
    //validateRequest({ schema: idSchema, isParam: true }),
    //validateRequest({ schema: updateSchema }),
    async (req, res, next) => {
      try {
        const item = await updateById(req.params._id, req.body);
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
