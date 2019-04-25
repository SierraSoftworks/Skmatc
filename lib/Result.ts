import {Schema} from "./Schema";

export class Result<T> {
    constructor() {

    }

    failures: Failure<T>[] = [];

    /**
     * Adds a failure to this resultset 
     * @param failure 
     */
    addFailure(failure: Failure<T>): this {
        return this;
    }
}

interface Failure<T> {
    property: keyof T;
}