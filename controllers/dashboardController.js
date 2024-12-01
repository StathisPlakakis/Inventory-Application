const db = require('../db/queries');
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require('express-validator');

const dashboardRouterGet = asyncHandler(async (req, res) => {
  const active_table = req.query.active;
  const tables = await db.getAllTables();
  const table_rows = await db.getAllTableRows(active_table);
  const table_rows_categories = await db.getAllTableRows('categories');
  const table_rows_brands = await db.getAllTableRows('brands');

  res.render('dashboard', {
    tables,
    active_table,
    table_rows,
    table_rows_categories,
    table_rows_brands
  });
});


const validateCategory = [
  body('category').trim()
    .isLength({ max: 20 }).withMessage(`Category's name should not exceed 20 characters `),

]

const createCategory = [validateCategory, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const invalid_category = req.body.category;
    const tables = await db.getAllTables();
    const active_table = 'categories';
    const table_rows = await db.getAllTableRows(active_table);
    const table_rows_categories = await db.getAllTableRows('categories');
    const table_rows_brands = await db.getAllTableRows('brands');
    return res.render('dashboardError', {
      tables,
      active_table,
      table_rows,
      table_rows_categories,
      table_rows_brands,
      errors: errors.array(),
      invalid_category
    });
  }
  const newCategory = req.body.category;
  await db.addNewCategory(newCategory);
  res.redirect('/dashboard?active=categories');
})]

const createBrand = asyncHandler(async (req, res) => {
  const newBrand = req.body.brand;
  await db.addNewBrand(newBrand);
  res.redirect('/dashboard?active=brands');
})

const createBoat = asyncHandler(async (req, res) => {
  const { category, brand, title, price, description } = req.body;
  const file = req.file;
  const category_id = await db.getCategoryId(category);
  const brand_id = await db.getBrandId(brand);
  const boatResult = await db.addNewBoat(category_id, brand_id, title, price, description);
  const boatId = boatResult.rows[0].id;
  await db.addNewImages(boatId, file.buffer);
  res.redirect('/dashboard?active=boats');

})

module.exports = {
  dashboardRouterGet,
  createCategory,
  createBrand,
  createBoat
}