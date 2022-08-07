const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
// REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    username: name,
    email: email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Login Controller
const login = async (req, res) => {
  // const { username } = req.body;

  try {
    const user = await User.findOne({ username: req.body.username });
    // !user && res.status(401).json(" Wrong Credentials! ");
    if (!user) {
      res.status(401).json(" Wrong Credentials! ");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const pass = hashedPassword.toString(CryptoJS.enc.Utf8);
    // pass !== password && res.status(401).json(" Wrong Credentials! ");
    if (pass !== req.body.password) {
      res.status(401).json(" Wrong Credentials! ");
    }
    //JWT
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
        process.env.JWT_KEY,
        {expiresIn: "3d"}
      
    )
    const {password , ...others} = user._doc
    res.status(200).json({...others, accessToken})
  } catch(err){
    console.log(err)
  }
};

module.exports = { register, login };
