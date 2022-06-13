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
    if (!firstName || !lastName || !email || !phoneNumber || !password)
        return true;
    if (phoneNumber.split('0')[0] !== '+38' || phoneNumber.split('').length !== 13)
        return true;
    if (email.split('@')[1] !== 'gmail.com')
        return true;
    if (password.split('').length < 3)
        return true;
}

const createUserValid = (req, res, next) => {
    const isNotValid = validateUser(req.body);
    const {id} = req.body;
    if(id)
        return next(new Error('User entity to create isn\'t valid'));
    const extraKeys = validateExtraData(req.body);
    if (isNotValid || extraKeys) {
        return next(new Error('User entity to create isn\'t valid'));
    }
        next();
}

const updateUserValid = (req, res, next) => {
    const idUser = req.params.id;
    const users = UserRepository.getAll();
    const isExists = users.find(user => user.id === idUser);
    const extraKeys = validateExtraData(req.body);
    const { email, phoneNumber, password,id} = req.body;
    if (phoneNumber&&(phoneNumber.split('0')[0] !== '+38' || phoneNumber.split('').length !== 13))
        return next(new Error('User entity to update isn\'t valid'));
        else if(id)
        return next(new Error('User entity to update isn\'t valid'));
    else if (email&&(email.split('@')[1] !== 'gmail.com'))
        return next(new Error('User entity to update isn\'t valid'));
    else if (password&&(password.split('').length < 3))
        return next(new Error('User entity to update isn\'t valid'));
   else  if (!req.body|| Object.keys(req.body).length === 0)
        return next(new Error('User entity to update isn\'t valid'));
    else if (!isExists)
        return next(new Error('User is not found'));
    else if (extraKeys)
        return next(new Error('User entity to update isn\'t valid'));
    else
    next();
}
const getUsersValid = (req, res, next) => {
    const users = UserRepository.getAll();
    return users.length > 0 ? next() :next(new Error('User is not found'));
}
const getUserValid = (req, res, next) => {
    const users = UserRepository.getAll();
    const user = users.find(user => req.params.id === user.id);
    return user ? next() : next(new Error('User is not found'));
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
exports.getUsersValid = getUsersValid;
exports.getUserValid = getUserValid;