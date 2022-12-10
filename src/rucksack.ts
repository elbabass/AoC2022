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
        const commonChar = this.firstCompartment
            .split("")
            .filter(c => this.secondCompartment.includes(c))[0];
        if (commonChar == undefined)
            console.log("VVV Error with " + this._content)
        return commonChar
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


export class RucksackGroup {
    private rucksack: Rucksack;
    private rucksack2: Rucksack;
    private rucksack3: Rucksack;

    constructor(...rucksack: Rucksack[]) {
        this.rucksack = rucksack[0]
        this.rucksack2 = rucksack[1]
        this.rucksack3 = rucksack[2]
    }

    get content(): string {
        return this.rucksack.content + "\n" +
            this.rucksack2.content + "\n" +
            this.rucksack3.content + "\n"
    }

}

export const totalPriority = (rucksacks: Rucksack[]): number =>
    rucksacks
        .map(rucksack => rucksack.priority)
        .reduce((total, priority) =>
            total + priority)


const collectRucksackGroups = (rucksacks: Rucksack[]): Array<RucksackGroup> => {
    if (rucksacks.length <= 0) return []
    else {
        return [new RucksackGroup(...rucksacks.splice(0, 3))]
            .concat(collectRucksackGroups(rucksacks))
    }
}

export const parseRucksackGroups = (day3Example: string) => collectRucksackGroups(parseRucksack(day3Example));

export const parseRucksack = (input: string): Rucksack[] =>
    input.split("\n")
        .filter(content => content != "")
        .map(content => new Rucksack(content))

export const caseOf = (c: string): string =>
    c.match(/[a-z]/) ? "lowercase" : "uppercase"
