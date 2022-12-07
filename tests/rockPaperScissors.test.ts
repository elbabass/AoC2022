import {Paper, Rock, Scissors, Shot} from "../src/rockPaperScissors";

require('approvals').mocha(__dirname + '/day2')
describe('Elves playing Rock Paper Scissors', () => {
    it('can read strategy to compute score', function () {
        const player1Shots = Array<Shot>(new Rock(), new Paper(), new Scissors());
        const player2Shots = Array<Shot>(new Paper(), new Rock(), new Scissors());
        const description =
            day2Introduction +
            day2ExampleExplained(day2Example, player1Shots, player2Shots)
        this.verify(description);
    })
})

const day2Example = "A Y\n" +
    "B X\n" +
    "C Z"

const day2ExampleExplained = (input: string, opponentShots: Array<Shot>, myShots: Array<Shot>) => {
    return "For example, suppose you were given the following strategy guide:\n" +
        "\n-----" +
        "\n" +
        input +
        "\n-----" +
        "\n" +
        "This strategy guide predicts and recommends the following:\n" +
        "\n" +
        "In the first round, your opponent will choose" +
        ` ${opponentShots[0].getName()} (${opponentShots[0].getPlayerOneShotEncoding()}),` +
        ` and you should choose ${myShots[0].getName()} (${myShots[0].getPlayerTwoShotEncoding()}).` +
        " This ends in a win for you with a score of 8" +
        ` (${myShots[0].getScore()} because you chose ${myShots[0].getName()} + ${myShots[0].versus(opponentShots[0])} because you won).\n` +
        "In the second round, your opponent will choose" +
        ` ${opponentShots[1].getName()} (${opponentShots[1].getPlayerOneShotEncoding()}),` +
        ` and you should choose ${myShots[1].getName()} (${myShots[1].getPlayerTwoShotEncoding()}).` +
        ` This ends in a loss for you with a score of 1 (${myShots[1].getScore()} + ${myShots[1].versus(opponentShots[1])}).\n` +
        `The third round is a draw with both players choosing ${opponentShots[2].getName()},` +
        ` giving you a score of ${myShots[2].getScore()} + ${myShots[2].versus(opponentShots[2])} = 6.\n` +
        "In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6)."
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
