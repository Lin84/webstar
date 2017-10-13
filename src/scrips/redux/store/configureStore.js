import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(
    logger,
    thunk
);

export default function configureStore(initialState) {
    /* eslint-disable no-underscore-dangle */
    return createStore(
        rootReducer,
        initialState,
        compose(
            enhancer,
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    /* eslint-enable */
}
