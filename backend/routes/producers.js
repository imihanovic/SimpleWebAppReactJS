var express = require("express");
var router = express.Router();
const producerController = require("../controllers/ProducerController.js");
const requireAuth = require("../auth/requireAuth.js");

router.use(requireAuth);

router.get("/all", producerController.getAll);
router.get("/get/:id", producerController.getById);
router.post("/add", producerController.create);
router.patch("/edit/:id", producerController.update);
router.delete("/remove/:id", producerController.remove);

module.exports = router;
