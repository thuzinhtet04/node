const User = require("../model/User");

const path = require("path");

const handleLogout = async (req, res) => {
  //on client delete also access token
  const cookies = req.cookies;
  if (!cookies?.jwtRefreshToken) return res.sendStatus(204); //no content

  const refreshToken = cookies.jwtRefreshToken;

  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    res.clearCookie("jwtRefreshToken", {
      httpOnly: true,
      // sameSite: "None",
      secure: true,
    });

    return res.sendStatus(204); // no-content
  }
  //Delete refresh token in db

  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwtRefreshToken", {
    httpOnly: true,
    // sameSite: "None",
    secure: true,
  }); // in production , add also  secure : true , that only work in https:// not http://

  return res.sendStatus(204); // forbidden
};

module.exports = {
  handleLogout,
};
