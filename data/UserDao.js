const User = require("../model/User");
const { hashPassword } = require("../util/hashing");

class UserDao {

  async create({ username, password, role }) { // create a user in the databse 
    const hash = await hashPassword(password);
    const user = await User.create({ username, password: hash, role });
    return user;
  }

  // returns null if no user matches the search query
  async readOne(username) {
    const user = await User.findOne({ username });
    return user;
  }

}

module.exports = UserDao;