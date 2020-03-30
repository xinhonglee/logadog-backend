const express = require('express')
const router = express.Router()

/**
 * Constants Route
 */
router.use('/constants', require('./_constants.router'))

/**
 * Auth Route
 */
router.use('/auth', require('./_auth.router'))

/**
 * Users Route
 */
router.use('/users', require('./_users.router'))

/**
 * Companies Route
 */
router.use('/companies', require('./_companies.router'))

/**
 * Company members Route
 */
router.use('/companymembers', require('./_company.members.router'))

/**
 * Job Offers Route
 */
router.use('/joboffers', require('./_joboffers.router'))

/**
 * Profile Route
 */
router.use('/profile', require('./_profile.router'))

/**
 * Setting Route
 */
router.use('/settings', require('./_setting.router'))

/**
 * Cities Route
 */
router.use('/cities', require('./_cities.router'))

/**
 * Jobs Route
 */
router.use('/jobs', require('./_jobs.router'))

/**
 * Matching Route
 */
router.use('/matching', require('./_matching.router'))

/**
 * Matching Route
 */
router.use('/professions', require('./_profession.router'))

/**
 * WorkLogs Route
 */
router.use('/worklogs', require('./_worklogs.router'))

/**
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Ok'
  })
})

/**
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

module.exports = router
