const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid, getUsersValid, getUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware, responseErrorMiddleware} = require('../middlewares/response.middleware');
const {UserRepository} = require("../repositories/userRepository");

const router = Router();

router.post('/', createUserValid, (req, res, next) => {
    try {
        const user = req.body;
        const isUsed = UserService.signUp(user);
        !isUsed ? next(new Error('this user entity is already exists')) : res.dataToSend=JSON.stringify(isUsed.id);
        next()
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware,responseErrorMiddleware)
router.put('/:id', updateUserValid, (req, res, next) => {
    try {
        const id = req.params.id;
        UserService.changeInfo(id, req.body);
        res.dataToSend='sucessfully updated';
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware,responseErrorMiddleware)
router.get('/', getUsersValid, (req, res, next) => {
    try {
        const users = UserRepository.getAll();
        res.dataToSend=JSON.stringify(users);
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware,responseErrorMiddleware)
router.get('/:id', getUserValid, (req, res, next) => {
    try {
        const id = req.params.id;
        const users = UserRepository.getAll();
        const user = users.find(user=>user.id===id)
        res.dataToSend=JSON.stringify(user);
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware,responseErrorMiddleware)
router.delete('/:id', getUserValid, (req, res, next) => {
    try {
        const id = req.params.id;
        UserRepository.delete(id);
        res.dataToSend = 'user was succesfully deleted';
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware,responseErrorMiddleware)
module.exports = router;