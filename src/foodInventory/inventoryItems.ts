export class InventoryItems {
    total: number
    rank: number

    constructor(total: number, rank: number) {
        this.total = total
        this.rank = rank
    }

    static compare(a: InventoryItems, b: InventoryItems): number {
        return a.total - b.total
    }
}

export class Bag {
    private itemCalories: Array<number>

    constructor(itemCalories: Array<number>) {
        this.itemCalories = itemCalories
    }

    getTotalCalories() {
        return this.itemCalories.reduce((acc, item) => acc + item)
    }
}

export class Inventory {
    private bags: Array<Bag>

    constructor(bags: Array<Bag>) {
        this.bags = bags
    }

    toRankedCalories() {
        return this.bags.map(
            (bag, index) =>
                new InventoryItems(bag.getTotalCalories(), index + 1))
    }
}
