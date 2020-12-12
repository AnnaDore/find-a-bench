const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const uploadCloud = require("../configs/cloudinary");
const Bench = require("../models/Bench");
const User = require("../models/User");

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/", (req, res, next) => {
  Bench.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addBench", async (req, res, next) => {
  const { lat, lng} = req.body;
  // console.log(location)
  try {
    const bench = await Bench.create({
      location: {
        lat: lat,
        lng
       
      },
      description: "", 
      imageUrl: "",
      creator: req.session.user._id
    });
    await User.findOneAndUpdate(
      { _id: req.session.user._id },
      { $push: { benches: bench._id } }
    );
    // req.session.user = user
    res.status(200).json(bench);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/profile/:id", (req, res, next) => {
  //res.status(200).json(req.params)
  const { id } = req.params.id;
  User.findOne(id)
  .populate("benches")
    .then((data) => {
      console.log(data, "user")
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "there is no user" });
    });
});

router.get("/bench/:id", (req, res, next) => {
  console.log(req.params.id, "route params.id index.js");
  console.log(req.params, "route params index.js");
  const { id } = req.params;
  console.log(id, "route params index.js");
  // Bench.find(id)
  Bench.findOne({_id: id})
    .then((data) => {
      res.status(200).json(data);
      console.log(data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    });
});

router.post(
  "/bench/:id/benchAvatar",
  uploadCloud.single("benchAvatar"),
  (req, res, next) => {
    const { id } = req.params;

    // if(!req.session.user) {
    //   res.status(401).json({ message: 'User not found' })
    // }
    console.log(req.file.filepath)
    console.log(id)
    Bench.findOneAndUpdate({ id: id }, { imageUrl: req.file.filepath })
      .then((data) => {
        res.status(200).json(data);
        console.log(data, "BE avatar route")
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
      });
  }
);

router.post('/bench/:id/edit', async (req, res, next) => {
  const { description, imageUrl, location } = req.body
  console.log(req.body, "req.body BE")
 
  const { id } = req.params;
  console.log(id, "id be")
  console.log(req.session.user, "user")
  try {
    const benchDoc = await Bench.findOneAndUpdate(
      {_id: id}, 
      { $set: {
        description: description, 
      //  imageUrl: imageUrl, 
        location: location,
      }}, 
      {new: true}
      )
      console.log(benchDoc, "edit be")
  }

  catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }

})



module.exports = router;
