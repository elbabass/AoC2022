require('approvals').mocha()
import { CaloriesCounter } from '../src/caloriesCounter'
describe('Elves holding calories', () => {
    it('have one holding the most calories', function () {
        let mostCalories = CaloriesCounter.counter()
        let backgroundStory = `In case the Elves get hungry and need extra snacks, they need to know which Elf to ask:`+
            ` they’d like to know how many Calories are being carried by the Elf carrying the most Calories. In the` +
            ` example above, this is ${mostCalories} (carried by the Elf number 4)`
        this.verify(backgroundStory)
    });
});
