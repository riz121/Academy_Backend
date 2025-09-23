const classRoutes = require('./class');
const UserRoutes = require('./Users');
const StudentRoutes = require('./student');


const defineRoutes = async (expressRouter) => {
   UserRoutes(expressRouter); 
   classRoutes(expressRouter);
   StudentRoutes(expressRouter);
};

module.exports = defineRoutes;
