
const controller = require('../controller/user.controller');
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {validateUserRegistration} = require('../schema/user.schema');

router.post('/api/users', controller.postUser);
router.get('/api/users', controller.getUsers);
router.post('/api/users/:id', validate(validateUserRegistration),  controller.getUser);
router.put('/api/users/:id', controller.putUser);
router.patch('/api/users/:id', controller.patchUser);
router.delete('/api/users/:id', controller.deleteUser); 

module.exports = router

