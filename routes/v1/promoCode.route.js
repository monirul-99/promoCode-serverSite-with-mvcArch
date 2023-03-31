const express = require("express");
const jobControllers = require("../../controllers/promoCode.controller");

const router = express.Router();
router
  .route("/")
  .get(jobControllers.allPromoCode)
  .post(jobControllers.promoCodePost);

router
  .route("/:id")
  .delete(jobControllers.deletedById)
  .put(jobControllers.updateCode);

module.exports = router;
