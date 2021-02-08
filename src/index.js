import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store, persistor } from './store/configStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import rootSaga from './sagas/index'

// sagaMiddleware.run(rootSaga)
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
