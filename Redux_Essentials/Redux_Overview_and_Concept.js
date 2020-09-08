//State Management+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(0)

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter(prevCounter => prevCounter + 1)
  }

  // View: the UI definition
  return (
    <div>
      Value: {counter} <button onClick={increment}>Increment</button>
    </div>
  )
}


//state, the source of truth that drives our app;

//view, a declarative description of the UI based on the current state

//actions, the events that occur in the app based on user input, and trigger updates in the state


//one-way data flow
//-> State describes the condition of the app at a specific point in time
//-> The UI is rendered based on that state
//-> When something happens (such as a user clicking a button), the state is updated based on what occurred
//-> The UI re-renders based on the new state

//Actions++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//An action is a plain JavaScript object that has a type field. 
//think of an action as an event that describes something that happened in the application.

const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}

//type field should be a string that gives this action a descriptive name, like "todos/todoAdded". 
//usually write that type string like "domain/eventName", where the 
//->first part is the feature or category that this action belongs to, and 
//->the second part is the specific thing that happened.

//An action object can have other fields with additional information about what happened. 
//By convention, that information in a field called payload.

//Action Creators
//An action creator is a function that creates and returns an action object. 
//We typically use these so we don't have to write the action object by hand every time:

const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}

//Reducers++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//A reducer is a function that receives the current state and an action object, 
//decides how to update the state if necessary, and returns the new state: (state, action) => newState.

//Rules:
//-> Reducers should only calculate the new state value based on the state and action arguments
//-> are not allowed to modify the existing state. Instead, they must make immutable updates, 
//	by copying the existing state and making changes to the copied values.
//-> REducers must not do any asynchronous logic, calculate random values, or cause other "side effects"

//logic inside reducer functions typically follows the same series of steps:
//-> Check to see if the reducer cares about this action
//-> If so, make a copy of the state, update the copy with new values, and return it
//-> Otherwise, return the existing state unchanged

const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}

//Store++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//The current Redux application state lives in an object called the store .

//The store is created by passing in a reducer, and has a method called getState that returns the current state value:

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer }) //setup the store

console.log(store.getState()) //getstate from store
// {value: 0}


//Dispatch+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//The Redux store has a method called dispatch. 
//The only way to update the state is to call store.dispatch() and pass in an action object.

//The store will run its reducer function and save the new state value inside, 
//and we can call getState() to retrieve the updated value:

store.dispatch({ type: 'counter/increment' }) //dispatch to update state pass to action obj

console.log(store.getState()) 
// {value: 1}

// You can think of dispatching actions as "triggering an event" in the application. 
// Something happened, and we want the store to know about it. 
// Reducers act like event listeners, and when they hear an action they are interested in, 
// they update the state in response.

//call action creators to dispatch the right action
const increment = () => {
  return {
    type: 'counter/increment'
  }
}

store.dispatch(increment()) //store to dispatch obj

console.log(store.getState()) //get the state from store
// {value: 2}

//Selectors++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Selectors are functions that know how to extract specific pieces of information from a store state value. 
//As an application grows bigger, 
//this can help avoid repeating logic as different parts of the app need to read the same data:

const selectCounterValue = state => state.value //extract value from state

const currentValue = selectCounterValue(store.getState()) // get the extracted value from state
console.log(currentValue)
// 2


