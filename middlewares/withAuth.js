const jwt = require('jsonwebtoken');
const { respondError } = require('utils/express-response')

module.exports = (req, res, next) => {
    const token = req.header('x-access-token');
    if(!token) return res.status(401).json(respondError(401, "Access Denied!"));

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).json(respondError(400, "Invalid Token!"));
    }
}