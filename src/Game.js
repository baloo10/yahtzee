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
      rolling: false,
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
    this.animateRoll = this.animateRoll.bind(this);
  }

    //when the page loads, do this method
    componentDidMount(){
      this.animateRoll();
    }
    //will set the state to true, then it will roll, and in the roll() we set the state
    //back to false, after 1sec
    animateRoll() {
       this.setState({rolling: true}, () => {
         setTimeout(this.roll, 1000);
       })
    }
  

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      //updated the state if rolls left are less than 1(if its not more rolls)
      //then make sure that locked is an array filled with true values
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      //check if rollsleft is 0, then lock the buttons
      rollsLeft: st.rollsLeft - 1,
      //this will stop the animation
      rolling : false
    }));
  }

  toggleLocked(idx) {

    // toggle whether idx is in locked or not
    //if you have rolls left, then go ahead and toggle the Die
    if(this.state.rollsLeft > 0 && !this.state.rolling){
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
    this.animateRoll();
  }

  displayRollInfo(){
    //make a array
    const messages = [
      "0 Rolls Left", 
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round"
    ]
    //use the this.state.rollsLeft as a index, to the array, to display message
    return messages[this.state.rollsLeft];
  }

  render() {
    const {dice, locked, rollsLeft, rolling, scores} = this.state; 
    //disabled={this.state.locked.every(x => x)} we make this disabled when
    // this is true. every means that it has to return true for every item in the 
    //array. If all the items in the array are true, then every will return true
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>
              Yahtzee!  
          </h1>

          <section className='Game-dice-section'>
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
              disabled={rollsLeft === 0}
              rolling = {rolling}
              
            />
            <div className='Game-button-wrapper'>
              <button
                className='Game-reroll'
                disabled={
                  locked.every(x => x) || 
                  rollsLeft === 0 ||
                  rolling
              }
                onClick={this.animateRoll}
              >
                {this.displayRollInfo()}
                
              </button>
            </div>
          </section>
        </header>

        < main className="Game-Main"> 
          <ScoreTable doScore={this.doScore} scores={scores} />
        </main>
        
      </div>
    );
  }
}

export default Game;
