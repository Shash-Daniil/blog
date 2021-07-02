import React from 'react';

export default class BlogService extends React.Component {
  apiBase = 'https://conduit.productionready.io/api';

  /* eslint-disable-next-line react/sort-comp */
  async getSrc(url) {
    const res = await fetch(`${this.apiBase}${url}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') ? `Token ${localStorage.getItem('token')}` : '',
      },
    });
    return res.json();
  }

  async getArticles(offset) {
    const response = await this.getSrc(`/articles?offset=${offset}`);
    return response.articles;
  }

  async getOpenedArticle(slug) {
    const response = await this.getSrc(`/articles/${slug}`);
    return response.article;
  }

  async onRegister(user) {
    let response = await fetch(`${this.apiBase}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user }),
    });

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    response = await response.json();
    return response;
  }

  async onLogin(user) {
    let response = await fetch(`${this.apiBase}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user }),
    });

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    response = await response.json();
    return response;
  }

  async onUpdateUser(user) {
    let response = await fetch(`${this.apiBase}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user }),
    });

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    response = await response.json();
    return response;
  }

  async createArticle(article) {
    let response = await fetch(`${this.apiBase}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ article }),
    });
    response = await response.json();
    return response;
  }

  async deleteArticle(slug) {
    await fetch(`${this.apiBase}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  }

  async editArticle(slug, article) {
    let response = await fetch(`${this.apiBase}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ article }),
    });
    response = await response.json();
    return response;
  }

  async likePost(slug) {
    let response = await fetch(`${this.apiBase}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    response = await response.json();
    return response;
  }

  async unlikePost(slug) {
    let response = await fetch(`${this.apiBase}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    response = await response.json();
    return response;
  }
}
