const db = require('../db/queries');
const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require('../errors/customNotFoundError');

const dashboardRouterGet = asyncHandler(async (req, res) => {
  const active_table = req.query.active;
  const tables = await db.getAllTables();
  if (!tables) {
    throw new CustomNotFoundError('Not tables found!');
  }
  res.render('dashboard', {tables, active_table});
})


const createCategory = asyncHandler(async (req, res) => {
  const newCategory = req.body.category;
  await db.addNewCategory(newCategory);
  res.redirect('/dashboard');
})

module.exports = {
  dashboardRouterGet,
  createCategory
}