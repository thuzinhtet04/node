const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const path = require("path");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pass } = req.body;
  if (!user || !pass)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); //unauthorized
  //evaluate passowrd
  const match = await bcrypt.compare(pass, foundUser.password);
  if (match) {
    //create jwt token
    res.json({
      success: "User is logged in!",
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
};
