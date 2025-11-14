const { registerSchema } = require('../schema/user.schema');

const validateUserRegistration = async user=>{

    try{
        await registerSchema.validate(user);
        return null;
    }
    catch(err){
        return err.errors[0];
    }

}

module.exports.validateUserRegistration = validateUserRegistration;