---
title: "JavaScript: Understanding Lexical Scope"
description: Add description here.
pubDatetime: 2023-07-08
author: Frances Aleeza
postSlug: javascript-lexical-scope
featured: false
draft: false
tags:
  - javascript
ogImage: ""
---

Have you ever wondered how JavaScript knows which variables are accessible by any given statement? Consider this simple program:

```js
var greeting = "Hello, World!";

console.log(greeting); // Hello, World!
```

How does JavaScript find and retrieve the variable `greeting` so that it can display `"Hello, World!"` in our console?

For the JavaScript language, the answer to this lies in the **lexical scope**!

## But, what is "lexical scope"?

Let's define what "lexical scope" means. Lifting the terms straight from the dictionary:

**Lexical** is an adjective that is defined as:

- relating to the words / vocabulary of a language, or;
- anything related to creating words, expressions, or variables.

Meanwhile, **scope** is a noun which means:

- the extent of the area to which something is relevant.

Combining those two definitions together, we can say that "lexical scope" is the area of relevance of an expression. In other words, the lexical scope of any item is the place where the said item got created, and where the said item may be applicably used.

In the context of computer science, this "item" may either be a variable or a function. Thus, the lexical scope is the area wherein a variable or function is defined, and where it is visible and accessible to the other parts of the code.

In JavaScript, lexical scope is the scope model that it employes. This is, by far, the most common of the two (2) predominant models for how scope works.

> **What's the second-most common model?**
>
> For the curious, the second-most common scope model that other programming languages use is called **dynamic scope**. That being said, it could then be inferred that lexical scope, which is the most common scope model, may sometimes be called **static scope**.

## How does "lexical scope" work in JavaScript?

### The JavaScript Engine

In the JavaScript engine, code goes through two (2) high-level phases:

1. Compilation (or, Parsing)
2. Execution

Within the **compilation** phase, the JavaScript engine goes through the entire program, and then assigns variables to their respective scopes. It also checks for any errors during this phase (wherein, if any errors are found, then the execution is stopped).

In traditional, compiled-language processes, code typically undergoes three (3) steps that happen within the compilation phase:

1. Tokenizing (or, Lexing)
2. Parsing
3. Code Generation

**Lexical scope** is called as such because the JavaScript engine determines the scope of a variable or a function during Step 1 of the compilation phase — that is, during **lexing** time.

> **"Tokenizing" or "Lexing"? Is there a difference?**
>
> Step 1 of the compilation phase is interchangeably called "tokenizing" or "lexing". However, these terms have a difference when used within an academic context.
>
> Strictly speaking, **lexing** is a process of tokenizing. Lexing attaches extra context to the tokens that were created during the tokenization of the code. It checks each token if one needs to be considered distinct another.

### The Scope

As previously mentioned, the **scope** of a variable is the area where said variable is visible and accessible within the JavaScript code. There are two (2) main types of scope: the **global scope** and the **local scope**.

Let's try to understand each of them further:

#### 1. Global Scope

The **global scope** is the area outside all the functions. The variables and functions defined within the global scope are visible and accessible to all other code.

In a JavaScript document, there is only one (1) global scope. Let's visualize the where it is with an example:

```js
// NOTE: PUT ALL COMMENTS AT THE TOP!!!!

// this is the global scope

// this variable is in the global scope
var animal = "cow";

console.log(animal);
// 'cow' is printed because the variable 'animal' is accessible to all other code

// when the 'getAnimal()' function is called, 'cow' will still be printed, because the variable 'animal' is accessible to all other code
function getAnimal() {
  console.log(animal);
}

getAnimal();
// cow
```

#### 2. Local Scope

The **local scope** is the area within a code block, or within a function. The variables and functions defined within a local scope are only visible and accessible to the code within the same local scope.

```js
// global scope

var animal = "cow";

function getAnimal() {
  // within this function is a local scope

  var color = "blue";
  // the variable 'color' is only accessible within this function's local scope

  console.log(animal);
  console.log(color);
}

getAnimal();
// 'cow' and 'blue' are printed, because the variables 'animal'  and 'color' are both accessible by the function 'getAnimal()'

console.log(animal);
// cow

console.log(color);
// ReferenceError: color is not defined
// this throws an error because the variable 'color' is only accessible within the local scope of the function wherein it was declared
```

