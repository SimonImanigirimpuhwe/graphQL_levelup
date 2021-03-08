const { GraphQLString, GraphQLBoolean } = require("graphql");
const { createTodo, updateTodo, deleteTodo } = require("../controllers/todo");
const { signup, login } = require("../controllers/user");
const { todoType } = require("../types");

const createUser = {
    type: GraphQLString,
    args: {
        name: {type: GraphQLString},
        email:{type: GraphQLString},
        password: {type: GraphQLString}
    },
    resolve: (parent, {name,email,password}) => signup({name,email,password})
};

const loginUser = {
    type: GraphQLString,
    args: {
        email:{type: GraphQLString},
        password: {type: GraphQLString}  
    },
    resolve: (parent, {email, password}) => login({email, password})
};

const addTodo = {
    type: todoType,
    args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString},
    }, 
    resolve: (parent, {title, description}, {user}) => createTodo({title, description}, user)
};

const completeTodo = {
    type: todoType,
    args: {
        id: {type: GraphQLString},
    },
    resolve: (parent, {id}, {user}) => {
        return updateTodo(id, user)
    }
};

const removeTodo = {
    type: GraphQLString,
    args: {
        id: {type: GraphQLString}
    },
    resolve: (parent, {id}, {user}) => deleteTodo(id, user)
}
module.exports = { createUser, loginUser, addTodo, completeTodo, removeTodo }