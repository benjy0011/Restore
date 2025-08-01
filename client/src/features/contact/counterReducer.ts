import { createSlice } from "@reduxjs/toolkit"

export type CounterState = {
  data: number
}

const initialState: CounterState = {
  data: 42
}

// Redux toolkit (RTK)
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload
    },
    decrement: (state, action) => {
      state.data -= action.payload
    }
  }
})

export const {
  increment,
  decrement
} = counterSlice.actions;


// Legacy Redux Code

export function incrementLegacy(amount: number = 1) {
  return {
    type: 'increment',
    payload: amount
  }
}

export function decrementLegacy(amount: number = 1) {
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