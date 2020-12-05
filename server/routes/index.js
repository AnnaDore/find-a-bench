const express = require("express");
const router = express.Router();
const Bench = require("../models/Bench");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/", async (req, res, next) => {
  const { lat, lng } = req.body
 // console.log(location)
  try {
    const bench = await Bench.create({
      location: {
        lat: lat, 
        lng
      }
  
    });
   // req.session.user = user
    res.status(200).json(bench)
    return
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }

});

module.exports = router;
