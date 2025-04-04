// 封装和文章相关接口函数

const { request } = require("@/utils");

// 1.获取频道列表

export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET',
    })
}

// 2.提交文章表单

export function createArticleAPI(data) {
    return request({
        url: '/mp/articles',
        method: 'POST',
        data
    })
}

// 3.获取文章列表

export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}