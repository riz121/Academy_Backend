const { routes } = require('./api');

const defineRoutes = (expressRouter) => {
  expressRouter.use('/course', routes());
};

module.exports = defineRoutes;
