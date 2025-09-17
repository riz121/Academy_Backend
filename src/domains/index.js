const productRoutes = require('./product');
const UserRoutes = require('./Users');


const defineRoutes = async (expressRouter) => {
   UserRoutes(expressRouter); 
   productRoutes(expressRouter);
};

module.exports = defineRoutes;
