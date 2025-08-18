const User = require("../model/User");

const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fsPromise = require("fs").promises;

const handleLogin = async (req, res) => {
  const { user, pass } = req.body;
  if (!user || !pass)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = await User.findOne({ username: user });
  if (!foundUser) return res.sendStatus(401); //unauthorized

  //evaluate passowrd
  const match = await bcrypt.compare(pass, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);

    //create jwt token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles, //set role in jwt token for authorization
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //saving refreshtoken with current user

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwtRefreshToken", refreshToken, {
      httpOnly: true,
      // sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
};
