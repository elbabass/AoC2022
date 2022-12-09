import {readFileSync} from "fs";

export function getInputDay(day: number) {
    return readFileSync(__dirname + `/day${day}/day${day}.input.txt`, 'utf-8');
}
