import React, {useEffect, useState} from 'react';
import './HistoryModal.css';
import {getFights} from "../../services/domainRequest/fightRequest";

const HistoryModal = ({closeModal}) => {
    const [fights, setFights] = useState([]);
    const getHistory = async() =>{
    const data = await getFights();
    return data&&!data.error? setFights(data):setFights(null)
    }
    useEffect(() => {
        getHistory()
    }, []);
    return (
        <div className='historyModal__form' >
            <div className='history__closeBtn' onClick={closeModal}></div>
            <h1 className='historyModal__title'>HISTORY</h1>
            <div className='historyModal__fightList'>
                {fights?.map(fight =>
                    <div className='history__item'>
                        <div className='history__fighters'>{fight.fighter1.name} vs {fight.fighter2.name}</div>
                        <div className='history__winner'>WINNER: {fight.log?.[fight.log?.length-1]?.winner}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryModal;