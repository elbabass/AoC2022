export class Rucksack {
    constructor(content: string) {
        this._content = content
    }

    get firstCompartment(): string {
        return this._content.slice(0, this._content.length / 2)
    }

    get secondCompartment(): string {
        return this._content.slice(this._content.length / 2)
    }

    get commonElement(): string {
        return this.firstCompartment
            .split("")
            .filter(c => this.secondCompartment.includes(c))[0]
    }

    private _content: string;

    get content(): string {
        return this._content
    }

    get priority(): number {
        const commonElement = this.commonElement
        if (commonElement.match(/[a-z]/))
            return commonElement.charCodeAt(0) - "a".charCodeAt(0) + 1
        else
            return commonElement.charCodeAt(0) - "A".charCodeAt(0) + 27

    }
}

export const totalPriority = (rucksacks: Rucksack[]): number => 157

export const parseRucksack = (input: string): Rucksack[] =>
    input.split("\n").map(content => new Rucksack(content))

export const caseOf = (c: string): string =>
    c.match(/[a-z]/) ? "lowercase" : "uppercase"
