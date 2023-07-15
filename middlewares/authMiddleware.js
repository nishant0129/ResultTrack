

// const jwt = require("jsonwebtoken");

// const authMiddleware= (req, res, next) => {

//     const token = req.headers.authorization.split(' ')[1];
//     if(!token) return res.status(401).send({message: 'Access denied. No token provided.' , success: false});
//     try {
//         const decoded = jwt.verify(token, process.env.SCRET_TOKEN);
//         console.log(decoded)
//         req.body.employeeId = decoded.employeeId;
//         next();
//     } catch (error) {
//         return res.status(500).send({message: 'Access denied. Invalid token.' , success: false});
//     }

// }
// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).send({message: 'Access denied. No token provided.' , success: false});
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        console.log(decoded)
        req.body.employeeId = decoded.employeeId;
        next();
    } catch (error) {
        return res.status(500).send({message: 'Access denied. Invalid token.' , success: false});
    }

}