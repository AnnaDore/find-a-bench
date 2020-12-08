const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: "Please fill all fields" });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: "Password has to have at least 8 characters" });
    return;
  }

  if (username.length < 3) {
    res.status(400).json({ message: "Username has to be at least 3 characters" });
    return;


  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    res.status(500).json({ message: "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter." });
    return;
  }

  try {
    const userFound = await User.findOne({ username });
    if (userFound) {
      res.status(400).json({ message: "This username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const user = await User.create({ username: username, password: hashPass, email: email });

    req.session.user = user;
    res.status(200).json(user);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body
  
    console.log(req.body)
    if (!email || !password) {
      res.status(400).json({ message: 'Please, fill both fields' })
      return
    }
  
    try {
      const user = await User.findOne({ email })
  
      if (user) {
        const passwordCorrect = await bcrypt.compare(password, user.password)
        if (passwordCorrect) {
          req.session.user = user
          console.log(user, "user")
          console.log(req.session.user, "reqsesuse")
          res.status(200).json(user)
        } else {
            res
          .status(400)
          .json({ message: 'Password is incorrect' })
        }
      } else {
        res
          .status(400)
          .json({ message: 'User does not exist' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    }
  })

  router.get('/loggedin', (req, res) => {
    console.log('loggedin auth be')
    console.log(req.session.user, "req.session.user")
    if (req.session.user) {
      res.status(200).json(req.session.user)
    } else {
      res.status(400).json({ message: 'No user in session' })
    }
  })



  router.get('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({ message: 'User is logged out' })
  })



module.exports = router