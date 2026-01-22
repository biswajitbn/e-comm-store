const Brand = require("./../db/brand");
const mongoose = require('mongoose');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getBrands() {
  const brands = await Brand.find();
  return brands.map(x => x.toObject());
}

async function getBrand(id) {
  if (!isValidObjectId(id)) throw new Error('Invalid brand ID');

  const brand = await Brand.findById(id);
  if (!brand) throw new Error('Brand not found');
  return brand.toObject();
}

async function getBrandsByCategory(categoryId) {
  if (!isValidObjectId(categoryId)) {
    throw new Error('Invalid category ID');
  }

  const brands = await Brand.find({ categoryId: categoryId });
  return brands.map(x => x.toObject());
}

async function addBrand(model) {
  if (!model.categoryId || !isValidObjectId(model.categoryId)) {
    throw new Error("Valid categoryId is required when creating a brand");
  }

  let brand = new Brand({
    name: model.name,
    categoryId: model.categoryId
  });

  await brand.save();
  return brand.toObject();
}

async function updateBrand(id, model) {
  if (!isValidObjectId(id)) throw new Error('Invalid brand ID');

  const updated = await Brand.findByIdAndUpdate(id, model, { new: true });
  if (!updated) throw new Error("Brand not found");
  return updated.toObject();
}

async function deleteBrand(id) {
  if (!isValidObjectId(id)) throw new Error('Invalid brand ID');

  const deleted = await Brand.findByIdAndDelete(id);
  if (!deleted) throw new Error("Brand not found");
  return deleted.toObject();
}

module.exports = {
  getBrands,
  getBrand,
  getBrandsByCategory,
  addBrand,
  updateBrand,
  deleteBrand
};
