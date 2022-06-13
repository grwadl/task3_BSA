const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware, responseErrorMiddleware} = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, getFighterById} = require('../middlewares/fighter.validation.middleware');
const {FighterRepository} = require("../repositories/fighterRepository");


const router = Router();

router.post('/', createFighterValid,(req,res,next)=> {
    try {
        const fighter = req.body;
        const isUsed = FighterService.search(fighter);
        if(isUsed)
            return next(new Error('sucn fighter entity is already exists'));
        FighterRepository.create(fighter);
        return res.dataToSend=fighter;

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
        const fighters = FighterRepository.getAll();
        const searchedFighter = fighters.find(fighter=>fighter.id===id);
        return res.dataToSend=searchedFighter;
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
        FighterRepository.update(id,req.body);
        return res.dataToSend='succesfully updated fighter';
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware,responseErrorMiddleware)
router.delete('/:id', getFighterById,(req,res,next)=> {
    try {
        const id = req.params.id;
        FighterRepository.delete(id);
        return res.dataToSend='succesfully deleted fighter';
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware,responseErrorMiddleware)
module.exports = router;

module.exports = router;