import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from './auth/reducer';
import { statusReducer } from './status/reducer'
import { statusV2Reducer } from './statusv2/reducer'

import { AuthState } from "./auth/types";
import { StatusState } from "./status/types";
import { StatusV2State } from "./statusv2/types";

export interface RootState {
    auth: AuthState;
    status: StatusState;
    statusV2: StatusV2State;
};

export const rootReducer = combineReducers({
    auth: authReducer,
    status: statusReducer,
    statusV2: statusV2Reducer
});

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);