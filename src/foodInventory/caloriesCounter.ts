import {parseInventory} from "./parseInventory";
import {Inventory, InventoryItems} from "./inventoryItems";

export class CaloriesCounter {
    private inventory: Inventory;

    constructor(itemCaloriesWritings: string) {
        this.inventory = parseInventory(itemCaloriesWritings);
    }

    mostCaloriesBag() {
        const caloriesPerBag = this
            .inventory
            .toRankedCalories()
            .sort(InventoryItems.compare)
        return caloriesPerBag[caloriesPerBag.length - 1]
    }
}
