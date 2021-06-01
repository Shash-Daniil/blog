import React from "react"

export default class BlogService extends React.Component {

    _apiBase = 'https://conduit.productionready.io/api'

    async getSrc (url) {
        const res = await fetch(`${this._apiBase}${url}`)
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

    async onUpdateUser (user, token) {
        let response = await fetch(`${this._apiBase}/user`,
        {   method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify( {user: user} )
        })

        if (response.ok)
            localStorage.setItem("user", JSON.stringify(user))

        response = await response.json()
        return response
    }
}   