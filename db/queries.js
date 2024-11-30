const pool = require('./pool');


const getAllTables = async () => {
  const {rows} = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name != 'boat_images';");
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

const getAllTableRows = async (name) => {
  let column;
  if (name === 'categories') {
    column = 'category';
  }else if (name === 'brands') {
    column = 'brand';
  }else {
    column = 'title';
  }
  const {rows} = await pool.query(
    `SELECT ${column} FROM ${name} ORDER BY ${column};`
  );
  return rows;
}

const getCategoryId = async (name) => {
  const category_id_result = await pool.query(`SELECT id FROM categories WHERE category = '${name}';`);
  return category_id_result.rows[0].id;
}

const getBrandId = async (name) => {
  const brand_id_result = await pool.query(`SELECT id FROM brands WHERE brand = '${name}';`);
  return brand_id_result.rows[0].id;
}

const addNewCategory = async (name) => {
  await pool.query('INSERT INTO categories (category) VALUES ($1)', [name]);
}

const addNewBrand = async (name) => {
  await pool.query('INSERT INTO brands (brand) VALUES ($1)', [name]);
}

const addNewBoat = async (category_id, brand_id, title, price, description) => {
  return await pool.query(
    'INSERT INTO boats (category_id, brand_id, title, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [category_id, brand_id, title, price, description]
  );
}

const addNewImages = async (boat_id, file) => {
    await pool.query(
      'INSERT INTO boat_images (boat_id, image) VALUES ($1, $2)',
      [boat_id, file]
    );
  }




module.exports = {
  getAllTables,
  getAllTableRows,
  getCategoryId,
  getBrandId,
  addNewCategory,
  addNewBrand,
  addNewBoat,
  addNewImages
}