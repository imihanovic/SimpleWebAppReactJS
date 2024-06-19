var express = require("express");
var router = express.Router();
const productController = require("../controllers/ProductController.js");
const requireAuth = require("../auth/requireAuth.js");

router.use(requireAuth);

router.get("/all", productController.getAllProducts);
router.get("/get/:id", productController.getById);
router.delete("/remove/:id", productController.remove);
router.patch("/edit/:id", productController.update);
router.post("/add", productController.create);

module.exports = router;
