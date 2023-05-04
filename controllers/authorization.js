const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
const { json } = require('body-parser');

dotenv.config();
exports.authorization = async(req, res, next) => {
    try{
        const jwtTOKEN = JSON.parse(req.header('Authorization'))
            console.log(jwtTOKEN,`jwttoken`);
        const userID = jwt.verify(jwtTOKEN, process.env.TOKEN_SECRET)
        console.log(`!!!!!!!!!!`,userID);
        const userExists =  await User.findByPk(userID);
        console.log(userExists);
        if(userExists) {
            req.user = userExists
            next();
        }else{
            res.json({success:false, message: `user does not exists`});
        }  
    } catch(error) {
        return res.status(401).json({success:false, message: `jwtTokenError`});
    }
}
