import {Paper, Rock, Round, Scissors, Shot, Strategy} from "./rockPaperScissors";
import {CstNode} from "chevrotain";

const {createToken, Lexer, CstParser} = require("chevrotain")

const myShot = createToken({name: "MyShot", pattern: /[XYZ]/})
const opponentShot = createToken({name: "OpponentShot", pattern: /[ABC]/})
const WhiteSpace = createToken({name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED})

const allTokens = [myShot, opponentShot, WhiteSpace]
const StrategyLexer = new Lexer(allTokens)

class StrategyParser extends CstParser {
    constructor() {
        super(allTokens)

        const $ = this

        $.RULE("strategy", () => {
            $.AT_LEAST_ONE({
                DEF: () => {
                    $.SUBRULE($.round)
                }
            })
        })

        $.RULE("round", () => {
            $.CONSUME(opponentShot)
            $.CONSUME(myShot)
        })

        this.performSelfAnalysis()
    }
}


const strategyParser = new StrategyParser()
const BaseStrategyVisitor = strategyParser.getBaseCstVisitorConstructor()

class StrategyBookVisitor extends BaseStrategyVisitor {
    opponentShotMapping: Record<string, Shot> = {'A': new Rock(), 'B': new Paper(), 'C': new Scissors()}

    strategy(ctx: any) {
        const map = ctx.round.map((r: any) => this.round(r));
        return new Strategy(
            ...map
        )
    }
}

export class ShotAndShotVisitor extends StrategyBookVisitor {
    myShotMapping: Record<string, Shot> = {'X': new Rock(), 'Y': new Paper(), 'Z': new Scissors()}

    constructor() {
        super()
        this.validateVisitor()
    }

    round(ctx: any) {
        const myShotCode: Shot = this.myShotMapping[ctx.children.MyShot.map((s: any) => s.image)[0]]
        const opponentShotCode: Shot = this.opponentShotMapping[ctx.children.OpponentShot.map((s: any) => s.image)[0]]
        return new Round(myShotCode, opponentShotCode)
    }

}

export class ShotAndResultVisitor extends StrategyBookVisitor {

    constructor() {
        super()
        this.validateVisitor()
    }

    round(ctx: any) {
        const opponentShotCode: Shot = this.opponentShotMapping[ctx.children.OpponentShot.map((s: any) => s.image)[0]]
        const translateResult: Record<string, Function> =
            {'X': opponentShotCode.winAgainst, 'Y': opponentShotCode.drawAgainst, 'Z': opponentShotCode.loseAgainst}
        const myShotCode: Shot = translateResult[ctx.children.MyShot.map((s: any) => s.image)[0]]()
        return new Round(myShotCode, opponentShotCode)
    }
}

function parse(day2Example: string) {
    strategyParser.input = StrategyLexer.tokenize(day2Example).tokens
    const cstOutput: CstNode = strategyParser.strategy()
    if (strategyParser.errors.length > 0) {
        throw Error("Sad sad panda, parsing errors detected!\n" + strategyParser.errors[0].message)
    }
    return cstOutput;
}

export const collectStrategy = (toAstVisitor: StrategyBookVisitor, day2Example: string) => toAstVisitor.visit(parse(day2Example));

