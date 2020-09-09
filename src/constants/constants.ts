export enum Dataset {
    digits = "digits",
    fashion = "fashion"
}

export interface Coord {
    readonly x: number;
    readonly y: number;
}

export interface InstanceCoord extends Coord {
    readonly id: number;
    readonly label: number;
}

export interface ControlCoord extends InstanceCoord {
    readonly controlledX: number;
    readonly controlledY: number;
}