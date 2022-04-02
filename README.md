# shoppingcartbyjotai

Shopping cart example shown in redux offical site is rewritten in jotai to explain the easness and light weightness of the framework

## Installation steps

git clone https://github.com/devgroves/shoppingcartbyjotai

npm install

npm start

### Introduction

Jotai is a minimalist state-management library for React. It’s tiny and fast. It requires practically no boilerplate. Typescript is built in. It supports Suspense, and it’s ready for concurrent mode.

The mechanics of Jotai is very similar to React Context and Recoil, but even if you’re not familiar with either concept, this article will get you up to speed very quickly, because Jotai is very simple.

### How Jotai works

### Atoms

To create a piece of state, use the atom() function. For example,

#### const counterAtom = atom(0) // 0 is the initial value

To use the state in a component, call the useAtom() hook:

#### const [counter, setCounter] = useAtom(counterAtom)

useAtom looks and acts a lot like React’s useState hook. It returns the current value of the atom as well as a function to set the value of the atom.
That’s really all you need to know to get started. Let’s look at an example:

Clicking on the button calls setCounter() to increment its value. When the value ofcounterAtomchanges, the <CurrentCount/> component is re-rendered with the new value. It’s really that simple.

The set function that is returned by useAtom is similar to the set function returned by React’s useState: you can provide the value, or in you can provide a function to change the value. In the example, the button could have been implemented like this:

#### <button onClick={() => setCounter(c=>c+1)}>Click to increment</button>
