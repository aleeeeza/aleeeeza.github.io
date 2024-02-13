---
title: "Rendering in React"
description: Add description here.
pubDatetime: 2023-08-06
author: Frances Aleeza
postSlug: rendering-in-react
featured: false
draft: false
tags:
  - react
ogImage: ""
---

React is a popular JavaScript library for building user interfaces (UI). It has a component-based architecture, which allows us to split our desired UI into independent and reusable pieces of code.

This component-based architecture is one of the most important features of React. It allows us to keep focus on accurately describing the UI we want, rather than keeping focus on the background specifics regarding how the UI we want actually gets inserted and rendered into the pages of our web application.

When we create a React web application, we express the components we want in the JSX syntax. Then, someway and somehow, that JSX gets turned into the actual HTML DOM elements that are shown on-screen.

So, this can make us wonder, what is actually going on in between the first step (that is, us writing code in JSX), and the final step (that is, our code being turned into the HTML we see on the webpage)?

How exactly does React render these user interfaces?

## React and React DOM

React and ReactDOM used to be bundled together into one library, but now, they are split. This means that, theoretically, React may be used alongside _any_ DOM insertion tool.

React uses the declarative programming paradigm, where it doesn't directly update the DOM. React has nothing to do with the browser or DOM updates.

Instead, we just tell React how the UI should look like as we want it to be, and then ReactDOM handles the DOM updates for us. We create components using the React library, and the rendering process is handled by ReactDOM.

ReactDOM does this by using the `ReactDOM.render()` function which is called once in every React application. ReactDOM is the _middleman_ that renders components into elements that exist in the browser.

## React Components and Elements

### React Components

React components take props as inputs and return an element tree as outputs.

React keeps track of components by creating an instance for them. Each instance has a state and a lifecycle.

Components can either be class-based or functional-based. In class components, we can access the state and the lifecycle using the predefined lifecycle methods and the `this` keyword. Meanwhile, in functional components, we can use React hooks.

Additionally, with class components, the output is the return value of the `render` method. On the other hand, with functional components, the output is the return value of the function.

The example below shows a functional React component:

```jsx
const MyComponent = () => {
  return (
    <div>
      <h1 id="title">Hello, World!</h1>
    </div>
  );
};
```

### JSX

The example of a functional React component above returns JSX, not HTML.

JavaScript XML (JSX) defines UI elements. It is a syntax extension to JavaScript that gives the code an HTML look.

React adopts JSX as an abstraction layer that handles creating the React elements. This is because, unlike the browser DOM elements, React elements are less expensive to create.

Behind the scenes, JSX gets converted into `React.createElement()` function calls that, in turn, gets evaluated into JavaScript objects.

### React Elements

These JavaScript objects that the JSX gets evaluated into are what React internally calls "elements."

React elements represent UI components. They are the smallest building blocks in React applications.

As mentioned, React elements are actually just plain JavaScript objects that describe what the developer wants to see on the screen.

Let's take a look at an example of what a React element looks like.

```jsx
// React Component
const MyComponent = () => {
  return (
    <div>
      <h1 id="title">Hello, World!</h1>
    </div>
  );
};

console.log(MyComponent());
```

```js
// React Element
{
    "type": "div",
    "key": null,
    "ref": null,
    $$typeof: Symbol(react.element),
    "props": {
        "children": {
            "type": "h1",
            "key": null,
            "ref": null,
            "props": {
                "id": "title",
                "children": "Hello, World!"
            },
        }
    },
}
```

As seen above, a React element has several properties. Let's take a look at some of these properties and see what kind of information they hold:

- **type**
  - this tells React what _type_ of HTML element to create
  - it can be a string (e.g., "div", "h1"), a React component (e.g., "class" or "function"), or a React fragment
- **key**
  - this property is used to give a unique identifier for elements that are siblings while mapping over an array
- **ref**
  - this can contain a reference to an actual DOM node
  - it allows you to get direct access to a DOM element, or to an instance of a component
- `$$typeof`
  - this identifies that object as a React element
  - it is also used to improve React's resilience against malicious markup
- **props**
  - this can be `null`, or it can be an object which contains more properties that are passed to the component
  - this is the _meat_ of a React element
- **children**
  - this is what you want to be passed into that element
  - multiple children can be added using an array, and nesting multiple children is allowed

