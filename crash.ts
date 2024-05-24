// ## TypeScript

// - TypeScript offers all that JavaScript does with an additional layer on top of it all: a type system
// - This means that if you are to assign a type to something, TypeScript will let yoou check to see if you consistently assign a set type to it
// - Lowers the chances of bugs

// # Types by Inference

// - TypeScript knows JS and will generate types for you in many cases.
// - If you create a variable with a set type, TS (TypeScript) will assign its initial value as its type

// # Defining Types

// - To create and object with an infered type which includes name: string and id: number, you can write:

const user = {
name: "Hayes",
id: 0,
}

// - You can explicitly describe the above objects shape using interface declaration:

interface User = {
name: string;
id: number;
}

// - You can then declare that a JS object conforms to the shape of your new interface by using
//   syntax like : TypeName after a variable declaration:

const user: User = {
    name: "Hayes",
    id: 0
};

// - If an object that does not match the interface is provided, TS will warn you.

// - Since JS supports classes and object-oriented programming, so does TS. You can
//   use an interface declaration with classes:

interface User {
    name: string;
    id: number;
}

class UserAccount {
    name: string;
    id: number;

constructor(name: string, id: number){
    this.name = name;
    this.id = id;
}

}

const user: User = new UserAccount("Murphy", 1);

// - You can use interface to annotate parameters and return values to functions:

function deleteUser(user: User) {
    ///...... this accepts parameters of type User
}

function getAdminUser(): User {
    //...... this returns only types User
}


// - JS has the following types already: boolean, bigint, null, number, string, symbol, and undefined
// - TS extends the list with a few more such as any (allow anything), unknown (ensure someone using this type declares what the type is), 
//   never (Its not possible that this type could happen), and void(a function which returns undefined or has no return value)

// - You will see that there are two syntaxes for building types: Interface and Types
// - Interface should be preferred
// - Use Type when you need specific features

// # Composing Types

// - You can create complex types by combining simple ones.
// - This can be done with Unions and Generics

// * Unions

// - With a union, you can declare that a type could be one of many types.
// - For example, you can describe a boolean as being true or false:

type MyBool = true | false;

// Note: If you hover over MyBool above, you'll see that it is classed as boolean. That's a property of the Structural Type System. More on this below.

// - A popular use-case for union types is to describe the set of string or number literals that a value is allowed to be:

type WIndowState = "open" | "closed" | "minimized";
type LockStates = "locked"| "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

// - Unions provide a way to handle different types too.
// - Ex: You may have a function that takes an array or a string:

function getLength(obj: string | string[]) {
    return obj.length;
}

// Type	Predicate
// string	typeof s === "string"
// number	typeof n === "number"
// boolean	typeof b === "boolean"
// undefined	typeof undefined === "undefined"
// function	typeof f === "function"
// array	Array.isArray(a)

// - For example you can make a function return different values depending on
//   whether it is passed a string or an array:

function wrapInArray(obj: string | string[]){
    if (typeof obj === "string"){
        return [obj];
    }
    return obj;
}

// * Generics

// - Generics provide variables to types.
// - A common example is an array. An array without generics can contain anything
// - An array with generics can describe the values that the array contains

type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{name: string}>;

// - You can also declare your own types that use generics:

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.

declare const backpack: Backpack<string>;
 
// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();
 
// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add(23);

// # Structural Type System

// One of TS's core principles is that type checking focuses on the shape that values have
// This is sometimes called duck typing or structural typing

// In a structural type system, if two objects have the same shape, they are considered to be of the same type

interface Point {
    x: number;
    y: number;
}

function logPoint(p: Point){
    console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"

const point = {x: 12, y: 26};
logPoint(point);

// You may have noticed that the point variable was never declared to be a Point type
// However, TS compares the shape of point to the shape of Point in the type-check
// Because they have the same shape, the code passes

// The shape-matching only requires a subset of the object's fields to match ( below code extends the above example with Point)

const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"
 
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"
 
const color = { hex: "#187ABF" };
logPoint(color);

// the code passes for point3 and rect because they do indeed contain x and y each with a number type value
// point3 and rect might contian more keys, but they still contain x and y each with number type values so it passes
// color on the other hand is missing valid x and y keys so it fails

// There is no difference between how classes and objects conform to shapes (the code again extends the Point example):

class VirtualPoint { 
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint);

// If the object or class has all the required properties, TS will say they match, regardless of the implementation details