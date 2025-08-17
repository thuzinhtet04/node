const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const path = require("path");
const jwt = require("jsonwebtoken");
const { userInfo } = require("os");

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwtRefreshToken) return res.sendStatus(401);

  console.log(cookies.jwtRefreshToken);
  const refreshToken = cookies.jwtRefreshToken;

  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) return res.sendStatus(403); // forbidden

  const roles = Object.values(foundUser.roles);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.username !== foundUser.username)
      return res.json({ error: err.message });
    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  }); //evaluate jwt
};

module.exports = {
  handleRefreshToken,
};
