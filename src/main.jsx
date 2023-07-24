import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import postStore from "./stores/PostStore.js";
import { Provider } from 'mobx-react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider postStore={postStore}>
        <App />
      </Provider>
    </BrowserRouter>,
)
