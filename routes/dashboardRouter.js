const {Router} = require('express');
const dashboardRouter = Router();
const {dashboardRouterGet, createCategory} = require('../controllers/dashboardController')


dashboardRouter.get('/', dashboardRouterGet)
dashboardRouter.post('/createCategory', createCategory)


module.exports = dashboardRouter;