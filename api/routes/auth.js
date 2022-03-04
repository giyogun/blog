const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const dbUser = await User.findOne({ email: req.body.email });
    const username = await User.findOne({ username: req.body.username });

    if (username) {
      res.status(401).send("Username is not available");
    } else if (dbUser) {
      res.status(401).send("Email is already registered");
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
      const user = await newUser.save();

      res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // const user = await User.findOne({ username: req.body.username });
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);

    // if (!validated) res.status(400).json("Wrong credentials!");
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    if (error) {
      // return res.status(500).json(error);
    }
  }
});

module.exports = router;
