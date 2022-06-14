const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid, getUsersValid, getUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware, responseErrorMiddleware} = require('../middlewares/response.middleware');

const router = Router();

router.post('', createUserValid, (req, res, next) => {
    try {
        const user = req.body;
        const isUsed = UserService.signUp(user);
        !isUsed ? next(new Error('this user entity is already exists')) : res.dataToSend=isUsed;
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
        const updatedUser = UserService.changeInfo(id, req.body);
        res.dataToSend=updatedUser;
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware,responseErrorMiddleware)
router.get('', getUsersValid, (req, res, next) => {
    try {
        const users =UserService.readAll();
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
        const user = UserService.readOne(id);
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
        UserService.deleteUser(id);
        res.dataToSend = 'user was succesfully deleted';
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
}, responseMiddleware,responseErrorMiddleware)
module.exports = router;