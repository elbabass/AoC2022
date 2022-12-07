type PlayerOneShotEncoding = "A" | "B" | "C"
type PlayerTwoShotEncoding = "X" | "Y" | "Z"

export abstract class Shot {
    abstract getPlayerOneShotEncoding: () => PlayerOneShotEncoding
    abstract getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding
    abstract getScore: () => number

    getName = () => this.constructor.name
}

export class Rock extends Shot {
    getPlayerOneShotEncoding: () => PlayerOneShotEncoding = () => "A"
    getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding = () => "X"
    getScore = () => 1
}

export class Paper extends Shot {
    getPlayerOneShotEncoding: () => PlayerOneShotEncoding = () => "B"
    getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding = () => "Y"
    getScore = () => 2

}

export class Scissors extends Shot {
    getPlayerOneShotEncoding: () => PlayerOneShotEncoding = () => "C"
    getPlayerTwoShotEncoding: () => PlayerTwoShotEncoding = () => "Z"
    getScore = () => 3

}
