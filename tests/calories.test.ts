require('approvals').mocha()
import { CaloriesCounter } from '../src/caloriesCounter'

describe('Elves holding calories', () => {
    it('have one holding the most calories', function () {
        let itemCaloriesWritings = "1000\n" +
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
        let introSentence = `For example, suppose the Elves finish writing their items' Calories`+
            ` and end up with the following list:\n------\n${itemCaloriesWritings}\n------`
        let mostCalories = new CaloriesCounter(itemCaloriesWritings).mostCaloriesBag()
        let backgroundStory =
            `${introSentence}\n` +
            `In case the Elves get hungry and need extra snacks, they need to know which Elf to ask:`+
            ` they’d like to know how many Calories are being carried by the Elf carrying the most Calories. In the` +
            ` example above, this is ${mostCalories} (carried by the Elf number 4)`
        this.verify(backgroundStory)
    });
});
