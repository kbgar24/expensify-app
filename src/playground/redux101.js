import { createStore } from 'redux';

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
      return {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 10
      return {
        count: state.count - decrementBy
      }
    case 'SET':
      const newValue = typeof action.count === 'number' ? action.count : undefined;
      return {
        count: newValue || state.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5,
});

//Actions - Object that gets sent to store

//I'd like to increment the count
store.dispatch({
  type: 'DECREMENT'
});


store.dispatch({
  type: 'RESET'
});

store.dispatch({
  type: 'SET',
  count: 'Fuck you.'
})
