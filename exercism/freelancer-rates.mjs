/*
    Exercism JavaScript track

    Source: https://exercism.org/tracks/javascript
    My solutions: https://github.com/egalli64/js-playground/exercism

    Freelancer Rates
    https://exercism.org/tracks/javascript/exercises/freelancer-rates
 */

const HOURS_PER_DAY = 8
const BILLABLE_DAYS_PER_MONTH = 22

/**
 * The day rate, given a rate per hour
 *
 * @param {number} ratePerHour
 * @returns {number} the rate per day
 */
export function dayRate(ratePerHour) {
    return HOURS_PER_DAY * ratePerHour
}

/**
 * Calculates the number of days in a budget, rounded down
 *
 * @param {number} budget: the total budget
 * @param {number} ratePerHour: the rate per hour
 * @returns {number} the number of days
 */
export function daysInBudget(budget, ratePerHour) {
    return Math.floor(budget / ratePerHour / HOURS_PER_DAY)
}

/**
 * Calculates the discounted rate for large projects, rounded up
 *
 * @param {number} ratePerHour
 * @param {number} numDays: number of days the project spans
 * @param {number} discount: for example 20% written as 0.2
 * @returns {number} the rounded up discounted rate
 */
export function priceWithMonthlyDiscount(ratePerHour, numDays, discount) {
    let rate = dayRate(ratePerHour)
    let fullPrice = numDays % BILLABLE_DAYS_PER_MONTH * rate
    let discounted = Math.floor(numDays / BILLABLE_DAYS_PER_MONTH) * BILLABLE_DAYS_PER_MONTH * rate * (1 - discount)
    return Math.ceil(fullPrice + discounted)
}

console.log('Smoke test ...')

let result = dayRate(89)
if (result != 712)
    console.log(`Unexpected ${result}!`)

result = daysInBudget(20000, 89)
if (result != 28)
    console.log(`Unexpected ${result}!`)

result = priceWithMonthlyDiscount(89, 230, 0.42)
if (result != 97972)
    console.log(`Unexpected ${result}!`)

console.log('... done')
