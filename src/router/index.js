import Login from "@/page/Login";
import Article from "@/page/Article";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/page/Layout";
import Home from "@/page/Home";
import Publish from "@/page/Publish";
import NotFound from "@/page/NotFound";
import { AuthRoute } from '@/components/AuthRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element:  <AuthRoute><Layout /></AuthRoute>,
        children: [
            // 设置为默认二级路由
            {
                index: true, 
                element: <Home />
            },
            {
                path: '/publish',
                element: <Publish />
            },
            {
                path: '/article',
                element: <Article />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router