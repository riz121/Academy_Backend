const { routes } = require('./api');

const defineRoutes = (expressRouter) => {
  expressRouter.use('/createUser', routes());
   expressRouter.use('/auth', routes());
};

module.exports = defineRoutes;
