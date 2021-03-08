const mongoose = require('mongoose');
const { config } = require('dotenv');

config();

const url = process.env.DATABASE_URL;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}
const db = mongoose.connect(url, options) 
   .then(() => console.log('Database connected'))
   .catch(err => console.log('Database failed to connect', err));

module.exports = db