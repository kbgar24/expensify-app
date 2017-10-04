import { createStore } from 'redux';

//Action Generator functions

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  // incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
  incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

const resetCount = () => ({type: 'RESET'})

//unpure function
let a = 10;
var add = (b) => {
  return a + b; /*Here function value depends on external 'a' var. Therefore this function is not pure*/
}

let result;
var add = (a,b) => {
  result = a + b; /*Here function value affects an external result. Therefore this function is not pure*/
}


//pure function
var add = (a,b) => {
  return a + b;
}

// Reducers
// 1. Reducers are pure functions
// 2. Never change state of action

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      // const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
      return {
        // count: state.count + incrementBy
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      // const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 10
      return {
        count: state.count - action.decrementBy
      }
    case 'SET':
      // const newValue = typeof action.count === 'number' ? action.count : undefined;
      const count = typeof action.count === 'number' ? action.count : state.count
      return {
        count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch(incrementCount({ incrementBy: 500 }))
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5,
// });

//Actions - Object that gets sent to store

//I'd like to increment the count
//Dispatch
// store.dispatch({
//   type: 'DECREMENT'
// });
//Genrators:
store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 50 }))

store.dispatch(decrementCount())


// store.dispatch({
//   type: 'RESET'
// });

store.dispatch(setCount({ count: 0 }));

// store.dispatch({
//   type: 'SET',
//   count: 'Fuck you.'
// })
