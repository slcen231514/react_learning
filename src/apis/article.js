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

// 4.删除文章

export function delArticleAPI(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

// 5.获取文章详情

export function getArticleById(id) {
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}

// 6.更新文章表单

export function updateArticleAPI(data) {
    return request({
        url: `/mp/articles/${data.id}`,
        method: 'PUT',
        data
    })
}
