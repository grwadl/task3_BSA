import React, {useMemo, useState} from 'react';
import './FighterModal.css';
import {changeFighter, deleteFighter} from "../../services/domainRequest/fightersRequest";
const FighterModal = ({closeModal,fighters,changeFighters}) => {
    const [selectedFighter,setSelectedFighter] = useState(fighters[0]?.name??'');
    const [params,setParams] = useState({
        health:'',
        defense:'',
        power:'',
        name:''
    });
    const isValid = useMemo(()=>{
       return  !!(selectedFighter&&(params.health||params.defense||params.power||params.name))
    },[params])
    const changeFighterProps = async()=>{
        let dataToUpdate = {};
        for (let key in params) {
            if (params[key])
                dataToUpdate = {...dataToUpdate, [key]: params[key]}
        }
        const fighter = fighters.find(item=>item.name===selectedFighter);
        const data = await changeFighter(fighter.id,dataToUpdate);
        if(data&&!data.error){
            const newFighters = fighters.filter(item=>item.id!==fighter.id);
            newFighters.push(data);
            changeFighters(newFighters);
            setSelectedFighter(data.name)
        }
    }
    const deleteFighterHandler = async()=>{
        const toDeleteFighter = fighters.find(fighter=>fighter.name===selectedFighter);
        const data = await deleteFighter(toDeleteFighter.id);
        if(data&&!data.error){
            const newFighters = fighters.filter(item=>item.id!==toDeleteFighter.id);
            changeFighters(newFighters);
            setSelectedFighter(newFighters[0]?.name??'')
        }
    }
    const isDeleteValid = useMemo(()=>{
        return !!selectedFighter
    },[selectedFighter])
    const fields = [{name:'health'},{name:'defense'},{name:'power'},{name:'name'}];
    const changeField = e => setParams({...params,[e.target.name]:e.target.value})
    return (
        <div className='fighterModal'>
            <div className='fighterModal__closeBtn' onClick={closeModal}></div>
            <h1 className='fighterModal__title'>CHANGE FIGHTER</h1>
            <select value={selectedFighter} name="selectFighter" id="" onChange={e=>setSelectedFighter(e.target.value)}>
                {fighters?.map(fighter=> <option value={fighter.name}>{fighter.name}</option>)}
            </select>
            <div className='fighterModal__fields'>
                {fields.map(field=><input className='fighterModal__field' placeholder={`${field.name}...`}
                                          onChange={changeField} name={field.name}/>)}
            </div>
            <button className='fighterModal__button' disabled={!isValid} onClick={changeFighterProps}>Change</button>
            <button className='fighterModal__button' disabled={!isDeleteValid} onClick={deleteFighterHandler}>Delete </button>
        </div>
    );
};

export default FighterModal;