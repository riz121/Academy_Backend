const classRoutes = require('./class');
const UserRoutes = require('./Users');
const StudentRoutes = require('./student');
const BusRoutes = require('./bus');
const CourseRoutes = require('./course');


const defineRoutes = async (expressRouter) => {
   UserRoutes(expressRouter); 
   classRoutes(expressRouter);
   StudentRoutes(expressRouter);
   BusRoutes(expressRouter);
   CourseRoutes(expressRouter);
};

module.exports = defineRoutes;
