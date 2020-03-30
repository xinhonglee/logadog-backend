const { matchedData } = require('express-validator')
const model = require('../models/user.model')
const utils = require('../services/utils')
const db = require('../services/db')
const usersHelper = require('../helpers/users.helper')

/**
 * Get all users from database
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getUsers = async (req, res) => {
  try {
    res.status(200).json(await usersHelper.getUsers(req, null))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get all Managers from database
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getManagers = async (req, res) => {
  try {
    res.status(200).json(await usersHelper.getUsers(req, 'manager'))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get all Customers from database
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getCustomers = async (req, res) => {
  try {
    res.status(200).json(await usersHelper.getUsers(req, 'customer'))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Get user
 * @param {Object} req - Request
 * @param {Object} res - Response
 */
exports.getUser = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.getItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Create user
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createUser = async (req, res) => {
  try {
    req = matchedData(req)
    res.status(200).json(await db.createItem(req, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update user
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateUser = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.updateItem(id, model, req))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Delete user
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteUser = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    await db.deleteItem(id, model)
    res.status(200).json(db.deleteItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}
