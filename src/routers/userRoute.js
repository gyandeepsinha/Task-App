const express       =   require('express');
const { ObjectId }  =   require('mongodb');
const { User }      =   require('../db/userModels');
const auth          =   require('../middleware/auth');
const multer        =   require('multer');
const router        =   new express.Router();

// Add User API
router.post('/addUser', async (req, res) => {
    const userDetails = new User(req.body);
    try {
        await userDetails.save();
        const token         =   await userDetails.generateAuthToken();
        res.status(201).send({userDetails, token});
    }catch(error){
        console.log(error)
        res.status(400).send(error);
    }
});
// Get All Users
router.get('/getAllUsers/me', auth ,async (req, res) => {    
    //It send only logged user's details
    try{
        res.send(req.user.userProfile());
    }catch(error){
        res.status(404).send(error)
    }     
    // The below code sends all users data
    // try{
    //     const allUsers  =   await User.find({});
    //     res.status(200).send(allUsers);
    // }catch(error){
    //     res.status(500).send(error);
    // }
});
// Get User By Unique Id
router.get('/getUsersById/:id', auth ,async (req, res) => {
    try{
        const userDetails   =  await User.findById({_id : new ObjectId(req.params.id)});
        if(!userDetails){
            return res.status(400).send({message : 'Oops! User Not Found'});
        }
        res.status(200).send(userDetails);
    }catch(error){
        res.status(400).send(error);
    }
});
// Update User By Id
router.patch('/updateUserById/me', auth ,async(req, res) => {
    const updates        =   Object.keys(req.body);
    const allowUpdates   =   ['name', 'age', 'email', 'password'];
    const isValid        =   updates.every((update) => allowUpdates.includes(update));

    if(!isValid){
        return res.status(400).send({error: 'Invalid Updates!'})
    }
    try{
        const userDetails  =   req.user;
        updates.forEach((update) => {
            userDetails[update] = req.body[update]
        });
        await userDetails.save();
        res.status(200).send(userDetails.userProfile());
    }catch(error){
        res.status(400).send(error);
    }
});
//Delete User : User can only delete itself
router.delete('/deleteUserById/me', auth ,async(req, res) =>{
    try{
        await req.user.remove();
        res.status(200).send(req.user.userProfile());
    }catch(error){
        console.log('error'+ error);
        res.status(500).send(error);
    }
});
//Login User
router.post('/users/login', async(req, res) =>{
    try{
        const userDetail    =   await User.findByCredentials(req.body.email, req.body.password);
        const token         =   await userDetail.generateAuthToken();
        res.status(200).send({user : userDetail.userProfile(), token});
    }catch(error){
        console.log('error'+ error);
        res.status(404).send({error: "Error While Login"});
    }    
});
// Logout User
router.post('/users/logout', auth , async(req, res) => {
    try{
        req.user.tokens =   req.user.tokens.filter((token)=> {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send({'message' : 'Useer is logged out!'});
    }catch(error){
        res.status(500).send(error);
    }
});
// Logout User From All
router.post('/users/logoutAll', auth , async(req, res) => {
    try{
        req.user.tokens     =   [];
        await req.user.save();
        res.status(200).send({'message' : 'Logged Out From All Devices!'});
    }catch(error){
        res.status(500).send(error);
    }
});
const upload    =   multer({
    dest        :   'Images'
});
// Upload User's Profile Picture
router.post('/users/me/avatar', upload.single('avatar'), async(req, res) => {
    res.status(200).send({message   : 'File Uploaded!'});
});

module.exports  =   router;