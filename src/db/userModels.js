const mongoose  =   require('mongoose');
const validator =   require('validator');
const bcrypt    =   require('bcrypt');
const jwt       =   require('jsonwebtoken');
const { task }  =   require('../db/taskModel');



// User Collection Schema
const userSchema    =   mongoose.Schema({
    name    : {type : String, default:'user'},
    age     : {type : Number, required : true},
    email   :{
        type     : String, 
        required : true,
        unique   : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please provide Valid Email');
            }
        }
    },
    password : {
        type        : String,
        required    : true,
        trim        : true,
        minlength   : 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contains "password" String');
            }
        }
    },
    tokens: [{
        token :{
            type     :   String,
            required :   true
        }
    }],
    avatar :{
        type       :   Buffer
    }
}, {
    timestamps  :   true,
});
// userSchema.virtual('tasks',{
//     ref             :'task',
//     localField      : '_id',
//     foreignField    : 'owner'
// });
// Sends User's Data After Removing Sensitive Data
userSchema.methods.userProfile      =   function(){
    const user          =   this;
    const userObject    =   user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
// Generate JWT Token
userSchema.methods.generateAuthToken =   async function() {
    const user  =   this;
    const token =   jwt.sign({_id : user._id.toString()}, 'RomeFluteAndNiro');
    user.tokens =   user.tokens.concat({ token });
    await user.save();
    return token;
}
// Reusuable Login Code
userSchema.statics.findByCredentials    =   async (email, password) => {
    const user  =   await User.findOne({email : email});
    if(!user){
        throw new Error('Unable To Login!');
    }
    const isMatch   =   await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable To Login!');
    }
    return user;
}
// Checking and Hasing Password before saving
userSchema.pre('save', async function(next){
    const user      =   this;
    if(user.isModified('password')){
        user.password   =   await bcrypt.hash(user.password, 8); 
    }    
    next(); 
});
// Remove all tasks related to particular user
userSchema.pre('remove', async function(next){
    const user  =   this;
    await task.deleteMany({owner : user._id});
    next();
});
// User Collection Schema
const User  = mongoose.model('User',userSchema);

module.exports  = { User };