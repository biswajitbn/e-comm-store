const express = require("express");

const {
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
  getProductById, // ✅ added
} = require("../handlers/product-handler");

const { getCategories } = require("../handlers/category-handler");
const { getBrands, getBrandsByCategory } = require("../handlers/brand-handler");

const router = express.Router();

/*
====================================
PUBLIC ROUTES (NO TOKEN)
====================================
*/

// ✅ New products
router.get("/new-products", async (req, res) => {
  const products = await getNewProducts();
  res.send(products);
});

// ✅ Featured products
router.get("/featured-products", async (req, res) => {
  const products = await getFeaturedProducts();
  res.send(products);
});

// ✅ Categories
router.get("/categories", async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

// ✅ Brands (with optional category filter)
router.get("/brands", async (req, res) => {
  const { categoryId } = req.query;

  if (categoryId) {
    const brands = await getBrandsByCategory(categoryId);
    return res.send(brands);
  }

  const brands = await getBrands();
  res.send(brands);
});

// ✅ Brands by category (alternative route)
router.get("/brands-by-category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const brands = await getBrandsByCategory(categoryId);
  res.send(brands);
});

// ✅ Product listing (search + filter + pagination)
router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, sortBy, sortOrder, brandId, pageSize, page } =
    req.query;

  const products = await getProductForListing(
    searchTerm,
    categoryId,
    sortBy,
    sortOrder,
    brandId,
    pageSize,
    page,
  );

  res.send(products);
});

/*
====================================
GET PRODUCT BY ID (IMPORTANT FIX 🔥)
====================================
*/

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Error fetching product" });
  }
});

module.exports = router;
