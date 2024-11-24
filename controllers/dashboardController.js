const db = require('../db/queries');
const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require('../errors/customNotFoundError');

const dashboardRouterGet = asyncHandler(async (req, res) => {
  const tables = await db.getAllTables();
  if (!tables) {
    throw new CustomNotFoundError('Not tables found!');
  }
  res.render('dashboard', {tables: tables, active_table: 'categories'});
})

module.exports = {
  dashboardRouterGet
}