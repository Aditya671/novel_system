import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import persistReducerData from './reducers/app.reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk]
const store = createStore(persistReducerData,composeEnhancers(applyMiddleware(...middleware)))

const persistor = persistStore(store)

export {store,persistor}