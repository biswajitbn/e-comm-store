const express = require('express');
const { getNewProducts, getFeaturedProducts,getProductForListing } = require('../handlers/product-handler');
const { getCategories } = require('../handlers/category-handler');
const { getBrands, getBrandsByCategory } = require('../handlers/brand-handler');
const { verifyToken } = require('../middleware/auth-middleware'); // ✅ Add this
const router = express.Router();

// ✅ Use verifyToken if these routes require token
router.get('/new-products', async (req, res) => {
    const products = await getNewProducts();
    res.send(products);
});

router.get('/featured-products', async (req, res) => {
    const products = await getFeaturedProducts();
    res.send(products);
});

router.get('/categories', async (req, res) => {
    const categories = await getCategories();
    res.send(categories);
}); 

router.get('/brands', async (req, res) => {
  const { categoryId } = req.query;
//   console.log('categoryId query param:', categoryId);

  if (categoryId) {
    const brands = await getBrandsByCategory(categoryId);
    return res.send(brands);
  }

  const brands = await getBrands();
  res.send(brands);
});


router.get('/brands-by-category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const brands = await getBrandsByCategory(categoryId);
  res.send(brands);
});

router.get('/products', async (req, res) => {
    const { searchTerm, categoryId, sortBy, sortOrder, brandId, pageSize, page }= req.query;
    const products = await getProductForListing(searchTerm, categoryId, sortBy, sortOrder, brandId, pageSize, page);
    res.send(products);
});



module.exports = router;
