const { config } = require('dotenv');
const { verify } = require('jsonwebtoken');

config();

module.exports = (req, res, next) => {
     if (req.headers.authorization === undefined) throw new Error('No credentials provided');
     const token = req.headers.authorization.split(' ')[1]
    try {
        if (!token) throw new Error('Please, login');
    
        const verfiedUser = verify(token, process.env.SECRET_KEY);
        req.user = verfiedUser;
        
        next() 
    } catch (error) {
        throw new Error('unauthorized');
    }
};