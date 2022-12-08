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

class StrategyVisitor extends BaseStrategyVisitor {
    myShotMapping: Record<string, Shot> = {'X': new Rock(), 'Y': new Paper(), 'Z': new Scissors()}
    opponentShotMapping: Record<string, Shot> = {'A': new Rock(), 'B': new Paper(), 'C': new Scissors()}

    constructor() {
        super()
        this.validateVisitor()
    }

    round(ctx: any) {
        // console.log("VVV in round ctx = ")
        // console.log(ctx)

        const myShotCode: Shot = this.myShotMapping[ctx.children.MyShot.map((s: any) => s.image)[0]]
        const opponentShotCode: Shot = this.opponentShotMapping[ctx.children.OpponentShot.map((s: any) => s.image)[0]]
        // console.log("VVV ctx.children.MyShot.map((s:any) => s.image)")
        // console.log(ctx.children.MyShot.map((s:any) => s.image))
        return new Round(myShotCode, opponentShotCode)
    }

    strategy(ctx: any) {
        // console.log("VVV in strategy ctx = ")
        // console.log(ctx)
        const map = ctx.round.map((r: any) => this.round(r));
        // console.log("VVV map = " + map)
        // console.log("VVV map[0] = " + map[0])
        return new Strategy(
            ...map
        )
    }

}

export function parseStrategy(day2Example: string) {
    strategyParser.input = StrategyLexer.tokenize(day2Example).tokens
    const cstOutput: CstNode = strategyParser.strategy()
    if (strategyParser.errors.length > 0) {
        throw Error("Sad sad panda, parsing errors detected!\n" + strategyParser.errors[0].message)
    }

    const toAstVisitor = new StrategyVisitor()
    return toAstVisitor.visit(cstOutput)
}
