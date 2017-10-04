import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { getVisibleExpenses } from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

const store = configureStore();

// addExpense
store.dispatch(addExpense({
  description: 'Water bill',
  amount: 9800,
  note: 'This shit is too expensive'
}))

store.dispatch(addExpense({
  description: 'Gas bill',
  amount: 5800,
  note: 'This shit isn\'t too bad'
}));

store.dispatch(setTextFilter('water'));

const {expenses, filters} = store.getState()

const result = getVisibleExpenses(expenses, filters);

console.log(result);

// console.log(store.getState());

ReactDOM.render(<AppRouter />, document.getElementById('app'));
