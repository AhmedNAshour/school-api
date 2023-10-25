const bcrypt = require('bcrypt');
module.exports = class User {
  constructor({
    utils,
    // cache,
    config,
    // cortex,
    managers,
    // validators,
    mongomodels,
  } = {}) {
    this.config = config;
    // this.cortex = cortex;
    // this.validators = validators;
    this.mongomodels = mongomodels;
    this.tokenManager = managers.token;
    // this.usersCollection = 'users';
    this.httpExposed = [
      'post=createUser',
      'post=login',
      'get=getAllUsers',
      'get=getUserById',
      'put=updateUser',
      'delete=deleteUser',
    ];
  }

  async getUserById({ __superAdminAuth, userId }) {
    // console.log('getUserById', userId);
    try {
      const user = await this.mongomodels.user.findById(userId);
      if (!user) {
        return { error: 'User not found' };
      }
      return user;
    } catch (err) {
      // throw new Error(err.message);
    }
  }

  async getAllUsers({ __superAdminAuth }) {
    try {
      const users = await this.mongomodels.user.find();
      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createUser({ __superAdminAuth, username, password, role, schoolId }) {
    // Check if the provided role is valid
    if (role !== 'superadmin' && role !== 'schooladmin') {
      return { error: 'Invalid role' };
    }

    try {
      const existingUser = await this.mongomodels.user.findOne({ username });
      if (existingUser) {
        return { error: 'User already exists' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new this.mongomodels.user({
        username,
        password: hashedPassword,
        role,
        school: role === 'schooladmin' ? schoolId : null,
      });

      await newUser.save();

      let longToken = this.tokenManager.genLongToken({
        userId: newUser._id,
        username: newUser.username,
        role: newUser.role,
        schoolId: role === 'schooladmin' ? newUser.school : null,
      });

      // Response
      return {
        user: newUser,
        longToken,
      };

      // return { message: 'User created successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateUser({ __superAdminAuth, username, role, userId }) {
    try {
      const updatedUser = await this.mongomodels.user.findByIdAndUpdate(
        userId,
        { username, role },
        { new: true }
      );
      if (!updatedUser) {
        return { error: 'User not found' };
      }
      return updatedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteUser({ __superAdminAuth, userId }) {
    try {
      const deletedUser = await this.mongomodels.user.findByIdAndRemove(userId);
      if (!deletedUser) {
        return { error: 'User not found' };
      }
      return deletedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login({ username, password }) {
    try {
      const user = await this.mongomodels.user.findOne({ username });
      if (!user) {
        return { error: 'Invalid credentials' };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { error: 'Invalid credentials' };
      }
      let longToken = this.tokenManager.genLongToken({
        userId: user._id,
        username: user.username,
        role: user.role,
        schoolId: user.school,
      });
      // console.log('user', user);
      // console.log('longToken', longToken);
      return { message: 'Login successful', longToken };
    } catch (error) {
      return { error: error.message };
    }
  }
};
