const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { config } = require('dotenv');

require('./db');
const schema = require('./schemas');
const authenticate = require('./middlewares/authenticate');

config();


const app = express();

//welcome route
app.get('/', (req, res, next) => {
    res.status(200).json({msg: 'Welcome to Todo App build with GraphQL technology'})
})

//add authentication middleware
app.use(authenticate);
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))