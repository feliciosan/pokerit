import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

ReactDOM.render(
    <Router location={history}>
        <App />
    </Router>,
    document.getElementById('root')
);
