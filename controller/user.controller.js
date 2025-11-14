const User  = require('../models/user.model');


const getUsers = async(req, res)=>{
    try{
        const users = await User.findAll();

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
        const user = await User.findOne({
            where: {
                id
            }
        })
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

        const existUser = await User.findOne({
            where: {
                email
            } 
         });

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

        const {username, email} = req.body;

        const user = await User.update({
            username, 
            email
        },{
            where:{
                id
            }
        })
        if(!user) return res.status(404).send('User is not found')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internal server error')
    }
}


const patchUser = async(req, res)=>{
    try{
        const {id} = req.params;
        const {username, email } = req.body;

        const user = await User.update({
                where:{
                    id
                }
            
        })
        if(!user) return res.status(404).send("user not found")
        
        if(!username) user.update({username});
        if(!email) user.update({email});
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Internal server error")
    }
}


const deleteUser = async (req, res)=>{
     try{
        const {id} = req.params;
        
        const user = await User.findOne({
            where:{
                id
            }
        })
        if(!user) return res.status(404).send("user not found");

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