var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bank_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const banksScheme = new Schema({
  name: String,
  rate: Number,
  credit: Number,
  payment: Number,
  term: Number,
});

const Bank = mongoose.model("Bank", banksScheme);

router.get("/", function (req, res, next) {
  Bank.find({}, function (err, docs) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch failed!" } });
    res.status(200).json({ success: true, data: docs });
  });
});

router.post("/add", function (req, res, next) {
  const bank = new Bank({
    name: req.body.bankName,
    rate: parseInt(req.body.bankRate),
    credit: parseInt(req.body.bankCredit),
    payment: parseInt(req.body.bankPayment),
    term: parseInt(req.body.bankTerm),
  });
  bank.save(function (err, bankDoc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Saving failed!" } });
    res.status(200).json({ success: true, bankId: bankDoc._id });
  });
});

router.delete("/", function (req, res, next) {
  Bank.findByIdAndDelete(req.body.bankId, function (err, doc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Delete failed!" } });
    res.status(200).json({ success: true });
  });
});

router.get("/:bankId", function (req, res, next) {
  Bank.findById(req.params["bankId"], function (err, doc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch failed!" } });
    res.status(200).json({ success: true, data: doc });
  });
});

router.put("/update", function (req, res, next) {
  Bank.findByIdAndUpdate(
    req.body.bankId,
    {
      name: req.body.bankName,
      rate: parseInt(req.body.bankRate),
      credit: parseInt(req.body.bankCredit),
      payment: parseInt(req.body.bankPayment),
      term: parseInt(req.body.bankTerm),
    },
    function (err, bankDoc) {
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Saving failed!" } });
      res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
