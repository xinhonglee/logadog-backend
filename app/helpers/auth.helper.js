const jwt = require('jsonwebtoken')
const { addHours } = require('date-fns')
const uuid = require('uuid')

const User = require('../models/user.model')
const UserAccess = require('../models/userAccess.model')
const ForgotPassword = require('../models/forgotPassword.model')

const utils = require('../services/utils')
const auth = require('../services/auth')

const HOURS_TO_BLOCK = 2
const HOURS_TO_VERIFICATION = 24
const LOGIN_ATTEMPTS = 5

const { env, jwtExpiration, jwtSecret } = require('../../config/vars')

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = user => {
  // Gets expiration time
  const expiration = Math.floor(Date.now() / 1000) + 60 * jwtExpiration
  const issuedAt = Math.floor(Date.now() / 1000) - 30

  // returns signed and encrypted token
  return {
    jwt: auth.encrypt(
      jwt.sign(
        {
          data: {
            _id: user
          },
          exp: expiration,
          iat: issuedAt
        },
        jwtSecret
      )
    ),
    exp: expiration,
    iat: issuedAt
  }
}

/**
 * Checks that login attempts are greater than specified in constant and also
 * that blockexpires is less than now
 * @param {Object} user - user object
 */
const blockIsExpired = user =>
  user.loginAttempts > LOGIN_ATTEMPTS && user.blockExpires <= new Date()

