const express = require("express");
const router = express.Router();
const Bench = require("../models/Bench");
const User = require("../models/User");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/", (req, res, next) => {

  Bench.find({})
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
  })
});

router.post("/addBench", async (req, res, next) => {
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



router.get('/profile/:id', (req, res, next) => {
  //res.status(200).json(req.params)
  const { id } = req.params.id
  User.find(id)
  .then(data => {
   // console.log(data)
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
    res
        .status(400)
        .json({ message: 'there is no user' })
  })
})

router.get("/bench/:id", (req, res, next) => {
  console.log(req.params.id, "route params index.js")
  Bench.findById(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  })
})


module.exports = router;
