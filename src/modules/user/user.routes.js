
const controller = require('./user.controller');
const express = require('express');
const router = express.Router();
const validate = require('../core/middlewares/validate');
const {userRegisterSchema, userUpdateSchema} = require('./user.schema');
const auth = require("./user-authentication.middleware");

module.exports = app => {
    app.route("/api/users")
        .get (auth, controller.getUsers)
        .post(validate(userRegisterSchema), controller.postUser);
    
    app.route("/api/users/:id")
        .get   (controller.getUser)
        .put   (validate(userUpdateSchema), controller.putUser)
        .patch (validate(userUpdateSchema), controller.patchUser)
        .delete(controller.deleteUser); 

    app.route("/api/users/login")
       .post(controller.login)
}


