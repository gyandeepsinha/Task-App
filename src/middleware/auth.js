const jwt   =   require('jsonwebtoken');
const {User}  =   require('../db/userModels');

const auth  =   async (req, res, next) => {
    try{
        const token     =   req.header('Authorization').replace('Bearer ', '').trim();
        const decode    =   jwt.verify(token, 'RomeFluteAndNiro');
        const user      =   await User.findOne({_id : decode._id, 'tokens.token' : token});
        if(!user){
            throw new Error()
        }
        req.token   =   token;
        req.user    =   user;
        next();
    }catch(error){
        res.status(401).send({error : 'User is not Authenticated!'})
    }
}

module.exports  =   auth;