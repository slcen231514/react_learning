import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.scss'
import App from './App';

// 1. 导入路由router
import router from './router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
); 

