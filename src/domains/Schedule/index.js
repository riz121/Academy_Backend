const { routes } = require('./api');

const defineRoutes = (expressRouter) => {
  expressRouter.use('/schedule', routes());

};

module.exports = defineRoutes;
