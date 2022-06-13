const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware, responseErrorMiddleware} = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, getFighterById} = require('../middlewares/fighter.validation.middleware');


const router = Router();

router.post('/', createFighterValid,(req,res,next)=> {
    try {
        const fighter = req.body;
        const isUsed = FighterService.checkForValid(fighter);
        if(isUsed)
            return next(new Error('such fighter entity is already exists'));
        return res.dataToSend=FighterService.createFighter(fighter);

    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware,responseErrorMiddleware)
router.get('/',(req,res,next)=> {
    try {
        const fighters = FighterService.getAllFighters();
         !fighters?next(new Error('no fighters :(')):res.dataToSend=fighters;
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware,responseErrorMiddleware)
router.get('/:id', getFighterById,(req,res,next)=> {
    try {
        const id = req.params.id;
        return res.dataToSend=FighterService.getFighterById(id);
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware,responseErrorMiddleware)
router.put('/:id', updateFighterValid,(req,res,next)=> {
    try {
        const id = req.params.id;
        if(!req.body)
            return next(new Error('data is empty'));
        const updatedFighter = FighterService.updateFighter(id,req.body)
        return res.dataToSend=updatedFighter;
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware,responseErrorMiddleware)
router.delete('/:id', getFighterById,(req,res,next)=> {
    try {
        const id = req.params.id;
        FighterService.deleteFighter(id);
        return res.dataToSend='succesfully deleted fighter';
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware,responseErrorMiddleware)
module.exports = router;