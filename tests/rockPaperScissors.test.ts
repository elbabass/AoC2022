import {Strategy} from "../src/rockPaperScissors";
import {parseCorrectStrategy, parseStrategy} from "../src/strategyParser";
import {readFileSync} from "fs";

require('approvals').mocha(__dirname + '/day2')

describe('Elves playing Rock Paper Scissors', () => {
    it('can read strategy to compute score', function () {
        const rounds = parseStrategy(day2Example)
        const description = day2Introduction + day2ExampleExplained(day2Example, rounds)
        this.verify(description);
    })

    it('can read correct strategy to compute score', function () {
        const rounds = parseCorrectStrategy(day2Example)
        const description = day2Part2(rounds)
        this.verify(description);
    })

    it('can read strategy to compute score with day 2 input', function () {
        const day2Inputs = readFileSync(__dirname + "/Day2/day2.input.txt", 'utf-8')
        const rounds = parseStrategy(day2Inputs)
        const description = day2InputExplained(day2Inputs, rounds)
        this.verify(description);
    })
})

const day2Example = "A Y\n" +
    "B X\n" +
    "C Z"

const day2ExampleExplained = (input: string, rounds: Strategy) => {
    const opponentShots = rounds.opponentShots
    const myShots = rounds.myShots

    return "For example, suppose you were given the following strategy guide:\n" +
        "\n-----" +
        "\n" +
        input +
        "\n-----" +
        "\n" +
        "This strategy guide predicts and recommends the following:\n" +
        "\n" +
        "In the first round, your opponent will choose" +
        ` ${opponentShots[0].name} (${opponentShots[0].getPlayerOneShotEncoding()}),` +
        ` and you should choose ${myShots[0].name} (${myShots[0].getPlayerTwoShotEncoding()}).` +
        ` This ends in a win for you with a score of ${rounds.getRoundScore(0)}` +
        ` (${myShots[0].score} because you chose ${myShots[0].name} + ${myShots[0].versus(opponentShots[0])} because you won).\n` +
        "In the second round, your opponent will choose" +
        ` ${opponentShots[1].name} (${opponentShots[1].getPlayerOneShotEncoding()}),` +
        ` and you should choose ${myShots[1].name} (${myShots[1].getPlayerTwoShotEncoding()}).` +
        ` This ends in a loss for you with a score of ${rounds.getRoundScore(1)} (${myShots[1].score} + ${myShots[1].versus(opponentShots[1])}).\n` +
        `The third round is a draw with both players choosing ${opponentShots[2].name},` +
        ` giving you a score of ${myShots[2].score} + ${myShots[2].versus(opponentShots[2])} = ${rounds.getRoundScore(2)}.\n` +
        "In this example, if you were to follow the strategy guide, you would get a total score of" +
        ` ${rounds.totalScore} (${rounds.getRoundScore(0)} + ${rounds.getRoundScore(1)} + ${rounds.getRoundScore(2)}).`
}

const day2Part2 = (rounds: Strategy) => "--- Part Two ---\n" +
    "The Elf finishes helping with the tent and sneaks back over to you." +
    " \"Anyway, the second column says how the round needs to end: X means you need to lose," +
    " Y means you need to end the round in a draw, and Z means you need to win. Good luck!\"\n" +
    "\n" +
    "The total score is still calculated in the same way, but now you need to figure out what shape to" +
    " choose so the round ends as indicated. The example above now goes like this:\n" +
    "\n" +
    `In the first round, your opponent will choose ${rounds.opponentShots[0].name} (${rounds.opponentShots[0].getPlayerOneShotEncoding()}),` +
    ` and you need the round to end in a ${rounds.getRoundResult(0).toLowerCase()} (Y),` +
    ` so you also choose Rock. This gives you a score of ${rounds.myShots[0].score} + ${rounds.myShots[0].versus(rounds.opponentShots[0])} = ${rounds.getRoundScore(0)}.\n` +
    `In the second round, your opponent will choose ${rounds.opponentShots[1].name} (${rounds.opponentShots[1].getPlayerOneShotEncoding()}),` +
    ` and you choose Rock so you ${rounds.getRoundResult(1).toLowerCase()} (X) with a score of ${rounds.myShots[1].score} + ${rounds.myShots[1].versus(rounds.opponentShots[1])} = ${rounds.getRoundScore(1)}.\n` +
    "In the third round," +
    ` you will defeat your opponent's ${rounds.opponentShots[2].name} with ${rounds.myShots[2].name} for a score of ${rounds.myShots[2].score} + ${rounds.myShots[2].versus(rounds.opponentShots[2])} = ${rounds.getRoundScore(2)}.\n` +
    "Now that you're correctly decrypting the ultra top secret strategy guide," +
    ` you would get a total score of ${rounds.totalScore}.`

const day2InputExplained = (input: string, rounds: Strategy) => {
    return "What would your total score be if everything goes exactly according to your strategy guide?\n" +
        "\n" +
        "To begin, get your puzzle input." +
        "\n-----" +
        "\n" +
        input +
        "\n-----" +
        "\n" +
        "This strategy guide predicts and recommends the following:\n" +
        "\n" +
        ` ${rounds.totalScore}.`
}

const day2Introduction = "--- Day 2: Rock Paper Scissors ---\n" +
    "The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant Rock Paper Scissors tournament is already in progress.\n" +
    "\n" +
    "Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.\n" +
    "\n" +
    "Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win. \"The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. The second column--\" Suddenly, the Elf is called away to help with someone's tent.\n" +
    "\n" +
    "The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.\n" +
    "\n" +
    "The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores for each round. The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).\n" +
    "\n" +
    "Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide.\n" +
    "\n"
