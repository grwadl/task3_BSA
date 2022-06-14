const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    checkForValid(fighter) {
        const fighters = FighterRepository.getAll();
        const isUsed = fighters.find(item=>item.name===fighter.name);
        if(isUsed){
            return true;
        }
        return false;
    }
    getAllFighters() {
        const fighters = FighterRepository.getAll();
        return fighters;
    }
    getFighterById(id){
        const fighters = FighterRepository.getAll();
        const searchedFighter = fighters.find(fighter=>fighter.id===id);
        return searchedFighter;
    }
    updateFighter(id,body){
        FighterRepository.update(id,body);
        return FighterRepository.getAll().find(item=>item.id===id)
    }
    deleteFighter(id){
        FighterRepository.delete(id);
    }
    createFighter(fighter){
         fighter.health = fighter.health ?? 100;
        FighterRepository.create(fighter);
        return FighterRepository.getOne(fighter);
    }
}

module.exports = new FighterService();