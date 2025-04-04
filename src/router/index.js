import Login from "@/page/Login";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/page/Layout";
// import Home from "@/page/Home";
// import Article from "@/page/Article";
// import Publish from "@/page/Publish";
import NotFound from "@/page/NotFound";
import { AuthRoute } from '@/components/AuthRoute'
import { lazy, Suspense } from "react";

// 1. lazy函数对组件进行导入
const Home = lazy(() => import('@/page/Home'))
const Article = lazy(() => import('@/page/Article'))
const Publish = lazy(() => import('@/page/Publish'))


const router = createBrowserRouter([
    {
        path: '/',
        element:  <AuthRoute><Layout /></AuthRoute>,
        children: [
            // 设置为默认二级路由
            {
                index: true, 
                element: <Suspense fallback={'加载中'}><Home /></Suspense>
            },
            {
                path: '/publish',
                element: <Suspense fallback={'加载中'}><Publish /></Suspense>
            },
            {
                path: '/article',
                element: <Suspense fallback={'加载中'}><Article /></Suspense>
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