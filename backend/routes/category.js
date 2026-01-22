const express = require("express");
const router = express.Router();
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById
} = require("../handlers/category-handler");

// Add new category
router.post("", async (req, res) => {
  const model = req.body;
  const result = await addCategory(model);
  res.send(result);
});

// Get all categories
router.get("", async (req, res) => {
  const result = await getCategories();
  res.send(result);
});

// Get single category by ID
router.get("/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await getCategoryById(id);
  res.send(result);
});

// Update category by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const model = req.body;
  await updateCategory(id, model);
  res.send({ message: "updated" });
});

// Delete category by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteCategory(id);
  res.send({ message: "deleted" });
});

module.exports = router;
