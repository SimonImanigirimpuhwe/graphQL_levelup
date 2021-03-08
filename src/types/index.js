const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");


const userType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        createdAt: { type: GraphQLString}
    })
});

const todoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'Todo type',
    fields: () => ({
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        userId: {type: userType },
        isCompleted: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString}
    })
});

module.exports = { userType, todoType };