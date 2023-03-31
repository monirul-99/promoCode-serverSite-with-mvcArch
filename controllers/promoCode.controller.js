const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/dbConnect");

module.exports.allPromoCode = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection("PromoCodeData").find({}).toArray();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports.deletedById = async (req, res, next) => {
  try {
    const db = getDB();
    const id = req.params.id;
    const result = await db
      .collection("PromoCodeData")
      .deleteOne({ _id: ObjectId(id) });
    console.log(result);
    if (result?.deletedCount) {
      return res.json({ status: true, data: result });
    }
    res.send({ status: false });
  } catch (err) {
    next(err);
  }
};

module.exports.promoCodePost = async (req, res, next) => {
  try {
    const db = getDB();
    const tools = req.body;
    console.log(tools);
    const result = await db.collection("PromoCodeData").insertOne(tools);
    if (!result.insertedId) {
      return res.status(400).send({ status: false, error: "Something Wrong" });
    }
    res.send({
      success: true,
      message: `Promo Code Added With Id: ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateCode = async (req, res, next) => {
  try {
    const db = getDB();
    const id = req.params.id;
    const title = req.body.title;
    const discount = req.body.discount;
    console.log(id, title, discount);
    const filter = { _id: ObjectId(id) };
    const updateDoc = {
      $set: { title, discount },
    };
    const result = await db
      .collection("PromoCodeData")
      .updateOne(filter, updateDoc);
    if (result?.acknowledged) {
      return res.json({ status: true, data: result });
    }
    res.send({ status: false });
  } catch (err) {
    next(err);
  }
};
