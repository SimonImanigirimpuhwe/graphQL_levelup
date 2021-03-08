const User = require('../../model/user');
const generateToken = require('../helpers/genToken');

const signup = async (data) => {
    const { name, email, password } = data;
    const user = await User.findOne({email});
    if (user) throw new Error ('Email already registered');
    const userToSave = new User({
        name,
        email,
        password
    });
    const savedUser = await userToSave.save();
    const token = await generateToken(savedUser);
    return token;
};

const login = async (data) => {
    const { email, password } = data;
    const checkUser = await User.findOne({email});
    if(!checkUser) throw new Error('Invalid email or password');
    if (checkUser.password !== password) throw new Error('Invalid email or password');
    const token = generateToken(checkUser);

    return token;
};

const getUsers = async (decoded) => {
    if (!decoded) throw new Error('Access denied')
    const allUsers = await User.find();
    return allUsers;
};

const getSingleUser = async(id, userInfo) => {
    const {_id} = userInfo;
    if(_id !== id) throw new Error('Invalid Id')
    const foundUser = await User.findById({_id: id});

    return foundUser;
}

module.exports = { signup, login, getUsers, getSingleUser }