const {Router} = require('express');
const apiRouter = Router();
const db = require('../db/queries');
const express = require('express');


apiRouter.get('/category',async (req, res) => {
  const categoryId = req.query.id;
  const category = await db.getCategoryByid(categoryId);
  res.json(category);
})

apiRouter.get('/brand',async (req, res) => {
  const brandId = req.query.id;
  const brand = await db.getBrandByid(brandId);
  res.json(brand);
})

apiRouter.get('/boat',async (req, res) => {
  const boatId = req.query.id;
  const boat = await db.getBoatByid(boatId);
  res.json(boat);
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

apiRouter.patch('/brand', express.json(), async (req, res) => {
  const brandId = req.query.id;
  const newBrandName = req.body.brand;
  try {
    await db.updateBrand(brandId, newBrandName);
    res.json({ success: true, redirectUrl: '/dashboard?active=brands' });
  } catch (error) {
    res.json({ success: false, redirectUrl: '/error' });
  }
})

apiRouter.patch('/boat', express.json(), async (req, res) => {
  const boat_id = req.query.id;
  const newBrand = req.body.brand;
  const newCategory = req.body.category;
  const newTitle = req.body.title;
  const newPrice = req.body.price;
  const newDescription = req.body.description;
  try {
    await db.updateBoat(boat_id, newBrand, newCategory, newTitle, newPrice, newDescription);
    res.json({ success: true, redirectUrl: '/dashboard?active=boats' });
  } catch (error) {
    res.json({ success: false, redirectUrl: '/error' });
  }
})

apiRouter.post('/deleteCategory/:id', async (req, res) => {
  const category_id = req.params.id;
  await db.deleteCategoryById(category_id);
  res.redirect('/dashboard?active=categories');
})

apiRouter.post('/deleteBrand/:id', async (req, res) => {
  const brand_id = req.params.id;
  await db.deleteBrandById(brand_id);
  res.redirect('/dashboard?active=brands');
})

module.exports = apiRouter;