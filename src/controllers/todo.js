const mongoose = require('mongoose');
const Todo = require('../../model/todo');

const createTodo = async (data, userInfo) => {
    const { title, description } = data;
    const {_id, name} = userInfo;
    const checkTodo = await Todo.findOne({title});
    if (checkTodo) throw new Error('Todo was added before');

    const todoToSave = new Todo({
        title,
        description,
        userId: {_id, name}
    });
    const savedTodo = await todoToSave.save();

    return savedTodo;
};

const getTodos = async (userInfo) => {
    const {_id} = userInfo;
    const allTodos = await Todo.find().where({'userId._id': {$eq:_id}});
    return allTodos;
};

const getSingleTodo = async (id, userInfo) => {
    const {_id} = userInfo;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid Id type')
    const singleTodo = await Todo.findOne({'userId._id': {$eq:_id}, _id: id})
    if (!singleTodo) throw new Error('No Todo item with the given ID')
    return singleTodo;

};

const updateTodo = async (id, userInfo) => {
    const {_id} = userInfo;
    const updatedTodo = await Todo.findOneAndUpdate({'userId._id': {$eq:_id}, _id: id}, { isCompleted: true}, {new: true});
    if (!updatedTodo) throw new Error('No Todo item with the given ID')
    return updatedTodo;
};

const deleteTodo = async (id, userInfo) => {
    const { _id } = userInfo;
    const deletedTodo = await Todo.findOneAndDelete({'userId._id': {$eq:_id}, _id: id});
    if (!deletedTodo) throw new Error('No Todo item with the given ID')
    return 'Todo item deleted successfully'
}

module.exports = { createTodo, getTodos, getSingleTodo, updateTodo, deleteTodo };