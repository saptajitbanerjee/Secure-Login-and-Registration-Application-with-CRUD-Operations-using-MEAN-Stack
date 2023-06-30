const express = require('express')
const { createUserControllerFn, loginUserControllerFn, getDataConntrollerfn, updateUserController, deleteUserController } = require('./userController')
const router = express.Router()
router.route('/user/create').post(createUserControllerFn)
router.route('/user/login').post(loginUserControllerFn)
router.route('/user/getAll').get(getDataConntrollerfn)
router.route('/user/update/:id').patch(updateUserController)
router.route('/user/delete/:id').delete(deleteUserController)

module.exports = router