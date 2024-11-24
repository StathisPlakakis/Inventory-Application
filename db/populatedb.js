const {Client} = require('pg');
require('dotenv').config();

const SQL = `
  CREATE TABLE IF NOT EXISTS boats (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER,
  brand_id INTEGER,
  title VARCHAR,
  price INTEGER,
  description VARCHAR,
  images TEXT[],
  date VARCHAR,
  views INTEGER
  );

  CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category VARCHAR (30)
  );

  CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand VARCHAR (50)
  );
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();