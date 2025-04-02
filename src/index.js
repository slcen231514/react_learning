import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.scss'
import 'normalize.css'

// 1. 导入路由router
import router from './router';
import { Provider } from 'react-redux';
import store from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/* <App /> */}
        <RouterProvider router={router}></RouterProvider>
    </Provider>
)

