import Login from "../page/Login";
import Article from "@/page/Article";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/page/Layout";
import Board from "../page/Board";
import About from "@/page/About";
import NotFound from "../page/NotFound";
import { AuthRoute } from '@/components/AuthRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element:  <AuthRoute><Layout /></AuthRoute>,
        children: [
            // 设置为默认二级路由
            {
                index: true, 
                element: <Board />
            },
            {
                path: 'About',
                element: <About />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/article/:id/:name',
        element: <Article />
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router