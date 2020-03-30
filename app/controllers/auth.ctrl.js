const { matchedData } = require('express-validator')
const utils = require('../services/utils')
const auth = require('../services/auth')
const mailer = require('../services/mailer')
const authHelper = require('../helpers/auth.helper')
const { emailExists } = require('../helpers/users.helper')

/**
 * This function is called whenever a user tries to login to the CRM system
 * @param {Object} req - Request
 * @param {Object} res - Response
 */
exports.login = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await authHelper.findUser(data.email)
    await authHelper.userIsBlocked(user)
    await authHelper.checkLoginAttemptsAndBlockExpires(user)
    await authHelper.checkVerification(user)
    const isPasswordMatch = await auth.checkPassword(data.password, user)
    if (!isPasswordMatch) {
      utils.handleError(res, await authHelper.passwordsDoNotMatch(user))
    } else {
      user.loginAttempts = 0
      await authHelper.saveLoginAttemptsToDB(user)
      res
        .status(200)
        .json(await authHelper.saveUserAccessAndReturnToken(req, user))
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * This functionality is called whenever a user tries to register an account on the CRM
 * @param {Object} req - Request
 * @param {Object} res - Response
 */
exports.register = async (req, res) => {
  try {
    req = matchedData(req)
    const doesEmailExists = await emailExists(req.email)
    if (!doesEmailExists) {
      const item = await authHelper.registerUser(req)
      const userInfo = authHelper.setUserInfo(item)
      const response = authHelper.returnRegisterToken(item, userInfo)
      await mailer.sendRegistration(item)
      res.status(201).json(response)
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Verifies the user's account by changing verified to true
 * @param {Object} req - Request
 * @param {Object} res - Response
 */
exports.verify = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await authHelper.verificationExists(req.id)
    res.status(200).json(await authHelper.verifyUser(user))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Forgot password function that is called by user whenever they forgot their password
 * @param {Object} req - Request
 * @param {Object} res - Response
 */
exports.forgotPassword = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await authHelper.findUser(data.email)
    const item = await authHelper.saveForgotPassword(req)
    await mailer.sendResetPassword({
      firstName: user.firstName,
      lastName: user.lastName,
      ...item._doc
    })
    res.status(200).json(authHelper.forgotPasswordResponse(item))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Reset the users password
 * @param {Object} req - Request
 * @param {Object} res - Response
 */
exports.resetPassword = async (req, res) => {
  try {
    const data = matchedData(req)
    const forgotPassword = await authHelper.findForgotPassword(data.id)
    const user = await authHelper.findUserToResetPassword(forgotPassword.email)
    await authHelper.updatePassword(data.password, user)
    const result = await authHelper.markResetPasswordAsUsed(req, forgotPassword)
    res.status(200).json(result)
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Refreshes the token Bearer token
 * @param {Object} req - Request
 * @param {Object} res - Response
 */
exports.getRefreshToken = async (req, res) => {
  try {
    const tokenEncrypted = req.headers.authorization
      .replace('Bearer ', '')
      .trim()
    let userId = await authHelper.getUserIdFromToken(tokenEncrypted)
    userId = await utils.isIDGood(userId)
    const user = await authHelper.findUserById(userId)
    const token = await authHelper.saveUserAccessAndReturnToken(req, user)
    // Removes user info from response
    delete token.user
    res.status(200).json(token)
  } catch (error) {
    utils.handleError(res, error)
  }
}