Further down the definition of scope, there are two (2) different types of **local scope**: the **block scope** and the **function scope**.

##### 2.1. Block Scope

The **block scope** is the area within a block of code that is enclosed within a pair of curly braces `{...}`. In the JavaScript language, variables defined by `const` and `let` can be locally-scoped within a block of code.

> **What about the variables defined by `var`?**
>
> As mentioned, variables defined by **`let` and `const`** can be block scoped. This characteristic was introduced in ES6, alongside the concept of the block scope. Their ability to be block scoped may come in handy when using `for` and `while` loops, and when using the `if` and `switch` statements.
>
> Meanwhile, unlike with `let` and `const`, variables declared with `var` cannot be block scoped. However, they can still be function scoped, as we will see in the next section.

```js
// global scope

{
  // within these curly braces is a block scope

  var animal = "panda";
  const color = "pink";
  let fruit = "papaya";

  console.log(animal); // panda
  console.log(color); // pink
  console.log(fruit); // papaya
}

console.log(animal);
// panda
// the variable 'animal' is declared by 'var' which cannot be block-scoped; thus, making it accessible even if it is called outside of the curly braces

console.log(color);
// ReferenceError: color is not defined

console.log(fruit);
// ReferenceError: fruit is not defined

// the variables 'color' and 'fruit' are declared by 'const' and 'let' which can be block-scoped; thus, making them inaccessble outside of the curly braces
```

##### 2.2. Function Scope

A **function scope** — as one may have guessed — is the area within a function. Variables declared inside a function is only visible and accessible within that same function. A variable that is declared inside a function will have a local, function scope.

> **What happens to the scope when declaring functions within functions within functions within functions?**
>
> Variables and functions that are declared within one local scope can still be accessed by any other local scope that is nested inside the one local scope where the variables and functions were first declared. Determining the accessibility of variables and functions that are nested within other scopes is called the **scope chain**.
>
> The scope chain is a link that allows a variable or function from an outer scope to be accessible to other code that are in an inner scope.

```js
function level1() {
  // this is local scope 1

  var animal = "kangaroo";
  // the variable 'animal' is accessible to all code that is nested inside local scope 1

  console.log(animal); // kangaroo
  console.log(color); // ReferenceError: color is not defined
  console.log(fruit); // ReferenceError: fruit is not defined

  function level2() {
    // this is local scope 2, which is nested inside local scope 1

    var color = "khaki";
    // the variable 'color' is accessible to all code that is nested inside local scope 2

    console.log(animal); // kangaroo
    console.log(color); // khaki
    console.log(fruit); // ReferenceError: fruit is not defined

    function level3() {
      // this is local scope 3, which is nested inside local scope 2, which is nested inside local scope 1

      var fruit = "kiwi";
      // the variable 'fruit' is accessible to all code that is nested inside local scope 3

      console.log(animal); // kangaroo
      console.log(color); // khaki
      console.log(fruit); // kiwi
    }
    level3();
  }
  level2();
}
level1();
```

## Why is "lexical scope" so important?

> One of the most fundamental paradigms of nearly all programming languages is the ability to store values in variables, and later retrieve or modify those values. In fact, the ability to store values and pull values out of variables is what gives a program state.
>
> Without such a concept, a program could perform some tasks, but they would be extremely limited and not terribly interesting.
>
> — Kyle Simpson[^1]

[^1]: The above quote is taken from the second edition of Kyle Simpson's book [You Don't Know JS Yet: Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md)

## Let's recap!

To summarize, lexical scoping is the process of determining the scopes of variables and functions during runtime.

Lexical scoping makes it so that no matter where a variable or function is invoked from, its lexical scope is only defined by where the variable or function was declared or defined.

Variables and functions that are declared in the global scope is visible and accessible to all other code.

Meanwhile, variables and functions that are declared in a local scope are only visible and accessible within that local scope. Thus, they are also visible and accessible to any other local scopes that are nested inside the top-level local scope where the variables and functions had been initially declared.
