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

module.exports = {
  dashboardRouterGet,
  createCategory,
  createBrand
}