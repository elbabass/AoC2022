export class InventoryItem {
    total: number
    rank: number

    constructor(total: number, rank: number) {
        this.total = total
        this.rank = rank
    }

    static compare(a: InventoryItem, b: InventoryItem): number {
        return b.total - a.total
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
                new InventoryItem(bag.getTotalCalories(), index + 1))
    }
}
