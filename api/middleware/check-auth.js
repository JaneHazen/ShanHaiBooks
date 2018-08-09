const jwt = require('jsonwebtoken');
const envVariables = require('../../private');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        req.userData = jwt.verify(token, envVariables.env.JWT_KEY);
        next();
    } catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};