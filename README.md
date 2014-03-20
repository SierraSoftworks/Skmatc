# Skmatc (schematic)
**Automatic Schematic Validation for JavaScript Objects**

Skmatc provides an extremely powerful, extensible schema validation tool which we developed for [Iridium](https://sierrasoftworks.com/iridium). It gives you the ability to flexibly validate JavaScript objects against a schema to ensure data integrity and add structure to otherwise unstructured data.

## Example
```javascript
var skmatc = require('skmatc');

var schema = new skmatc({
	id: String,
	username: /\w[\w\d_]{7,}/,
	email: { $type: /.+@.+\..+/, $message: 'The email address you entered was invalid, please check it and try again.' },
	website: { $required: false, $type: String },
	sessions: [String],
	friends: {
		$propertyType: {
			addedOn: Date
		}
	}
});

var obj = {
	id: 'aaaaaaaaaa',
	username: 'spartan563',
	email: 'admin@sierrasoftworks.com',
	sessions: [],
	friends: {
		bob: { addedOn: new Date(123456789) }
	}
};

var result = schema.validate(obj);
if(result.failed) throw result.error;
```

## Features
Skmatc provides a number of powerful features which allow you to validate almost any type of data structure, and if none of the included validators suit your needs you can easily add your own.

- **Easy To Use** Easily define schemas using standard JavaScript objects to describe the structure in a readable manner.
- **Flexible** Implement custom validator plugins for complex validation scenarios while making use of Skmatc's other cool features.

## Built In Validators
Skmatc comes with a number of built in validators which are generally sufficient to address any common usage scenario.
If you find yourself needing some more complex validation logic then you can easily implement your own custom validator using Skmatc's simple API.

### Command Codes Preprocessor
The command codes preprocessor implements the command codes logic which dictates how certain special case objects are treated. Command code nodes consist of properties which are exclusively prefixed with **$** and contain either a **$type** or **$propertyType** property.

```javascript
schema = {
	optionalRx: {
		$required: false,
		$type: /\w+/
	},
	anonProperties: {
		$message: 'anonProperties should only be Boolean values',
		$propertyType: Boolean
	}
};

matches = {
	optionalRx: undefined,
	anonProperties: {
		one: true,
		two: false
	}
};
```

### Basic Validator
The basic validator expects schema values of either `true` or `false` - dictating whether a value is required to be present (not-null and defined) or not (may be null or undefined).

```javascript
schema = true;
matches = 'anything';

schema = false;
matches = 'anything' || null || undefined;
```

### Object Validator
The object validator provides recursive object property validation using any combination of the other validators to do value validation. Values which do not appear in the schema are ignored, take a look at the **Command Codes** section for more information on validating anonymous properties.

```javascript
schema = {
	name: String,
	age: Number,
	parents: {
		dad: String,
		mom: String
	}
};

matches = {
	name: 'Ben',
	age: 21,
	parents: {
		dad: 'Bob',
		mom: 'Jane'
	}
};
```

### Array Validator
The array validator allows you to validate array elements, as well as allowing you to validate array sizes. Array elements are all validated using a combination of the other validators.

```javascript
schema = [String];
matches = ['a', 'b', 'c'];

schema = [String, minElements];
matches = ['a', 'b', ...];

schema = [String, minElements, maxElements];
matches = ['a', 'b', ...];
```

### Type Validator
The type validator allows you to validate some basic JavaScript types like String, Number, Date, Boolean, Object and Function. For more complex types we suggest implementing a custom validator.

```javascript
schema = String;
matches = 'some string';

schema = Number;
matches = 10.00;

schema = Date;
matches = new Date();

schema = Boolean;
matches = true;

schema = Object;
matches = {};

schema = Function;
matches = function() { };
```

### RegExp Validator
The RegExp validator allows you to validate strings using regular expression matching and comes in handy in many situations where structured text is required.

```javascript
schema = /\w[\w\d_]{7,}/;
matches = 'spartan563';
```

## Custom Validators
Custom validators are created by subclassing the `skmatc.Validator` to implement your own `handles` and `validate` methods. To make your life a little easier, we've included the `skmatc.create` function which handles the subclassing for you.

You can load validators into a specific `skmatc` instance, or present a validator module to `skmatc` for global inclusion in all future instances. Validator modules are expected to be composed of a function which recieves a `skmatc` instance as its only argument and returns a `skmatc.Validator`.

### Validator Modules
Validator modules are loaded automatically by all future `skmatc` instances upon initialization and can be created by using the `skmatc.create(handles, validate)` function.

```javascript
var skmatc = require('skmatc');

skmatc.register(skmatc.create(function(schema) {
	// Decide whether this validator can handle the schema type
	return schema == 'custom';
}, function(schema, data, path) {
	return this.assert(data == 'valid', 'My custom error message (optional)');
}));
```

### Validators
If you wish to load a validator into a specific `skmatc` instance then you will need link the validator to `skmatc` manually - this can be done using the `skmatc.create(handles, validate)` function.

```javascript
var skmatc = require('skmatc');
var schema = new skmatc({ });
schema.register(skmatc.create(schema, function(schema) {
	// Decide whether this validator can handle the schema type
	return schema == 'custom';
}, function(schema, data, path) {
	return this.assert(data == 'valid', 'My custom error message (optional)');
}));
```