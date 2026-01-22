const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../handlers/product-handler");

const { verifyToken, isAdmin } = require("../middleware/auth-middleware");
const router = express.Router();

router.post("/",verifyToken,isAdmin, async (req, res) => {
  let model = req.body;
  let product = await addProduct(model);
  res.send(product);
});
router.put("/:id",verifyToken,isAdmin, async (req, res) => {
  let model = req.body;
  let id = req.params["id"];
  await updateProduct(id, model);
  res.send({ message: "updated" });
});
router.delete("/:id",verifyToken,isAdmin, async (req, res) => {
  let id = req.params["id"];
  await deleteProduct(id);
  res.send({ message: "deleted" });
});
router.get("/:id",verifyToken, async (req, res) => {
  let id = req.params["id"];
  let product = await getProduct(id);
  res.send(product);
});
router.get("/", async (req, res) => {
  let products = await getAllProducts();
  res.send(products);
});

router.get("/suggestions", async (req, res) => {
  try {
    const term = req.query.term;
    if (!term || term.length < 2) {
      return res
        .status(400)
        .json({ message: "At least 2 letters are required" });
    }

    const result = await getProductSuggestions(term);

    if (result.error) {
      return res
        .status(500)
        .json({ message: "Error fetching suggestions", error: result.error });
    }

    res.json(result.data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