As React elements are basically just plain JavaScript objects, it makes it cheap to build and teardown every time there is a UI change.

> **Let's fast-forward! ⏩**
>
> The term "virtual DOM" is sure to appear when researching about rendering in React.
>
> To cut to the chase, these JavaScript objects with the `type`, `key`, and `ref` properties are actually what makes up the React virtual DOM!

## The Rendering Process in React

### The Initial Render

When you first run a React application, the initial render process creates a component hierarchy using JSX. It also initializes the component lifecycle methods during the initial render process.

`ReactDOM.render()` kicks off the initial render. This function is called exactly one (1) time in each React app.

#### 1. The Render Phase

In this phase, the components written in JSX are converted into React elements — which, as previously discussed, are JavaScript representations of what the HTML structure should look like.

During the initial render, this conversion starts from the root component and works its way down. It builds a tree of elements that virtually represents what the actual DOM should look like.

This tree of elements is called the virtual DOM (or, VDOM).

In summary, the render phase completes converting the JSX code into the VDOM.

#### 2. The Commit Phase

The actual DOM manipulation of the real DOM happens during the commit phase.

During the initial render, the `appendChild()` DOM API is used to put all the DOM nodes onto the screen.

Remember that it is not React that communicates with the real DOM. React only gives us the means of expression so that we can create components. For web applications specifically, it is the ReactDOM package that handles the actual DOM manipulation.

In a React application, the ReactDOM package is usually only imported once — most of the time in the `index.js` file, and using `ReactDOM.render()`.

### Re-Rendering

There are different scenarios that trigger re-renders in React components. React actually optimizes these by avoiding unnecessary re-renders using the process of "reconciliation."

Re-rendering mainly occurs when the state is updated or a prop is changed in the component.

#### 1. The Render Phase (Again)

The render phase when re-rendering follows a similar approach, but with a key difference. It creates a _new_ VDOM, where the component which triggered the state change is flagged as "this component needs an update!"

After the _new_ VDOM is created, the render phase during a re-render enters a process called "reconciliation." Through this process, the _new_ VDOM and the _old_ VDOM are compared using React's diffing algorithm.

#### 2. The Commit Phase (Again)

Then, the changes are sent to the commit phase once more.

During these subsequent re-renders, the minimal necessary operations are applied during the commit phase to make the real DOM match the latest VDOM.

## Reconciliation and the Diffing Algorithm

Reconciliation is the React concept that houses the diffing algorithm. The diffing algorithm determines which parts of the tree of elements need to be replaced. It compares the current and previous VDOMs, and identifies the elements that would need to be added, updated, or removed.

Reconciliation is a process that occurs between the render phase and the commit phase. It covers how the VDOM gets synced with the real DOM.

### Creating the Virtual DOM

Every time `render()` is called, React creates this tree of elements which is a plain JavaScript object called a "React element." As mentioned, this plain JavaScript object and its children make up the VDOM.

React is capable of efficiently updating the VDOM whenever there's a change in state or props, following specific conditions that determine whether a component should re-render.

Writing to the real DOM is very expensive and can lead to performance shortcomings, but generating the VDOM is really easy. React uses the VDOM to reduce the excess cost incurred from repainting the entire page whenever a state change occurs that affects the UI.

The VDOM is used to figure out the changes without involving the real DOM and then ensures that the real DOM only updates the parts of the UI that have changed.

### Reconciliation with React Fiber

With React 16, reconciliation is now done with React Fiber. Prior to React Fiber, reconciliation was done synchronously with the retroactively-named "Stack Reconciler."

Compared to the old "Stack Reconciler", the new "Fiber Reconciler" is asynchronous and is able to be interrupted. But, we'll discuss React Fiber in a separate post!

## Let's recap!

In summary, the rendering process in React goes through the following steps as such:

1. We write code to create a component that describes the UI we desire.
2. React creates a component instance (wherein the state is deduced, and the props are taken and computed).
3. React generates a tree of elements (which is, in equivalence, called the virtual DOM).
4. This tree of elements goes through the reconciliation process (wherein the diffing algorithm compares it with the previous tree of elements, if any).
5. Then, ReactDOM takes the result of the rendering process and actually generates the real DOM nodes and does any necessary real DOM manipulations.
6. Finally, we get to see our React application on the screen!
