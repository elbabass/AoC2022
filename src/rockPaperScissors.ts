type PlayerOneShotEncoding = "A" | "B" | "C"
type PlayerTwoShotEncoding = "X" | "Y" | "Z"

export abstract class Shot {
    protected abstract result: Record<string, number>
    abstract getPlayerOneShotEncoding: () => PlayerOneShotEncoding
    abstract getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding
    abstract getScore: () => number
    versus = (opponent: Shot) => this.result[opponent.getName()];
    getName = () => this.constructor.name
}

export class Rock extends Shot {
    result = {'Rock': 3, 'Paper': 0, 'Scissors': 6}
    getPlayerOneShotEncoding: () => PlayerOneShotEncoding = () => "A"
    getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding = () => "X"
    getScore = () => 1
}

export class Paper extends Shot {
    result = {'Rock': 6, 'Paper': 3, 'Scissors': 0}
    getPlayerOneShotEncoding: () => PlayerOneShotEncoding = () => "B"
    getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding = () => "Y"
    getScore = () => 2
}

export class Scissors extends Shot {
    result = {'Rock': 0, 'Paper': 6, 'Scissors': 3}
    getPlayerOneShotEncoding: () => PlayerOneShotEncoding = () => "C"
    getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding = () => "Z"
    getScore = () => 3
}
