import {parseInventory} from "./parseInventory";
import {Inventory, InventoryItem} from "./inventoryItem";

class InventoryCalories {
    private readonly _inventoryItems: Array<InventoryItem>;

    constructor(inventoryItems: Array<InventoryItem>) {
        this._inventoryItems = inventoryItems
    }

    get inventoryItems(): Array<InventoryItem> {
        return this._inventoryItems
    }

    get(index: number): InventoryItem {
        return this._inventoryItems[index];
    }


    totalCalories() {
        return this._inventoryItems
            .map((inventoryItem) => inventoryItem.total)
            .reduce((total, inventoryItem) => total + inventoryItem)
    }
}

export class CaloriesCounter {
    private inventory: Inventory;

    constructor(itemCaloriesWritings: string) {
        this.inventory = parseInventory(itemCaloriesWritings);
    }

    topCalorieBags(quantity: number = 1) {
        const caloriesPerBag = this
            .inventory
            .toRankedCalories()
            .sort(InventoryItem.compare)
        return new InventoryCalories(caloriesPerBag.slice(0, quantity))
    }
}
