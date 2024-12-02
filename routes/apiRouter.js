const {Router} = require('express');
const apiRouter = Router();
const db = require('../db/queries')

apiRouter.get('/category',async (req, res) => {
  const categoryId = req.query.id;
  const category = await db.getCategoryByid(categoryId);
  res.json(category);
})

module.exports = apiRouter;