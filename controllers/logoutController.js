const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const path = require("path");
const fsPromise = require("fs").promises;

const handleLogout = async (req, res) => {
  //on client delete also access token
  const cookies = req.cookies;
  if (!cookies?.jwtRefreshToken) return res.sendStatus(204); //no content

  const refreshToken = cookies.jwtRefreshToken;

  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwtRefreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
     
    });

    return res.sendStatus(204); // no-content
  }
  //Delete refresh token in db
  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromise.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );
  res.clearCookie("jwtRefreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
 
  }); // in production , add also  secure : true , that only work in https:// not http://

  return res.sendStatus(204); // forbidden
};

module.exports = {
  handleLogout,
};
