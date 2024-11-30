const db = require('../db/queries');
const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require('../errors/customNotFoundError');

const dashboardRouterGet = asyncHandler(async (req, res) => {
  const active_table = req.query.active;
  const tables = await db.getAllTables();
  const table_rows = await db.getAllTableRows(active_table);
  const table_rows_categories = await db.getAllTableRows('categories');
  const table_rows_brands = await db.getAllTableRows('brands');
  res.render('dashboard', {tables, active_table, table_rows, table_rows_categories, table_rows_brands});
})


const createCategory = asyncHandler(async (req, res) => {
  const newCategory = req.body.category;
  await db.addNewCategory(newCategory);
  res.redirect('/dashboard?active=categories');
})

const createBrand = asyncHandler(async (req, res) => {
  const newBrand = req.body.brand;
  await db.addNewBrand(newBrand);
  res.redirect('/dashboard?active=brands');
})

const createBoat = asyncHandler(async (req, res) => {
  const { category, brand, title, price, description } = req.body;
  const files = req.files;
  const category_id = await db.getCategoryId(category);
  const brand_id = await db.getBrandId(brand);
  const boatResult = await db.addNewBoat(category_id, brand_id, title, price, description);
  const boatId = boatResult.rows[0].id;
  for (const file of files) {
    await db.addNewImages(boatId, file.buffer);
  };
  res.redirect('/dashboard?active=boats');

})

module.exports = {
  dashboardRouterGet,
  createCategory,
  createBrand,
  createBoat
}