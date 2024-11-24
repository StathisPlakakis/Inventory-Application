const pool = require('./pool');


const getAllTables = async () => {
  const {rows} = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name != 'boats';");
  return rows.map(row => row.table_name);
}

module.exports = {
  getAllTables
}