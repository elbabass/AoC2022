import {InventoryItem} from "../src/foodInventory/inventoryItem";
import {CaloriesCounter} from '../src/foodInventory/caloriesCounter'
import {readFileSync} from 'fs';

require('approvals').mocha(__dirname + '/day1')

describe('Elves holding calories', () => {
    function buildCaloriesStory(itemCaloriesWritings: string, mostCalories: InventoryItem) {
        return `For example, suppose the Elves finish writing their items' Calories` +
            ` and end up with the following list:\n------\n${itemCaloriesWritings}\n------\n` +
            `In case the Elves get hungry and need extra snacks, they need to know which Elf to ask:` +
            ` they’d like to know how many Calories are being carried by the Elf carrying the most Calories. In the` +
            ` example above, this is ${mostCalories.total} (carried by the Elf number ${mostCalories.rank})`
    }

    function buildTop3CaloriesStory(mostCalories: Array<InventoryItem>, totalCaloriesForTopBags: number) {
        const ordinals = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"]
        return `--- Part Two ---\n` +
            `By the time you calculate the answer to the Elves' question,` +
            ` they've already realized that the Elf carrying the most Calories of food` +
            ` might eventually run out of snacks.\n\n` +
            `To avoid this unacceptable situation, the Elves would instead like to know` +
            ` the total Calories carried by the top three Elves carrying the most Calories.` +
            ` That way, even if one of those Elves runs out of snacks, they still have two backups.\n\n` +
            ` In the example above, the top three Elves are the ${ordinals[mostCalories[0].rank - 1]} Elf (with ${mostCalories[0].total} Calories),` +
            ` then the ${ordinals[mostCalories[1].rank - 1]} Elf (with ${mostCalories[1].total} Calories), then the ${ordinals[mostCalories[2].rank - 1]} Elf (with ${mostCalories[2].total} Calories).` +
            ` The sum of the Calories carried by these three elves is ${totalCaloriesForTopBags}.`
    }

    const itemCaloriesWritingsExample = "1000\n" +
        "2000\n" +
        "3000\n" +
        "\n" +
        "4000\n" +
        "\n" +
        "5000\n" +
        "6000\n" +
        "\n" +
        "7000\n" +
        "8000\n" +
        "9000\n" +
        "\n" +
        "10000"

    const itemCaloriesWritingsInputDay1 = readFileSync(__dirname + "/day1/day1.input.txt", 'utf-8')

    const caloriesCounterForExample = new CaloriesCounter(itemCaloriesWritingsExample)
    const caloriesCounterForDay1 = new CaloriesCounter(itemCaloriesWritingsInputDay1)

    it('have one holding the most calories', function () {
        const mostCalories = caloriesCounterForExample.topCalorieBags()
        const backgroundStory = buildCaloriesStory(itemCaloriesWritingsExample, mostCalories.get(0))
        this.verify(backgroundStory)
    });
    it('has top 3 calories', function () {
        const mostCalories = caloriesCounterForExample.topCalorieBags(3)
        const backgroundStory = buildTop3CaloriesStory(mostCalories.inventoryItems, mostCalories.totalCalories())
        this.verify(backgroundStory)
    });
    it('have one holding the most calories with day 1 input', function () {
        const mostCalories = caloriesCounterForDay1.topCalorieBags()
        const backgroundStory = buildCaloriesStory(itemCaloriesWritingsInputDay1, mostCalories.get(0))
        this.verify(backgroundStory)
    });
    it('has top 3 calories with day 1 input', function () {
        const mostCalories = caloriesCounterForDay1.topCalorieBags(3)
        const backgroundStory = buildTop3CaloriesStory(mostCalories.inventoryItems, mostCalories.totalCalories())
        this.verify(backgroundStory)
    });

});
