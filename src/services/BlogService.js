import React from "react"

export default class BlogService extends React.Component {

    _apiBase = 'https://conduit.productionready.io/api'

    async getSrc (url) {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'GET',
            headers: {
                Authorization: (localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : '')
            }
        })
        return res.json()
    }

    async getArticles(offset) {
        const response = await this.getSrc(`/articles?offset=${offset}`)
        return response.articles
    }

    async getOpenedArticle(slug) {
        const response = await this.getSrc(`/articles/${slug}`)
        return response.article
    }

    async onRegister(user) {
        let response = await fetch(`${this._apiBase}/users`,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        body: JSON.stringify( {user: user} )
                    }
                )

        response = await response.json()
        if (localStorage.user) {
            localStorage.setItem(user, JSON.stringify(response))
        }
        return response
    }

    async onLogin(user) {
        let response = await fetch(`${this._apiBase}/users/login`,
        {   method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify( {user: user} ) })

        if (response.ok)
            localStorage.setItem("user", JSON.stringify(user))

        response = await response.json()
        return response
    }

    async onUpdateUser(user) {
        let response = await fetch(`${this._apiBase}/user`,
        {   method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify( {user: user} )
        })

        if (response.ok)
            localStorage.setItem("user", JSON.stringify(user))

        response = await response.json()
        return response
    }

    async createArticle(article) {
        let response = await fetch(`${this._apiBase}/articles`,
        {   method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify( {article: article} )
        })
        response = await response.json()
        return response
    }

    async deleteArticle(slug) {
        let response = await fetch(`${this._apiBase}/articles/${slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
    }

    async editArticle(slug, article) {
        let response = await fetch(`${this._apiBase}/articles/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify( {article: article} )
        })
        response = await response.json()
        return response
    }

    async likePost(slug) {
        let response = await fetch(`${this._apiBase}/articles/${slug}/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
        response = await response.json()
        return response
    }

    async unlikePost(slug) {
        let response = await fetch(`${this._apiBase}/articles/${slug}/favorite`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
        response = await response.json()
        return response
    } 
}   