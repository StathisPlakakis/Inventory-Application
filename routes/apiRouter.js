const {Router} = require('express');
const apiRouter = Router();
const db = require('../db/queries');
const express = require('express');


apiRouter.get('/category',async (req, res) => {
  const categoryId = req.query.id;
  const category = await db.getCategoryByid(categoryId);
  res.json(category);
})

apiRouter.patch('/category', express.json(), async (req, res) => {
  const categoryId = req.query.id;
  const newCategoryName = req.body.category;
  try {
    await db.updateCategory(categoryId, newCategoryName);
    res.json({ success: true, redirectUrl: '/dashboard?active=categories' });
  } catch (error) {
    res.json({ success: false, redirectUrl: '/error' });
  }
})

apiRouter.post('/deleteCategory/:id', async (req, res) => {
  const category_id = req.params.id;
  await db.deleteCategoryById(category_id);
  res.redirect('/dashboard?active=categories');
})

module.exports = apiRouter;