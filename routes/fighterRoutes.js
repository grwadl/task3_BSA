const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid, getFighterById} = require('../middlewares/fighter.validation.middleware');
const {FighterRepository} = require("../repositories/fighterRepository");


const router = Router();

router.post('/', createFighterValid,(req,res,next)=> {
    try {
        const fighter = req.body;
        const isUsed = FighterService.search(fighter);
        if(isUsed)
            return res.status(400).send('such fighter is already exists');
        FighterRepository.create(fighter);
        return res.status(200).json(fighter);

    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware)
router.get('/',(req,res,next)=> {
    try {
        const a1=0;
        const fighters = FighterService.getAllFighters();
         !fighters?res.json('no fighters :(').status(404):res.status(200).json((fighters));
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware)
router.get('/:id', getFighterById,(req,res,next)=> {
    try {
        const id = req.params.id;
        const fighters = FighterRepository.getAll();
        const searchedFighter = fighters.find(fighter=>fighter.id===id);
        return res.status(200).json(JSON.stringify(searchedFighter));
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware)
router.put('/:id', updateFighterValid,(req,res,next)=> {
    try {
        const id = req.params.id;
        if(!req.body)
            return res.status(200).json('data is empty');
        FighterRepository.update(id,req.body);
        return res.status(200).json('succesfully updated fighter');
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware)
router.delete('/:id', getFighterById,(req,res,next)=> {
    try {
        const id = req.params.id;
        FighterRepository.delete(id);
        return res.status(200).json('succesfully deleted fighter');
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware)
module.exports = router;

module.exports = router;