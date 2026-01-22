const Category = require("../db/category");
const mongoose = require("mongoose");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Create
async function addCategory(model) {
  const category = new Category({
    name: model.name,
  });
  await category.save();
  return category.toObject();
}

// Read All
async function getCategories() {
  const categories = await Category.find({});
  return categories.map((c) => c.toObject());
}

// Read One
async function getCategoryById(id) {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID");
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");
  return category.toObject();
}

// Update
async function updateCategory(id, model) {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID");
  const updated = await Category.findOneAndUpdate({ _id: id }, model, {
    new: true,
  });
  return updated ? updated.toObject() : null;
}

// Delete
async function deleteCategory(id) {
  if (!isValidObjectId(id)) throw new Error("Invalid category ID");
  const deleted = await Category.findByIdAndDelete(id);
  return deleted ? deleted.toObject() : null;
}

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
