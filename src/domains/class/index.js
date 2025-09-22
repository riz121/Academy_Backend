const { routes } = require('./api');

const defineRoutes = (expressRouter) => {
  expressRouter.use('/classes', routes());
};

module.exports = defineRoutes;
