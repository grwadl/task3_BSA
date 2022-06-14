const { Router } = require('express');
const FightService = require('../services/fightService');
const { responseMiddleware, responseErrorMiddleware} = require('../middlewares/response.middleware');


const router = Router();
router.post('/',(req,res,next)=> {
    try {
      const {fighter1,fighter2} = req.body;
      const id = FightService.startFight(fighter1,fighter2);

      return res.status(200).json(id);
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware)

router.put('/:id',(req,res,next)=> {
    try {
        const id = req.params.id;
        FightService.logFight(id,req.body);
        return res.dataToSend = 'ok';
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware)
router.get('/',(req,res,next)=> {
    try {
        const fights =  FightService.getAllFights();
        return res.dataToSend = fights;
    } catch (err) {
        res.err = err;
    } finally {
        next()
    }
},responseMiddleware,responseErrorMiddleware)

module.exports = router;