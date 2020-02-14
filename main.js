const dice = require('talisman/metrics/distance/dice');
const jaccard = require('talisman/metrics/distance/jaccard');
const levenshtein = require('talisman/metrics/distance/levenshtein');
const damerauLevenshtein = require('talisman/metrics/distance/damerau-levenshtein');
const jaro = require('talisman/metrics/distance/jaro-winkler');

// let testWords = ['v Tobi-Kadachi', 'vi Tobi-Kadachi', 'vip Tobi-Kadachi', 'viper tobi', 'viper tobi kadashi',
//                  'viper tobi-', 'viper tobi-k', 'tobi kadachi', 'viper', 'Viper', 'dodogama', 'uwotm8']
let testWords = ['mega'];
let targetWord = 'garugalash';

function similarity(editFunction, str1, str2) {
  let longer = str1;
  let shorter = str2;
  if (str1.length < str2.length) {
    longer = str2;
    shorter = str1;
  }
  const longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  } else {
    return (
      (longerLength - editFunction(longer, shorter)) / parseFloat(longerLength)
    );
  }
}

function testDice() {
  console.log(`[DICE-COEFF]\nComparing to '${targetWord}'...`);
  testWords.forEach(word => {
    res = dice(word, targetWord);
    console.log(`  ${word} --> ${res.toFixed(2)}`);
  });
  console.log('---\n');
}

function testLevenshtein() {
  console.log(`[LEVENSHTEIN]\nComparing to '${targetWord}'...`);
  testWords.forEach(word => {
    res = similarity(levenshtein, targetWord, word);
    console.log(`  ${word} --> ${res.toFixed(2)}`);
  });
  console.log('---\n');
}

function testDamerau() {
  console.log(`[DAMERAU-LEVENSHTEIN]\nComparing to '${targetWord}'...`);
  testWords.forEach(word => {
    res = similarity(damerauLevenshtein, targetWord, word);
    console.log(`  ${word} --> ${res.toFixed(2)}`);
  });
  console.log('---\n');
}

function testJaroWinkler() {
  console.log(`[JARO-WINKLER]\nComparing to '${targetWord}'...`);
  testWords.forEach(word => {
    res = jaro(word, targetWord);
    console.log(`  ${word} --> ${res.toFixed(2)}`);
  });
  console.log('---\n');
}

function testJaccard() {
  console.log(`[JACCARD]\nComparing to '${targetWord}'...`);
  testWords.forEach(word => {
    res = jaccard(word, targetWord);
    console.log(`  ${word} --> ${res.toFixed(2)}`);
  });
  console.log('---\n');
}

testDice();
testLevenshtein();
testDamerau();
testJaroWinkler();
testJaccard();
