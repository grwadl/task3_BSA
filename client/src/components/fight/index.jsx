import React from 'react';

import { getFighters } from '../../services/domainRequest/fightersRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';
import { Button } from '@material-ui/core';
import './fight.css'
import FightArena from "../FightArena/FightArena";
import HistoryModal from "../HistoryModal/HistoryModal";
import FighterModal from "../FighterModal/FighterModal";

class Fight extends React.Component {
    state = {
        fighters: [],
        fighter1: null,
        fighter2: null,
        fightStarted:false,
        openHistoryModal:false,
        openFighterModal:false
    };

    async componentDidMount() {
        const fighters = await getFighters();
        if(fighters && !fighters.error) {
            this.setState({ fighters });
        }
    }
    openModal = () =>{
        this.setState({openHistoryModal:true})
    }
    closeModal = () =>{
        this.setState({openHistoryModal:false})
    }
    openFighterModal = ()=>{
        this.setState({openFighterModal:true})
    }
    closeFighterModal = ()=>{
        this.setState({openFighterModal:false})
    }
    onFightStart = () => {
        if (this.state.fighter1&&this.state.fighter2)
         this.setState({fightStarted:true})
    }
    onFightEnd = ()=>{
        this.setState({fightStarted:false})
    }
    onCreate = (fighter) => {
        this.setState({ fighters: [...this.state.fighters, fighter] });
    }

    onFighter1Select = (fighter1) => {
        this.setState({fighter1 });
    }

    onFighter2Select = (fighter2) => {
        this.setState({ fighter2 });
    }

    getFighter1List = () => {
        const { fighter2, fighters } = this.state;
        if(!fighter2) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter2.id);
    }
    changeFighters = (items)=>{
        return this.setState({fighters:items})
    }

    getFighter2List = () => {
        const { fighter1, fighters } = this.state;
        if(!fighter1) {
            return fighters;
        }

        return fighters.filter(it => it.id !== fighter1.id);
    }

    render() {
        const  { fighter1, fighter2 } = this.state;
        if(this.state.fightStarted){
            return (
                <FightArena onFightEnd={this.onFightEnd} fighters={[this.state.fighter1,this.state.fighter2]}/>
            )
        }
        if(this.state.openHistoryModal){
            return <HistoryModal closeModal={this.closeModal}/>
        }
        if(this.state.openFighterModal){
            return <FighterModal changeFighters={this.changeFighters} fighters={this.state.fighters} closeModal={this.closeFighterModal}/>
        }
        return (
            <div id="wrapper">
                <NewFighter onCreated={this.onCreate} />
                <div id="figh-wrapper">
                    <Fighter selectedFighter={fighter1} onFighterSelect={this.onFighter1Select} fightersList={this.getFighter1List() || []} />
                    <div className="btn-wrapper">
                        <Button onClick={this.onFightStart} variant="contained" color="primary">Start Fight</Button>
                        <Button onClick={this.openModal} variant="contained" color="primary">Watch history Fights</Button>
                        <Button onClick={this.openFighterModal} variant="contained" color="primary">Change fighters</Button>
                    </div>
                    <Fighter selectedFighter={fighter2} onFighterSelect={this.onFighter2Select} fightersList={this.getFighter2List() || []} />
                </div>
            </div>
        );
    }
}

export default Fight;