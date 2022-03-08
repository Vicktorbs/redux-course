// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './components/App';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import reducers from './reducers';
// import reducThunk from 'redux-thunk'

// const store = createStore(
//   reducers,  //todos los reducers
//   {},
//   applyMiddleware(reducThunk)
// )
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

const store = createStore(
	reducers, // Reducers
	{}, // Estado inicial
	applyMiddleware(reduxThunk)
);

ReactDOM.render(
	<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
	document.getElementById('root')
);