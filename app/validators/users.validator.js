const { validationResult } = require('../services/utils')
const { check } = require('express-validator')
const { roles, userStates, genders } = require('../../config/constants')

/**
 *
 * Validates create item request
 */
exports.createUser = [
  check('firstName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('lastName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('middleName')
    .optional()
    .trim(),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(roles)
    .withMessage('ROLE_IS_UNKNOWN'),
  check('overview')
    .optional()
    .trim(),
  check('mailingAddress')
    .optional()
    .trim(),
  check('phone')
    .optional()
    .trim(),
  check('birthday')
    .optional()
    .trim(),
  check('image')
    .optional()
    .trim(),
  check('gender')
    .optional()
    .isIn(genders)
    .withMessage('GENDER_IS_UNKNOWN'),
  check('status')
    .optional()
    .isIn(userStates)
    .withMessage('STATE_IS_UNKNOWN'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates update item request
 */
exports.updateUser = [
  check('firstName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('lastName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('middleName')
    .optional()
    .trim(),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(roles)
    .withMessage('ROLE_IS_UNKNOWN'),
  check('overview')
    .optional()
    .trim(),
  check('mailingAddress')
    .optional()
    .trim(),
  check('phone')
    .optional()
    .trim(),
  check('birthday')
    .optional()
    .trim(),
  check('image')
    .optional()
    .trim(),
  check('gender')
    .optional()
    .isIn(genders)
    .withMessage('GENDER_IS_UNKNOWN'),
  check('status')
    .optional()
    .isIn(userStates)
    .withMessage('STATE_IS_UNKNOWN'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates get item request
 */
exports.getUser = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]

/**
 * Validates delete item request
 */
exports.deleteUser = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]
