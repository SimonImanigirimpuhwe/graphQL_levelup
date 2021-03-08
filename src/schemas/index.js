const { GraphQLObjectType, GraphQLSchema } = require('graphql');


const { users, todos, todo, singleUser } = require('../queries');

const { createUser, loginUser, addTodo, completeTodo, removeTodo } = require('../mutations');

const QueryType = new GraphQLObjectType({
    name: 'QueryTypes',
    description: 'All Queries',
    fields: { users, todos, todo, singleUser }
});

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: { createUser, loginUser, addTodo, completeTodo, removeTodo }
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})

