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
    `SELECT id, ${column} FROM ${name} ORDER BY ${column};`
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

const getImageByBoatId = async (boat_id) => {
  const result = await pool.query('SELECT image FROM boat_images WHERE boat_id = $1', [boat_id]);
  return result.rows[0].image; 
}

const getCategoryByid = async (id) => {
  const result = await pool.query('SELECT category FROM categories WHERE id = $1', [id]);
  return result.rows[0].category;
}

const getBrandByid = async (id) => {
  const result = await pool.query('SELECT brand FROM brands WHERE id = $1', [id]);
  return result.rows[0].brand;
}

const getBoatByid = async (id) => {
  const result = await pool.query('SELECT category_id, brand_id, title, price, description FROM boats WHERE id = $1', [id]);
  const category = result.rows[0].category_id ? await getCategoryByid(result.rows[0].category_id) : null;
  const brand = result.rows[0].brand_id ? await getBrandByid(result.rows[0].brand_id) : null;
  return {
    category,
    brand,
    title: result.rows[0].title,
    price: result.rows[0].price,
    description: result.rows[0].description,
  };
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


const updateCategory = async (category_id, newCategory) => {
  await pool.query(
    `UPDATE categories SET category = $1 WHERE id = $2`, [newCategory, category_id]
  )
}

const updateBrand = async (brand_id, newBrand) => {
  await pool.query(
    `UPDATE brands SET brand = $1 WHERE id = $2`, [newBrand, brand_id]
  )
}

const updateBoat = async (boat_id, newBrand, newCategory, newTitle, newPrice, newDescription) => {
  const brand_id = await getBrandId(newBrand);
  const category_id = await getCategoryId(newCategory)
  await pool.query(
    `UPDATE boats SET brand_id = $1, category_id = $2, title = $3, price = $4, description = $5  WHERE id = $6`, [
    brand_id,
    category_id,
    newTitle,
    newPrice,
    newDescription,
    boat_id
    ]
  )
}

const deleteCategoryById = async (category_id) => {
  await pool.query(
    `DELETE FROM categories WHERE id = $1`, [category_id]
  )
}

const deleteBrandById = async (brand_id) => {
  await pool.query(
    `DELETE FROM brands WHERE id = $1`, [brand_id]
  )
}


module.exports = {
  getAllTables,
  getAllTableRows,
  getCategoryId,
  getBrandId,
  getImageByBoatId,
  getCategoryByid,
  getBrandByid,
  getBoatByid,
  addNewCategory,
  addNewBrand,
  addNewBoat,
  addNewImages,
  updateCategory,
  updateBrand,
  updateBoat,
  deleteCategoryById,
  deleteBrandById,
}