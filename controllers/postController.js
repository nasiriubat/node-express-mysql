const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

exports.getAll = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM posts');
    const posts = Array.from(results);
    res.json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.getOne = async (req, res) => {
  const itemId = req.params.id;
  try {
    const results = await pool.query('SELECT * FROM posts WHERE id = ?', [itemId]);
    if (results.length === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error('Error retrieving item:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the item' });
  }
};

exports.store = async (req, res) => {
  const newItem = req.body;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'title and description are required fields.' });
  }
  try {
    const result = await pool.query('INSERT INTO posts SET ?', newItem);
    res.status(201).json({ message: 'Item created successfully', itemId: result.insertId });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'An error occurred while creating the item' });
  }
};

exports.update = async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'title and description are required fields.' });
  }
  try {
    await pool.query('UPDATE posts SET ? WHERE id = ?', [updatedItem, itemId]);
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'An error occurred while updating the item' });
  }
};

exports.delete = async (req, res) => {
  const itemId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = ?', [itemId]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the item' });
  }
};

