const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    search(fighter) {
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
}

module.exports = new FighterService();