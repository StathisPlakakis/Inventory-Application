const {Router} = require('express');
const multer = require('multer');
const dashboardRouter = Router();
const {dashboardRouterGet, createCategory, createBrand, createBoat} = require('../controllers/dashboardController');

const upload = multer({ storage: multer.memoryStorage() });

dashboardRouter.get('/', dashboardRouterGet);
dashboardRouter.post('/createCategory', createCategory);
dashboardRouter.post('/createBrand', createBrand);
dashboardRouter.post('/createBoat', upload.array('images'), createBoat);



module.exports = dashboardRouter;