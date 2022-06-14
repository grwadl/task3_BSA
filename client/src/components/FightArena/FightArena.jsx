import React, {useEffect} from 'react';
import './fightArena.css';
import luffy from './luffy.gif';
import lo from './lo.gif';
import {fight} from "./fight";
import {createFight} from "../../services/domainRequest/fightRequest";
const FightArena = ({fighters,onFightEnd}) => {
    useEffect(()=>{
        let fightId;
       createFight({fighter1:fighters[0], fighter2:fighters[1]})
           .then(res=>fightId=res)
           .then(()=>fight(fighters[0],fighters[1],firstFighterModels,indicators,fightId,onFightEnd));
        const firstFighterModels = document.querySelectorAll('.fighterModel ');
        const indicators = document.querySelectorAll('.indicator ');

    },[])
    return (
        <div className='arena__wrapper'>
            <div className='indicators'>
                <div className='indicatorLeft'>
                    <div className='indicator'><span className='fighter__name'>{fighters[0].name}</span></div>
                </div>
                <div className='indicatorRight'>
                    <div className='indicator'><span className='fighter__name'>{fighters[1].name}</span></div>
                </div>
            </div>
            <div className='arena__fighter fighter1'>
                <img className='lo fighterModel' src={lo} alt="Trafalgar D water Lo"/>
            </div>
            <div className='arena__fighter fighter2'>
                <img className='luffy fighterModel' src={luffy} alt=" Monkey D Luffy"/>
            </div>
        </div>
    );
};

export default FightArena;