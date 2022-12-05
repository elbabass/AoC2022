import {CstNode} from "chevrotain";

const { createToken, Lexer, CstParser } = require("chevrotain")

const Calories = createToken({ name: "Calories", pattern: /[0-9]+/ })
const NewItem = createToken({ name: "NewItem", pattern: /\n/, group: Lexer.SKIPPED })
const NewElf = createToken({ name: "NewElf", pattern: /\n\n/ })

let allTokens = [Calories, NewElf, NewItem]
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
                        $.CONSUME(NewElf)
                    })
                }
            })
        })

        $.RULE("bag", () => {
            $.AT_LEAST_ONE({
                DEF: () => {
                    $.CONSUME(Calories)
                    // $.CONSUME(NewItem)
                }
            })
        })

        this.performSelfAnalysis()
    }
}

const caloriesParser = new CaloriesParser()
const BaseCaloriesVisitor = caloriesParser.getBaseCstVisitorConstructor()

class Node {
    public type: string

    constructor(type: string) {
        this.type = type
    }
}
class BagNode extends Node {
    public items: Array<number>
    constructor(items: Array<number>) {
        super("BAG")
        this.items = items
    }
}

class InventoryNode extends Node {
    public bags: Array<BagNode>

    constructor(bags: Array<BagNode>) {
        super("INVENTORY")
        this.bags = bags
    }
}

class CaloriesVisitor extends BaseCaloriesVisitor {
    constructor() {
        super()
        this.validateVisitor()
    }

    bag(ctx: any) : BagNode {
        return new BagNode(
            ctx.children.Calories.map((cal: any) => parseInt(cal.image))
        )
    }

    inventory(ctx:any) : InventoryNode {
        return new InventoryNode(
            ctx.bag.map((bag: any) => this.bag(bag))
        )
    }
}

export class CaloriesCounter {
    private itemCaloriesWritings: string;
    private ast: InventoryNode;

    constructor(itemCaloriesWritings: string) {
        this.itemCaloriesWritings = itemCaloriesWritings
        const lexingResult = CaloriesLexer.tokenize(itemCaloriesWritings)
        caloriesParser.input = lexingResult.tokens
        const cstOutput : CstNode = caloriesParser.inventory()
        if (caloriesParser.errors.length > 0) {
            throw Error("Sad sad panda, parsing errors detected!\n" + caloriesParser.errors[0].message)
        }
        const toAstVisitor =  new CaloriesVisitor()

        this.ast = toAstVisitor.visit(cstOutput)
    }

    mostCaloriesBag() : number {
        const bags =
            this.ast.bags.map(
                (bag) =>
                    bag.items.reduce(
                        (acc, item) => acc + item))
        return bags.reduce((acc, calories) => (acc < calories) ? calories : acc)
    }
}
