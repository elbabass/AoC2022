const enum PlayerOneShotEncoding {
    Rock = "A",
    Paper = "B",
    Scissors = "C"
}

const enum PlayerTwoShotEncoding {
    Rock = "X",
    Paper = "Y",
    Scissors = "Z"
}

export enum RoundResult {
    Lose = 0,
    Draw = 3,
    Win = 6
}

export const translateResult = {'X': RoundResult.Lose, "Y": RoundResult.Draw, 'Z': RoundResult.Win}

export abstract class Shot {
    protected abstract result: Record<string, number>
    abstract loseAgainst: () => Shot
    abstract winAgainst: () => Shot

    abstract getPlayerOneShotEncoding: () => PlayerOneShotEncoding
    abstract getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding
    abstract drawAgainst: () => Shot

    protected abstract _score: number

    get score(): number {
        return this._score
    }

    get name(): string {
        return this.constructor.name
    }

    versus = (opponent: Shot) => this.result[opponent.name];
}

export class Rock extends Shot {
    result = {'Rock': RoundResult.Draw, 'Paper': RoundResult.Lose, 'Scissors': RoundResult.Win}
    protected _score = 1;
    getPlayerOneShotEncoding = () => PlayerOneShotEncoding.Rock
    getPlayerTwoShotEncoding = () => PlayerTwoShotEncoding.Rock

    drawAgainst = (): Shot => new Rock()
    loseAgainst = (): Shot => new Paper()
    winAgainst = (): Shot => new Scissors()
}

export class Paper extends Shot {
    result = {'Rock': RoundResult.Win, 'Paper': RoundResult.Draw, 'Scissors': RoundResult.Lose}
    protected _score = 2;
    getPlayerOneShotEncoding = () => PlayerOneShotEncoding.Paper
    getPlayerTwoShotEncoding = () => PlayerTwoShotEncoding.Paper
    drawAgainst = (): Shot => new Paper()
    loseAgainst = (): Shot => new Scissors()
    winAgainst = (): Shot => new Rock()
}

export class Scissors extends Shot {
    result = {'Rock': RoundResult.Lose, 'Paper': RoundResult.Win, 'Scissors': RoundResult.Draw}
    protected _score = 3;
    getPlayerOneShotEncoding = () => PlayerOneShotEncoding.Scissors
    getPlayerTwoShotEncoding = () => PlayerTwoShotEncoding.Scissors
    drawAgainst = (): Shot => new Scissors()
    loseAgainst = (): Shot => new Rock()
    winAgainst = (): Shot => new Paper()
}

export class Round {
    private readonly _myShot: Shot;
    private readonly _opponentShot: Shot;

    constructor(me: Shot, opponent: Shot) {
        this._myShot = me
        this._opponentShot = opponent
    }

    get score(): number {
        return this._myShot.score +
            this.myShot.versus(this._opponentShot)
    }

    get opponentShot(): Shot {
        return this._opponentShot;
    }

    get myShot(): Shot {
        return this._myShot;
    }

    get myResult(): string {
        return RoundResult[this._myShot.versus(this._opponentShot)]
    }
}

export class Strategy {
    private readonly rounds: Array<Round>;

    constructor(...rounds: Round[]) {
        this.rounds = new Array<Round>(...rounds)
    }

    get totalScore(): number {
        return this.rounds.map(round => round.score).reduce((sum, round) => sum + round)
    }

    get opponentShots() {
        return this.rounds.map((round) => round.opponentShot)
    }

    get myShots() {
        return this.rounds.map((round) => round.myShot)
    }

    getRoundScore = (roundNumber: number) => <RoundResult>this.rounds[roundNumber].score
    getRoundResult = (roundNumber: number) => this.rounds[roundNumber].myResult
}
