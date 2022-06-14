const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
    startFight(fighter1,fighter2){
        FightRepository.create({fighter1,fighter2,log:[]});
        return FightRepository.getOne({fighter1,fighter2}).id
    }
    logFight(id,data){
        const oldFight = FightRepository.getAll()?.find(fight=>fight.id===id);
        const oldLog = oldFight?.log;
        oldLog.push(data);
        oldFight.log = oldLog
        FightRepository.update(id,oldFight)
    }
    getAllFights(){
        return FightRepository.getAll();
    }
}

module.exports = new FightersService();