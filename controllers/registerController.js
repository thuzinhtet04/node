const User = require("../model/User");

const fs = require("fs");
const fsPromise = fs.promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pass } = req.body;
  if (!user || !pass)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  // check for duplicate user
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //for conflit

  try {
    const hashedPwd = await bcrypt.hash(pass, 10);
    //create and store user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });


    console.log(result);
    res.status(201).json({
      message: "new user is created",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleNewUser,
};
