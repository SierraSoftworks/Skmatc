import {Schema} from "./Schema";
import {Result} from "./Result";

export abstract class Validator {
    constructor() {
        
    }

    abstract validate<T>(value: T, schema: Schema<T>): Promise<Result<T>>;
}