require('../../config/passport')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const authMiddleware = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const controller = require('../controllers/users.ctrl')
const validator = require('../validators/users.validator')
const {
  roleMiddleware
} = require('../middlewares/role.middleware')

/**
 * Get items route
 */
router.get(
  '/all',
  authMiddleware,
  roleMiddleware(['admin']),
  trimRequest.all,
  controller.getUsers
)

/**
 * Get items route
 */
router.get(
  '/managers',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  trimRequest.all,
  controller.getManagers
)

/**
 * Get items route
 */
router.get(
  '/customers',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  trimRequest.all,
  controller.getCustomers
)


/**
 * Get User route
 */
router.get(
  '/:userId',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  trimRequest.all,
  validator.getUser,
  controller.getUser
)

/**
 * Create User route
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  trimRequest.all,
  validator.createUser,
  controller.createUser
)

/**
 * Update User route
 */
router.patch(
  '/:userId',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  trimRequest.all,
  validator.updateUser,
  controller.updateUser
)

/**
 * Delete Customer route
 */
router.delete(
  '/:userId',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  trimRequest.all,
  validator.deleteUser,
  controller.deleteUser
)

module.exports = router
