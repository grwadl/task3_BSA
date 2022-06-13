const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware, responseErrorMiddleware} = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        const user = req.body;
        const isValid = AuthService.login(user);
        if(!isValid){
            return next(new Error('User is not found'))
        }
        if(!user.password===isValid.password&&!user.email===isValid.email){
            return next(new Error('Wrong password to login user entity'))
        }
        res.dataToSend = `${JSON.stringify(isValid.id)}`;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware,responseErrorMiddleware);

module.exports = router;