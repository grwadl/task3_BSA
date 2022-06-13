import {logFight} from "../../services/domainRequest/fightRequest";

export const controls = {
    PlayerOneAttack: 'KeyA',
    PlayerOneBlock: 'KeyD',
    PlayerTwoAttack: 'KeyJ',
    PlayerTwoBlock: 'KeyL',
    PlayerOneCriticalHitCombination: ['KeyQ', 'KeyW', 'KeyE'],
    PlayerTwoCriticalHitCombination: ['KeyU', 'KeyI', 'KeyO']
}
const setPlayerRunning = (type, model) => {
    switch (type) {
        case 'first': {
            model.classList.add('punching');
            return setTimeout(() => {
                model.classList.remove('punching')
            }, 300)
        }
        case 'second': {
            model.classList.add('punching1');
            return setTimeout(() => {
                model.classList.remove('punching1')
            }, 300)
        }
    }
}
export const fight = (firstFighter, secondFighter, fighterModels,indicators,fightId,onFightEnd) => {
    const startHealthSecond = secondFighter.health, startHealthFirst = firstFighter.health;
    let comboSecondFighter = [], comboFirstFighter = [];
    const onEndFight = (defender,winner,starthealthDef,startHealthWinn) =>{
        if(defender.health <= 0) {
            defender.health = starthealthDef;
            winner.health = startHealthWinn;
            logFight(fightId, {winner: '' + winner.name});
            document.body.removeEventListener('keypress',keyPressHandler);
            document.body.removeEventListener('keydown', keyDownHandler)
            document.body.removeEventListener('keyup', keyUpHandler);
            alert(`THE WINNER IS ${winner.name}`)
            return onFightEnd();
        }
        return null;
    }

    const [leftIndicator,rightIndicator] = indicators;
    const keyPressHandler = e => {
        switch (e.code) {
            case controls.PlayerOneAttack: {
                setPlayerRunning('first', fighterModels[0]);
                const oldHealth = secondFighter.health;
                secondFighter.health -= getDamage(firstFighter, secondFighter);
                rightIndicator.style.width = `${oldHealth - (oldHealth - secondFighter.health*100/startHealthSecond)}%`;
                logFight(fightId,{fighter1Shot:oldHealth - secondFighter.health,fighter2Health:secondFighter.health})
                return onEndFight(secondFighter,firstFighter,startHealthSecond,startHealthFirst);
            }
            case controls.PlayerTwoAttack: {
                setPlayerRunning('second', fighterModels[1]);
                const oldHealth = firstFighter.health;
                firstFighter.health -= getDamage(secondFighter, firstFighter);
                leftIndicator.style.width = `${oldHealth - (oldHealth - firstFighter.health*100/startHealthFirst)}%`;
                logFight(fightId,{fighter2Shot:oldHealth - firstFighter.health,fighter1Health:firstFighter.health})
                return onEndFight(firstFighter,secondFighter,startHealthFirst,startHealthSecond)
            }
        }
    }
    const keyDownHandler = e => {
        switch (e.code) {
            case controls.PlayerOneBlock:
                return firstFighter.block = true
            case controls.PlayerTwoBlock:
                return secondFighter.block = true
        }
    }
    const keyUpHandler = e => {
        switch (e.code) {
            case controls.PlayerOneBlock:
                return firstFighter.block = false
            case controls.PlayerTwoBlock:
                return secondFighter.block = false
        }
    }
    document.body.addEventListener('keypress', keyPressHandler)
    document.body.addEventListener('keydown', keyDownHandler)
    document.body.addEventListener('keyup', keyUpHandler)
}
const getBlockPower = (defender) => {
    const dodgeChance = Math.random() + 1;
    return defender.defense * dodgeChance;
}
const getPunchPower = (atacker) => {
    const critChance = Math.random() + 1;
    return atacker.power * critChance;
}
const getDamage = (atacker, defender) => {
    const hitPower = getPunchPower(atacker);
    const blockPower = getBlockPower(defender)
    if (!atacker.block) {
        if (defender.block) {
            return hitPower - blockPower <= 0 ? 0 : hitPower - blockPower;
        } else {
            return hitPower;
        }
    }
    return 0;
}
