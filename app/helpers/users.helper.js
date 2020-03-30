const jwt = require('jsonwebtoken')
const model = require('../models/user.model')
const utils = require('../services/utils')
const auth = require('../services/auth')
const db = require('../services/db')
const { env, jwtExpiration, jwtSecret } = require('../../config/vars')

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = user => {
  // Gets expiration time
  const expiration = Math.floor(Date.now() / 1000) + 60 * jwtExpiration

  // returns signed and encrypted token
  return auth.encrypt(
    jwt.sign(
      {
        data: {
          _id: user
        },
        exp: expiration
      },
      jwtSecret
    )
  )
}

module.exports = {
  /**
   * Get users
   * @param req
   * @param role
   * @returns {Promise<any>}
   */
  async getUsers(req, role) {
    const searchQuery = await db.checkQueryString(req.query)
    if (role) {
      searchQuery.role = role
    }
    const aggregateQuery = model.aggregate([
      {
        $match: searchQuery
      }
    ])
    return await db.getAggregateItems(req, model, aggregateQuery)
  },

  /**
   * Creates an object with user info
   * @param {Object} req - request object
   */
  async setUserInfo(req) {
    let user = {
      _id: req._id,
      email: req.email,
      role: req.role,
      verified: false
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
  async returnRegisterToken(item, userInfo) {
    if (env !== 'production') {
      userInfo.verification = item.verification
    }
    return {
      token: generateToken(item._id),
      user: userInfo
    }
  },

  /**
   * Checks User model if user with an specific email exists
   * @param {string} email - user email
   */
  async emailExists(email) {
    return new Promise((resolve, reject) => {
      model.findOne(
        {
          email
        },
        (err, item) => {
          utils.itemAlreadyExists(err, item, reject, 'EMAIL_ALREADY_EXISTS')
          resolve(false)
        }
      )
    })
  }
}
