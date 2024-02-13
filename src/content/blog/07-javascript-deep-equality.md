---
title: "JavaScript: Creating a Deep Equality Function"
description: Add description here.
pubDatetime: 2023-09-30
author: Frances Aleeza
postSlug: javascript-deep-equality
featured: true
draft: false
tags:
  - javascript
ogImage: ""
---

Let’s say we have these two objects, `object1` and `object2`. In our eyes, we can see that these two objects are equal — after all, they have the same values.

```js
const object1 = {
  name: "June",
  fruits: ["Lemon", "Strawberry", "Pineapple"],
};

const object2 = {
  name: "June",
  fruits: ["Lemon", "Strawberry", "Pineapple"],
};
```

However, let’s see what happens when we try to equate the two objects using the JavaScript comparison operators:

```js
console.log(object1 == object2); // returns false
console.log(object1 === object2); // returns false
```

You can see that both the abstract equality and the strict equality operators both return `false`. Why is that?

In JavaScript, only the primitive data types (such as **strings** and **numbers**) are compared by their actual values. On the other hand, **objects** (which **arrays** also are considered to be in JavaScript) are compared by their references.

Thus, with our example above, it follows that JavaScript will not see them as two equal objects since `object1` does not have the same reference as `object2`.

To try and better understand how objects are compared in JavaScript, let’s add a third object `object3` that we will set to equal `object2`:

```js
const object1 = {
  name: "June",
  fruits: ["Lemon", "Strawberry", "Pineapple"],
};

const object2 = {
  name: "June",
  fruits: ["Lemon", "Strawberry", "Pineapple"],
};

const object3 = object2;

console.log(object1 == object2); // returns false
console.log(object1 === object2); // returns false
console.log(object2 == object3); // returns true
console.log(object2 === object3); // returns true
```

`object3` is found to be equal to `object2` because `object3` is considered to have the same reference as `object2`.

Now then, how do we create a function to compare the values inside objects instead of comparing them by their references?

```js
const object1 = {
  name: "June",
  fruits: ["Lemon", "Strawberry", "Pineapple"]
}

const object2 = {
  name: "June",
  fruits: ["Lemon", "Strawberry", "Pineapple"]
}

const deepEqual = (arg1, arg2) => {
  // task: write code that compares objects by their values
}

console.log(deepEqual([1, 2, 3], [1, 2, 3]));          // should return true
console.log(deepEqual(["a", "b", 3], ["c", "d", 3]));  // should return false
console.log(deepEqual(["a", "b"], ["c"]));             // should return false
console.log(deepEqual({ a: “b” }, { c: “d” }));        // should return false
console.log(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] }));  // should return true
console.log(deepEqual(object1, object2));              // should return true
```

With the examples of the arguments to pass into our `deepEqual` function given above, the first thing we can notice is that if the two arguments are not of the same length, then they should immediately return `false`.

Next, we can consider what to do when the two arguments are of the same length. For those two arguments, what we should do is loop through the first argument’s **keys** — if the second argument does not have the same keys as the first, then it should return `false`.

> **Note:**
> An array’s **keys** are what we also call an array’s **indices**!

In order to access the keys of our given arguments, we can use the method `Object.keys()`. `Object.keys()` returns an array of strings of the given object's own property names (or, in the case of arrays, its own indices).

```js
…
const deepEqual = (arg1, arg2) => {

  if (Object.keys(arg1).length !== Object.keys(arg2).length) return false;

  for (const key in arg1) {
      if (arg1[key] !== arg2[key]) return false;
  }

  return true;
}

console.log(deepEqual([1, 2, 3], [1, 2, 3]));          // true
console.log(deepEqual(["a", "b", 3], ["c", "d", 3]));  // false
console.log(deepEqual(["a", "b"], ["c"]));             // false
console.log(deepEqual({ a: “b” }, { c: “d” }));        // false
console.log(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] }));  // false
console.log(deepEqual(object1, object2));              // false
```

With our current code, we can observe that it doesn’t quite work on multidimensional objects (or, objects that have other arrays or objects nested inside them). This is where the concept of **recursion** comes in.

In the simplest of explanations, in programming, **recursion** is when a function calls itself.

We can leverage this idea in our `deepEqual` function by replacing the strict equality we used inside the `for…in` loop:

```js
…
const deepEqual = (arg1, arg2) => {

  if (Object.keys(arg1).length !== Object.keys(arg2).length) return false;

  for (const key in arg1) {
      if (!deepEqual(arg1[key], arg2[key])) return false;
  }

  return true;
}
…
```

However, when we run this code as it is now, we get an error in the console: `RangeError: Maximum call stack size exceeded`. This error appears because we did not make sure to have a base case in our recursive function.

When we call on the `deepEqual` function to compare the values nested inside the multidimensional objects in the example, we now run into the possibility of comparing primitive data types instead of objects. Thus, we need to add code to check for the data types of the arguments we are comparing in order to satisfy the need for a base case in our recursive function.

```js
const object1 = {
  name: "June",
  fruits: ["Lemon", "Strawberry", "Pineapple"]
}

const object2 = {
  name: "June",
  fruits: ["Lemon", "Strawberry", "Pineapple"]
}

const deepEqual = (arg1, arg2) => {

  let arg1Type = typeof arg1;
  let arg2Type = typeof arg2;

  if (arg1Type !== arg2Type) return false;

  if (arg1Type === "object" && arg2Type === "object") {
    if (Object.keys(arg1).length !== Object.keys(arg2).length) return false;

    for (let key in arg1) {
      if (!deepEqual(arg1[key], arg2[key])) return false;
    }

    return true;
  }

  return arg1 === arg2;
}

console.log(deepEqual([1, 2, 3], [1, 2, 3]));          // true
console.log(deepEqual(["a", "b", 3], ["c", "d", 3]));  // false
console.log(deepEqual(["a", "b"], ["c"]));             // false
console.log(deepEqual({ a: “b” }, { c: “d” }));        // false
console.log(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] }));  // true
console.log(deepEqual(object1, object2));              // true

```
