const utils = require('../services/utils')
const {
  checkPermissions
} = require('../helpers/auth.helper')

/**
 * Roles authorization function called by route
 * @param {Array} roles - roles specified on the route
 */
exports.roleMiddleware = roles => async (req, res, next) => {
  try {
    const data = {
      id: req.user._id,
      roles
    }
    await checkPermissions(data, next)
  } catch (error) {
    utils.handleError(res, error)
  }
}
