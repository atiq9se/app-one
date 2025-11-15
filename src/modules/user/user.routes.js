
const controller = require('./user.controller');
const express = require('express');
const router = express.Router();
const validate = require('../core/middlewares/validate');
const {userRegisterSchema, userUpdateSchema} = require('./user.schema');

module.exports = app => {
    app.route("/api/users")
        .get (controller.getUsers)
        .post(validate(userRegisterSchema), controller.postUser);
    
    app.route("/api/users/:id")
        .get   (controller.getUser)
        .put   (validate(userUpdateSchema), controller.putUser)
        .patch (validate(userUpdateSchema), controller.patchUser)
        .delete(controller.deleteUser); 
}


