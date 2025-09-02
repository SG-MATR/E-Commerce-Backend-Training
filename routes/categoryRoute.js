const { createCategory, findAllCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');

const express = require('express');

const categoryRoute = express.Router();
categoryRoute.post('/',createCategory)
categoryRoute.get('/',findAllCategories)
categoryRoute.put('/:id',updateCategory)
categoryRoute.delete('/:id',deleteCategory)

module.exports =categoryRoute