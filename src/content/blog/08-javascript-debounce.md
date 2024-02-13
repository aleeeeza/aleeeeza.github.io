---
title: "JavaScript: Creating a Debounce Function"
description: Add description here.
pubDatetime: 2023-09-30
author: Frances Aleeza
postSlug: javascript-debounce
featured: true
draft: false
tags:
  - javascript
ogImage: ""
---

The term **debounce** (using the dictionary’s definition) means “to discard events or signals that should not be processed because they occurred too close together.”

In JavaScript, a debounce function makes sure that your code is only triggered once in the event that there are multiple, successive user inputs. In a web application, using a debounce function can be advantageous when bringing up search box suggestions, when auto-saving text fields, and for eliminating multiple button clicks.

When employing the debouncing strategy in our code, it allows us to improve performance by waiting until a set amount of time has elapsed before a given event is triggered.

To better illustrate this concept, let’s create a simple React app that has a single button which we will add our `debounce` function to.

```jsx
// App.jsx

export default function App() {
  const debounce = () => {
    // task: create a debounce function to use on the button below
  };

  return (
    <main>
      <button
        onClick={() => {
          console.log("Click!");
        }}
      >
        Debounced Button
      </button>
    </main>
  );
}
```

Right now, with the code given above, when the button is clicked, it will simply log the message `"Click!"` to the console.

Now, to start writing the code for our `debounce` function, we’ll first need to create a timer. This is because our `debounce` function should be able to wait for a certain duration of time to pass before it can continue to run the rest of our code.

We can create a timer by using the `setTimeout()` and `clearTimeout()` methods.

Next, the other thing we want our `debounce` function to do is to be able to return a function. This is because we’ll be wanting to use and reuse the `debounce` function to wrap any other function in our code that would need debouncing.

For this, we’ll need to use the spread `...` syntax.

```jsx
// App.jsx

export default function App() {
  const debounce = (callbackFn, duration) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callbackFn(...args);
      }, duration);
    };
  };

  return (
    <main>
      <button
        onClick={() => {
          console.log("Click!");
        }}
      >
        Debounced Button
      </button>
    </main>
  );
}
```

With the `debounce` function we now have above, we’ll now need to apply this to the button.

To do this, we can create another function we’ll arbitrarily call `debouncedClick`. Let’s also randomly say that we want this `debouncedClick` to only be called after three (3) seconds have passed from the last user-triggered button click.

```jsx
// App.jsx

export default function App() {
  const debounce = (callbackFn, duration) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callbackFn(...args);
      }, duration);
    };
  };

  const debouncedClick = debounce(() => {
    console.log("Debounced click!");
  }, 3000);

  return (
    <main>
      <button
        onClick={() => {
          console.log("Click!");
          debouncedClick();
        }}
      >
        Debounced Button
      </button>
    </main>
  );
}
```
