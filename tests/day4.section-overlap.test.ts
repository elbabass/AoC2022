const assert = require('assert')

const example = "2-4,6-8\n" +
    "2-3,4-5\n" +
    "5-7,7-9\n" +
    "2-8,3-7\n" +
    "6-6,4-6\n" +
    "2-6,4-8"

class Assignment {
    private sectionStart: number;
    private sectionEnd: number;

    constructor(sectionStart: number, sectionEnd: number) {
        this.sectionStart = sectionStart
        this.sectionEnd = sectionEnd
    }

}

class Pair {
    private assignment: Assignment;
    private assignment2: Assignment;

    constructor(...assignment: Assignment[]) {
        this.assignment = assignment[0]
        this.assignment2 = assignment[1]
    }

}

function createAssignment(pair: string) {
    const assignmentBoundaries = pair.split(/-/)
    return new Assignment(parseInt(assignmentBoundaries[0]), parseInt(assignmentBoundaries[1]))
}

function parseAssignment(content: string) {
    return content
        .split(/\n/)
        .filter(l => l.length > 0)
        .map(line =>
            new Pair(...line
                .split(/,/)
                .map(createAssignment)
            )
        )
}

describe('Section Assignment overlapping', () => {
    it('can parse input', () => {
        const assignmentPair = parseAssignment("2-4,6-8")
        assert.deepEqual(assignmentPair, new Array<Pair>(new Pair(
            new Assignment(2, 4),
            new Assignment(6, 8)
        )))
    })
    it('can parse input list', () => {
        const assignmentPair = parseAssignment("2-4,6-8\n2-3,4-5\n")
        assert.deepEqual(assignmentPair,
            new Array<Pair>(
                new Pair(
                    new Assignment(2, 4),
                    new Assignment(6, 8)
                ),
                new Pair(
                    new Assignment(2, 3),
                    new Assignment(4, 5)
                )
            )
        )
    })
})
