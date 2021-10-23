const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const consts = require('../utils/consts');

module.exports = {
  register: async function(req, res) {
    try {
      const { password, email } = req.body;
      const userRegistered = await UserModel.findOne({ email });
  
      if (userRegistered) {
        return res.status(409).json({
          code: 409,
          message: 'Email already registered!'
        });
      }
      const user = new UserModel(req.body);

      user.password = bcryptjs.hashSync(password, consts.BCRYPT_SALT);

      await user.save();

      user.password= undefined;

      return res.status(201).json(user);

    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Error on saving user!',
        error
      })
    }
  },

  login: async function(req, res) {
    try {
      const { email, password: uPassword } = req.body;

      if (!email || !uPassword) {
        return res.status(422).json({
          code: 422,
          message: 'Email and password is required!'
        });
      }

      const user = await UserModel.findOne({ email });
      const passwordMatch = user ? bcryptjs.compareSync(uPassword, user.password) : null;

      if (!user || !passwordMatch) {
        return res.status(401).json({
          code: 401 ,
          message: 'Incorrect email or password!'
        });
      }

      let token = jwt.sign({ _id: user.id }, consts.JWT_KEY, {
        expiresIn: consts.JWT_EXPIRESIN
      });

      user.password = undefined;

      return res.json({ ...user._doc, token });

    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Error trying login!',
        error
      });
    }
  },

  checkToken: function(req, res, next) {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).json({
        code: 401 ,
        message: 'Token is not provided!',
      });
    }

    jwt.verify(token, consts.JWT_KEY, (error, decoded) => {
      if (error || !decoded) {
        return res.status(401).json({
          code: 401 ,
          message: 'Wrong token provided!',
          error
        });
      }

      next();
    });
  },

  userData: function(req, res) {
    const token = req.get('Authorization');

    jwt.verify(token, consts.JWT_KEY, (e, decoded) => {
      const id = decoded._id;
      UserModel.findById(id).lean().exec(function(error, user) {
        if (error || !user) {
          return res.status(500).json({
            code: 401 ,
            message: 'Error when trying to fetch user data!',
            error
          })
        }

        let token = jwt.sign({ _id: user.id }, consts.JWT_KEY, {
          expiresIn: consts.JWT_EXPIRESIN
        });

        user.password = undefined;

        return res.json({ ...user, token });
      });
    })
  }
}
