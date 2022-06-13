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
        return res.status(400).json('this fighter is already exists')
    if(health&&!health>120&&!health<80)
        return res.status(400).json('unvalid data of fighter')
    if(!(name&&power>1&&power<100&&defense>1&&defense<10))
        return res.status(400).json('unvalid data of fighter')
    const hasExtraKeys = validateExtraKeys(req.body);
    hasExtraKeys?res.status(400).json('too many extra data'):next();
}

const updateFighterValid = (req, res, next) => {
    const id = req.params.id;
    const fighterToUpdate = FighterRepository.getAll().find(fighter=>fighter.id===id);
    if(!fighterToUpdate)
       return res.status(404).json('such fighter doesnt exist')
    const hasExtraKeys = validateExtraKeys(req.body);
    hasExtraKeys?res.status(400).json('too many extra data'):next();
}
const getFighterById = (req,res,next) =>{
    const fighters = FighterRepository.getAll();
    const isValid = fighters.find(fighter=>fighter.id===req.params.id);
    return isValid?next(): res.status(404).json('this fighter doesnt exist');
}
exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.getFighterById = getFighterById;