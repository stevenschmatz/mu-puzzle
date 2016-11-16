/**
 * MU puzzle
 * Steven Schmatz
 *
 * This famous puzzle was posted by Douglas Hofstadter in Gödel Escher Bach.
 *
 * Given the following rules:
 * - If the string ends with "I": add a "U" at the end.
 * - If you have "Mx", where "x" is any pattern, add "Mxx" to the collection.
 * - If "III" occurs in your collection, replace it with "U".
 * - If "UU" occurs in your collection, you can drop it.
 *
 * Transform the string "MI" to "MU".
 *
 * Spoiler alert: such a solution does not exist. :)
 */

const ITERATION_MAX = 10000;
const MAX_CANDIDATE_COUNT = 100000;

/**
 * Attempts to find a solution to the MU problem from "Gödel Escher Bach".
 */
function main() {
  const candidates = ["MI"];
  const rejected = new Set();
  const initialIteration = 0;

  recurse(candidates, rejected, initialIteration);
}

/**
 * Recursively checks all candidate words, using dynamic programming.
 * @param {Array<string>} candidates possible candidate words to check
 * @param {Set<string>} rejected rejected words.
 * @param {number} iteration the current iteration count
 * @param {number} iterationMax max number of iterations before failing
 */
function recurse(candidates, rejected, iteration) {

  if (candidates.length > MAX_CANDIDATE_COUNT) {
    console.log(`Exceeded max candidate count in ${iteration} iterations.`);
    process.exit(0);
  }

  if (iteration > ITERATION_MAX) {
    console.log(`No solution found in ${iteration} iterations.`);
    process.exit(0);
  }

  let newCandidateSet = new Set();
  candidates.map(candidate => {
    generateCandidates(candidate, rejected).map(newCandidate => {
      newCandidateSet.add(newCandidate);
    });
  });

  if (newCandidateSet.has("MU")) {
    console.log("FOUND SOLUTION!");
    return;
  }

  const newCandidates = Array.from(newCandidateSet);
  newCandidates.map(newCandidate => rejected.add(newCandidate));

  recurse(newCandidates, rejected, iteration + 1);
}

/**
 * Returns the potential candidates words from the current candidate word and rejected words.
 *
 * @param {string} current the current word
 * @param {Set<string>} rejected the set of rejected words
 * @return {Array<string>} the set of possible next candidates to search
 */
function generateCandidates(current, rejected) {

  let newCandidates = [];

  // Rule 1: If the string ends with "I", add a "U" at the end
  if (current.slice(-1) === "I") {
    const newString = current + "U";
    if (!rejected.has(newString)) {
      newCandidates.push(newString);
    }
  }

  // Rule 2: If you have "Mx", then you can add "Mxx" to your collection.
  if (current.length > 1 && current[0] == "M") {
    const newString = current + current.substr(1);
    if (!rejected.has(newString)) {
      newCandidates.push(newString);
    }
  }

  // Rule 3: If "III" occurs in your collection, you can replace it with "U".
  newCandidates = newCandidates.concat(allIndicesOf(current, "III").map(index => {
    return current.substr(0, index) + "U" + current.substr(index + 3);
  }).filter(word => !rejected.has(word)));

  // Rule 4: If "UU" occurs in one of your strings, you can drop it.
  newCandidates = newCandidates.concat(allIndicesOf(current, "UU").map(index => {
    return current.substr(0, index) + current.substr(index + 2);
  }).filter(word => !rejected.has(word)));

  return newCandidates;
}

/**
 * Returns all indices of `toSearch` in str.
 * @param {string} str the string to be searched
 * @param {string} toSearch the query string
 * @return {Array<number>} the indices of occurrences
 */
function allIndicesOf(str, toSearch) {
  var indices = [];
  for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
      indices.push(pos);
  }
  return indices;
}

main();
