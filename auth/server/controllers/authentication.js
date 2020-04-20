const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();
    res.status(201).send({ success: true });
  } catch (err) {
    next(err);
  }
};
