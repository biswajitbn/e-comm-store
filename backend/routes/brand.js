const express = require("express");
const {
  addBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getBrands,
  getBrandsByCategory, // ✅ Make sure to import this
} = require("../handlers/brand-handler");

const router = express.Router();

// ✅ Add a new brand
router.post("", async (req, res) => {
  const model = req.body;
  const result = await addBrand(model);
  res.send(result);
});

// ✅ Update an existing brand
router.put("/:id", async (req, res) => {
  const model = req.body;
  const id = req.params["id"];
  await updateBrand(id, model);
  res.send({ message: "updated" });
});

// ✅ Delete a brand
router.delete("/:id", async (req, res) => {
  const id = req.params["id"];
  await deleteBrand(id);
  res.send({ message: "deleted" });
});

// ✅ Get a brand by ID
router.get("/:id", async (req, res) => {
  const id = req.params["id"];
  const brand = await getBrand(id);
  res.send(brand);
});

// ✅ Add a new brand
router.post("", async (req, res) => {
  const model = req.body;
  const result = await addBrand(model); // <- Calls the handler function
  res.send(result);
});


// ✅ Get all brands or filter by categoryId
router.get("", async (req, res) => {
  const categoryId = req.query.categoryId;

  let brands;
  if (categoryId) {
    brands = await getBrandsByCategory(categoryId);
  } else {
    brands = await getBrands();
  }

  res.send(brands);
});

module.exports = router;
