---
title: "JavaScript: Understanding Higher-Order Functions"
description: Add description here.
pubDatetime: 2023-07-08
author: Frances Aleeza
postSlug: javascript-higher-order-functions
featured: false
draft: false
tags:
  - javascript
ogImage: ""
---

If you've ever written a program in the JavaScript language before, chances are that you've already used higher-order functions — whether you were aware of it or not.

Let's take a look at this quote and see what higher-order functions are all about:

> Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.
>
> — Marijn Haverbeke[^1]

[^1]: The above quote is taken from the third edition of Marijn Haverbeke's book [Eloquent JavaScript](https://eloquentjavascript.net/index.html)

From that, we could understand that a higher-order function is basically just a plain and simple function that does at least one of the following:

1. takes one or more functions as arguments, or;
2. returns another function as a result.

This is what makes higher-order functions noteworthy in the JavaScript language — and in most other functional programming languages. They treat functions as **first-class citizens**.

## First-class citizens? What does that mean?

Since what we are talking about is in the context of computer science and not social science, let's trade in the word "citizens" with "functions."

The JavaScript language (and, again, including most other functional programming languages) is considered to have **first-class functions** because functions in this language are treated just like any other variable.

```js
const myVariable = function myFunction() {
  console.log("Hello, World!");
};

myVariable(); // Hello, World!
```

Considering the chunk of code above, we can see that we are able to assign functions to a variable. We can also invoke the assigned function using the variable.

Basically, in JavaScript, you can also do to functions **anything and everything** you can do with the other data types (i.e., strings, numbers, arrays, objects, etc.).

> **Not to be confused with "first-class functions," but "first-order functions" is a different term.**
>
> For the curious, any function that cannot be classified as a higher-order function is called a "first-order function."

### First-Class Functions

In order to prove that a programming language treats its functions as first-class citizens, there are three (3) properties that a function in that language must have: (1) they must be able to be assigned to a variable, (2) they must be able to be passed as an argument to other functions, and (3) they must be able to be returned by another function.

Let's prove that this is true in the JavaScript language:

#### 1. First-class functions can be assigned to variables

This property has already been proven to exist for functions written in a JavaScript program by the previous code block, above. Expanding on that, though, while we can assign functions to variables, we can also pass them around, like so:

```js
// assigning myFunction to myVariable
const myVariable = function myFunction() {
  console.log("Hello, World!");
};

// Hello, World!
myVariable();

// passing myVariable to yourVariable
const yourVariable = myVariable;

// Hello, World!
yourVariable();
```

#### 2. First-class functions can be passed as arguments

Functions in the JavaScript language can also be passed as arguments, as in the code block below:

```js
function sayMorning() {
  return "morning!";
}

function sayNight() {
  return "night!";
}

function sayGreeting(timeOfDay, morning, night) {
  if (timeOfDay === "morning") {
    console.log("good " + morning());
  } else if (timeOfDay === "night") {
    console.log("good " + night());
  }
}

// passing `sayMorning` and `sayNight` as arguments to the `sayGreeting` function
sayGreeting("morning", sayMorning, sayNight);
```

> **As a side note, the code snippet above actually has an example of something called the "callback function"!**
>
> A **callback function** is what we call functions that are passed as arguments to another function. So, in the code above, `sayMorning()` and `sayNight()` are actually callback functions!

#### 3. First-class functions can be returned from other functions

In JavaScript, functions can also be returned from other functions because functions are treated as values.

```js
// `sayHelloWorld` is returned from `sayBlogTitle`
function sayBlogTitle() {
  return function sayHelloWorld() {
    console.log("Hello, World!");
  };
}

// Hello, World!
sayBlogTitle();
```

## Then, how do higher-order functions work?

As we have defined earlier, a function that takes other functions as arguments, or that returns another function, is called a **higher-order function**.

### Higher-Order Functions

We have actually used higher-order functions in the previous examples. Let's take a look:

#### 1. Higher-order functions can take one or more functions as arguments

```js
function sayMorning() {
  return "morning!";
}

function sayNight() {
  return "night!";
}

function sayGreeting(timeOfDay, morning, night) {
  if (timeOfDay === "morning") {
    console.log("good " + morning());
  } else if (timeOfDay === "night") {
    console.log("good " + night());
  }
}

// `sayGreeting` is a higher-order function because it takes other functions as arguments
sayGreeting("morning", sayMorning, sayNight);
```

#### 2. Higher-order functions can return another function as a result

```js
function sayBlogTitle() {
  return function sayHelloWorld() {
    console.log("Hello, World!");
  };
}

// `sayBlogTitle` is a higher-order function because it returns another function
sayBlogTitle();
```

## Actually, there are higher-order functions that are built into JavaScript

Let's take a look at the most common higher-order functions that are built into the JavaScript language.

### `filter()`

As can be inferred from its name, the `filter()` method filters out elements of an array and only keeps the elements that pass the test that is passed into the `filter()` function.

```js
// example of using filter()
```

[Insert here how the filter() function was created.]

```js
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}
```

### `map()`

### `reduce()`

## Of course, higher-order functions exist because they are beneficial to use

[Importance and uses of higher-order functions.]
