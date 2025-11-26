const User  = require('./user.model');
const UserType = require('./user-type.model');
const { generateAccessToken } = require("./services/user.service")

async function login(req, res){
    try{
        const { email, password } = req.body;

        const user = await User.findOne({
            where:{
                email
            }
        })

        if(!user)return res.status(400).send('Invalid email or password')
        
         if(!user || !user.password  || !user.validPassword(password)) return res.status(400).send('Invalid email or password');

        // user.dataValues.token = token;
        res.cookie("access_token", generateAccessToken(user), { 
            httpOnly: true, 
            sameSide: true, 
            signed: true 
        });

        return res.status(200).send(user);
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server Error')
    }
}

const getUsers = async(req, res)=>{
    try{
        const users = await User.findAll({
            include:[{
                model:UserType,
                as: 'atiq'
            }]
        });

        res.status(200).send(users);
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal server Error')
    }
}

const getUser = async(req, res)=>{
    try{
        const { id } = req.params;

        const user = await User.findOne({ where:{ id } })
        if(!user) return res.status(404).send('User not found');

        res.status(200).send(user);
    }
     catch(err){
        console.log(err)
        res.status(500).send('Internal server error')
     }
}

const postUser =  async (req, res)=>{ 
    try{
        const { first_name, last_name, username, email, password, user_type_id } = req.body;

        const existUser = await User.findOne({ where: {email} });

        if(existUser) return res.status(400).send("Already registered with the email");
        
        const user = await User.create({
            first_name,
            last_name,
            username,
            email,
            password,
            user_type_id: user_type_id
         })

         res.status(201).send(user);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
}

const putUser = async(req, res)=>{
    try{
        const {id} = req.params;
        const {first_name, last_name, username, email} = req.body;

        const existUser = await User.findOne({ where:{ id } })
        if(!existUser) return res.status(404).send("User not found")

        const user = await User.update({
            first_name,
            last_name,
            username, 
            email
        },{
            where:{
                id
            }
        })
        return res.status(200).send(user);
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internal server error')
    }
}


const patchUser = async(req, res)=>{
    try{
        const {id} = req.params;
        const {first_name, last_name, email } = req.body;

        const user = await User.findOne({ where:{ id } })
        if(!user) return res.status(404).send("User not found")
        
        if(first_name) user.update({first_name});
        if(last_name) user.update({last_name});
        if(email) user.update({email});

        return res.status(200).send(user);
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Internal server error")
    }
}


const deleteUser = async (req, res)=>{
     try{
        const {id} = req.params;
        
        const user = await User.findOne({where:{id}})
        if(!user) return res.status(404).send("User not found");

        await user.destroy();

        return res.status(200).send(user);
     }
     catch(err){
        console.log(err);
        return res.status(500).send('Internal server error')
     }
}

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.postUser = postUser;
module.exports.putUser = putUser;
module.exports.patchUser = patchUser;
module.exports.deleteUser = deleteUser;
module.exports.login = login;