module.exports = {
  /**
   * Creates an object with user info
   * @param {Object} req - request object
   */
  setUserInfo(req) {
    let user = {
      _id: req._id,
      firstName: req.firstName,
      lastName: req.lastName,
      email: req.email,
      role: req.role,
      verified: req.verified,
      image: req.image
    }
    // Adds verification for testing purposes
    if (env !== 'production') {
      user = {
        ...user,
        verification: req.verification,
        verificationExpires: req.verificationExpires
      }
    }
    return user
  },

  /**
   * Builds the registration token
   * @param {Object} item - user object that contains created id
   * @param {Object} userInfo - user object
   */
  returnRegisterToken(item, userInfo) {
    if (env !== 'production') {
      userInfo.verification = item.verification
    }
    const token = generateToken(item._id)
    return {
      token: token.jwt,
      tokenExpiresIn: token.exp,
      user: userInfo
    }
  },

  /**
   * Builds an object with created forgot password object, if env is development
   * or testing exposes the verification
   *  * @param {Object} item - created forgot password object
   */
  forgotPasswordResponse(item) {
    let data = {
      msg: 'RESET_EMAIL_SENT',
      email: item.email
    }
    if (env !== 'production') {
      data = {
        ...data,
        verification: item.verification
      }
    }
    return data
  },

  /**
   * Saves a new user access and then returns token
   * @param {Object} req - request object
   * @param {Object} user - user object
   */
  async saveUserAccessAndReturnToken(req, user) {
    return new Promise((resolve, reject) => {
      const userAccess = new UserAccess({
        email: user.email,
        ip: utils.getIP(req),
        browser: utils.getBrowserInfo(req),
        country: utils.getCountry(req)
      })
      userAccess.save(err => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        const userInfo = this.setUserInfo(user)
        const token = generateToken(user._id)
        // Returns data with access token
        resolve({
          token: token.jwt,
          tokenExpiresIn: token.exp,
          user: userInfo
        })
      })
    })
  },

  /**
   * Blocks a user by setting blockExpires to the specified date based on constant
   * HOURS_TO_BLOCK
   * @param {Object} user - user object
   */
  async blockUser(user) {
    return new Promise((resolve, reject) => {
      user.blockExpires = addHours(new Date(), HOURS_TO_BLOCK)
      user.save((err, result) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        if (result) {
          resolve(utils.buildErrObject(409, 'BLOCKED_USER'))
        }
      })
    })
  },

  /**
   * Saves login attempts to dabatabse
   * @param {Object} user - user object
   */
  async saveLoginAttemptsToDB(user) {
    return new Promise((resolve, reject) => {
      user.save((err, result) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        if (result) {
          resolve(true)
        }
      })
    })
  },

  /**
   *
   * @param {Object} user - user object.
   */
  async checkLoginAttemptsAndBlockExpires(user) {
    return new Promise((resolve, reject) => {
      // Let user try to login again after blockexpires, resets user loginAttempts
      if (blockIsExpired(user)) {
        user.loginAttempts = 0
        user.save((err, result) => {
          if (err) {
            reject(utils.buildErrObject(422, err.message))
          }
          if (result) {
            resolve(true)
          }
        })
      } else {
        // User is not blocked, check password (normal behaviour)
        resolve(true)
      }
    })
  },

  /**
   * Checks if blockExpires from user is greater than now
   * @param {Object} user - user object
   */
  async userIsBlocked(user) {
    return new Promise((resolve, reject) => {
      if (user.blockExpires > new Date()) {
        reject(utils.buildErrObject(409, 'BLOCKED_USER'))
      }
      resolve(true)
    })
  },

  /**
   * Finds user by email
   * @param {string} email - user´s email
   */
  async findUser(email) {
    return new Promise((resolve, reject) => {
      User.findOne(
        {
          email
        },
        'password loginAttempts blockExpires firstName lastName middleName email role verified verification image',
        (err, item) => {
          utils.itemNotFound(err, item, reject, 'USER_DOES_NOT_EXIST')
          resolve(item)
        }
      )
    })
  },

  /**
   * Finds user by ID
   * @param {string} userId - user´s id
   */
  async findUserById(userId) {
    return new Promise((resolve, reject) => {
      User.findById(userId, (err, item) => {
        utils.itemNotFound(err, item, reject, 'USER_DOES_NOT_EXIST')
        resolve(item)
      })
    })
  },

  /**
   * Adds one attempt to loginAttempts, then compares loginAttempts with the
   * constant LOGIN_ATTEMPTS, if is less returns wrong password, else returns
   * blockUser function
   *  * @param {Object} user - user object
   */
  async passwordsDoNotMatch(user) {
    user.loginAttempts += 1
    await this.saveLoginAttemptsToDB(user)
    return new Promise((resolve, reject) => {
      if (user.loginAttempts <= LOGIN_ATTEMPTS) {
        resolve(utils.buildErrObject(409, 'WRONG_PASSWORD'))
      } else {
        resolve(this.blockUser(user))
      }
      reject(utils.buildErrObject(422, 'ERROR'))
    })
  },

  /**
   * Registers a new user in database
   * @param {Object} req - request object
   */
  async registerUser(req) {
    return new Promise((resolve, reject) => {
      const user = new User({
        firstName: req.firstName,
        lastName: req.lastName,
        middleName: req.middleName,
        email: req.email,
        password: req.password,
        verification: uuid.v4(),
        status: 'available',
        verificationExpires: addHours(new Date(), HOURS_TO_VERIFICATION)
      })
      user.save((err, item) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        resolve(item)
      })
    })
  },

  /**
   * Checks if verification id exists for user
   * @param {string} id - verification id
   */
  async verificationExists(id) {
    return new Promise((resolve, reject) => {
      User.findOne(
        {
          verification: id,
          verified: false
        },
        (err, user) => {
          if (user && user.verificationExpires < new Date()) {
            reject(utils.buildErrObject(409, 'VERIFICATION_EXPIRED'))
          }
          utils.itemNotFound(err, user, reject, 'NOT_FOUND_OR_ALREADY_VERIFIED')
          resolve(user)
        }
      )
    })
  },

  /**
   * Check Verification
   * @param {Object} user - user object
   */
  async checkVerification(user) {
    return new Promise((resolve, reject) => {
      if (!user.verified) {
        reject(utils.buildErrObject(409, 'NOT_VERIFIED_USER'))
      }
      resolve(true)
    })
  },

  /**
   * Verifies an user
   * @param {Object} user - user object
   */
  async verifyUser(user) {
    return new Promise((resolve, reject) => {
      user.verified = true
      user.save((err, item) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        resolve({
          email: item.email,
          verified: item.verified
        })
      })
    })
  },

  /**
   * Marks a request to reset password as used
   * @param {Object} req - request object
   * @param {Object} forgot - forgot object
   */
  async markResetPasswordAsUsed(req, forgot) {
    return new Promise((resolve, reject) => {
      forgot.used = true
      forgot.ipChanged = utils.getIP(req)
      forgot.browserChanged = utils.getBrowserInfo(req)
      forgot.countryChanged = utils.getCountry(req)
      forgot.save((err, item) => {
        utils.itemNotFound(err, item, reject, 'NOT_FOUND')
        resolve(utils.buildSuccObject('PASSWORD_CHANGED'))
      })
    })
  },

  /**
   * Updates a user password in database
   * @param {string} password - new password
   * @param {Object} user - user object
   */
  async updatePassword(password, user) {
    return new Promise((resolve, reject) => {
      user.password = password
      user.save((err, item) => {
        utils.itemNotFound(err, item, reject, 'NOT_FOUND')
        resolve(item)
      })
    })
  },

  /**
   * Finds user by email to reset password
   * @param {string} email - user email
   */
  async findUserToResetPassword(email) {
    return new Promise((resolve, reject) => {
      User.findOne(
        {
          email
        },
        (err, user) => {
          utils.itemNotFound(err, user, reject, 'NOT_FOUND')
          resolve(user)
        }
      )
    })
  },

  /**
   * Checks if a forgot password verification exists
   * @param {string} id - verification id
   */
  async findForgotPassword(id) {
    return new Promise((resolve, reject) => {
      ForgotPassword.findOne(
        {
          verification: id,
          used: false
        },
        (err, item) => {
          utils.itemNotFound(err, item, reject, 'NOT_FOUND_OR_ALREADY_USED')
          if (item && item.verificationExpires < new Date()) {
            reject(utils.buildErrObject(409, 'VERIFICATION_EXPIRED'))
          }
          resolve(item)
        }
      )
    })
  },

  /**
   * Creates a new password forgot
   * @param {Object} req - request object
   */
  async saveForgotPassword(req) {
    return new Promise((resolve, reject) => {
      const forgot = new ForgotPassword({
        used: false,
        email: req.body.email,
        verification: uuid.v4(),
        verificationExpires: addHours(new Date(), HOURS_TO_VERIFICATION),
        ipRequest: utils.getIP(req),
        browserRequest: utils.getBrowserInfo(req),
        countryRequest: utils.getCountry(req)
      })
      forgot.save((err, item) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        resolve(item)
      })
    })
  },

  /**
   * Checks against user if has quested role
   * @param {Object} data - data object
   * @param {*} next - next callback
   */
  async checkPermissions(data, next) {
    return new Promise((resolve, reject) => {
      User.findById(data.id, (err, result) => {
        utils.itemNotFound(err, result, reject, 'NOT_FOUND')
        if (data.roles.indexOf(result.role) > -1) {
          return resolve(next())
        }
        return reject(utils.buildErrObject(401, 'UNAUTHORIZED'))
      })
    })
  },


  /**
   * Gets user id from token
   * @param {string} token - Encrypted and encoded token
   */
  async getUserIdFromToken(token) {
    return new Promise((resolve, reject) => {
      // Decrypts, verifies and decode token
      jwt.verify(auth.decrypt(token), jwtSecret, (err, decoded) => {
        if (err) {
          reject(utils.buildErrObject(409, 'BAD_TOKEN'))
        }
        resolve(decoded.data._id)
      })
    })
  }
}
