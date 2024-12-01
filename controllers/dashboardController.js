const db = require('../db/queries');
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

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

const validateBrand = [
  body('brand').trim()
    .isLength({max : 30}).withMessage('Brand\'s name should not exceed 30 characters ')
]

const createBrand = [validateBrand, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const invalid_brand = req.body.brand;
    const tables = await db.getAllTables();
    const active_table = 'brands';
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
      invalid_brand
    });
  }
  const newBrand = req.body.brand;
  await db.addNewBrand(newBrand);
  res.redirect('/dashboard?active=brands');
})]

const validateBoat = [
  body('price').trim()
    .not().isEmpty().withMessage('Price is required')
    .isInt().withMessage('Price should be an integer')
    .isInt({ min: 1, max: 999999999 }).withMessage('Price must be a positive integer less than 1,000,000,000')
]

const createBoat = [
  validateBoat,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { category, brand, title, price, description } = req.body;
      const tables = await db.getAllTables();
      const table_rows = await db.getAllTableRows('boats');
      const table_rows_categories = await db.getAllTableRows('categories');
      const table_rows_brands = await db.getAllTableRows('brands');

      return res.render('dashboardError', {
        tables,
        active_table: 'boats',
        table_rows,
        table_rows_categories,
        table_rows_brands,
        errors: errors.array(),
        invalid_category: category,
        invalid_brand: brand,
        invalid_title: title,
        invalid_description: description,
        invalid_price: price,
      });
    }
    const { category, brand, title, price, description } = req.body;
    const file = req.file;
    const category_id = await db.getCategoryId(category);
    const brand_id = await db.getBrandId(brand);
    const boatResult = await db.addNewBoat(category_id, brand_id, title, price, description);
    if (file) {
      const boatId = boatResult.rows[0].id;
      const fileBuffer = file.buffer;
      await db.addNewImages(boatId, fileBuffer);
    }
    res.redirect('/dashboard?active=boats');
  },
];

module.exports = {
  dashboardRouterGet,
  createCategory,
  createBrand,
  createBoat
}