const {user} = require('../models/user');
const {UserRepository} = require("../repositories/userRepository");

const validateExtraData = (keys) => {
    let hasExtraKeys = false;
    for (let key in keys) {
        if (!Object.keys(user).includes(key)) {
            hasExtraKeys = true;
            break;
        }
    }
    return hasExtraKeys;
}

const validateUser = (user) => {
    const {firstName, lastName, email, phoneNumber, password} = user;
    if (!firstName && lastName && email && phoneNumber && password)
        return {status: 400, message: 'Invalid type of data'}
    if (phoneNumber.split('0')[0] !== '+38' || phoneNumber.split('').length !== 13)
        return {status: 400, message: 'Invalid phone number'}
    if (email.split('@')[1] !== 'gmail.com')
        return {status: 400, message: 'Invalid email'}
    if (password.split('').length < 3)
        return {status: 400, message: 'Invalid password'}
}

const createUserValid = (req, res, next) => {
    const isNotValid = validateUser(req.body);
    const extraKeys = validateExtraData(req.body);
    if (isNotValid || extraKeys)
        return res.status(isNotValid?.status?isNotValid.status:400)
            .send(`${isNotValid?.message?isNotValid.message:'to much extra data'}`);
    else
        next();
}

const updateUserValid = (req, res, next) => {
    const id = req.params.id;
    const users = UserRepository.getAll();
    const isExists = users.find(user => user.id === id);
    const extraKeys = validateExtraData(req.body);
    if (!req.body)
        return res.status(400).send(`unvalid data`);
    else if (!isExists)
       return res.status(404).json('this user doesnt exist')
    else if (extraKeys)
        return res.status(400).send(`too much data`);
    else
    next();
}
const getUsersValid = (req, res, next) => {
    const users = UserRepository.getAll();
    return users.length > 0 ? next() : res.status(404).json('users is empty');
}
const getUserValid = (req, res, next) => {
    const users = UserRepository.getAll();
    const user = users.find(user => req.params.id === user.id);
    return user ? next() : res.status(404).json('user isnt found');
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
exports.getUsersValid = getUsersValid;
exports.getUserValid = getUserValid;