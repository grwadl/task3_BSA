const { fighter } = require('../models/fighter');
const {FighterRepository} = require("../repositories/fighterRepository");

const validateExtraKeys = (keys)=>{
    let hasExtraKeys = false;
    for (let key in keys){
        if(!Object.keys(fighter).includes(key)){
            hasExtraKeys = true;
            break;
        }
    }
    return hasExtraKeys;
}

const createFighterValid = (req, res, next) => {
    const {power,defense,name,health} = req.body;
    const isUsed = FighterRepository.getAll().find(fighter=>fighter.name===name);
    if(isUsed)
        return next(new Error('this fighter entity is already exists'))
    if(health&&!health>120&&!health<80)
        return next(new Error('unvalid data of entity fighter'));
    if(!(name&&power>1&&power<100&&defense>1&&defense<10))
        return next(new Error('unvalid data of entity fighter'));
    const hasExtraKeys = validateExtraKeys(req.body);
    hasExtraKeys?next(new Error('unvalid data of entity fighter')):next();
}

const updateFighterValid = (req, res, next) => {
    const id = req.params.id;
    const fighterToUpdate = FighterRepository.getAll().find(fighter=>fighter.id===id);
    if(!fighterToUpdate)
       return next(new Error('such fighter does not exist'));
    const hasExtraKeys = validateExtraKeys(req.body);
    if(req.body.id)
        return next(new Error('unvalid data of entity fighter'))
    if(Object.keys(req.body).length===0)
       return next(new Error('unvalid data of entity fighter'))
    if(hasExtraKeys)
        return next(new Error('unvalid data of entity fighter'))
    next()
}
const getFighterById = (req,res,next) =>{
    const fighters = FighterRepository.getAll();
    const isValid = fighters.find(fighter=>fighter.id===req.params.id);
    return isValid?next(): next(new Error('such fighter does not exist'));
}
exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.getFighterById = getFighterById;