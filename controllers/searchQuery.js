const { getDB } = require("../utils/dbConnect");

module.exports.searchPromo = async (req, res, next) => {
  try {
    const db = getDB();
    const title = req.params.search;
    const result = await db
      .collection("PromoCodeData")
      .findOne({ title: title });
    console.log(result);
    if (result) {
      return res.json({ status: true, data: result });
    }
    res.send({ status: false });
  } catch (err) {
    next(err);
  }
};
