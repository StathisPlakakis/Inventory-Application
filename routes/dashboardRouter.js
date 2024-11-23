const {Router} = require('express');
const dashboardRouter = Router();
const {dashboardRouterGet} = require('../controllers/dashboardController')


dashboardRouter.get('/', dashboardRouterGet)

module.exports = dashboardRouter;