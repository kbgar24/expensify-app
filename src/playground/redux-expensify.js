import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE

const sortByDateFilter = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT

const sortByAmountFilter = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE

const setStartDateFilter = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

// SET_END_DATE

const setEndDateFilter = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})


// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE' :
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense
        }
      })
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
}

// Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch;
  });
};

const sortByAscending = (expenses, filters) => {
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  if (sortBy === 'date') {
    return visibleExpenses.sort((a, b) => a.createdAt > b.createdAt);
  } else {
    return visibleExpenses.sort((a, b) => a.amount > b.amount);
  }
};

const sortByDescending = (expenses, filters) => {
  return sortByAscending(expenses, filters).reverse();
}

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();

  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

  const sortedByAscending = sortByAscending(state.expenses, state.filters);
  // const sortedByDescending = sortByDescending(state.expenses, state.filters);


  console.log('visible: ', visibleExpenses);
  console.log('sortedAscneding: ', sortedByAscending);
  // console.log('sortedDesc: ', sortedByDescending);

});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: 2000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 10, createdAt: -1000 }));
const expenseThree = store.dispatch(addExpense({ description: 'Sex', amount: 150, createdAt: 3000 }));
const expenseFour = store.dispatch(addExpense({ description: 'Plan B', amount: 50, createdAt: 10000 }));
const expenseFive = store.dispatch(addExpense({ description: 'Abortion', amount: 600, createdAt: 20000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());
//
store.dispatch(sortByDateFilter())
// store.dispatch(sortByAmountFilter())
//
// store.dispatch(setStartDateFilter(125))
// store.dispatch(setStartDateFilter());
//
// store.dispatch(setEndDateFilter())
// store.dispatch(setEndDateFilter(10))



const demoState = {
  expenses: [{
    id: 'asdfasdf',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
  }
}

const user = {
  name: 'Jen',
  age: 24
};

console.log({
  ...user,
  location: 'Philadelphia',
  name: 'Kendrick'
})
