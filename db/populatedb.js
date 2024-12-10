const {Client} = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  category VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  brand VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS boats (
  id SERIAL PRIMARY KEY,
  category_id INTEGER DEFAULT NULL REFERENCES categories(id) ON DELETE SET DEFAULT,
  brand_id INTEGER DEFAULT NULL REFERENCES categories(id) ON DELETE SET DEFAULT,
  title VARCHAR NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  views INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS boat_images (
  id SERIAL PRIMARY KEY,
  boat_id INTEGER REFERENCES boats(id) ON DELETE CASCADE,
  image BYTEA NOT NULL
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