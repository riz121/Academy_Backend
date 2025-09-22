const classRoutes = require('./class');
const UserRoutes = require('./Users');


const defineRoutes = async (expressRouter) => {
   UserRoutes(expressRouter); 
   classRoutes(expressRouter);
};

module.exports = defineRoutes;
