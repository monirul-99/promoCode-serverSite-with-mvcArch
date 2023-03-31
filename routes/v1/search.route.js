const express = require("express");
const searchRoute = require("../../controllers/searchQuery");

const router = express.Router();
router.route("/:search").get(searchRoute.searchPromo);

module.exports = router;
