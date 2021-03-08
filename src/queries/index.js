const { GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql');
const { getTodos, getSingleTodo } = require('../controllers/todo');
const {getUsers, getSingleUser} = require('../controllers/user');
const { userType, todoType } = require('../types');

const users ={ 
    type: new GraphQLList(userType),
    resolve: (parent, args, {user}) => getUsers(user)
};

const singleUser = {
    type: userType,
    args: {
        id: {type: GraphQLNonNull(GraphQLString)}
    },
    resolve: (parent, {id}, {user}) => getSingleUser(id, user)
};

const todos = {
    type: new GraphQLList(todoType),
    resolve: (parent, args, {user}) => getTodos(user)
};

const todo = {
    type: todoType,
    args: {
        id: {type: GraphQLNonNull(GraphQLString)}
    },
    resolve: (parent, {id}, {user}) => getSingleTodo(id, user)
}

module.exports = { users, todos, todo, singleUser }


