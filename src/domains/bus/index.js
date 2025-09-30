const { routes } = require('./api');

const defineRoutes = (expressRouter) => {
  expressRouter.use('/bus', routes());
};

module.exports = defineRoutes;
