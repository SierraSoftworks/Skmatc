 export declare class Skmatc {
	constructor(schema: any);

	static validators: Validator[];
	static Validator: typeof Validator;
	static Result: typeof Result;
	static Failure: typeof Failure;
	static create(handles: (schema: any) => boolean, validate: (schema: any, data: any, path: string) => Result, options?: { name?: string }): Validator;
	static validate(validators: Validator[], schema: any, data: any, path?: string): Result;
	static register(validator: Validator);

	schema: any;
	validators: Validator[];
	validate(data: any, path?: string): Result;
	register(validator: Validator);
}

export declare class Validator {
	constructor(skmatc: Skmatc, options?: any);
	static create(handles: (schema: any) => boolean, validate: (schema: any, data: any, path: string) => Result, options?: { name?: string }): Validator;
	static module(handles: (schema: any) => boolean, validate: (schema: any, data: any, path: string) => Result, options?: { name?: string }): Validator;

	name: string;
	skmatc: Skmatc;
	handles(schema: any): boolean;
	validate(schema: any, data: any, path: string): Result;
	assert(schema: any, data: any, path: string, test: boolean, message?: string): Result;
	fail(schema: any, data: any, path: string, message?: string): Result;
}

export declare class Result {
	constructor(failures: Failure[]);
	static compound(results: Result[]): Result;

	failures: Failure[];
	success: boolean;
	failed: boolean;
	message: string;
	messages: string[];
	error: Error;
}

export declare class Failure {
	constructor(validator: Validator, schema: any, data: any, path: string, message?: string);
	validator: Validator;
	schema: any;
	data: any;
	path: string;
	message: string;
}

export declare interface IValidationHandler {
	(thisArg: {
		validator: IValidationHandler;
		skmatc: Skmatc;
		fail(message?: string);
		assert(test: boolean, message?: string);
	}, schema: any, data: any, path: string): Result;
}
