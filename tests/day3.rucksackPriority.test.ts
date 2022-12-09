// import {readFileSync} from "fs";

import {caseOf, parseRucksack, Rucksack, totalPriority} from "../src/rucksack";
import {getInputDay} from "./helper";

require('approvals').mocha(__dirname + '/day3')

describe('Rucksack Reorganization', () => {
    it('priority sum', function () {
        const rucksacks = parseRucksack(day3Example)
        const description = day3Introduction +
            day3ExampleExplained(day3Example, rucksacks)
        this.verify(description)
    })

    it('priority sum with day 3 input', function () {
        const rucksacks = parseRucksack(day3Input)

        const description = day3InputExplained(day3Input, rucksacks)

        this.verify(description)
    })
})

function day3InputExplained(day3Input: string, rucksacks: Rucksack[]) {
    return "With the input of the day being:\n" +
        "----\n" +
        day3Input +
        "\n" +
        "----\n" +
        "Total priority is:" +
        totalPriority(rucksacks)
}

const day3Input = getInputDay(3)

const day3Example = "vJrwpWtwJgWrhcsFMMfFFhFp\n" +
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n" +
    "PmmdzqPrVvPwwTWBwg\n" +
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n" +
    "ttgJtRGJQctTZtZT\n" +
    "CrZsJsPPZsGzwwsLwLmpwMDw\n"

const day3ExampleExplained = (input: string, rucksacks: Rucksack[]) => {
    return "For example, suppose you have the following list of contents from six rucksacks:\n" +
        "\n" +
        "----\n" +
        input +
        "\n" +
        "----\n" +
        "- The first rucksack contains the items " +
        rucksacks[0].content +
        ", which means its first compartment contains the items " +
        rucksacks[0].firstCompartment +
        ", while the second compartment contains the items " +
        rucksacks[0].secondCompartment +
        ". The only item type that appears in both compartments is " +
        caseOf(rucksacks[0].commonElement) + " " + rucksacks[0].commonElement +
        ".\n" +
        "- The second rucksack's compartments contain " +
        rucksacks[1].firstCompartment +
        " and " +
        rucksacks[1].secondCompartment +
        ". The only item type that appears in both compartments is " +
        caseOf(rucksacks[1].commonElement) + " " + rucksacks[1].commonElement +
        ".\n" +
        "- The third rucksack's compartments contain " +
        rucksacks[2].firstCompartment +
        " and " +
        rucksacks[2].secondCompartment +
        "; the only common item type is " +
        caseOf(rucksacks[2].commonElement) + " " + rucksacks[2].commonElement +
        ".\n" +
        "- The fourth rucksack's compartments only share item type " +
        rucksacks[3].commonElement +
        ".\n" +
        "- The fifth rucksack's compartments only share item type " +
        rucksacks[4].commonElement +
        ".\n" +
        "- The sixth rucksack's compartments only share item type " +
        rucksacks[5].commonElement +
        ".\n" +
        "To help prioritize item rearrangement, every item type can be converted to a priority:\n" +
        "\n" +
        "- Lowercase item types a through z have priorities 1 through 26.\n" +
        "- Uppercase item types A through Z have priorities 27 through 52.\n" +
        "In the above example, the priority of the item type that appears in both compartments of each rucksack is " +
        rucksacks[0].priority + " (" + rucksacks[0].commonElement + ")" +
        ", " +
        rucksacks[1].priority + " (" + rucksacks[1].commonElement + ")" +
        ", " +
        rucksacks[2].priority + " (" + rucksacks[2].commonElement + ")" +
        ", " +
        rucksacks[3].priority + " (" + rucksacks[3].commonElement + ")" +
        ", " +
        rucksacks[4].priority + " (" + rucksacks[4].commonElement + ")" +
        ", and " +
        rucksacks[5].priority + " (" + rucksacks[5].commonElement + ")" +
        "; the sum of these is " +
        totalPriority(rucksacks) +
        "."
}

const day3Introduction = "--- Day 3: Rucksack Reorganization ---\n" +
    "One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey." +
    " Unfortunately, that Elf didn't quite follow the packing instructions," +
    " and so a few items now need to be rearranged.\n" +
    "\n" +
    "Each rucksack has two large compartments." +
    " All items of a given type are meant to go into exactly one of the two compartments." +
    " The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.\n" +
    "\n" +
    "The Elves have made a list of all of the items currently in each rucksack (your puzzle input)," +
    " but they need your help finding the errors." +
    " Every item type is identified by a single lowercase or uppercase letter" +
    " (that is, a and A refer to different types of items).\n" +
    "\n" +
    "The list of items for each rucksack is given as characters all on a single line." +
    " A given rucksack always has the same number of items in each of its two compartments," +
    " so the first half of the characters represent items in the first compartment," +
    " while the second half of the characters represent items in the second compartment.\n" +
    "\n"
