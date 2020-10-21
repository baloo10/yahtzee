/** Rule for Yahtzee scoring.
 *
 * This is an "abstract class"; the real rules are subclasses of these.
 * This stores all parameters passed into it as properties on the instance
 * (to simplify child classes so they don't need constructors of their own).
 *
 * It contains useful functions for summing, counting values, and counting
 * frequencies of dice. These are used by subclassed rules.
 */

class Rule {
  constructor(params) {
    // put all properties in params on instance
    Object.assign(this, params);
  }

  sum(dice) {
    // sum of all dice
    return dice.reduce((prev, curr) => prev + curr);
  }

  //takes inn array of dice
  //if we have a hand of ([4,4,4,3,2]) this will retrun an array [3,1,1]. It was 3 of something, one of something and one of something
  freq(dice) {
    // frequencies of dice values
    const freqs = new Map();
    for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
    return Array.from(freqs.values());
  }

  //count function take the array of dice, and a value, and tell us how many times the vaulue appears in the array 
  count(dice, val) {
    // # times val appears in dice
    return dice.filter(d => d === val).length;
  }
}

/** Given a sought-for val, return sum of dice of that val.
 *
 * Used for rules like "sum of all ones"
 */

 /** evalRoll is the method we call everytime we click  on one of thos rules */
 //this will sum all ones in the roll
 //it will take a bunch of dice. When value is 6. How many times will 6 acurd in that hand, and mulitply this by 6
class TotalOneNumber extends Rule {
  evalRoll = dice => {
    return this.val * this.count(dice, this.val);
  };
}

/** Given a required # of same dice, return sum of all dice.
 *
 * Used for rules like "sum of all dice when there is a 3-of-kind"
 */

 //you pass in the count you are looking for
 //and then we check if this dice array contains 3 of the kind or 4, with the above method freq
 //check if it is at least 3 of the same number .some(c => c >= this.count)
class SumDistro extends Rule {
  evalRoll = dice => {
    // do any of the counts meet of exceed this distro?
    return this.freq(dice).some(c => c >= this.count) ? this.sum(dice) : 0;
  };
}



/** Check for small straights. */

class SmallStraight {
  // TODO
}

/** Check for large straights. */
//checks if the new set has 5 items, Set will only take uniqe values
//after we check if we have either one and not a six, or that the array have a six, and not a one 
class LargeStraight extends Rule {
  evalRoll = dice => {
    const d = new Set(dice);

    // large straight must be 5 different dice & only one can be a 1 or a 6
    return d.size === 5 && (!d.has(1) || !d.has(6)) ? this.score : 0;
  };
}

/** Check if all dice are same. */
//if the dice array is yeatzy [2,3,4,5,6], the freq method will return [5], because its 5 equals value, then it is yatzy
class Yahtzee extends Rule {
  evalRoll = dice => {
    // all dice must be the same
    return this.freq(dice)[0] === 5 ? this.score : 0;
  };
}

/** Check if full house (3-of-kind and 2-of-kind) */

class FullHouse extends Rule {
  evalRoll = (dice) => {

    const freqs = this.freq(dice);
    return (freqs.includes(2) && freqs.includes(3 )) ? this.score : 0;
    
  };
}



// ones, twos, etc score as sum of that value
const ones = new TotalOneNumber({ val: 1 });
const twos = new TotalOneNumber({ val: 2 });
const threes = new TotalOneNumber({ val: 3 });
const fours = new TotalOneNumber({ val: 4 });
const fives = new TotalOneNumber({ val: 5 });
const sixes = new TotalOneNumber({ val: 6 });

// three/four of kind score as sum of all dice
const threeOfKind = new SumDistro({ count: 3 });
const fourOfKind = new SumDistro({ count: 4 });

// full house scores as flat 25
const fullHouse = new FullHouse({score: 25});

// small/large straights score as 30/40
const smallStraight = "TODO";
const largeStraight = new LargeStraight({ score: 40 });

// yahtzee scores as 50
const yahtzee = new Yahtzee({ score: 50 });

// for chance, can view as sum of all dice, requiring at least 0 of a kind
const chance = new SumDistro({ count: 0 });

export {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance
};
