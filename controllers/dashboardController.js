const db = require('../db/queries');

async function dashboardRouterGet(req, res) {
  const tables = await db.getAllTables();
  res.render('dashboard', {tables: tables});
}

module.exports = {
  dashboardRouterGet
}