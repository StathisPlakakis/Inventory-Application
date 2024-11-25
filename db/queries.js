const pool = require('./pool');


const getAllTables = async () => {
  const {rows} = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name != 'boats';");
  const result = await Promise.all(
    rows.map(async (row) => {
    const table_name = row.table_name;
    const total_items_result =  await pool.query(`SELECT COUNT(*) AS total FROM ${table_name}`);
    const total_items = total_items_result.rows[0].total;
    return {table_name, total_items}
    })
  )
  return result;
}

const addNewCategory = async (name) => {
  await pool.query('INSERT INTO categories (category) VALUES ($1)', [name]);
}

const addNewBrand = async (name) => {
  await pool.query('INSERT INTO brands (brand) VALUES ($1)', [name]);
}


module.exports = {
  getAllTables,
  addNewCategory,
  addNewBrand
}