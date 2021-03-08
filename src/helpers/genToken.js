const { config } = require('dotenv');
const { sign } = require('jsonwebtoken');

config();

const secretKey = process.env.SECRET_KEY;

module.exports = (data) => {
    const { email, name, _id} = data;
 const token = sign({ email, name, _id}, secretKey, {expiresIn: '1d'});
 return token;
};