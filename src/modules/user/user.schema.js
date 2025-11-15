const { object, string, ref, number } = require('yup');

function isEmailLengthValid(email){
    if(!email) return false;
    const parts = email.split('@');
    const local = parts[0];
    return local.length <= 64;
}
const userRegisterSchema = object().shape({
    first_name: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character')
        .required('This field is required'),

    last_name: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character')
        .required('This field is required'),

    username: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character')
        .required('This field is required'),

    email: string()
        .email('This field must be a valid email address')
        .max(100, 'This field must be at most 100 characters long')
        .required('This field must not be empty')
        .test('is-valid-email-length', 'The part before @ of the email can be maximum 64 characters', email=> isEmailLengthValid(email)),
    
    password: string()
      .min(8, 'The password must be al least 8 characters')
      .max(15, 'The password must be at most 15 characters')
      .required('The field is required'),

    confirm_password: string()
      .required('This field must not be empty')
      .oneOf([ref('password'), null], 'password must match')
})

const userUpdateSchema = object().shape({
    first_name: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character'),

    last_name: string()
        .min(3, "Username must be 3 character")
        .max(50, 'Username must be at most 50 character'),

    username: string()
        .min(3, 'Username must be at least 3 characters.')
        .max(50, 'Username must be at least 3 characters.'),

    email: string()
        .email('This field should be a valid email address.')
        .max(100, 'Email must be at most 100 characters long')
        .test('is-valid-email-length', 'The part before@ of the emaill can be maximum 64 characters', email => isEmailLengthValid(email))
})

module.exports.userRegisterSchema = userRegisterSchema;
module.exports.userUpdateSchema = userUpdateSchema;