const {Router} = require('express');
const dashboardRouter = Router();
const {dashboardRouterGet, createCategory, createBrand} = require('../controllers/dashboardController');


dashboardRouter.get('/', dashboardRouterGet);
dashboardRouter.post('/createCategory', createCategory);
dashboardRouter.post('/createBrand', createBrand);



module.exports = dashboardRouter;