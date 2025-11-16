
const controller = require('./product.controller');
const express = require('express');
const router = express.Router();
const validate = require('../core/middlewares/validate');
const { productCreateSchema, productUpdateSchema} = require('./product.schema');

module.exports = app => {
    app.route("/api/products")
        .get (controller.getProducts)
        .post(validate(productCreateSchema), controller.postProduct);
    
    app.route("/api/products/:id")
        .get   (controller.getProduct)
        .put   (validate(productUpdateSchema), controller.putProduct)
        .patch (validate(productUpdateSchema), controller.patchProduct)
        .delete(controller.deleteProduct); 
}