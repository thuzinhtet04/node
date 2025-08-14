const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
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

  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); //for conflit
  
  try {
    const hashedPwd = await bcrypt.hash(pass, 10);
    const newUser = {
      username: user,
      roles : {
        User : 2001,
      },
      password: hashedPwd,
    };

    userDB.setUsers([...userDB.users, newUser]);


    //save user data in json file
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
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
