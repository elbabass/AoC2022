import {CstNode} from "chevrotain";
import {Bag, Inventory} from "./inventoryItems";

const {createToken, Lexer, CstParser} = require("chevrotain")

const ItemCaloriesToken = createToken({name: "ItemCalories", pattern: /[0-9]+/})
const ElfBagSeparatorToken = createToken({name: "NewElf", pattern: /\n\n/})

let allTokens = [ItemCaloriesToken, ElfBagSeparatorToken]
let CaloriesLexer = new Lexer(allTokens)

class CaloriesParser extends CstParser {
    constructor() {
        super(allTokens)

        const $ = this

        $.RULE("inventory", () => {
            $.AT_LEAST_ONE({
                DEF: () => {
                    $.SUBRULE($.bag)
                    $.OPTION(() => {
                        $.CONSUME(ElfBagSeparatorToken)
                    })
                }
            })
        })

        $.RULE("bag", () => {
            $.AT_LEAST_ONE({
                DEF: () => {
                    $.CONSUME(ItemCaloriesToken)
                }
            })
        })

        this.performSelfAnalysis()
    }
}


const caloriesParser = new CaloriesParser()
const BaseCaloriesVisitor = caloriesParser.getBaseCstVisitorConstructor()

class CaloriesVisitor extends BaseCaloriesVisitor {
    constructor() {
        super()
        this.validateVisitor()
    }

    bag(ctx: any): Bag {
        return new Bag(
            ctx.children.ItemCalories.map((cal: any) => parseInt(cal.image))
        )
    }

    inventory(ctx: any): Inventory {
        return new Inventory(
            ctx.bag.map((bag: any) => this.bag(bag))
        )
    }
}


export const parseInventory = (itemCaloriesWritings: string) => {
    caloriesParser.input = CaloriesLexer.tokenize(itemCaloriesWritings).tokens
    const cstOutput: CstNode = caloriesParser.inventory()
    if (caloriesParser.errors.length > 0) {
        throw Error("Sad sad panda, parsing errors detected!\n" + caloriesParser.errors[0].message)
    }
    const toAstVisitor = new CaloriesVisitor()

    return toAstVisitor.visit(cstOutput)
}
