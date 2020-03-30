require('../../config/passport')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const authMiddleware = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const controller = require('../controllers/auth.ctrl')
const validator = require('../validators/auth.validator')
const { roleMiddleware } = require('../middlewares/role.middleware')
const { roles } = require('../../config/constants')

/**
 * Register route
 */
router.post(
  '/register',
  trimRequest.all,
  validator.register,
  controller.register
)

/**
 * Verify route
 */
router.post('/verify', trimRequest.all, validator.verify, controller.verify)

/**
 * Forgot password route
 */
router.post(
  '/forgot',
  trimRequest.all,
  validator.forgotPassword,
  controller.forgotPassword
)

/**
 * Reset password route
 */
router.post(
  '/reset',
  trimRequest.all,
  validator.resetPassword,
  controller.resetPassword
)

/**
 * Get new refresh token
 */
router.get(
  '/token',
  authMiddleware,
  roleMiddleware(roles),
  trimRequest.all,
  controller.getRefreshToken
)

/**
 * Login route
 */
router.post('/login', trimRequest.all, validator.login, controller.login)

module.exports = router
