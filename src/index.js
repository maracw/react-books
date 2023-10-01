import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from './Context/books';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

//wrap app component with provider
root.render (
    <Provider>
        <App />
    </Provider>
   );