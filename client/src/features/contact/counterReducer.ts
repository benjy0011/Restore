export type CounterState = {
  data: number
}

const initialState: CounterState = {
  data: 42
}

export function increment(amount: number = 1) {
  return {
    type: 'increment',
    payload: amount
  }
}

export function decrement(amount: number = 1) {
  return {
    type: 'decrement',
    payload: amount
  }
}

export default function counterReducer(
  state = initialState, 
  action: {
    type: 'increment' | 'decrement', 
    payload: number
  }
) {
  switch (action.type) {
    case 'increment':
      return {
        ...state, // to not mutate other state
        data: state.data + action.payload
      }
    
    case 'decrement':
      return {
        ...state,
        data: state.data - action.payload
      }
    default:
      return state
  }
}