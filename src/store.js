import {createStore, applyMiddleware, compose} from 'redux';
import {loadState, saveState} from './actions/other/funcionesLocalStorage'
import thunk from 'redux-thunk'
import reducer from './reducers'

const initialData = loadState() || {}

const store = createStore(
    reducer, 
    initialData,
    // el applyMiddleware se requeire por se utiliza thunk
    compose(applyMiddleware(thunk),

        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
                window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

store.subscribe( function () {
    saveState(store.getState())
})

export default store;