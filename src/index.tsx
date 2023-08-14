import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import './index.css';
import MyLApp from './RemediesStatus';

ReactDOM.render(
	<Provider store={ store } >
		<MyLApp />
	</Provider>

    ,
  document.getElementById('root')
);