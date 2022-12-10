// import {readFileSync} from "fs";

import {caseOf, parseRucksack, parseRucksackGroups, Rucksack, RucksackGroup, totalPriority} from "../src/rucksack";
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

    it('priority sum by group with day 3 example', function () {
        const rucksackGroups = parseRucksackGroups(day3Example)
        const description = day3Part2Explained(day3Input, rucksackGroups)
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

const day3Part2Explained = (day3Input: string, rucksackGroups: RucksackGroup[]) => "--- Part Two ---\n" +
    "As you finish identifying the misplaced items," +
    " the Elves come to you with another issue.\n" +
    "\n" +
    "For safety, the Elves are divided into groups of three." +
    " Every Elf carries a badge that identifies their group." +
    " For efficiency, within each group of three Elves," +
    " the badge is the only item type carried by all three Elves." +
    " That is, if a group's badge is item type B," +
    " then all three Elves will have item type B somewhere in their rucksack," +
    " and at most two of the Elves will be carrying any other item type.\n" +
    "\n" +
    "The problem is that someone forgot to put this year's updated authenticity" +
    " sticker on the badges." +
    " All of the badges need to be pulled out of the rucksacks so" +
    " the new authenticity stickers can be attached.\n" +
    "\n" +
    "Additionally, nobody wrote down which item type corresponds" +
    " to each group's badges. The only way to tell which item type is" +
    " the right one is by finding the one item type that is common" +
    " between all three Elves in each group.\n" +
    "\n" +
    "Every set of three lines in your list corresponds to a single group," +
    " but each group can have a different badge item type." +
    " So, in the above example," +
    " the first group's rucksacks are the first three lines:\n" +
    "\n" +
    "----\n" +
    rucksackGroups[0].content +
    "----\n" +
    "And the second group's rucksacks are the next three lines:\n" +
    "\n" +
    "----\n" +
    rucksackGroups[1].content +
    "----\n" +
    "In the first group, the only item type that appears in all three" +
    " rucksacks is lowercase r; this must be their badges." +
    " In the second group, their badge item type must be " +
    "Z" +
    ".\n" +
    "\n" +
    "Priorities for these items must still be found to organize the sticker" +
    " attachment efforts: here, they are " +
    "18 (r)" +
    " for the first group and " +
    "52 (Z)" +
    " for the second group." +
    " The sum of these is " +
    "70" +
    ".\n" +
    "\n" +
    "Find the item type that corresponds to the badges of each three-Elf group."

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
