const { object, string } = require('yup');

const productCreateSchema = object().shape({
    name: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character')
        .required('This field is required'),

    category: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character')
        .required('This field is required'),

    price: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character')
        .required('This field is required'),

    description: string()
        .max(500, 'This field must be at most 500 characters long')
        .required('This field must not be empty'),
})

const productUpdateSchema = object().shape({
    name: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character'),

    category: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character'),

    price: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character'),

    description: string()
        .max(100, 'This field must be at most 100 characters long'),
})

module.exports.productCreateSchema = productCreateSchema;
module.exports.productUpdateSchema = productUpdateSchema;