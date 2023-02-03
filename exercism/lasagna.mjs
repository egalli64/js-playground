/*
    Exercism JavaScript track

    Source: https://exercism.org/tracks/javascript
    My solutions: https://github.com/egalli64/js-playground/exercism

    Lucian's Luscious Lasagna
    https://exercism.org/tracks/javascript/exercises/lasagna
 */
const PREPARATION_MINUTES_PER_LAYER = 2
export const EXPECTED_MINUTES_IN_OVEN = 40

/**
 * Determines the number of minutes the lasagna still needs to remain in the
 * oven to be properly prepared.
 *
 * @param {number} actualMinutesInOven
 * @returns {number} the number of minutes remaining
 */
export function remainingMinutesInOven(actualMinutesInOven) {
    return EXPECTED_MINUTES_IN_OVEN - actualMinutesInOven
}

/**
 * Given a number of layers, determines the total preparation time.
 *
 * @param {number} numberOfLayers
 * @returns {number} the total preparation time
 */
export function preparationTimeInMinutes(numberOfLayers) {
    return numberOfLayers * PREPARATION_MINUTES_PER_LAYER
}

/**
 * Calculates the total working time. That is, the time to prepare all the layers
 * of lasagna, and the time already spent in the oven.
 *
 * @param {number} numberOfLayers
 * @param {number} actualMinutesInOven
 * @returns {number} the total working time
 */
export function totalTimeInMinutes(numberOfLayers, actualMinutesInOven) {
    return preparationTimeInMinutes(numberOfLayers) + actualMinutesInOven
}

console.log('Smoke test ...')
if (EXPECTED_MINUTES_IN_OVEN != 40)
    console.log("Unexpected!")

if (remainingMinutesInOven(10) != 30)
    console.log("Unexpected!")

if (preparationTimeInMinutes(8) != 16)
    console.log("Unexpected!")

if (totalTimeInMinutes(1, 35) != 37)
    console.log("Unexpected!")

console.log('... done')