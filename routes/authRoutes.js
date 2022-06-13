const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        const user = req.body;
        const isValid = AuthService.login(user);
        if(!isValid){
            return res.status(400).send('such user doesnt exist')
        }
        if(!user.password===isValid.password&&!user.email===isValid.email){
            return res.status(400).send('wrong password')
        }
        res.status(200).json(`${JSON.stringify(isValid.id)}`)
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;