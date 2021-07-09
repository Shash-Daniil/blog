import React from 'react';
import LocalStorageService from './LocalStorageService';

export default class BlogService extends React.Component {
  apiBase = 'https://conduit.productionready.io/api';

  storage = new LocalStorageService();

  /* eslint-disable react/sort-comp */
  async sendRequest(url, opt) {
    const res = await fetch(`${this.apiBase}${url}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.storage.getItem('token') ? `Token ${this.storage.getItem('token')}` : '',
      },
      ...opt,
    });
    return res.json();
  }

  async getArticles(page) {
    const offset = (page - 1) * 20;
    const response = await this.sendRequest(`/articles?offset=${offset}`);
    return response.articles;
  }

  async getOpenedArticle(slug) {
    const response = await this.sendRequest(`/articles/${slug}`);
    return response.article;
  }

  async onRegister(user) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ user }),
    };
    const response = await this.sendRequest('/users', options);

    const userInfo = {
      ...response.user,
      ...user,
    };

    this.storage.setItem('user', JSON.stringify(userInfo));

    return response;
  }

  async onLogin(user) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ user }),
    };
    const response = await this.sendRequest('/users/login', options);

    const userInfo = {
      ...response.user,
      ...user,
    };

    this.storage.setItem('user', JSON.stringify(userInfo));
    return response;
  }

  async onUpdateUser(user) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ user }),
    };
    const response = await this.sendRequest('/user', options);

    const userInfo = {
      ...response.user,
      ...user,
    };

    this.storage.setItem('user', JSON.stringify(userInfo));

    return response;
  }

  async createArticle(article) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ article }),
    };
    const response = await this.sendRequest('/articles', options);
    return response;
  }

  async deleteArticle(slug) {
    const options = {
      method: 'DELETE',
    };
    await this.sendRequest(`/articles/${slug}`, options);
  }

  async editArticle(slug, article) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ article }),
    };
    const response = await this.sendRequest(`/articles/${slug}`, options);
    return response;
  }

  async likePost(slug) {
    const options = {
      method: 'POST',
    };
    const response = await this.sendRequest(`/articles/${slug}/favorite`, options);
    return response;
  }

  async unlikePost(slug) {
    const options = {
      method: 'DELETE',
    };
    const response = await this.sendRequest(`/articles/${slug}/favorite`, options);
    return response;
  }
}
