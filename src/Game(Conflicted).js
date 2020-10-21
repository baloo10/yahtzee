import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      //check if rollsleft is 0, then lock the buttons
      rollsLeft: st.rollsLeft - 1
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    this.setState(st => ({
      //we take the old version of locked
      locked: [
        //we keep all the same, before the idx idex
        ...st.locked.slice(0, idx),
        //at that index, we flip it, from true to false/false to true
        !st.locked[idx],
        //and then we take the rest of the array, and keep it the same as well
        ...st.locked.slice(idx + 1)
      ]
    }));
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      //here we take all the excisting score, and put them back in the scores object, 
      //excpet rulename, that will be evaluated, and new state will be set from the return
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      //we resett the rolls left 
      rollsLeft: NUM_ROLLS,
      //and then we also unlock all of the dice, the locked array will be filled with falses
      locked: Array(NUM_DICE).fill(false)
    }));
    this.roll();
  }

  render() {
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={this.state.locked.every(x => x)}
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
