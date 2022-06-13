const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid, getUsersValid, getUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware} = require('../middlewares/response.middleware');
const {UserRepository} = require("../repositories/userRepository");

const router = Router();

router.post('/', createUserValid, (req, res, next) => {
    try {
        const user = req.body;
        const isUsed = UserService.signUp(user);
        isUsed ? res.status(400).send('this person is already exists') : res.status(200).send('succesfully created');
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware)
router.put('/:id', updateUserValid, (req, res, next) => {
    try {
        const id = req.params.id;
        const users = UserRepository.getAll();
        UserService.changeInfo(id, req.body);
        res.status(200).json('sucessfully updated')
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware)
router.get('/', getUsersValid, (req, res, next) => {
    try {
        const users = UserRepository.getAll();
        res.status(200).json(JSON.stringify(users));
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware)
router.get('/:id', getUserValid, (req, res, next) => {
    try {
        const id = req.params.id;
        const users = UserRepository.getAll();
        const user = users.find(user=>user.id===id)
        res.status(200).json(JSON.stringify(user));
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware)
router.delete('/:id', getUserValid, (req, res, next) => {
    try {
        const id = req.params.id;
        UserRepository.delete(id);
        res.status(200).json('user was succesfully deleted');
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware)
module.exports = router;