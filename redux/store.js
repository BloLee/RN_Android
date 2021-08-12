import { createStore } from 'redux'

function counter(state =0, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        break;
        case 'DECREMENT':
            return state - 1;
        break;
        default:
            return state;
    }
}

//存放状态
let store = createStore(counter)

//通过 dispatch  action 改变
//action 可以 记录和存储
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })