var express = require("express");
var router = express.Router();

const menu = require("../services/ussd");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", function (req, res) {
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});

module.exports = router;
